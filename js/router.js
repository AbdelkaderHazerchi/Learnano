/**
 * router.js — Dynamic JSON Fetching and DOM Injection for viewer.html
 */

const Router = {
  _courseData: null,
  _currentItem: null,
  _currentIndex: -1,
  _params: null,

  init() {
    this._params = this._parseParams();
    if (!this._params.course || !this._params.item) {
      this._showError('Missing course or item parameter.');
      return;
    }
    this._loadCourse(this._params.course).then(() => this._loadItem(this._params.item));
    this._initScrollProgress();
  },

  _parseParams() {
    const p = new URLSearchParams(window.location.search);
    return { course: p.get('course'), item: p.get('item') };
  },

  async _loadCourse(courseId) {
    try {
      const courses = await Loader.loadJSON('data/courses.json');
      const meta = courses.find(c => c.id === courseId);
      if (!meta) throw new Error(`Course "${courseId}" not found`);

      this._courseData = await Loader.loadJSON(`data/modules/${meta.moduleFile}`);

      const bc = document.getElementById('course-breadcrumb');
      if (bc) {
        const title = this._courseData.courseTitle[App._state.lang] || this._courseData.courseTitle.en;
        bc.textContent = title;
      }
    } catch (err) {
      console.error(err);
      this._showError(`Failed to load course "${courseId}".`);
    }
  },

  _loadItem(itemId) {
    if (!this._courseData || !this._courseData.items) return;

    this._currentIndex = this._courseData.items.findIndex(i => i.id === itemId);
    if (this._currentIndex === -1) {
      this._showError(`Item "${itemId}" not found.`);
      return;
    }

    this._currentItem = this._courseData.items[this._currentIndex];
    const lang = App._state.lang;

    const titleEl = document.getElementById('viewer-item-title');
    if (titleEl) titleEl.textContent = this._currentItem.title[lang] || this._currentItem.title.en;

    const content = document.getElementById('viewer-content');
    if (!content) return;
    content.innerHTML = '';

    if (this._currentItem.type === 'text') {
      this._renderTextLesson(this._currentItem, content);
    } else if (this._currentItem.type === 'quiz') {
      this._renderQuiz(this._currentItem, content);
    }

    this._updateNav();
    window.scrollTo(0, 0);
  },

  _renderTextLesson(item, container) {
    const lang = App._state.lang;
    const md = item.content[lang] || item.content.en;

    let html = '';
    if (typeof marked !== 'undefined') {
      html = marked.parse(md);
    } else {
      html = `<pre>${md}</pre>`;
    }
    container.innerHTML = html;

    if (typeof Prism !== 'undefined') {
      container.querySelectorAll('pre code').forEach(b => Prism.highlightElement(b));
    }
    if (typeof renderMathInElement !== 'undefined') {
      renderMathInElement(container, { throwOnError: false });
    }

    const done = State.isLessonCompleted(this._params.course, item.id);
    const footer = document.getElementById('viewer-action');
    if (!footer) return;
    footer.innerHTML = done
      ? `<button class="btn btn-success" disabled>${App.t('viewer.completed')}</button>`
      : `<button class="btn btn-primary" id="btn-complete-lesson">${App.t('viewer.markComplete')}</button>`;
    if (!done) {
      document.getElementById('btn-complete-lesson').addEventListener('click', () => this._handleLessonComplete());
    }
  },

  _renderQuiz(item, container) {
    const lang = App._state.lang;
    const passed = State.isQuizPassed(this._params.course, item.id);
    const prevScore = State.getQuizScore(this._params.course, item.id);

    const form = document.createElement('form');
    form.id = 'quiz-form';
    form.noValidate = true;

    item.questions.forEach((q, qi) => {
      const qText = q.questionText[lang] || q.questionText.en;
      const opts = q.options[lang] || q.options.en;

      const div = document.createElement('div');
      div.className = 'quiz-question';
      div.dataset.questionId = q.questionId;
      div.innerHTML = `
        <div class="quiz-question-text">${qi + 1}. ${qText}</div>
        <div class="quiz-options">
          ${opts.map((opt, oi) => `
            <label class="quiz-option">
              <input type="${q.type === 'multiple' ? 'checkbox' : 'radio'}"
                     name="q_${q.questionId}" value="${oi}"
                     ${passed ? 'disabled' : ''}>
              <span class="quiz-option-control"></span>
              <span class="quiz-option-label">${opt}</span>
            </label>
          `).join('')}
        </div>`;
      form.appendChild(div);

      if (passed) this._markCorrectAnswers(div, q);
    });

    container.appendChild(form);

    const footer = document.getElementById('viewer-action');
    if (!footer) return;
    if (passed) {
      footer.innerHTML = `<button class="btn btn-success" disabled>${App.t('viewer.submitted')}</button>
        <p style="margin-top:0.5rem;color:var(--text-secondary)">${App.t('viewer.score')}: ${Math.round(prevScore * 100)}%</p>`;
    } else {
      footer.innerHTML = `<button class="btn btn-primary" id="btn-submit-quiz">${App.t('viewer.submitQuiz')}</button>`;
      document.getElementById('btn-submit-quiz').addEventListener('click', e => this._handleQuizSubmit(e));
    }
  },

  _handleLessonComplete() {
    const item = this._currentItem;
    if (!item) return;
    State.completeLesson(this._params.course, item.id, item.points);
    State.checkBadges(this._courseData);

    const footer = document.getElementById('viewer-action');
    if (footer) footer.innerHTML = `<button class="btn btn-success" disabled>${App.t('viewer.completed')}</button>`;

    App.showToast(App.t('toast.lessonComplete'), 'success');
    this._checkNewBadges();
    this._checkCourseComplete();
  },

  _handleQuizSubmit(e) {
    e.preventDefault();
    const item = this._currentItem;
    if (!item) return;

    let allAnswered = true;
    const answers = {};

    item.questions.forEach(q => {
      const inputs = document.querySelectorAll(`input[name="q_${q.questionId}"]:checked`);
      if (inputs.length === 0) { allAnswered = false; return; }
      answers[q.questionId] = q.type === 'multiple'
        ? Array.from(inputs).map(inp => parseInt(inp.value))
        : parseInt(inputs[0].value);
    });

    if (!allAnswered) {
      App.showToast(App.t('viewer.selectAnswer'), 'warning');
      return;
    }

    let correct = 0;
    item.questions.forEach(q => {
      const user = answers[q.questionId];
      let isCorrect = false;
      if (q.type === 'multiple') {
        const correctSorted = [...q.correctAnswerIndices].sort();
        const userSorted = [...(user || [])].sort();
        isCorrect = correctSorted.length === userSorted.length && correctSorted.every((v, i) => v === userSorted[i]);
      } else {
        isCorrect = user === q.correctAnswerIndex;
      }
      if (isCorrect) correct++;
    });

    const score = correct / item.questions.length;
    const passed = score >= (item.passThreshold || 0.8);
    const result = State.submitQuiz(this._params.course, item.id, score, passed, item.points);
    State.checkBadges(this._courseData);

    this._showQuizResults(item, correct, item.questions.length, score, passed, result.newPoints);
    if (passed) App.showToast(`+${result.newPoints} ${App.t('toast.pointsEarned')}`, 'success');
    this._checkNewBadges();
    this._checkCourseComplete();
  },

  _showQuizResults(item, correct, total, score, passed, points) {
    item.questions.forEach(q => {
      const el = document.querySelector(`.quiz-question[data-question-id="${q.questionId}"]`);
      if (el) this._markCorrectAnswers(el, q);
    });
    document.querySelectorAll('#quiz-form input').forEach(inp => inp.disabled = true);

    const footer = document.getElementById('viewer-action');
    if (!footer) return;
    footer.innerHTML = `
      <div class="quiz-result ${passed ? 'passed' : 'failed'} animate-scale-in">
        <div class="quiz-result-score">${Math.round(score * 100)}%</div>
        <div class="quiz-result-label">${passed ? App.t('viewer.passed') : App.t('viewer.failed')}</div>
        <div class="quiz-result-points">${correct}/${total} ${App.t('viewer.correct')}</div>
        ${passed
          ? `<div class="quiz-result-points" style="color:var(--success)">+${points} ${App.t('courses.points')}</div>`
          : `<button class="btn btn-outline" style="margin-top:1rem" onclick="Router._loadItem('${item.id}')">${App.t('viewer.retry')}</button>`}
      </div>`;
  },

  _markCorrectAnswers(questionEl, q) {
    const opts = questionEl.querySelectorAll('.quiz-option');
    const correct = q.type === 'multiple' ? q.correctAnswerIndices : [q.correctAnswerIndex];
    opts.forEach((opt, oi) => {
      opt.classList.add('disabled');
      const inp = opt.querySelector('input');
      if (correct.includes(oi)) {
        opt.classList.add('correct');
      } else if (inp && inp.checked) {
        opt.classList.add('incorrect');
      }
    });
  },

  _updateNav() {
    const prev = document.getElementById('btn-prev');
    const next = document.getElementById('btn-next');
    if (prev) {
      if (this._currentIndex > 0) {
        const p = this._courseData.items[this._currentIndex - 1];
        prev.style.display = 'inline-flex';
        prev.textContent = App.t('viewer.prev');
        prev.onclick = () => this._navigateTo(p.id);
      } else { prev.style.display = 'none'; }
    }
    if (next) {
      if (this._currentIndex < this._courseData.items.length - 1) {
        const n = this._courseData.items[this._currentIndex + 1];
        next.style.display = 'inline-flex';
        next.textContent = App.t('viewer.next');
        next.onclick = () => this._navigateTo(n.id);
      } else { next.style.display = 'none'; }
    }
  },

  _navigateTo(itemId) {
    const url = new URL(window.location);
    url.searchParams.set('item', itemId);
    window.history.pushState({}, '', url);
    this._params.item = itemId;
    this._loadItem(itemId);
    this._updateScrollProgress();
  },

  _initScrollProgress() {
    window.addEventListener('scroll', () => this._updateScrollProgress());
  },

  _updateScrollProgress() {
    const bar = document.getElementById('scroll-progress-fill');
    if (!bar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) + '%' : '0%';
  },

  _showError(msg) {
    const c = document.getElementById('viewer-content');
    if (c) c.innerHTML = `<div class="empty-state"><div class="empty-state-icon">⚠️</div><p>${msg}</p></div>`;
  },

  _checkNewBadges() {
    const badges = State.getBadges();
    const prev = parseInt(sessionStorage.getItem('learnano_badgeCount') || '0');
    if (badges.length > prev) {
      badges.slice(prev).forEach(b => {
        App.showToast(`${App.t('toast.badgeEarned')} ${b.icon} ${b.title[App._state.lang] || b.title.en}`, 'success', 6000);
      });
    }
    sessionStorage.setItem('learnano_badgeCount', badges.length.toString());
  },

  _checkCourseComplete() {
    if (!this._courseData) return;
    const prog = State.getCourseProgress(this._params.course, this._courseData.items.length);
    if (prog.completed >= prog.total) {
      App.showToast(App.t('toast.courseComplete'), 'success', 6000);
    }
  }
};

window.addEventListener('popstate', () => {
  const p = new URLSearchParams(window.location.search);
  if (p.get('item') && p.get('item') !== Router._params.item) {
    Router._params.item = p.get('item');
    Router._params.course = p.get('course');
    Router._loadItem(p.get('item'));
  }
});

document.addEventListener('DOMContentLoaded', () => Router.init());
