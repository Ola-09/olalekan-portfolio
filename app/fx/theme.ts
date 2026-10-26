export const THEMES: Record<string, [string, string]> = {
  lime: ["217,255,98", "#d9ff62"],
  cyan: ["98,230,255", "#62e6ff"],
  amber: ["255,179,71", "#ffb347"],
  violet: ["184,162,255", "#b8a2ff"],
  rose: ["255,122,156", "#ff7a9c"],
};
const KEY = "oa-theme";

export function applyTheme(name: string, persist = true) {
  const t = THEMES[name];
  if (!t) return false;
  const s = document.documentElement.style;
  s.setProperty("--accent", t[1]);
  s.setProperty("--accent-rgb", t[0]);
  s.setProperty("--accent-soft", `color-mix(in srgb, ${t[1]} 68%, #000)`);
  try { if (persist) localStorage.setItem(KEY, name); } catch {}
  window.dispatchEvent(new Event("themechange"));
  return true;
}

export function loadTheme() {
  try { const n = localStorage.getItem(KEY); if (n) applyTheme(n, false); } catch {}
}

export function currentTheme() {
  try { return localStorage.getItem(KEY) ?? "lime"; } catch { return "lime"; }
}
