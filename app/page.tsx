import Image from "next/image";
import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { projects } from "../data/projects";

const featuredSlugs=["aerion","aicds","aegis-shield","translive","nyx","revia"];
const featured=featuredSlugs.map(s=>projects.find(p=>p.slug===s)!);
const other=projects.filter(p=>!featuredSlugs.includes(p.slug));

export default function Home(){
 return <main>
  <section className="container hero">
   <div><div className="eyebrow">Software Engineer · AI · Cybersecurity · Systems</div>
    <h1>Building <span>intelligent</span>, secure & complex systems.</h1>
    <p className="hero-copy">I'm Olalekan Ajiboye, a software engineer building practical systems across artificial intelligence, cybersecurity, backend engineering, mobile development and real-time platforms.</p>
    <div className="actions"><a className="btn primary" href="#projects">Explore projects <ArrowUpRight size={16}/></a><a className="btn" href="/resume">View resume</a><a className="btn" href="/Olalekan-Ajiboye-CV.pdf" download><Download size={16}/> Download CV</a></div>
   </div>
   <div className="portrait">
    <Image
      src="/Gemini_Generated_Image_cjndjgcjndjgcjnd.png"
      alt="Olalekan Ajiboye headshot"
      width={700}
      height={700}
      priority
      className="portrait-image"
    />
   </div>
  </section>
  <section id="about" className="section"><div className="container about-grid"><div><div className="eyebrow">01 / About</div><h2>Engineering across disciplines.</h2></div><div><p>My work spans AI, cybersecurity, backend engineering, mobile applications, real-time systems and full-stack product development. I enjoy technically challenging problems—from AI-powered transcription and computer vision to cyber-threat detection, application security, secure communications and drone command-and-control.</p><p>I approach projects from both engineering and product perspectives: understand the problem, design the architecture, build the system and improve it through testing and iteration.</p></div></div></section>
  <section className="section"><div className="container"><div className="section-head"><div><div className="eyebrow">02 / Capabilities</div><h2>Tools I build with.</h2></div></div><div className="skill-grid">
   {[
    ["Languages",["Python","JavaScript","TypeScript","Java","Dart","Bash"]],
    ["Backend",["FastAPI","Node.js","REST APIs","WebSockets","SQLAlchemy","Alembic"]],
    ["Frontend",["React","Next.js","Vite","HTML","CSS"]],
    ["AI / ML",["Whisper","PyTorch","Computer Vision","Machine Learning","Speech Processing"]],
    ["Cybersecurity",["Threat Detection","AppSec","XSS","SQL Injection","Command Injection","Cryptography"]],
    ["Infrastructure",["PostgreSQL","SQLite","Redis","Docker","Linux","FFmpeg","MAVSDK"]]
   ].map(([name,tags])=><div className="skill" key={name as string}><h3>{name}</h3><div className="tags">{(tags as string[]).map(t=><span className="tag" key={t}>{t}</span>)}</div></div>)}
  </div></div></section>
  <section id="projects" className="section"><div className="container"><div className="section-head"><div><div className="eyebrow">03 / Selected Work</div><h2>Projects.</h2></div><a className="btn" href="/resume">Resume <ArrowUpRight size={16}/></a></div><div className="project-grid">{featured.map(p=><Card key={p.slug} p={p}/>)}</div></div></section>
  <section className="section"><div className="container"><div className="section-head"><div><div className="eyebrow">04 / More Work</div><h2>More projects.</h2></div></div><div className="project-grid">{other.map(p=><Card key={p.slug} p={p}/>)}</div></div></section>
  <section id="contact" className="section"><div className="container contact"><div><div className="eyebrow">05 / Contact</div><h2>Let's build something meaningful.</h2><p className="lead">Open to software engineering, AI, cybersecurity, backend and systems engineering opportunities.</p></div><div className="contact-card"><a href="https://www.linkedin.com/in/ajiboye-olalekan" target="_blank" rel="noreferrer"><Linkedin size={16}/> Ajiboye Olalekan</a><a href="https://github.com/Ola-09" target="_blank" rel="noreferrer"><Github size={16}/> Ola-09</a><a href="mailto:Olalekanajiboye697@gmail.com"><Mail size={16}/> &nbsp;Olalekanajiboye697@gmail.com</a><a href="tel:08127505152">08127505152</a><a href="/resume">View resume <ArrowUpRight size={15}/></a><a href="/Olalekan-Ajiboye-CV.pdf" download>Download CV <Download size={15}/></a></div></div></section>
 </main>
}
function Card({p}:{p:any}){return <article className="project-card"><div><div className="project-top"><span className="eyebrow">{p.category}</span><span className="status">{p.status}</span></div><h3>{p.name}</h3><p>{p.description}</p><div className="tags">{p.stack.slice(0,5).map((t:string)=><span className="tag" key={t}>{t}</span>)}</div></div><div className="project-actions"><a className="project-link" href={`/projects/${p.slug}`}>View project <span>↗</span></a>{p.liveUrl ? <a className="project-link secondary" href={p.liveUrl} target="_blank" rel="noreferrer">Visit site <span>↗</span></a> : null}{p.sourceUrl ? <a className="project-link secondary" href={p.sourceUrl} target="_blank" rel="noreferrer">{p.sourceLabel ?? "View source"} <span>↗</span></a> : null}</div></article>}