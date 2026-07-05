/**
 * core.js — State Management, LocalStorage Sync, Points & Badges
 */

const State = {
  _ns: 'learnano',

  _defaults: {
    totalPoints: 0,
    completedLessons: [],
    quizScores: [],
    completedArticles: [],
    badges: []
  },

  _data: null,

  init() {
    try {
      const raw = localStorage.getItem(this._ns);
      this._data = raw ? { ...this._defaults, ...JSON.parse(raw) } : { ...this._defaults };
    } catch {
      this._data = { ...this._defaults };
    }
    this._save();
    return this;
  },

  _save() {
    try { localStorage.setItem(this._ns, JSON.stringify(this._data)); } catch {}
  },

  completeLesson(courseId, lessonId, points) {
    if (this.isLessonCompleted(courseId, lessonId)) return false;
    this._data.completedLessons.push({ courseId, lessonId, points, ts: Date.now() });
    this._data.totalPoints += points;
    this._save();
    return true;
  },

  submitQuiz(courseId, quizId, score, passed, points) {
    const existing = this._data.quizScores.find(q => q.courseId === courseId && q.quizId === quizId);
    if (existing && existing.passed) return { newPoints: 0, already: true };

    const earn = passed ? points : 0;
    if (existing) {
      existing.score = Math.max(existing.score, score);
      existing.passed = existing.passed || passed;
      existing.earned = Math.max(existing.earned, earn);
      existing.ts = Date.now();
    } else {
      this._data.quizScores.push({ courseId, quizId, score, passed, earned: earn, ts: Date.now() });
    }

    if (passed && !(existing && existing.passed)) this._data.totalPoints += points;
    this._save();
    return { newPoints: earn, already: false };
  },

  _badges: [
    { id: 'first-step', icon: '🎯', title: { en: 'First Step', ar: 'الخطوة الأولى' }, desc: { en: 'Complete your first lesson', ar: 'أكمل أول درس لك' } },
    { id: 'quiz-master', icon: '🧠', title: { en: 'Quiz Master', ar: 'سيد الاختبارات' }, desc: { en: 'Score 100% on any quiz', ar: 'احصل على درجة كاملة في أي اختبار' } },
    { id: 'course-graduate', icon: '🎓', title: { en: 'Course Graduate', ar: 'خريج مساق' }, desc: { en: 'Complete all items in a course', ar: 'أكمل جميع العناصر في مساق' } }
  ],

  checkBadges(courseData) {
    const earned = this._data.badges.map(b => b.id);

    if (!earned.includes('first-step') && this._data.completedLessons.length >= 1) {
      this._award('first-step');
    }

    if (!earned.includes('quiz-master') && this._data.quizScores.some(q => q.score === 1)) {
      this._award('quiz-master');
    }

    if (!earned.includes('course-graduate') && courseData) {
      const total = courseData.items.length;
      const done = this._data.completedLessons.filter(l => l.courseId === courseData.courseId).length
        + this._data.quizScores.filter(q => q.courseId === courseData.courseId && q.passed).length;
      if (done >= total) this._award('course-graduate');
    }
  },

  _award(id) {
    const def = this._badges.find(b => b.id === id);
    if (!def || this._data.badges.find(b => b.id === id)) return;
    this._data.badges.push({ ...def, earnedAt: Date.now() });
    this._save();
  },

  getBadges() { return this._data.badges; },
  hasBadge(id) { return this._data.badges.some(b => b.id === id); },
  getBadgeDefs() { return this._badges; },

  isLessonCompleted(courseId, lessonId) {
    return this._data.completedLessons.some(l => l.courseId === courseId && l.lessonId === lessonId);
  },

  isQuizPassed(courseId, quizId) {
    const q = this._data.quizScores.find(s => s.courseId === courseId && s.quizId === quizId);
    return q ? q.passed : false;
  },

  getQuizScore(courseId, quizId) {
    const q = this._data.quizScores.find(s => s.courseId === courseId && s.quizId === quizId);
    return q ? q.score : null;
  },

  getCourseProgress(courseId, totalItems) {
    const completed = this._data.completedLessons.filter(l => l.courseId === courseId).length;
    const passed = this._data.quizScores.filter(q => q.courseId === courseId && q.passed).length;
    const done = completed + passed;
    return { completed: done, total: totalItems, pct: totalItems > 0 ? Math.round((done / totalItems) * 100) : 0 };
  },

  completeArticle(articleId, points) {
    if (this.isArticleCompleted(articleId)) return false;
    this._data.completedArticles.push({ articleId, points, ts: Date.now() });
    this._data.totalPoints += points;
    this._save();
    return true;
  },

  isArticleCompleted(articleId) {
    return this._data.completedArticles.some(a => a.articleId === articleId);
  },

  getCompletedArticles() { return this._data.completedArticles; },

  getTotalPoints() { return this._data.totalPoints; },
  getCompletedLessons() { return this._data.completedLessons; },
  getQuizScores() { return this._data.quizScores; },

  getLevel(points) {
    if (points >= 5000) return { level: 10, label: 'Grand Master' };
    if (points >= 3000) return { level: 9, label: 'Expert' };
    if (points >= 2000) return { level: 8, label: 'Specialist' };
    if (points >= 1200) return { level: 7, label: 'Advanced' };
    if (points >= 800) return { level: 6, label: 'Proficient' };
    if (points >= 500) return { level: 5, label: 'Competent' };
    if (points >= 300) return { level: 4, label: 'Intermediate' };
    if (points >= 150) return { level: 3, label: 'Apprentice' };
    if (points >= 50) return { level: 2, label: 'Novice' };
    return { level: 1, label: 'Beginner' };
  },

  getLevelProgress(points) {
    const tiers = [0, 50, 150, 300, 500, 800, 1200, 2000, 3000, 5000];
    const level = this.getLevel(points).level;
    const floor = tiers[level - 1];
    const ceil = tiers[level] || floor + 2000;
    const progress = Math.min(((points - floor) / (ceil - floor)) * 100, 100);
    return Math.round(progress);
  },

  getNextLevelPoints(points) {
    const tiers = [0, 50, 150, 300, 500, 800, 1200, 2000, 3000, 5000];
    const level = this.getLevel(points).level;
    const next = tiers[level];
    return next ? next - points : 0;
  },

  getStartedCourses(courses, modules) {
    return courses.filter(c => {
      const mod = modules.find(m => m && m.courseId === c.id);
      const total = mod ? mod.items.length : 1;
      const prog = this.getCourseProgress(c.id, total);
      return prog.completed > 0;
    });
  },

  reset() { this._data = { ...this._defaults }; this._save(); }
};

State.init();
