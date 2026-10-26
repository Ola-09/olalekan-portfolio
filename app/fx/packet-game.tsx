"use client";

import { useEffect, useRef, useState } from "react";

type Pk = { x: number; y: number; vx: number; vy: number; bad: boolean; label: string };
type Sp = { x: number; y: number; vx: number; vy: number; life: number; c: string };

const BAD = ["XSS", "SQLi", "CMDi"];
const OK = ["GET", "POST", "PUT", "200"];
const DURATION = 60;
const KEY = "oa-packet-best";
const RED = "#ff6b5c";
const AMBER = "#ffb347";
const TAU = Math.PI * 2;
const FRESH = { score: 0, hp: 100, left: DURATION, combo: 1 };

export default function PacketGame() {
  const box = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"idle" | "play" | "over">("idle");
  const [run, setRun] = useState(0);
  const [hud, setHud] = useState(FRESH);
  const [res, setRes] = useState({ score: 0, won: false, blocked: 0, leaked: 0, wrong: 0 });
  const [best, setBest] = useState(0);

  useEffect(() => { try { setBest(Number(localStorage.getItem(KEY)) || 0); } catch {} }, []);

  useEffect(() => {
    if (phase !== "play") return;
    const canvas = cv.current!, wrap = box.current!;
    const ctx = canvas.getContext("2d")!;
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#d9ff62";
    let w = 0, h = 0;
    const size = () => {
      const r = wrap.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      w = r.width; h = r.height; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const ro = new ResizeObserver(size); ro.observe(wrap);

    let inView = true;
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; }, { threshold: 0.35 });
    io.observe(wrap);

    let score = 0, hp = 100, combo = 1, streak = 0, blocked = 0, leaked = 0, wrong = 0;
    let t = 0, spawn = 0.5, shake = 0, hudAt = 0, last = performance.now(), raf = 0;
    const pk: Pk[] = [], sp: Sp[] = [];
    const cx = () => w / 2, cy = () => h / 2;

    const burst = (x: number, y: number, c: string, n: number) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * TAU, s = 40 + Math.random() * 140;
        sp.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0.5 + Math.random() * 0.4, c });
      }
    };
    const spawnOne = () => {
      const side = Math.floor(Math.random() * 4), m = 28;
      const x = side === 0 ? Math.random() * w : side === 2 ? Math.random() * w : side === 1 ? w + m : -m;
      const y = side === 1 ? Math.random() * h : side === 3 ? Math.random() * h : side === 0 ? -m : h + m;
      const bad = Math.random() < Math.min(0.72, 0.55 + t / 300);
      const speed = (48 + Math.min(t, DURATION) * 1.3) * (0.85 + Math.random() * 0.35);
      const a = Math.atan2(cy() - y, cx() - x), pool = bad ? BAD : OK;
      pk.push({ x, y, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, bad, label: pool[Math.floor(Math.random() * pool.length)] });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = accent; ctx.lineWidth = 1;
      for (const r of [70, 130, 200]) { ctx.globalAlpha = 0.07; ctx.beginPath(); ctx.arc(cx(), cy(), r, 0, TAU); ctx.stroke(); }
      const ox = (Math.random() - 0.5) * shake * 8, oy = (Math.random() - 0.5) * shake * 8;
      const tone = hp > 55 ? accent : hp > 25 ? AMBER : RED;
      ctx.globalAlpha = 1; ctx.fillStyle = "#0e120c"; ctx.strokeStyle = tone; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx() + ox, cy() + oy, 26, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.lineWidth = 3; ctx.globalAlpha = 0.9;
      ctx.beginPath(); ctx.arc(cx() + ox, cy() + oy, 33, -Math.PI / 2, -Math.PI / 2 + TAU * (hp / 100)); ctx.stroke();
      ctx.globalAlpha = 1; ctx.fillStyle = "#f1f2e9"; ctx.font = "600 13px Manrope, sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("OA", cx() + ox, cy() + oy);
      ctx.font = '500 10px "DM Mono", monospace';
      for (const p of pk) {
        const col = p.bad ? RED : accent, wd = ctx.measureText(p.label).width + 16;
        ctx.globalAlpha = 0.25; ctx.strokeStyle = col; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.vx * 0.18, p.y - p.vy * 0.18); ctx.stroke();
        ctx.globalAlpha = 1; ctx.fillStyle = "#12170f"; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.roundRect(p.x - wd / 2, p.y - 11, wd, 22, p.bad ? 3 : 11); ctx.fill(); ctx.stroke();
        ctx.fillStyle = col; ctx.fillText(p.label, p.x, p.y + 0.5);
      }
      for (const s of sp) { ctx.globalAlpha = Math.max(0, s.life * 1.6); ctx.fillStyle = s.c; ctx.fillRect(s.x - 1.5, s.y - 1.5, 3, 3); }
      ctx.globalAlpha = 1;
    };

    const finish = (won: boolean) => {
      setHud({ score, hp, left: Math.max(0, Math.ceil(DURATION - t)), combo });
      setRes({ score, won, blocked, leaked, wrong });
      setBest((b) => { const nb = Math.max(b, score); try { localStorage.setItem(KEY, String(nb)); } catch {} return nb; });
      setPhase("over");
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (!inView) { raf = requestAnimationFrame(loop); return; }
      t += dt; spawn -= dt;
      if (spawn <= 0) { spawnOne(); spawn = Math.max(0.38, 1.15 - t * 0.013) * (0.8 + Math.random() * 0.4); }
      for (let i = pk.length - 1; i >= 0; i--) {
        const p = pk[i];
        p.x += p.vx * dt; p.y += p.vy * dt;
        if (Math.hypot(p.x - cx(), p.y - cy()) >= 32) continue;
        pk.splice(i, 1);
        if (p.bad) { hp -= 12; combo = 1; streak = 0; leaked++; shake = 1; burst(p.x, p.y, RED, 10); }
        else { score += 2; burst(p.x, p.y, accent, 4); }
      }
      for (let i = sp.length - 1; i >= 0; i--) {
        const s = sp[i]; s.x += s.vx * dt; s.y += s.vy * dt; s.vx *= 0.94; s.vy *= 0.94; s.life -= dt;
        if (s.life <= 0) sp.splice(i, 1);
      }
      shake = Math.max(0, shake - dt * 3);
      draw();
      if (hp <= 0) { hp = 0; return finish(false); }
      if (t >= DURATION) return finish(true);
      if (now - hudAt > 120) { hudAt = now; setHud({ score, hp, left: Math.max(0, Math.ceil(DURATION - t)), combo }); }
      raf = requestAnimationFrame(loop);
    };

    const onDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      let bi = -1, bd = Infinity;
      pk.forEach((p, i) => { const d = Math.hypot(p.x - x, p.y - y); if (d < bd) { bd = d; bi = i; } });
      if (bi < 0 || bd > 34) return;
      const p = pk.splice(bi, 1)[0];
      if (p.bad) {
        streak++; combo = Math.min(5, 1 + Math.floor(streak / 4)); score += 10 * combo; blocked++;
        burst(p.x, p.y, RED, 14);
      } else {
        score = Math.max(0, score - 25); combo = 1; streak = 0; wrong++;
        burst(p.x, p.y, AMBER, 8);
      }
    };
    canvas.addEventListener("pointerdown", onDown);
    raf = requestAnimationFrame(loop);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); canvas.removeEventListener("pointerdown", onDown); };
  }, [phase, run]);

  const start = () => { setHud(FRESH); setPhase("play"); setRun((r) => r + 1); };

  return <div className="game-shell">
    <div className="game-hud mono" aria-live="off">
      <span>INTEGRITY <b>{hud.hp}%</b></span><span>SCORE <b>{hud.score}</b></span><span>COMBO <b>x{hud.combo}</b></span><span>TIME <b>{hud.left}s</b></span>
    </div>
    <div className="game-stage" ref={box}>
      <canvas ref={cv} aria-hidden="true" />
      {phase === "idle" && <div className="game-overlay">
        <h3>Packet filter</h3>
        <p>Traffic is heading for the core. Click or tap hostile packets to block them. Clean requests should pass through. Hold the line for 60 seconds.</p>
        <button className="btn btn-primary" onClick={start}>Start</button>
        {best > 0 && <span className="tiny-muted">BEST {best}</span>}
      </div>}
      {phase === "over" && <div className="game-overlay">
        <h3>{res.won ? "Perimeter held" : "Core breached"}</h3>
        <div className="game-stats">
          <div><strong>{res.score}</strong>SCORE</div><div><strong>{res.blocked}</strong>BLOCKED</div>
          <div><strong>{res.leaked}</strong>LEAKED</div><div><strong>{res.wrong}</strong>FALSE BLOCKS</div><div><strong>{best}</strong>BEST</div>
        </div>
        <button className="btn btn-primary" onClick={start}>Play again</button>
      </div>}
    </div>
    <div className="game-legend mono"><span><i className="lg-bad" />Hostile: XSS, SQLi, CMDi. Block these.</span><span><i className="lg-ok" />Clean traffic. Let it through.</span></div>
  </div>;
}
