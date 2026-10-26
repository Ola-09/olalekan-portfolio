"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Terminal } from "lucide-react";
import { projects } from "../data/projects";
import { THEMES, applyTheme, currentTheme } from "./fx/theme";
import { runMatrix } from "./fx/matrix";

const INTRO = [
  "OA PORTFOLIO SHELL v2.0",
  "A small interactive index. No shell commands are executed.",
  'Type "help", or try: cat sentient · theme cyan · matrix',
];
const HELP = [
  "help            show available commands",
  "ls              list projects",
  "cat <project>   project summary",
  "open <project>  open the case study",
  "whoami          who is this",
  "skills          engineering disciplines",
  "theme [name]    change the accent color",
  "matrix          you know what this does",
  "resume          open the résumé page",
  "contact         contact options",
  "clear           clear the screen",
  "tip: ↑ ↓ for history, Tab to complete, ` to focus from anywhere",
];
const COMMANDS = ["help", "ls", "projects", "cat", "open", "whoami", "skills", "theme", "matrix", "resume", "contact", "clear", "sudo"];
const CHIPS = ["help", "ls", "cat sentient", "theme cyan", "matrix"];

export default function CommandCenter() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<string[]>(INTRO);
  const hist = useRef<string[]>([]);
  const hi = useRef(-1);
  const screen = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => { const el = screen.current; if (el) el.scrollTop = el.scrollHeight; }, [lines]);

  const print = (out: string[]) => out.forEach((l, i) => {
    timers.current.push(window.setTimeout(() => setLines((p) => [...p, l]), i * 28));
  });

  function run(raw: string) {
    const [cmd = "", ...args] = raw.trim().split(/\s+/);
    const c = cmd.toLowerCase(), arg = args.join(" ").toLowerCase();
    const find = () => projects.find((p) => p.slug === arg || p.name.toLowerCase() === arg);
    if (c === "clear") { timers.current.forEach(clearTimeout); timers.current = []; setLines([]); return; }
    setLines((p) => [...p, `visitor@oa:~$ ${raw.trim()}`]);
    switch (c) {
      case "help": return print(HELP);
      case "whoami": return print(["olalekan ajiboye", "software engineer · lagos, nigeria", "ai/ml · web · systems · security"]);
      case "ls": case "projects":
        return print([...projects.map((p) => `${p.slug.padEnd(10)} ${p.status === "Completed" ? "[done]" : "[wip] "}  ${p.tagline}`), "cat <name> for a summary, open <name> for the case study"]);
      case "cat": {
        const p = find();
        if (!p) return print([arg ? `cat: ${arg}: no such project (try ls)` : "usage: cat <project>"]);
        return print([`${p.name}: ${p.tagline}`, `status  ${p.status}`, `stack   ${p.stack.slice(0, 5).join(", ")}`, ...(p.liveUrl ? [`live    ${p.liveUrl}`] : []), `open ${p.slug} for the case study`]);
      }
      case "open": {
        const p = find();
        if (!p) return print([arg ? `open: ${arg}: no such project (try ls)` : "usage: open <project>"]);
        print([`opening ${p.name}…`]);
        window.setTimeout(() => router.push(`/projects/${p.slug}`), 450);
        return;
      }
      case "skills": return print(["SOFTWARE ENGINEERING", "AI / MACHINE LEARNING", "WEB DEVELOPMENT", "SYSTEMS ENGINEERING", "OFFENSIVE SECURITY (AUTHORIZED)", "CYBERSECURITY"]);
      case "resume": print(["opening résumé…"]); window.setTimeout(() => router.push("/resume"), 350); return;
      case "contact": return print(["EMAIL   Olalekanajiboye697@gmail.com", "GITHUB  github.com/Ola-09", "LINKED  linkedin.com/in/ajiboye-olalekan"]);
      case "theme": {
        const names = Object.keys(THEMES);
        if (!arg) return print([`current: ${currentTheme()}`, `available: ${names.join(", ")}`, "usage: theme <name>"]);
        return print([applyTheme(arg) ? `accent set to ${arg}` : `theme: ${arg}: unknown (available: ${names.join(", ")})`]);
      }
      case "matrix": return print([runMatrix() ? "follow the white rabbit…" : "motion is reduced on this device, skipping."]);
      case "sudo": return print(["visitor is not in the sudoers file. This incident will not be reported."]);
      default: return print([`command not found: ${c}`, 'type "help" to see available commands.']);
    }
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = input.trim();
    if (!v) return;
    hist.current.push(v); hi.current = -1; setInput(""); run(v);
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!hist.current.length) return;
      hi.current = Math.min(hist.current.length - 1, hi.current + 1);
      setInput(hist.current[hist.current.length - 1 - hi.current]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      hi.current = Math.max(-1, hi.current - 1);
      setInput(hi.current < 0 ? "" : hist.current[hist.current.length - 1 - hi.current]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(/\s+/), head = parts[0].toLowerCase(), last = parts[parts.length - 1].toLowerCase();
      const pool = parts.length === 1 ? COMMANDS : head === "cat" || head === "open" ? projects.map((p) => p.slug) : head === "theme" ? Object.keys(THEMES) : [];
      const m = pool.filter((x) => x.startsWith(last));
      if (m.length === 1) { parts[parts.length - 1] = m[0]; setInput(parts.join(" ") + (parts.length === 1 && ["cat", "open", "theme"].includes(m[0]) ? " " : "")); }
      else if (m.length > 1) print([m.join("   ")]);
    }
  }

  return <div className="terminal-window">
    <div className="terminal-titlebar"><div className="window-dots"><i/><i/><i/></div><span className="mono"><Terminal size={13}/> oa-shell: interactive index</span><span className="terminal-live mono"><i/> READY</span></div>
    <div className="terminal-screen" ref={screen} aria-live="polite">{lines.map((line, index) => <div className={`terminal-line ${line.startsWith("visitor@") ? "terminal-command" : ""}`} key={`${index}-${line}`}>{line}</div>)}</div>
    <div className="terminal-chips" aria-label="Suggested commands">{CHIPS.map((c) => <button type="button" key={c} onClick={() => { hist.current.push(c); run(c); }}>{c}</button>)}</div>
    <form className="terminal-input-row" onSubmit={submit}><label htmlFor="terminal-command" className="mono">visitor@oa:~$</label><input id="terminal-command" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey} placeholder="type a command, or press Tab…" autoComplete="off" autoCapitalize="off" spellCheck={false}/><button aria-label="Run portfolio command" type="submit"><ArrowUpRight size={16}/></button></form>
  </div>;
}
