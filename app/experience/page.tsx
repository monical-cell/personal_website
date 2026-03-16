"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, BookOpen, Award, Star, Brain } from "lucide-react";

/**
 * Experience Page Component
 * 
 * Displays your professional experience and education:
 * - Work experience timeline
 * - Education history
 * - Each entry includes title, organization, dates, and description
 */
export default function ExperiencePage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-6">

        {/* Page Title */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold">Experience</h1>
          <p className="text-xl text-muted-foreground">
            My professional journey
          </p>
        </div>

        {/* Work Experience Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Briefcase className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Work Experience</h2>
          </div>

          <div className="space-y-6">
            {workExperience.map((job, index) => (
              <ExperienceCard key={index} item={job} index={index} />
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Education</h2>
          </div>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <ExperienceCard key={index} item={edu} index={index} />
            ))}
          </div>
        </div>

        {/* Professional Development Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Professional Learning</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Ongoing self-directed learning organized by focus area, combining
            coursework, programs, and independent study.
          </p>
            <div className="space-y-12">
              {learningTracks.map((track, index) => (
                <LearningTrackSection
                  key={index}
                  track={track}
                  index={index}
                />
              ))}
            </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Experience Card Component
 * 
 * Reusable component for displaying work/education entries
 * Features a fade-in animation on load
 */
function ExperienceCard({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ x: 8 }}
      className="relative pl-8 pb-8 border-l-2 border-border last:pb-0 group"
    >
      {/* Timeline dot with glow on hover */}
      <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-primary border-4 border-background transition-shadow duration-300 group-hover:shadow-[0_0_12px_rgba(var(--primary),0.6)]" />

      <div className="space-y-2">
        {/* Date */}
        <p className="text-sm text-muted-foreground">{item.date}</p>

        {/* Title */}
        <h3 className="text-xl font-semibold">{item.title}</h3>

        {/* Organization */}
        <p className="text-primary font-medium">{item.organization}</p>

        {/* Description */}
        <p className="text-muted-foreground">{item.description}</p>

        {/* Key Points */}
        {item.highlights && (
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {item.highlights.map((highlight, i) => (
              <li key={i}>{highlight}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

function LearningTrackSection({
  track,
  index,
}: {
  track: LearningTrack;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="space-y-4"
    >
      {/* Track Header */}
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold">{track.area}</h3>
        <p className="text-muted-foreground max-w-2xl">
          {track.summary}
        </p>
      </div>

      {/* Track Items */}
      <div className="space-y-6">
        {track.items.map((item, itemIndex) => (
          <LearningCard
            key={itemIndex}
            item={item}
            index={itemIndex}
          />
        ))}
      </div>
    </motion.div>
  );
}

// New card specifically for learning items
function LearningCard({
  item,
  index,
}: {
  item: LearningItem;
  index: number;
}) {
  // Choose icon based on type
  let IconComponent = BookOpen;
  if (item.type === "program") IconComponent = Award;
  if (item.type === "book") IconComponent = BookOpen;
  if (item.type === "course") IconComponent = Award;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ x: 8 }}
      className="relative pl-8 pb-6 border-l-2 border-border last:pb-0 group"
    >
      <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-primary border-4 border-background transition-shadow duration-300 group-hover:shadow-[0_0_12px_rgba(var(--primary),0.6)]" />

      <div className="space-y-2">
        {/* Title with Icon */}
        <div className="flex items-center gap-2">
          <IconComponent className="h-5 w-5 text-primary shrink-0" />
          <h3 className="text-xl font-semibold">{item.title}</h3>
        </div>

        {/* Provider and Date */}
        {(item.provider || item.date) && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {item.provider && <span>{item.provider}</span>}
            {item.provider && item.date && <span>•</span>}
            {item.date && <span>{item.date}</span>}
          </div>
        )}

        {/* Description */}
        {item.description && (
          <p className="text-muted-foreground text-sm">{item.description}</p>
        )}

        {/* Highlights */}
        {item.highlights && (
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {item.highlights.map((highlight, i) => (
              <li key={i}>{highlight}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

// TypeScript interface for experience items
interface ExperienceItem {
  title: string;
  organization: string;
  date: string;
  description: string;
  highlights?: string[];
}

interface LearningItem {
  title: string;
  type: "program" | "course" | "book";
  provider?: string;
  date?: string;
  description?: string;
  highlights?: string[];
}

interface LearningTrack {
  area: string;
  summary: string;
  items: LearningItem[];
}

// Sample work experience data - Update with your own experience
const workExperience: ExperienceItem[] = [
  {
    title: "Project Manager",
    organization: "Prism Consulting Group",
    date: "April 2025 - Present",
    description:
      "Currently building an agentic-RAG AI research assistant to improve productivity of research scientists.",
    highlights: [
      "Improved data pipelines by generating automated multi-level summary reports at patient, mutation, and clone levels.",
      "Conducted BLAST and statistical analysis on 80+ bladder cancer patients, analyzing 3,700+ genes and 100,000+ ninemers using Python and SLURM.",
      "Analyzed 700+ signal peptides and protein expression using Random Forest and Selenium for a research paper.",
    ],
  },
  {
    title: "Policy Researcher",
    organization: "Paul Douglas Institute",
    date: "October 2024 - Present",
    description:
      "",
    highlights: [
      "Selected as 1 of 23 mentees for a competitive 6-month mentorship with an Apple engineer.",
    ],
  },
  {
    title: "Business Development Intern",
    organization: "Polsky Center for Innovation",
    date: "Jan 2026 - Present",
    description:
      "",
    highlights: [
      "Lead software strategy for a 50-member team, overseeing development in robot policies, imitation & reinforcement learning, perception (SLAM, VLA), simulation (URDF, Isaac Sim), full-stack ROS2 integration.",
    ],
  },
  {
    title: "Research and Data Intern",
    organization: "Center for Tax and Budget Accountability",
    date: "December 2025 - Present",
    description:
      "",
    highlights: [
      "Selected for a highly competitive 10-week leadership development program with mentorship from Accenture executives.",
    ],
  },
  {
    title: "Head of Marketing and Engagement",
    organization: "UChicago Chinese Undergraduate Student Association",
    date: "Sep 2025 - Present",
    description:
      "",
    highlights: [
      "Hosted meetings for 100+ club members, introducing them to diverse aspects of the computer science industry.",
      "Directed the projects committee, guiding members through semester-long group coding projects in interest areas.",
    ],
  },
  {
    title: "Budget Analyst Intern",
    organization: "Citizens Budget Commission",
    date: "May 2025 - August 2025",
    description:
      "",
    highlights: [
      "Creating weekly opponent scouting reports using video analysis and advanced metrics (possession %, PPDA, deep completed crosses, aerial duels won, etc) to inform tactics for 10+ matches.",
      "Built an AI sports agent with CrewAI to analyze 40+ opposition metrics and suggest tactical counter-strategies.",
      "Supported with training, equipment, and matchday operations, ensuring smooth execution alongside coaching staff.",
    ],
  },
];

// Sample education data - Update with your own education
const education: ExperienceItem[] = [
  {
    title: "B.A. in Economics and Public Policy",
    organization: "University of Chicago",
    date: "2024 - 2028",
    description:
      "In progress. Focused on applied data science and AI/ML.",
    highlights: [
      "GPA: 3.7/4.0",
      "First Phoenix Scholar", 
    ],
  },
  {
    title: "High School Diploma",
    organization: "Stuyvesant High School",
    date: "2020 - 2024",
    description:
      "Graduated with distinction. Active in student clubs and leadership.",
    highlights: [
      "GPA: 96/100",
      "SAT: 1564",
      "Founder and President of Sports Management Club",
      "Stuyvesant Spectator (Sports Writer)",
      "Stuyvesant Student Union (External Affairs)",
      "Stuyvesant Honor Society ARISTA (Tutor and Volunteer)",
      "Stuyvesant Writing Center (Editor)",
      "Stuyvesant Big Sib Program (Mentor)",
      "Stuyvesant Wellness Council (Co-Chair)",
      "Varsity Soccer Team (Athlete)",
    ],
  }
];

const learningTracks: LearningTrack[] = [
  {
    area: "Machine Learning & AI",
    summary:
      "Building strong theoretical foundations and hands-on experience in modern machine learning and language models.",
    items: [
      {
        title: "CS50's Introduction to Artificial Intelligence with Python",
        type: "course",
        provider: "HarvardX",
        date: "2025",
        description: "Complete. Course projects on GitHub for practical experience.",
      },
    ],
  },
  {
    area: "Systems & Networking",
    summary:
      "Developing an understanding of networking fundamentals and real-world system design.",
    items: [
      {
        title: "Cisco Certified Network Associate (CCNA)",
        type: "course",
        provider: "Cisco",
        date: "2025",
        description: "Complete. Badge on LinkedIn for display.",
      },
    ],
  },
  {
    area: "Cloud Computing & DevOps",
    summary:
      "Developing an understanding of cloud infrastructure, deployment, and continuous integration/continuous deployment (CI/CD) practices.",
    items: [
      {
        title: "AWS Certified Cloud Practitioner (CCP)",
        type: "course",
        provider: "AWS",
        date: "2026",
        description: "Complete. Badge on LinkedIn for display.",
      },
    ],
  },
  {
    area: "Algorithms & Problem Solving",
    summary:
      "Strengthening algorithmic thinking and data structure fundamentals.",
    items: [
      {
        title: "Grokking Algorithms",
        type: "book",
        provider: "Aditya Bhargava",
      },
    ],
  },
  {
    area: "Industry Exposure & Programs",
    summary:
      "Engagement with industry engineers and real-world software development practices.",
    items: [
      {
        title: "Goldman Sachs Engineering Possibilities Summit",
        type: "program",
        provider: "Goldman Sachs",
        date: "2025",
      },
    ],
  },
];
