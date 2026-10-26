import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { projects } from "../../../data/projects";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <main className="project-detail-page"><div className="container project-detail-wrap">
    <a className="back-link" href="/#projects"><ArrowLeft size={15}/> Back to selected work</a>
    <div className="project-detail-hero"><div className="eyebrow">{project.category}</div><div className="project-detail-title-row"><h1>{project.name}</h1><span className={`status-pill ${project.status === "Completed" ? "status-done" : "status-progress"}`}><span/> {project.status}</span></div><p className="detail-tagline">{project.tagline}</p><p className="body-copy">{project.description}</p></div>
    {project.gallery?.length ? <section className="project-gallery" aria-label={`${project.name} project images`}><div className="project-gallery-heading"><div className="eyebrow">Interface / Field captures</div><h2 data-reveal>Inside the product</h2></div><div className="project-gallery-list">{project.gallery.map((image, index) => <figure className="project-gallery-item" data-reveal key={image.src.src}><div className="project-gallery-frame"><Image src={image.src} alt={image.alt} sizes="(max-width: 768px) 100vw, 1050px" /></div><figcaption><span>{image.label}</span><span>{String(index + 1).padStart(2, "0")} / {String(project.gallery!.length).padStart(2, "0")}</span></figcaption></figure>)}</div></section> : null}
    <div className="project-detail-grid"><div className="project-detail-main">
      <section className="detail-block"><div className="eyebrow">01 / Problem</div><h2>The challenge</h2><p>{project.problem}</p></section>
      <section className="detail-block"><div className="eyebrow">02 / Approach</div><h2>How it works</h2><p>{project.solution}</p></section>
      <section className="detail-block"><div className="eyebrow">03 / Capabilities</div><h2>Key components</h2><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>
    </div><aside className="project-detail-aside"><section className="detail-block"><div className="eyebrow">Technology</div><h2>Stack</h2><div className="tags">{project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div></section><section className="detail-block"><div className="eyebrow">Project status</div><h2>{project.status}</h2><p>Descriptions distinguish implemented capabilities from planned or in-progress work.</p></section><section className="detail-block"><div className="eyebrow">Explore</div>{project.liveUrl ? <p><a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">Open live product <ArrowUpRight size={15}/></a></p> : <p className="tiny-muted">A public live demo is not listed for this project.</p>}{project.sourceUrl && <p><a className="text-link" href={project.sourceUrl} target="_blank" rel="noreferrer">{project.sourceLabel ?? "View source"} <ArrowUpRight size={15}/></a></p>}<a className="text-link" href="/Olalekan-Ajiboye-CV.pdf" download>Download CV <Download size={15}/></a></section></aside></div>
  </div></main>;
}
