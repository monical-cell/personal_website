"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";

/**
 * Projects Page Component
 * 
 * Displays a grid of project cards
 * Each project shows:
 * - Screenshot/thumbnail
 * - Title and description
 * - Links to GitHub repo and live demo
 */
export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6">
          
        {/* Page Title */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Check out some of my hobbies and interests!
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Empty State Message */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Check back later for updates!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// TypeScript interface for project data
export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  theme: "fire" | "water" | "forest" | "crystal" | "air" | "lightning";
}

// Sample projects data - Update with your own projects
const projects: Project[] = [
  {
    title: "Premier League Predictor",
    description:
      "Predicting EPL matchday scores using web scraping, data analysis, and machine learning",
    image: "/projects/project1.jpg",
    tags: ["Python", "Jupyter Notebook", "Selenium", "Scikit-learn", "Pandas"],
    github: "https://github.com/SpiderWolf6/EPL_Predictor",
    demo: "https://github.com/SpiderWolf6/EPL_Predictor",
    theme: "crystal", // Crystal/Ice world - white, icy tones
  },
  {
    title: "MIKA AI",
    description:
      "Full-stack AI assistant with voice recognition, gesture detection, and intelligent conversation capabilities",
    image: "/projects/project2.jpg",
    tags: ["Python", "MediaPipe", "Azure OpenAI GPT-4", "Terraform", "AWS"],
    github: "https://github.com/SpiderWolf6/mika-ai",
    demo: "https://tinyurl.com/n8jjmy7a",
    theme: "water", // Water world - fluid blues
  },
  {
    title: "NetworkNudge",
    description:
      "Fiber optic network route optimization tool and visualization simulator for MadHacks 2025",
    image: "/projects/project3.jpg",
    tags: ["Python", "Next.js", "Flask", "GeoJSON", "Vercel", "Google Cloud VM"],
    github: "https://github.com/ahmedismail06/madhacks2025",
    demo: "https://madhacks2025-26.vercel.app/",
    theme: "air", // Air world - breezy, light blues/whites
  },
  {
    title: "Java Portfolio",
    description:
    "Advanced Java implementations covering foundational and complex data structures, algorithmic problem solving, and scalable software development practices, built through rigorous university-level coursework.", 
    image: "/projects/project4.jpg",
    tags: ["Java", "Javascript", "HTML/CSS", "OOP", "Data Structures", "Algorithms"],
    github: "https://github.com/yourusername/blog-cms",
    demo: "https://mediaspace.wisc.edu/media/SohamMukherjee_P213_Video/1_aey6ulrl",
    theme: "forest", // Forest world - natural greens with vines
  },
  {
    title: "IronMan Simulator",
    description:
      "Modular multi-agent AI simulation modeling the core brain of a realistic Iron Man suit across scenarios like combat, rescue, and stealth.",
    image: "/projects/project5.jpg",
    tags: ["Python", "CrewAI", "Azure OpenAI GPT-4", "Agentic AI", "AI Systems Design"],
    github: "https://github.com/SpiderWolf6/ironman/",
    demo: "https://github.com/SpiderWolf6/ironman/",
    theme: "lightning", // Lightning world - electric yellow/purple
  },
  {
    title: "MinionGames",
    description:
      "Flutter-based mini arcade game with custom widgets, responsive layouts, and UI/UX features",
    image: "/projects/project6.jpg",
    tags: ["Flutter", "Dart", "C++", "Android Studio", "VS Code"],
    github: "https://github.com/SpiderWolf6/MinionGames",
    demo: "https://tinyurl.com/4mzvek6t",
    theme: "fire", // Fire world - warm orange/red
  },
];
