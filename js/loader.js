/**
 * loader.js — Fetches JSON data from the server via HTTP.
 * Use a local HTTP server (e.g. `python -m http.server`) to run the site.
 */

const Loader = {
  async loadJSON(path) {
    const r = await fetch(path);
    if (!r.ok) throw new Error(`HTTP ${r.status}: ${path}`);
    return r.json();
  }
};
