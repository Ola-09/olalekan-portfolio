import type { Metadata } from "next";
import "./globals.css";
import "./fx.css";
import Interactions from "./fx/interactions";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: "Olalekan Ajiboye — Software Engineer",
  description: "Olalekan Ajiboye builds software across AI/ML, web development, systems engineering, offensive security, and cybersecurity.",
  metadataBase: new URL("https://olalekan-ajiboye-portfolio.vercel.app"),
  openGraph: {
    title: "Olalekan Ajiboye — Software Engineer",
    description: "Intelligent applications, secure systems, and connected infrastructure.",
    url: "https://olalekan-ajiboye-portfolio.vercel.app",
    siteName: "Olalekan Ajiboye",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <div id="scroll-progress" aria-hidden="true"/><div id="cursor-glow" aria-hidden="true"/><Interactions/>
    <header className="site-nav"><div className="container nav-inner">
      <a className="brand" href="/" aria-label="Olalekan Ajiboye home"><span className="brand-mark">OA</span><span className="brand-name">OLALEKAN AJIBOYE<span className="brand-period">.</span></span></a>
      <nav className="nav-links" aria-label="Main navigation"><a href="/#about">About</a><a href="/#projects">Projects</a><a href="/resume">Résumé</a><a href="/#contact">Contact</a></nav>
      <div className="nav-right"><a className="nav-icon" href="https://github.com/Ola-09" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a><a className="nav-icon" href="https://www.linkedin.com/in/ajiboye-olalekan" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a><a className="nav-resume" href="/resume">Résumé <ArrowUpRight size={14}/></a></div>
    </div></header>
    {children}
    <footer className="site-footer"><div className="container footer-inner"><div><a className="brand" href="/">OA<span className="brand-period">.</span></a><p>Software, systems, and security — built with intent.</p></div><div className="footer-meta mono"><span>LAGOS, NIGERIA</span><span>© {new Date().getFullYear()} OLALEKAN AJIBOYE</span></div></div></footer>
  </body></html>;
}
