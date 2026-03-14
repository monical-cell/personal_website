"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/**
 * About Page Component
 * 
 * Displays information about you:
 * - Profile picture
 * - Bio
 * - Skills
 * - Interests
 */
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-6">

        {/* Page Title */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold">About Me</h1>
          <p className="text-xl text-muted-foreground">
            Get to know me better
          </p>
        </div>

        {/* Profile Section */}
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden">
              <Image
                src="/headshot.jpeg"
                alt="Monica Lai"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Hello!</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm a software developer with a computer engineering background, and a passion for building
                applied, data-driven solutions across various domains. Currently,
                I'm a second-year Posse Scholar completing my undergrad at the University
                of Wisconsin-Madison.
              </p>
              <p>
                When I'm not coding, you can find me playing soccer, watching
                the latest shows/movie, or spending time with friends and family.
              </p>
              {/* <p>
                I believe in writing clean, maintainable code and creating
                user-centered designs that make a difference.
              </p> */}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Skills & Technologies</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="relative p-6 rounded-lg border bg-card group"
              >
                {/* Energy aura on hover */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/10 to-yellow-300/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <h3 className="font-semibold mb-3">{category.title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {category.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interests Section */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-center">Interests</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {interests.map((interest) => (
              <span
                key={interest}
                className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Sample data - Update with your own skills
const skills = [
  {
    title: "Languages & Frameworks",
    items: ["Python", "Java", "C (Embedded)", "R (statistical computing)", "React"],
  },
  {
    title: "Libraries & Tools",
    items: ["PyTorch", "LangChain", "CrewAI", "OpenCV", "Selenium"],
  },
  {
    title: "Software & Technologies",
    items: ["Docker", "Azure OpenAI", "AWS", "Isaac Sim/ROS2", "Git/GitHub"],
  },
];

// Sample data - Update with your interests
const interests = [
  "Applied Data Science",
  "AI/ML Engineering",
  "Embedded Systems and IoT",
  "Robotics & Autonomous Systems",
  "Networking and Cybersecurity",
  "AR/VR and Game Development",
  "Quantum Computing",
];
