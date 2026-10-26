export function runMatrix(ms = 3600) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const c = document.createElement("canvas");
  c.setAttribute("aria-hidden", "true");
  c.style.cssText = "position:fixed;inset:0;z-index:90;pointer-events:none;opacity:0;transition:opacity .4s";
  document.body.appendChild(c);
  const ctx = c.getContext("2d")!;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const W = innerWidth, H = innerHeight, size = 16;
  c.width = W * dpr; c.height = H * dpr; ctx.scale(dpr, dpr);
  const drops = Array.from({ length: Math.ceil(W / size) }, () => Math.random() * -40);
  const chars = "01<>/{}#$%&*+=";
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#d9ff62";
  requestAnimationFrame(() => { c.style.opacity = "1"; });
  const t0 = performance.now();
  const tick = (now: number) => {
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0,.12)"; ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = accent; ctx.font = `${size}px "DM Mono", monospace`;
    drops.forEach((d, i) => {
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * size, d * size);
      drops[i] = d * size > H && Math.random() > 0.975 ? 0 : d + 0.6;
    });
    if (now - t0 < ms) requestAnimationFrame(tick);
    else { c.style.opacity = "0"; setTimeout(() => c.remove(), 450); }
  };
  requestAnimationFrame(tick);
  return true;
}
