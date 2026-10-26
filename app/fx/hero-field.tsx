"use client";

import { useEffect, useRef, useState } from "react";

type N = { x: number; y: number; vx: number; vy: number; r: number; hub?: string; hx?: number; hy?: number };
type Pulse = { from: number; to: number; t: number; hops: number };

const HUBS = ["AI/ML", "SYSTEMS", "SECURITY", "WEB"];
const TAU = Math.PI * 2;

export default function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, frame = 0, last = 0, nextAuto = 1400;
    let running = false, visible = true;
    let accent = "#d9ff62";
    let nodes: N[] = [];
    let pulses: Pulse[] = [];
    let drag: N | null = null;
    let hover: N | null = null;
    const mouse = { x: -999, y: -999, on: false };

    const reach = (n: N) => (n.hub ? 150 : 95);
    const hubAt = (x: number, y: number) => nodes.find((n) => n.hub && Math.hypot(n.x - x, n.y - y) < 26) ?? null;
    const near = (i: number) => {
      const a = nodes[i], out: number[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const b = nodes[j];
        if (Math.hypot(a.x - b.x, a.y - b.y) < Math.max(reach(a), reach(b))) out.push(j);
      }
      return out;
    };
    const emit = (i: number, hops: number) => {
      const n = near(i);
      if (n.length) pulses.push({ from: i, to: n[Math.floor(Math.random() * n.length)], t: 0, hops });
    };

    const seed = () => {
      const count = Math.round(Math.min(70, (w * h) / 5200));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: 1 + Math.random() * 1.4,
      }));
      HUBS.forEach((label, i) => {
        const a = (i / HUBS.length) * TAU + 0.6;
        const hx = w / 2 + Math.cos(a) * w * 0.3, hy = h / 2 + Math.sin(a) * h * 0.28;
        nodes.push({ x: hx, y: hy, vx: 0, vy: 0, r: 4, hub: label, hx, hy });
      });
      pulses = [];
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw(0);
    };

    const step = (dt: number) => {
      const k = dt / 16.7;
      const hubs = nodes.filter((n) => n.hub);
      for (const n of nodes) {
        if (n.hub) {
          if (drag !== n) {
            n.vx += (n.hx! - n.x) * 0.03 * k; n.vy += (n.hy! - n.y) * 0.03 * k;
            n.vx *= 0.86; n.vy *= 0.86;
            n.x += n.vx * k; n.y += n.vy * k;
          }
          continue;
        }
        if (mouse.on) {
          const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy);
          if (d < 110 && d > 0) { const f = (1 - d / 110) * 0.18 * k; n.vx += (dx / d) * f; n.vy += (dy / d) * f; }
        }
        for (const hb of hubs) {
          const dx = hb.x - n.x, dy = hb.y - n.y, d = Math.hypot(dx, dy);
          if (d < 130 && d > 0) {
            const f = d < 24 ? -0.03 : (1 - d / 130) * 0.012;
            n.vx += (dx / d) * f * k; n.vy += (dy / d) * f * k;
          }
        }
        n.vx *= 0.99; n.vy *= 0.99;
        const sp = Math.hypot(n.vx, n.vy);
        if (sp > 1.2) { n.vx *= 1.2 / sp; n.vy *= 1.2 / sp; }
        else if (sp < 0.08) { n.vx += (Math.random() - 0.5) * 0.02; n.vy += (Math.random() - 0.5) * 0.02; }
        n.x += n.vx * k; n.y += n.vy * k;
        if (n.x < -10) n.x = w + 10; else if (n.x > w + 10) n.x = -10;
        if (n.y < -10) n.y = h + 10; else if (n.y > h + 10) n.y = -10;
      }
      nextAuto -= dt;
      if (nextAuto < 0) {
        emit(nodes.length - HUBS.length + Math.floor(Math.random() * HUBS.length), 6);
        nextAuto = 1800 + Math.random() * 1800;
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += dt * 0.0024;
        if (p.t < 1) continue;
        p.hops--;
        const opts = p.hops > 0 ? near(p.to).filter((j) => j !== p.from) : [];
        if (!opts.length) { pulses.splice(i, 1); continue; }
        p.from = p.to; p.to = opts[Math.floor(Math.random() * opts.length)]; p.t = 0;
      }
    };

    const draw = (now: number) => {
      if (frame++ % 20 === 0) accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || accent;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1; ctx.strokeStyle = accent;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j], R = Math.max(reach(a), reach(b));
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d >= R) continue;
          ctx.globalAlpha = (1 - d / R) * (a.hub || b.hub ? 0.5 : 0.26);
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      ctx.fillStyle = accent;
      for (const n of nodes) {
        if (n.hub) continue;
        ctx.globalAlpha = 0.55; ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, TAU); ctx.fill();
      }
      for (const p of pulses) {
        const a = nodes[p.from], b = nodes[p.to];
        const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
        ctx.globalAlpha = 0.22; ctx.beginPath(); ctx.arc(x, y, 8, 0, TAU); ctx.fill();
        ctx.globalAlpha = 1; ctx.beginPath(); ctx.arc(x, y, 2.6, 0, TAU); ctx.fill();
      }
      ctx.font = '9px "DM Mono", monospace'; ctx.textBaseline = "alphabetic";
      nodes.forEach((n, i) => {
        if (!n.hub) return;
        const active = hover === n || drag === n;
        ctx.globalAlpha = 1; ctx.fillStyle = "#0e120c"; ctx.strokeStyle = accent; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(n.x, n.y, 6, 0, TAU); ctx.fill(); ctx.stroke();
        ctx.globalAlpha = 0.25 + 0.2 * Math.sin(now / 500 + i) + (active ? 0.25 : 0);
        ctx.beginPath(); ctx.arc(n.x, n.y, active ? 16 : 12, 0, TAU); ctx.stroke();
        const left = n.x > w * 0.55;
        ctx.globalAlpha = active ? 1 : 0.78; ctx.fillStyle = "#dbe4d1"; ctx.textAlign = left ? "right" : "left";
        ctx.fillText(n.hub!, n.x + (left ? -18 : 18), n.y + 3);
      });
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      if (!running) return;
      const dt = Math.min(50, now - (last || now));
      last = now;
      step(dt); draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (reduce || running || !visible || document.hidden) return; running = true; last = 0; raf = requestAnimationFrame(loop); };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true;
      if (drag) { drag.x = mouse.x; drag.y = mouse.y; drag.vx = drag.vy = 0; }
      hover = drag ?? hubAt(mouse.x, mouse.y);
      canvas.style.cursor = drag ? "grabbing" : hover ? "grab" : "crosshair";
      if (reduce) draw(0);
    };
    const onDown = (e: PointerEvent) => {
      onMove(e); setTouched(true);
      const hb = hubAt(mouse.x, mouse.y);
      if (hb) { drag = hb; canvas.setPointerCapture(e.pointerId); return; }
      let best = -1, bd = Infinity;
      nodes.forEach((n, i) => { const d = Math.hypot(n.x - mouse.x, n.y - mouse.y); if (d < bd) { bd = d; best = i; } });
      if (best >= 0) emit(best, 8);
    };
    const onUp = () => {
      if (drag && reduce) { drag.x = drag.hx!; drag.y = drag.hy!; draw(0); }
      drag = null; hover = null; canvas.style.cursor = "crosshair";
    };
    const onLeave = () => { mouse.on = false; if (!drag) hover = null; };
    const onVis = () => (document.hidden ? stop() : start());
    const onTheme = () => { accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || accent; if (reduce) draw(0); };

    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; visible ? start() : stop(); });
    io.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("themechange", onTheme);
    start();

    return () => {
      stop(); ro.disconnect(); io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("themechange", onTheme);
    };
  }, []);

  return <>
    <canvas ref={ref} role="img" aria-label="Interactive network of connected systems. Drag the labelled nodes or click to send a packet." />
    <span className={`field-hint mono ${touched ? "is-gone" : ""}`}>DRAG A NODE · CLICK TO SEND A PACKET</span>
  </>;
}
