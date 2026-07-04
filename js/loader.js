/**
 * loader.js — Universal data loader.
 * Uses fetch() when served via HTTP, falls back to embedded DATA
 * when opened via file:// protocol (where CORS blocks fetch).
 */

const Loader = {
  _onFileProtocol: location.protocol === 'file:',

  loadJSON(path) {
    if (this._onFileProtocol) {
      return this._loadFromData(path);
    }
    return this._loadFromFetch(path);
  },

  async _loadFromFetch(path) {
    const r = await fetch(path);
    if (!r.ok) throw new Error(`HTTP ${r.status}: ${path}`);
    return r.json();
  },

  async _loadFromData(path) {
    path = path.replace(/^data\//, '');

    // Map paths to DATA keys
    if (path === 'courses.json') {
      return DATA.courses;
    }

    const match = path.match(/modules\/(.+)\.json$/);
    if (match) {
      const key = match[1];
      if (DATA.modules[key]) {
        return DATA.modules[key];
      }
    }

    throw new Error(`No embedded data for: ${path}`);
  }
};
