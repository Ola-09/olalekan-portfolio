import "./globals.css";
import { Download, Github, Linkedin } from "lucide-react";
export const metadata = {
  title: "Olalekan Ajiboye — Software Engineer",
  description: "Portfolio of Olalekan Ajiboye — AI, cybersecurity, backend and systems engineering."
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>
    <header className="nav"><div className="container nav-inner">
      <a className="brand" href="/">OA<span>.</span></a>
      <nav className="nav-links"><a href="/#about">About</a><a href="/#projects">Projects</a><a href="/resume">Resume</a><a href="/#contact">Contact</a></nav>
      <div className="header-actions">
        <div className="social-links">
          <a href="https://www.linkedin.com/in/ajiboye-olalekan" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={15}/></a>
          <a href="https://github.com/Ola-09" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={15}/></a>
        </div>
        <a className="nav-cta" href="/Olalekan-Ajiboye-CV.pdf" download><Download size={15}/> Download CV</a>
      </div>
    </div></header>
    {children}
    <footer><div className="container footer-inner"><div><b>Olalekan Ajiboye</b><p>Software Engineer · AI · Cybersecurity · Systems</p></div><div className="mono">© 2026</div></div></footer>
  </body></html>
}