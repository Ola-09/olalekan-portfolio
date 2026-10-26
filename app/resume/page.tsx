import { ArrowLeft, ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";

export default function Resume() {
  return <main className="resume-page"><div className="container resume-wrap">
    <a className="back-link" href="/"><ArrowLeft size={15}/> Back to portfolio</a>
    <div className="resume-heading"><div className="eyebrow">Résumé / Professional profile</div><h1>Olalekan<br/><span className="text-gradient">Ajiboye.</span></h1><p className="resume-role">Software Engineer · AI/ML · Web Development · Systems Engineering · Security</p><p className="body-copy">I build practical software systems across intelligent applications, web products, backend infrastructure, and security-focused engineering.</p>
      <div className="resume-actions"><a className="btn btn-primary" href="/Olalekan-Ajiboye-CV.pdf" download><Download size={16}/> Download CV PDF</a><a className="btn btn-quiet" href="mailto:Olalekanajiboye697@gmail.com"><Mail size={16}/> Contact me</a></div>
    </div>
    <div className="resume-columns"><div className="resume-main">
      <section className="resume-block"><div className="eyebrow">01 / Selected projects</div><h2>Engineering work</h2>
        {[["SENTIENT","Command platform for connected assets, real-time telemetry, edge agents, and operator workflows."],["AICDS","AI-assisted cyber threat detection and security analysis workflows."],["MESH","Android-first Bluetooth emergency alert concept designed for nearby-device communication and planned multi-hop relay."],["TranscriptFlow","AI transcription for live audio, uploaded video, and YouTube sources."],["Aurevia","Virtual learning platform for structured academic content."],["LocTrack","Location tracking and asset movement visibility."],["Nyx","Privacy-focused messaging with end-to-end encryption and protected local data."]].map(([name, detail]) => <article className="resume-project" key={name}><h3>{name}</h3><p>{detail}</p></article>)}
      </section>
      <section className="resume-block"><div className="eyebrow">02 / Education</div><h2>Education & training</h2><article className="resume-entry"><div className="resume-entry-top"><h3>National Diploma (OND), Mechanical Engineering</h3><span className="mono">Nov 2023</span></div><p className="resume-org">Federal Polytechnic, Ilaro, Ogun State · Upper Credit</p></article><article className="resume-entry"><div className="resume-entry-top"><h3>Cybersecurity Studies</h3><span className="mono">Mar – Jul 2025</span></div><p className="resume-org">School of Artificial Intelligence and Robotics (SOAIR)</p><p>Cybersecurity training; completion certificate.</p></article></section>
    </div><aside className="resume-side">
      <section className="resume-block"><div className="eyebrow">Technical toolkit</div><h2>Skills</h2>{[
        ["Languages","Python, JavaScript, TypeScript, Java, Dart, Bash"],
        ["AI / ML","Machine learning, Whisper, speech processing, computer vision foundations"],
        ["Web","React, Next.js, Vite, HTML, CSS, responsive interfaces"],
        ["Backend","FastAPI, REST APIs, WebSockets, SQLAlchemy, Alembic"],
        ["Security","Threat detection, application security, vulnerability testing concepts, cryptography, end-to-end encryption"],
        ["Systems","PostgreSQL, SQLite, Redis, Linux, Git, FFmpeg, MAVSDK, edge-agent foundations"],
      ].map(([label, value]) => <div className="skill-line" key={label}><h3>{label}</h3><p>{value}</p></div>)}</section>
      <section className="resume-block"><div className="eyebrow">Links & contact</div><h2>Find me online</h2><a className="resume-link" href="mailto:Olalekanajiboye697@gmail.com"><Mail size={16}/> Email <ArrowUpRight size={14}/></a><a className="resume-link" href="https://github.com/Ola-09" target="_blank" rel="noreferrer"><Github size={16}/> GitHub <ArrowUpRight size={14}/></a><a className="resume-link" href="https://www.linkedin.com/in/ajiboye-olalekan" target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn <ArrowUpRight size={14}/></a><p className="resume-org">Lagos, Nigeria</p></section>
    </aside></div>
    <p className="resume-disclaimer">This page is a web résumé. Download the PDF for a portable copy. Technical claims and project statuses should reflect current implementation and testing.</p>
  </div></main>;
}
