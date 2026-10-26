import type { StaticImageData } from "next/image";
import sentient1 from "../assets/sentient/1.png";
import sentient2 from "../assets/sentient/2.jpeg";
import sentient3 from "../assets/sentient/3.jpeg";
import sentient4 from "../assets/sentient/4.jpeg";
import sentient5 from "../assets/sentient/5.jpeg";
import sentientLogin from "../assets/sentient/login.png";
import aicds1 from "../assets/aicds/1.png";
import aicds2 from "../assets/aicds/2.png";
import aicds3 from "../assets/aicds/3.png";
import aicds4 from "../assets/aicds/4.png";
import aicds5 from "../assets/aicds/5.png";
import aicds6 from "../assets/aicds/6.png";
import mesh1 from "../assets/mesh/mesh1.jpeg";
import mesh2 from "../assets/mesh/mesh2.jpeg";
import transcriptFlow1 from "../assets/transcriptflow/1.png";
import transcriptFlow2 from "../assets/transcriptflow/2.png";
import transcriptFlow3 from "../assets/transcriptflow/3.png";
import nyx1 from "../assets/nyx/1.jpeg";
import nyx2 from "../assets/nyx/2.jpeg";
import nyx3 from "../assets/nyx/3.jpeg";
import aurevia1 from "../assets/aurevia/1.png";
import aurevia2 from "../assets/aurevia/2.png";
import aurevia3 from "../assets/aurevia/3.png";
import aurevia4 from "../assets/aurevia/4.png";
import aurevia5 from "../assets/aurevia/5.png";
import aurevia6 from "../assets/aurevia/6.png";
import aurevia7 from "../assets/aurevia/7.png";
import loctrack1 from "../assets/loctrack/1.png";
import loctrack2 from "../assets/loctrack/2.png";
import loctrack3 from "../assets/loctrack/3.png";
import loctrack4 from "../assets/loctrack/4.png";
import loctrack5 from "../assets/loctrack/5.png";

function galleryFor(name: string, images: StaticImageData[]) {
  return images.map((image, index) => ({
    src: image,
    alt: `${name} interface screenshot ${index + 1}`,
    label: `CAPTURE / ${String(index + 1).padStart(2, "0")}`,
  }));
}

export type Project = {
  slug: string; name: string; category: string; status: "Completed" | "In Development" | "In Progress";
  tagline: string; description: string; stack: string[]; problem: string; solution: string; features: string[];
  liveUrl?: string; sourceUrl?: string; sourceLabel?: string;
  gallery?: ReturnType<typeof galleryFor>;
};

export const projects: Project[] = [
  {
    slug: "sentient", name: "SENTIENT", category: "Systems Engineering / Edge / Robotics", status: "In Development",
    tagline: "A command platform for connected assets",
    description: "An engineering platform bringing together asset visibility, real-time telemetry, edge agents, and operator workflows for connected systems.",
    gallery: galleryFor("SENTIENT", [sentient1, sentient2, sentient3, sentient4, sentient5, sentientLogin]),
    stack: ["Next.js", "FastAPI", "Python", "WebSockets", "PostgreSQL", "MAVSDK", "Edge Computing"],
    problem: "Connected assets need a reliable operational layer that can ingest telemetry, represent device state, handle commands, and keep operators informed as connectivity and device availability change.",
    solution: "SENTIENT is being developed as a modular command-and-control platform with a web dashboard, API services, edge-agent foundations, normalized telemetry, and device-aware operations.",
    features: ["Operator dashboard and asset state", "Real-time telemetry and WebSocket events", "Edge-node enrollment and device isolation", "Command lifecycle and capability-aware controls", "MAVLink/MAVSDK adapter foundation", "Planned video, perception, and additional robotics integrations"],
  },
  {
    slug: "aicds", name: "AICDS", category: "AI / Cybersecurity", status: "Completed",
    tagline: "AI-assisted cyber threat detection",
    description: "A cybersecurity application for analyzing activity and surfacing potential threats through machine-learning-assisted detection workflows.",
    gallery: galleryFor("AICDS", [aicds2, aicds1, aicds3, aicds4, aicds5, aicds6]),
    stack: ["Python", "FastAPI", "React", "Machine Learning", "PostgreSQL", "Scikit-learn"],
    problem: "Reviewing security events and network-related signals manually can be slow and inconsistent, especially as the volume of activity grows.",
    solution: "AICDS combines analysis endpoints, model-backed detection, and a dashboard workflow to help users examine potential threats and review analysis results.",
    features: ["Threat analysis workflows", "URL and network analysis endpoints", "Model-assisted classification", "Task status and analysis results", "Dashboard for reviewing findings"],
    liveUrl: "https://pleroma-dash.vercel.app",
  },
  {
    slug: "mesh", name: "MESH", category: "Mobile / Offline Communications / Emergency Response", status: "In Development",
    tagline: "Emergency alerts when internet access is unavailable",
    description: "An Android-first emergency alert concept using Bluetooth-based nearby-device communication, with multi-hop relay intended to extend alerts through participating devices.",
    gallery: galleryFor("MESH", [mesh1, mesh2]),
    stack: ["Android", "React Native", "Bluetooth Low Energy", "Mesh Networking", "Local Storage"],
    problem: "During outages or in areas with limited connectivity, people may be unable to distribute urgent local alerts using internet-dependent services.",
    solution: "MESH is being designed to let nearby Android devices exchange emergency messages over Bluetooth, with relay, duplicate suppression, message expiry, and clear alert provenance planned as core safeguards.",
    features: ["Bluetooth-based nearby alert exchange", "Planned multi-hop relay between participating devices", "Emergency categories and timestamps", "Duplicate-message suppression and expiry design", "Privacy-conscious location sharing", "Real-device compatibility, background behavior, and reliability testing still required"],
  },
  {
    slug: "transcriptflow", name: "TranscriptFlow", category: "AI / Speech Processing", status: "Completed",
    tagline: "One transcription workflow for multiple media sources",
    description: "An AI transcription engine supporting live transcription, uploaded-video transcription, and YouTube URL transcription.",
    gallery: galleryFor("TRANSCRIPTFLOW", [transcriptFlow1, transcriptFlow2, transcriptFlow3]),
    stack: ["Python", "FastAPI", "Whisper", "FFmpeg", "Speech Processing"],
    problem: "People often need separate tools and workflows to transcribe live speech, video files, and online video sources.",
    solution: "TranscriptFlow brings these inputs into one media-processing workflow, using speech-to-text models and media utilities to produce transcripts.",
    features: ["Live transcription", "Uploaded video transcription", "YouTube URL transcription", "Audio/video preprocessing", "Speech-to-text pipeline"],
  },
  {
    slug: "aurevia", name: "Aurevia", category: "EdTech / Full-Stack", status: "Completed",
    tagline: "A virtual university experience",
    description: "A digital learning platform concept designed around structured academic programs, learning resources, and technology-enabled education.",
    gallery: galleryFor("AUREVIA", [aurevia1, aurevia2, aurevia3, aurevia4, aurevia5, aurevia6, aurevia7]),
    stack: ["Full-Stack Web", "React", "Backend APIs", "Database", "EdTech"],
    problem: "Access to structured learning can be constrained by location, infrastructure, and the limits of purely physical learning environments.",
    solution: "Aurevia presents learning and academic content through a digital platform intended to support a more accessible online education experience.",
    features: ["Digital learning experience", "Academic program and course structure", "Learning resource presentation", "Student-oriented interface"],
    liveUrl: "https://aurevia-bay.vercel.app",
  },
  {
    slug: "loctrack", name: "LocTrack", category: "Asset Tracking / Real-Time Systems", status: "Completed",
    tagline: "Visibility into asset location and movement",
    description: "A tracking platform focused on monitoring asset location, status, and movement history through a centralized interface.",
    gallery: galleryFor("LOCTRACK", [loctrack2, loctrack1, loctrack3, loctrack4, loctrack5]),
    stack: ["React", "Vite", "Leaflet", "FastAPI", "GPS", "WebSockets"],
    problem: "When assets move between locations, teams need a clear way to understand where they are and review their movement over time.",
    solution: "LocTrack combines location-oriented views with backend services for monitoring assets and presenting movement information.",
    features: ["Asset location visualization", "Movement monitoring", "Location-aware dashboard", "Real-time update foundations", "Asset status visibility"],
    liveUrl: "https://loctrack-iota.vercel.app",
  },
  {
    slug: "nyx", name: "Nyx", category: "Mobile / Privacy / Secure Communications", status: "Completed",
    tagline: "Privacy-focused end-to-end messaging",
    description: "A secure messaging application built around end-to-end encrypted communication and protected handling of local message data.",
    gallery: galleryFor("NYX", [nyx1, nyx2, nyx3]),
    stack: ["Mobile Development", "Dart", "Cryptography", "End-to-End Encryption", "SQLCipher"],
    problem: "Private communication requires careful handling of messages, credentials, cryptographic material, and locally stored information.",
    solution: "Nyx focuses on a messaging experience with end-to-end encryption and attention to protected local storage and privacy-oriented architecture.",
    features: ["End-to-end encrypted messaging", "Authentication and secure message handling", "Protected local storage", "Privacy-focused application architecture"],
  },
];
