"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { loadTheme } from "./theme";

export default function Interactions() {
  const path = usePathname();

  useEffect(() => { loadTheme(); }, []);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const off: (() => void)[] = [];
    const on = <T extends EventTarget>(t: T, ev: string, fn: (e: never) => void, opts?: AddEventListenerOptions) => {
      t.addEventListener(ev, fn as EventListener, opts);
      off.push(() => t.removeEventListener(ev, fn as EventListener));
    };
    root.classList.add("fx-ready");

    // scroll progress
    const bar = document.getElementById("scroll-progress");
    let ticking = false;
    const progress = () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const max = root.scrollHeight - innerHeight;
        if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
        ticking = false;
      });
    };
    on(window, "scroll", progress, { passive: true }); progress();

    // nav state
    const links = [...document.querySelectorAll<HTMLAnchorElement>(".nav-links a")];
    const mark = (href: string | null) => links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === href));
    if (path === "/resume") mark("/resume");
    else if (path === "/") {
      mark(null);
      const secs = ["about", "projects", "contact"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      const spy = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) mark(`/#${e.target.id}`); }), { rootMargin: "-40% 0px -55% 0px" });
      secs.forEach((s) => spy.observe(s));
      off.push(() => spy.disconnect());
    } else mark(null);

    // heading reveal
    const reveals = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (reduce) reveals.forEach((el) => el.classList.add("is-in"));
    else {
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: 0.2 });
      reveals.forEach((el) => io.observe(el));
      off.push(() => io.disconnect());
    }

    if (fine && !reduce) {
      // cursor glow
      const glow = document.getElementById("cursor-glow");
      if (glow) {
        let x = 0, y = 0, raf = 0;
        on(window, "pointermove", (e: PointerEvent) => {
          x = e.clientX; y = e.clientY;
          if (!raf) raf = requestAnimationFrame(() => { raf = 0; glow.style.transform = `translate(${x}px,${y}px)`; glow.style.opacity = "1"; });
        }, { passive: true });
        on(document.documentElement, "pointerleave", () => { glow.style.opacity = "0"; });
      }

      // spotlight + tilt
      document.querySelectorAll<HTMLElement>(".project-card,.discipline,.contact-panel>a").forEach((el) => {
        const tilt = el.classList.contains("project-card");
        el.classList.add("fx-spot");
        on(el, "pointermove", (e: PointerEvent) => {
          const r = el.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
          el.style.setProperty("--mx", `${x}px`); el.style.setProperty("--my", `${y}px`);
          if (tilt) { el.style.setProperty("--ry", `${(x / r.width - 0.5) * 6}deg`); el.style.setProperty("--rx", `${-(y / r.height - 0.5) * 6}deg`); }
        });
        on(el, "pointerleave", () => { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); });
        off.push(() => el.classList.remove("fx-spot"));
      });

      // magnetic controls
      document.querySelectorAll<HTMLElement>(".btn,.nav-resume,.nav-icon").forEach((el) => {
        on(el, "pointermove", (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.22}px,${(e.clientY - (r.top + r.height / 2)) * 0.3}px)`;
        });
        on(el, "pointerleave", () => { el.style.transform = ""; });
        off.push(() => { el.style.transform = ""; });
      });
    }

    // ` jumps to the terminal
    on(window, "keydown", (e: KeyboardEvent) => {
      if (e.key !== "`" || e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^(INPUT|TEXTAREA)$/.test((e.target as HTMLElement)?.tagName ?? "")) return;
      const input = document.getElementById("terminal-command") as HTMLInputElement | null;
      if (!input) return;
      e.preventDefault();
      input.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      input.focus({ preventScroll: true });
    });

    return () => { off.forEach((fn) => fn()); };
  }, [path]);

  return null;
}
