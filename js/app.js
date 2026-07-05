/**
 * app.js — Global Initialization, Theme, i18n, Layout Injection
 */

const App = {
  _state: { theme: 'system', lang: 'en' },

  _translations: {
    en: {
      'logo': '\u{1F4D6} Learnano',
      'nav.home': 'Home',
      'nav.courses': 'Courses',
      'nav.articles': 'Articles',
      'nav.track': 'Track',
      'theme.system': 'System',
      'theme.light': 'Light',
      'theme.dark': 'Dark',
      'hero.title': 'Learn Technical Sciences',
      'hero.subtitle': 'Interactive lessons, quizzes, and hands-on exercises in computer engineering and digital systems.',
      'hero.cta': 'Start Learning',
      'features.title': 'Why Learn with Us?',
      'feature.interactive': 'Interactive Lessons',
      'feature.interactive.desc': 'Engaging content with code snippets, diagrams, and real-world examples.',
      'feature.quiz': 'Smart Quizzes',
      'feature.quiz.desc': 'Test your knowledge with instant feedback and detailed explanations.',
      'feature.progress': 'Track Your Progress',
      'feature.progress.desc': 'Monitor your learning journey with points, badges, and completion stats.',
      'feature.offline': 'Works Offline',
      'feature.offline.desc': 'All content is stored locally \u2014 learn anywhere, anytime.',
      'courses.title': 'Available Courses',
      'courses.lessons': 'items',
      'courses.points': 'pts',
      'courses.progress': 'Progress',
      'courses.start': 'Start Course',
      'courses.continue': 'Continue',
      'track.title': 'Your Progress',
      'track.totalPoints': 'Total Points',
      'track.courseProgress': 'Course Progress',
      'track.completedItems': 'Completed Items',
      'track.badges': 'Badges',
      'track.noBadges': 'Complete lessons and quizzes to earn badges!',
      'track.noCompleted': 'No completed items yet. Start learning!',
      'profile.title': 'Profile',
      'profile.level': 'Level',
      'profile.points': 'Points',
      'profile.badges': 'Badges',
      'profile.courses': 'Courses',
      'profile.startedCourses': 'Started Courses',
      'profile.nextLevel': 'pts to next level',
      'profile.viewFull': 'View Full Progress',
      'profile.reset': 'Reset Data',
      'profile.resetConfirm': 'Reset all progress? This cannot be undone.',
      'profile.noCourses': 'No courses started yet.',
      'viewer.markComplete': 'Mark as Completed',
      'viewer.completed': '\u2713 Completed',
      'viewer.submitQuiz': 'Submit Quiz',
      'viewer.submitted': '\u2713 Submitted',
      'viewer.next': 'Next',
      'viewer.prev': 'Previous',
      'viewer.score': 'Your Score',
      'viewer.passed': 'Passed!',
      'viewer.failed': 'Needs Improvement',
      'viewer.correct': 'Correct',
      'viewer.incorrect': 'Incorrect',
      'viewer.retry': 'Retry Quiz',
      'viewer.selectAnswer': 'Please answer all questions before submitting.',
      'toast.pointsEarned': 'points earned!',
      'toast.lessonComplete': 'Lesson marked as complete!',
      'toast.badgeEarned': 'New badge earned:',
      'toast.courseComplete': 'Congratulations! You completed the course!',
      'footer.copyright': '\u00A9 2026 Learnano. All rights reserved.',
      'home.features': 'Features',
      'home.exploreCourses': 'Explore our courses',
      'home.exploreArticles': 'Explore our articles',
      'home.getStarted': 'Get Started',
      'viewer.backToCourses': '\u2190 Back to Courses',
      'articles.title': 'Articles',
      'articles.read': 'Read Article',
      'reader.backToArticles': '\u2190 Back to Articles',
      'reader.markComplete': 'Mark as Completed',
    },
    ar: {
      'logo': '\u{1F4D6} Learnano',
      'nav.home': 'الرئيسية',
      'nav.courses': 'الكورسات',
      'nav.articles': 'المقالات',
      'nav.track': 'التتبع',
      'theme.system': 'تلقائي',
      'theme.light': 'فاتح',
      'theme.dark': 'داكن',
      'hero.title': 'تعلم العلوم التقنية',
      'hero.subtitle': 'دروس تفاعلية واختبارات وتمارين عملية في هندسة الحاسوب والأنظمة الرقمية.',
      'hero.cta': 'ابدأ التعلم',
      'features.title': 'لماذا تتعلم معنا؟',
      'feature.interactive': 'دروس تفاعلية',
      'feature.interactive.desc': 'محتوى جذاب مع مقتطفات برمجية ورسوم بيانية وأمثلة واقعية.',
      'feature.quiz': 'اختبارات ذكية',
      'feature.quiz.desc': 'اختبر معرفتك مع تغذية راجعة فورية وشروحات مفصلة.',
      'feature.progress': 'تتبع تقدمك',
      'feature.progress.desc': 'راقب رحلتك التعليمية بالنقاط والشارات وإحصائيات الإنجاز.',
      'feature.offline': 'يعمل بدون إنترنت',
      'feature.offline.desc': 'جميع المحتويات مخزنة محليًا — تعلم في أي وقت وأي مكان.',
      'courses.title': 'الكورسات المتاحة',
      'courses.lessons': 'عنصر',
      'courses.points': 'نقطة',
      'courses.progress': 'التقدم',
      'courses.start': 'ابدأ الكورس',
      'courses.continue': 'استمر',
      'track.title': 'تقدمك',
      'track.totalPoints': 'مجموع النقاط',
      'track.courseProgress': 'تقدم الكورس',
      'track.completedItems': 'العناصر المكتملة',
      'track.badges': 'الشارات',
      'track.noBadges': 'أكمل الدروس والاختبارات لتحصل على الشارات!',
      'track.noCompleted': 'لا توجد عناصر مكتملة بعد. ابدأ التعلم!',
      'profile.title': 'الملف الشخصي',
      'profile.level': 'المستوى',
      'profile.points': 'النقاط',
      'profile.badges': 'الشارات',
      'profile.courses': 'الكورسات',
      'profile.startedCourses': 'الكورسات التي بدأتها',
      'profile.nextLevel': 'نقطة للمستوى التالي',
      'profile.viewFull': 'عرض التقدم الكامل',
      'profile.reset': 'إعادة تعيين البيانات',
      'profile.resetConfirm': 'إعادة تعيين جميع البيانات؟ لا يمكن التراجع عن هذا.',
      'profile.noCourses': 'لم تبدأ أي مساق بعد.',
      'viewer.markComplete': 'تحديد كمكتمل',
      'viewer.completed': '\u2713 مكتمل',
      'viewer.submitQuiz': 'تقديم الاختبار',
      'viewer.submitted': '\u2713 تم التقديم',
      'viewer.next': 'التالي',
      'viewer.prev': 'السابق',
      'viewer.score': 'نتيجتك',
      'viewer.passed': 'نجاح!',
      'viewer.failed': 'بحاجة للتحسين',
      'viewer.correct': 'صحيح',
      'viewer.incorrect': 'خطأ',
      'viewer.retry': 'إعادة الاختبار',
      'viewer.selectAnswer': 'يرجى الإجابة على جميع الأسئلة قبل التقديم.',
      'toast.pointsEarned': 'نقطة مكتسبة!',
      'toast.lessonComplete': 'تم تحديد الدرس كمكتمل!',
      'toast.badgeEarned': 'تم ربح شارة جديدة:',
      'toast.courseComplete': 'تهانينا! لقد أكملت الكورس!',
      'footer.copyright': '\u00A9 2026 Learnano. جميع الحقوق محفوظة.',
      'home.features': 'المميزات',
      'home.exploreCourses': 'استكشف كورساتنا',
      'home.exploreArticles': 'استكشف مقالاتنا',
      'home.getStarted': 'ابدأ الآن',
      'viewer.backToCourses': '\u2190 العودة للمساقات',
      'articles.title': 'المقالات',
      'articles.read': 'اقرأ المقال',
      'reader.backToArticles': '\u2190 العودة للمقالات',
      'reader.markComplete': 'تحديد كمكتمل',
    }
  },

  init() {
    this._loadSettings();
    this._injectLayout();
    this._applyTheme();
    this._applyLanguage();
    this._highlightNav();
    this._initToastContainer();
    this._injectUserPanel();
    this._bindControls();
    if (typeof PageInit === 'function') PageInit();
  },

  _loadSettings() {
    try {
      const saved = localStorage.getItem('learnano_ui');
      if (saved) {
        const p = JSON.parse(saved);
        this._state.theme = p.theme || 'system';
        this._state.lang = p.lang || 'en';
      }
    } catch {}
  },

  _saveSettings() {
    try { localStorage.setItem('learnano_ui', JSON.stringify(this._state)); } catch {}
  },

  _injectLayout() {
    const app = document.getElementById('app');
    if (!app) return;

    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `
      <div class="header-inner">
        <a href="index.html" class="site-logo"><img src="learnano_img_1.png" alt="Learnano" class="logo-img"> Learnano</a>
        <nav class="nav-links" aria-label="Main navigation">
          <a href="index.html" data-page="home"><span data-i18n="nav.home">Home</span></a>
          <a href="courses.html" data-page="courses"><span data-i18n="nav.courses">Courses</span></a>
          <a href="articles.html" data-page="articles"><span data-i18n="nav.articles">Articles</span></a>
          <a href="track.html" data-page="track"><span data-i18n="nav.track">Track</span></a>
        </nav>
        <div class="header-controls">
          <div class="theme-toggle" role="radiogroup" aria-label="Theme">
            <button class="theme-btn" data-theme-value="system" title="System" aria-label="System theme" role="radio">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </button>
            <button class="theme-btn" data-theme-value="light" title="Light" aria-label="Light theme" role="radio">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            </button>
            <button class="theme-btn" data-theme-value="dark" title="Dark" aria-label="Dark theme" role="radio">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            </button>
          </div>
          <button id="lang-btn" class="lang-btn" aria-label="Toggle language">EN</button>
          <button id="user-btn" class="btn-ghost btn-icon" aria-label="Profile">👤</button>
        </div>
      </div>
    `;

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `<span data-i18n="footer.copyright">&copy; 2026 Learnano. All rights reserved.</span>`;

    const main = app.querySelector('main');
    if (main) {
      app.insertBefore(header, main);
    } else {
      app.prepend(header);
    }
    app.appendChild(footer);
  },

  _injectUserPanel() {
    if (document.getElementById('user-panel')) return;
    const overlay = document.createElement('div');
    overlay.className = 'panel-overlay';
    overlay.id = 'user-panel-overlay';
    document.body.appendChild(overlay);

    const panel = document.createElement('div');
    panel.className = 'user-panel';
    panel.id = 'user-panel';
    panel.innerHTML = `
      <div class="panel-header">
        <span class="panel-title" data-i18n="profile.title">Profile</span>
        <button id="panel-close" class="btn-ghost btn-icon">&times;</button>
      </div>
      <div class="panel-body" id="panel-body"></div>
      <div class="panel-footer">
        <a href="track.html" class="btn btn-outline btn-sm" data-i18n="profile.viewFull">View Full Progress</a>
        <button id="btn-reset-data" class="btn btn-outline btn-sm" style="color:var(--error)" data-i18n="profile.reset">Reset Data</button>
      </div>
    `;
    document.body.appendChild(panel);
  },

  refreshUserPanel() {
    const body = document.getElementById('panel-body');
    if (!body) return;
    const lang = this._state.lang;
    const points = State.getTotalPoints();
    const lv = State.getLevel(points);
    const lvProgress = State.getLevelProgress(points);
    const nextPts = State.getNextLevelPoints(points);
    const badges = State.getBadges();
    const allBadges = State.getBadgeDefs();
    const completedLessons = State.getCompletedLessons().length;

    body.innerHTML = `
      <div class="panel-avatar">👤</div>

      <div class="panel-level-section">
        <div class="panel-level-badge">${this.t('profile.level')} ${lv.level}</div>
        <div class="panel-level-label">${lv.label}</div>
        <div class="progress-bar" style="margin-top:0.5rem">
          <div class="progress-fill" style="width:${lvProgress}%"></div>
        </div>
        <div class="panel-level-next">${nextPts} ${this.t('profile.nextLevel')}</div>
      </div>

      <div class="panel-stats">
        <div class="panel-stat">
          <span class="panel-stat-value">${points}</span>
          <span class="panel-stat-label">${this.t('profile.points')}</span>
        </div>
        <div class="panel-stat">
          <span class="panel-stat-value">${badges.length}</span>
          <span class="panel-stat-label">${this.t('profile.badges')}</span>
        </div>
        <div class="panel-stat">
          <span class="panel-stat-value">${completedLessons}</span>
          <span class="panel-stat-label">${this.t('profile.courses')}</span>
        </div>
      </div>

      <div class="panel-section">
        <h4>${this.t('profile.badges')}</h4>
        <div class="panel-badges">
          ${badges.length === 0
            ? `<span style="color:var(--text-muted);font-size:0.85rem">${this.t('track.noBadges')}</span>`
            : badges.map(b => `
              <div class="badge-item">
                <span style="font-size:1.3rem">${b.icon}</span>
                <div>
                  <strong>${b.title[lang] || b.title.en}</strong>
                </div>
              </div>
            `).join('')}
        </div>
      </div>

      <div class="panel-section">
        <h4>${this.t('profile.startedCourses')}</h4>
        <div id="panel-started-courses">
          <div class="loading-spinner"></div>
        </div>
      </div>
    `;

    this._loadStartedCourses();
  },

  async _loadStartedCourses() {
    const container = document.getElementById('panel-started-courses');
    if (!container) return;
    try {
      const courses = await Loader.loadJSON('https://raw.githubusercontent.com/AbdelkaderHazerchi/Learnano/refs/heads/main/data/courses.json');
      const modules = await Promise.all(courses.map(async c => {
        try { return await Loader.loadJSON(`https://raw.githubusercontent.com/AbdelkaderHazerchi/Learnano/refs/heads/main/data/modules/${c.moduleFile}`); }
        catch { return null; }
      }));
      const started = State.getStartedCourses(courses, modules);
      if (started.length === 0) {
        container.innerHTML = `<span style="color:var(--text-muted);font-size:0.85rem">${this.t('profile.noCourses')}</span>`;
        return;
      }
      container.innerHTML = '';
      started.forEach(c => {
        const mod = modules.find(m => m && m.courseId === c.id);
        const total = mod ? mod.items.length : 1;
        const prog = State.getCourseProgress(c.id, total);
        const title = c.title[this._state.lang] || c.title.en;
        const div = document.createElement('div');
        div.className = 'panel-course-item';
        div.innerHTML = `
          <div style="display:flex;justify-content:space-between;margin-bottom:0.25rem">
            <span>${c.icon || '📘'} ${title}</span>
            <span style="font-size:0.8rem;color:var(--text-muted)">${prog.pct}%</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${prog.pct}%"></div></div>
        `;
        container.appendChild(div);
      });
    } catch {
      container.innerHTML = `<span style="color:var(--text-muted);font-size:0.85rem">${this.t('profile.noCourses')}</span>`;
    }
  },

  _applyTheme() {
    const html = document.documentElement;
    html.setAttribute('data-theme', this._state.theme);
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.themeValue === this._state.theme);
    });
  },

  _applyLanguage() {
    const lang = this._state.lang;
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const btn = document.getElementById('lang-btn');
    if (btn) btn.textContent = lang === 'en' ? 'EN' : 'العربية';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const t = this._translations[lang] && this._translations[lang][key];
      if (t) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = t;
        } else {
          el.textContent = t;
        }
      }
    });
  },

  _highlightNav() {
    const page = document.body.dataset.page;
    if (!page) return;
    document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
      a.classList.toggle('active', a.dataset.page === page);
    });
  },

  _bindControls() {
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', () => this.setTheme(btn.dataset.themeValue));
    });

    const langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.addEventListener('click', () => this.setLanguage(this._state.lang === 'en' ? 'ar' : 'en'));

    const userBtn = document.getElementById('user-btn');
    const panel = document.getElementById('user-panel');
    const overlay = document.getElementById('user-panel-overlay');
    if (userBtn && panel && overlay) {
      userBtn.addEventListener('click', () => {
        panel.classList.toggle('open');
        overlay.classList.toggle('open');
        if (panel.classList.contains('open')) this.refreshUserPanel();
      });
      const close = () => {
        panel.classList.remove('open');
        overlay.classList.remove('open');
      };
      overlay.addEventListener('click', close);
      const closeBtn = document.getElementById('panel-close');
      if (closeBtn) closeBtn.addEventListener('click', close);
    }

    const resetBtn = document.getElementById('btn-reset-data');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm(this.t('profile.resetConfirm'))) {
          State.reset();
          this.refreshUserPanel();
          this.showToast('Data reset.', 'warning');
        }
      });
    }
  },

  setTheme(theme) {
    this._state.theme = theme;
    this._saveSettings();
    this._applyTheme();
  },

  setLanguage(lang) {
    this._state.lang = lang;
    this._saveSettings();
    location.reload();
  },

  t(key) {
    return (this._translations[this._state.lang] && this._translations[this._state.lang][key]) || key;
  },

  _initToastContainer() {
    if (!document.querySelector('.toast-container')) {
      const c = document.createElement('div');
      c.className = 'toast-container';
      document.body.appendChild(c);
    }
  },

  showToast(message, type, duration = 4000) {
    const c = document.querySelector('.toast-container');
    if (!c) return;
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const t = document.createElement('div');
    t.className = 'toast animate-slide-up';
    t.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
    c.appendChild(t);
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateY(-10px)';
      t.style.transition = 'opacity 0.3s, transform 0.3s';
      setTimeout(() => t.remove(), 300);
    }, duration);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
