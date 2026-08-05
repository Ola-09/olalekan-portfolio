import { notFound } from "next/navigation";
import { projects } from "../../../data/projects";
import { ArrowLeft, Download } from "lucide-react";

export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const p=projects.find(x=>x.slug===slug); if(!p) notFound();
 return <main className="page"><div className="container">
  <a className="eyebrow" href="/#projects"><ArrowLeft size={14}/> Back to projects</a>
  <div style={{marginTop:24}}><div className="eyebrow">{p.category} · {p.status}</div><h1>{p.name}</h1><p className="lead">{p.tagline}. {p.description}</p></div>
  <div className="detail-grid"><div>
   <section className="detail-block"><h2>The problem</h2><p>{p.problem}</p></section>
   <section className="detail-block"><h2>The solution</h2><p>{p.solution}</p></section>
   <section className="detail-block"><h2>Core capabilities</h2><ul>{p.features.map(f=><li key={f}>{f}</li>)}</ul></section>
  </div><aside>
   <section className="detail-block"><h2>Technology</h2><div className="tags">{p.stack.map(t=><span className="tag" key={t}>{t}</span>)}</div></section>
   <section className="detail-block"><h2>Status</h2><p className="accent mono">{p.status}</p></section>
   <section className="detail-block"><h2>Access</h2>{p.liveUrl ? <p><a className="accent" href={p.liveUrl} target="_blank" rel="noreferrer">Open live project ↗</a></p> : <p className="muted">Live URL not available yet.</p>}{p.sourceUrl ? <p><a className="accent" href={p.sourceUrl} target="_blank" rel="noreferrer">{p.sourceLabel ?? "View source"} ↗</a></p> : null}</section>
   <a className="btn" href="/Olalekan-Ajiboye-CV.pdf" download><Download size={16}/> Download CV</a>
  </aside></div>
 </div></main>
}