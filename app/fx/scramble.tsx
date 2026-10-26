"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

export default function Scramble({ text, delay = 0, duration = 900 }: { text: string; delay?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / duration);
      el.textContent = [...text].map((c, i) => (c === " " || i / text.length < p ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join("");
      if (p < 1) raf = requestAnimationFrame(tick); else el.textContent = text;
    };
    const timer = setTimeout(() => { raf = requestAnimationFrame(tick); }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); el.textContent = text; };
  }, [text, delay, duration]);

  return <><span className="sr-only">{text}</span><span ref={ref} aria-hidden="true">{text}</span></>;
}
