import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Download, Github, Linkedin, Mail, MoveUpRight } from "lucide-react";
import { projects } from "../data/projects";
import CommandCenter from "./command-center";
import HeroField from "./fx/hero-field";
import Scramble from "./fx/scramble";
import PacketGame from "./fx/packet-game";

const featuredSlugs = ["sentient", "aicds", "mesh"];
const featured = featuredSlugs.map((slug) => projects.find((project) => project.slug === slug)!).filter(Boolean);
const otherProjects = projects.filter((project) => !featuredSlugs.includes(project.slug));

const disciplines = [
  { number: "01", name: "Software engineering", detail: "Product architecture · APIs · reliable applications" },
  { number: "02", name: "AI / ML", detail: "Intelligent applications · detection · media processing" },
  { number: "03", name: "Web development", detail: "Full-stack products · interfaces · deployment" },
  { number: "04", name: "Systems engineering", detail: "Backend infrastructure · real-time systems · edge" },
  { number: "05", name: "Offensive security", detail: "Authorized testing · vulnerability research" },
  { number: "06", name: "Cybersecurity", detail: "Threat analysis · defensive engineering · AppSec" },
];

export default function Home() {
  return <main>
    <section className="hero-shell">
      <div className="container hero">
        <div className="hero-copy-wrap">
          <div className="eyebrow"><span className="pulse-dot" /> Independent engineer / Lagos, Nigeria</div>
          <h1><Scramble text="I build systems" /><br /><Scramble text="that " delay={200} /><span className="text-gradient"><Scramble text="think, connect" delay={350} /></span><br /><Scramble text="and protect." delay={600} /></h1>
          <p className="hero-copy">I'm Olalekan Ajiboye — a software engineer working across AI/ML, web development, systems engineering, offensive security, and cybersecurity.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">Explore selected work <ArrowUpRight size={16}/></a>
            <a className="btn btn-quiet" href="/resume">Read my résumé <ArrowDownRight size={16}/></a>
          </div>
          <div className="hero-footnote mono"><span>ENGINEERING / SOFTWARE / SECURITY</span><span>OPEN TO OPPORTUNITIES ↗</span></div>
        </div>
        <div className="hero-visual">
          <div className="visual-top mono"><span>FIELD NOTES / 001</span><span>OA.SYSTEMS</span></div>
          <div className="orbit-scene field-scene">
            <HeroField />
            <div className="core-node"><span>OA</span><i>ENGINEER</i></div>
          </div>
          <div className="visual-bottom"><span className="status-led"/> <span>CONNECTED THINKING, PRACTICAL SYSTEMS</span><span className="mono">06 DISCIPLINES</span></div>
        </div>
      </div>
      <div className="container ticker"><span>SOFTWARE ENGINEERING</span><b>✳</b><span>AI / MACHINE LEARNING</span><b>✳</b><span>WEB DEVELOPMENT</span><b>✳</b><span>SYSTEMS ENGINEERING</span><b>✳</b><span>OFFENSIVE SECURITY</span><b>✳</b><span>CYBERSECURITY</span></div>
    </section>

    <section id="about" className="section">
      <div className="container split-section">
        <div><div className="eyebrow">01 / Point of view</div><h2 data-reveal>Curiosity across the stack.<br/><span className="muted">Discipline in the details.</span></h2></div>
        <div className="body-copy"><p>I like working where software meets complex real-world problems: systems that process information, make it useful, communicate reliably, or help people respond when it matters.</p><p>My background in mechanical engineering shapes how I approach software: understand the system, map the constraints, build deliberately, and test what matters. I care about the architecture behind the interface as much as the experience people see.</p><a className="text-link" href="/resume">More about my experience <MoveUpRight size={15}/></a></div>
      </div>
    </section>

    <section className="section disciplines-section">
      <div className="container">
        <div className="section-heading"><div><div className="eyebrow">02 / Disciplines</div><h2 data-reveal>One engineer. <span className="muted">Multiple lenses.</span></h2></div><p className="section-note">Different problem spaces, connected by systems thinking.</p></div>
        <div className="discipline-grid">{disciplines.map((item) => <article className="discipline" key={item.number}><span className="discipline-number mono">{item.number}</span><div><h3>{item.name}</h3><p>{item.detail}</p></div><ArrowUpRight className="discipline-arrow" size={17}/></article>)}</div>
      </div>
    </section>

    <section className="section featured-section" id="projects">
      <div className="container">
        <div className="section-heading"><div><div className="eyebrow">03 / Flagship systems</div><h2 data-reveal>Built to solve <span className="muted">real problems.</span></h2></div><a className="text-link" href="#more-projects">All projects <MoveUpRight size={15}/></a></div>
        <div className="featured-grid">{featured.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} featured />)}</div>
      </div>
    </section>

    <section className="section" id="more-projects">
      <div className="container">
        <div className="section-heading"><div><div className="eyebrow">04 / Selected work</div><h2 data-reveal>More things <span className="muted">I've made.</span></h2></div><span className="mono tiny-muted">{String(projects.length).padStart(2,"0")} PROJECTS</span></div>
        <div className="project-grid">{otherProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index + featured.length} />)}</div>
      </div>
    </section>

    <section className="section play-section" id="play">
      <div className="container play-layout">
        <div><div className="eyebrow">05 / Play</div><h2 data-reveal>Block what's hostile.<br/><span className="muted">Let the rest through.</span></h2><p className="body-copy">Application security comes down to one decision per request: block it or let it through. This is that decision at game speed. Works with a mouse or a thumb.</p></div>
        <PacketGame />
      </div>
    </section>

    <section className="section command-section">
      <div className="container command-layout">
        <div><div className="eyebrow">06 / Interactive layer</div><h2 data-reveal>A little command line.<br/><span className="muted">For the curious.</span></h2><p className="body-copy">Explore this portfolio like a system. Try a command, inspect the project index, or jump straight to the résumé.</p><p className="tiny-muted">This terminal is a local portfolio interface — it does not execute shell commands.</p></div>
        <CommandCenter />
      </div>
    </section>

    <section className="section contact-section" id="contact">
      <div className="container contact-layout">
        <div><div className="eyebrow">07 / Start a conversation</div><h2 data-reveal>Have a hard problem?<br/><span className="text-gradient">Let's work on it.</span></h2><p className="body-copy">Open to software engineering roles, technical collaborations, and thoughtful client projects across software, AI, systems, and security.</p></div>
        <div className="contact-panel"><div className="contact-panel-top mono"><span>CONTACT CHANNELS</span><span>STATUS: OPEN</span></div>
          <a href="mailto:Olalekanajiboye697@gmail.com"><span><Mail size={17}/> Email</span><strong>Start a conversation <ArrowUpRight size={16}/></strong></a>
          <a href="https://github.com/Ola-09" target="_blank" rel="noreferrer"><span><Github size={17}/> GitHub</span><strong>Explore repositories <ArrowUpRight size={16}/></strong></a>
          <a href="https://www.linkedin.com/in/ajiboye-olalekan" target="_blank" rel="noreferrer"><span><Linkedin size={17}/> LinkedIn</span><strong>Connect professionally <ArrowUpRight size={16}/></strong></a>
          <a href="/Olalekan-Ajiboye-CV.pdf" download><span><Download size={17}/> Résumé</span><strong>Download CV <ArrowUpRight size={16}/></strong></a>
        </div>
      </div>
    </section>
  </main>;
}

function ProjectCard({ project, index, featured = false }: { project: (typeof projects)[number]; index: number; featured?: boolean }) {
  return <article className={`project-card ${featured ? "project-card-featured" : ""} project-${project.slug}`} data-reveal="card" style={{ transitionDelay: `${Math.min(index, 4) * 80}ms` }}>
    <div className="project-card-head"><span className="mono project-index">PROJECT / {String(index + 1).padStart(2,"0")}</span><span className={`status-pill ${project.status === "Completed" ? "status-done" : "status-progress"}`}><span/> {project.status}</span></div>
    <div className="project-art" aria-hidden="true">{project.gallery?.[0] ? <Image src={project.gallery[0].src} alt="" fill sizes="(max-width: 680px) 100vw, (max-width: 950px) 50vw, 33vw" /> : <ProjectArtwork slug={project.slug}/>}</div>
    <div className="project-card-content"><div className="eyebrow">{project.category}</div><h3>{project.name}<span className="project-arrow"><ArrowUpRight size={20}/></span></h3><p>{project.description}</p><div className="tags">{project.stack.slice(0,4).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      <div className="project-card-actions"><a className="text-link" href={`/projects/${project.slug}`}>Explore case study <MoveUpRight size={15}/></a>{project.liveUrl && <a className="text-link subdued-link" href={project.liveUrl} target="_blank" rel="noreferrer">Live product <ArrowUpRight size={14}/></a>}</div>
    </div>
  </article>;
}

function ProjectArtwork({ slug }: { slug: string }) {
  if (slug === "sentient") return <div className="art-sentient"><div className="radar-rings"/><div className="radar-sweep"/><span className="radar-point point-one"/><span className="radar-point point-two"/><span className="radar-point point-three"/><span className="art-label mono">SENTIENT / FIELD SYSTEMS</span><span className="art-coord mono">06°27' N<br/>03°23' E</span></div>;
  if (slug === "aicds") return <div className="art-aicds"><div className="code-line">01 <i>inspect</i>(traffic_stream)</div><div className="code-line">02 <b>model</b>.predict(features)</div><div className="code-line">03 <em>risk_score</em> = 0.08<span className="caret"/></div><div className="signal-bars">{[25,46,31,67,40,78,52,88,60,38,71,48,96,63,44,74,55,85,36,67].map((height,i)=><span key={i} style={{height:`${height}%`,animationDelay:`${-(i%7)*0.21}s`}}/>)}</div><span className="art-label mono">DETECTION PIPELINE / AICDS</span></div>;
  if (slug === "mesh") return <div className="art-mesh"><svg viewBox="0 0 400 220" role="img" aria-label="Illustration of phones connected through a Bluetooth mesh"><g stroke="currentColor" strokeOpacity=".35" strokeWidth="1.2" fill="none"><path d="M65 62 L180 40 L310 72 L345 160 L220 183 L90 155 Z M65 62 L90 155 M180 40 L220 183 M310 72 L220 183 M65 62 L220 183 M90 155 L310 72"/></g>{[[65,62],[180,40],[310,72],[345,160],[220,183],[90,155]].map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`}><circle r="18" fill="#151914" stroke={i===2?"var(--accent)":"currentColor"} strokeWidth="1.4"/><rect x="-5" y="-9" width="10" height="18" rx="2" fill="none" stroke={i===2?"var(--accent)":"currentColor"} strokeWidth="1.2"/><circle cx="0" cy="6" r="1" fill="currentColor"/></g>)}<circle className="mesh-packet" r="3.2" fill="var(--accent)"><animateMotion dur="3.4s" repeatCount="indefinite" path="M65 62 L180 40 L310 72 L345 160 L220 183 L90 155 L65 62"/></circle><circle cx="310" cy="72" r="28" fill="none" stroke="var(--accent)" strokeOpacity=".55"/><text x="22" y="211" fill="currentColor" fontSize="9" letterSpacing="2">NEARBY DEVICES / RELAY NETWORK</text></svg></div>;
  if (slug === "translive") return <div className="art-translive"><div className="waveform">{Array.from({length:42},(_,i)=><span key={i} style={{height:`${12+Math.abs(Math.sin(i*1.7))*70}%`,animationDelay:`${-(i%9)*0.17}s`,animationDuration:`${1.2+(i%5)*0.2}s`}}/>)}</div><div className="transcript-lines"><span/><span/><span/><span/></div><span className="art-label mono">AUDIO → TEXT / TRANSLIVE</span></div>;
  if (slug === "nyx") return <div className="art-nyx"><div className="lock-orbit"><div className="lock-shape">✳</div></div><div className="nyx-message mono">E2E ENCRYPTED<br/><span>KEY EXCHANGE / VERIFIED</span></div></div>;
  if (slug === "aurevia") return <div className="art-aurevia"><div className="aurevia-window"><div/><div/><div/><div/></div><span className="art-label mono">LEARNING / KNOWLEDGE / ACCESS</span></div>;
  return <div className="art-loctrack"><div className="map-grid"/><div className="map-route"/><span className="map-pin pin-a"/><span className="map-pin pin-b"/><span className="map-pin pin-c"/><span className="art-label mono">ASSET VISIBILITY / LOCTRACK</span></div>;
}
