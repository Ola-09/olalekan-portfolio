import { Download, Mail, ArrowLeft } from "lucide-react";
export default function Resume(){return <main className="page"><div className="container resume">
 <a className="eyebrow" href="/"><ArrowLeft size={14}/> Back home</a>
 <div style={{marginTop:24}}><div className="eyebrow">Resume</div><h1>Olalekan Ajiboye</h1><p className="lead">Software Engineer · AI · Cybersecurity · Backend & Systems</p>
 <div className="resume-actions"><a className="btn primary" href="/Olalekan-Ajiboye-CV.pdf" download><Download size={16}/> Download CV PDF</a><a className="btn" href="mailto:Olalekanajiboye697@gmail.com"><Mail size={16}/> Contact</a></div></div>
 <h2>Professional Summary</h2><p>Software engineer with hands-on experience building AI-powered applications, cybersecurity systems, backend services, mobile applications and real-time platforms. Experienced with Python, JavaScript/TypeScript, Java, Flutter, FastAPI, React, Next.js, PostgreSQL, Redis, Docker and modern cloud-native development workflows.</p>
 <h2>Technical Skills</h2><p><b>Languages:</b> Python, JavaScript, TypeScript, Java, Dart, Bash</p><p><b>Backend:</b> FastAPI, Node.js, REST APIs, WebSockets, SQLAlchemy, Alembic</p><p><b>Frontend:</b> React, Next.js, Vite, HTML, CSS</p><p><b>Mobile:</b> Flutter, Dart</p><p><b>AI/ML:</b> Whisper, PyTorch, Machine Learning, Computer Vision, Speech Processing</p><p><b>Cybersecurity:</b> Threat Detection, Application Security, XSS, SQL Injection, Command Injection, Cryptography, End-to-End Encryption</p><p><b>Databases & Infrastructure:</b> PostgreSQL, SQLite, Redis, Docker, Linux, Git, FFmpeg, MAVSDK</p>
 <h2>Education</h2><h3>Federal Polytechnic, Ilaro</h3><p>National Diploma · 2024</p>
 <h2>Selected Projects</h2>{[
 ["Aerion","Drone command and control platform for real-time telemetry, communication, mission management and operator-driven control."],
 ["AICDS","AI-driven cybersecurity system for detecting and analyzing potential cyber threats."],
 ["Aegis Shield","Application security framework for detecting, mitigating and alerting on XSS, command injection and first- and second-order SQL injection attacks."],
 ["Translive","AI transcription engine supporting real-time speech, uploaded videos and YouTube URLs."],
 ["Nyx","Secure messaging platform built around end-to-end encrypted communication and protected message storage."],
 ["Revia","Computer vision platform for damaged-image reconstruction, low-resolution enhancement and missing-region reconstruction."],
 ["Aurevia","Virtual university platform for structured academic programs and digital learning experiences."],
 ["Loctrack","Asset tracking and movement security platform."],
 ["Polfact","Public fact-checking platform for investigating claims and presenting structured fact checks."]
 ].map(([n,d])=><div className="detail-block" key={n}><h3>{n}</h3><p>{d}</p></div>)}
 <h2>Contact</h2><p>08127505152 · <a className="accent" href="mailto:Olalekanajiboye697@gmail.com">Olalekanajiboye697@gmail.com</a></p>
 </div></main>}