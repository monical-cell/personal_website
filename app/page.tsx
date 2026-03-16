"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { useState, MouseEvent } from "react";

/**
 * Home Page Component - Space Hub / Mission Control
 * 
 * Features:
 * - Floating hero card with 3D tilt on mouse move
 * - Staggered text animations
 * - Portal-style CTA buttons with magnetic hover
 * - Energy glow effects
 * - Acts as the hub to other worlds
 */
export default function Home() {
  const [isHovering, setIsHovering] = useState(false);
  
  // Motion values for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovering(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 relative overflow-hidden max-w-6xl">
      {/* Floating Hero Card with 3D Tilt */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="max-w-4xl mx-auto text-center perspective-1000 will-change-transform"
      >
        {/* Glowing card background */}
        <div className="relative">
          {/* Animated glow on hover */}
          <motion.div
            animate={{
              opacity: isHovering ? 0.3 : 0.15,
              scale: isHovering ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="absolute -inset-4 bg-gradient-to-r from-white/30 via-white/30 to-white/30 rounded-3xl blur-2xl"
            aria-hidden="true"
          />
          
          {/* Main content card */}
          <div className="relative bg-background/80 backdrop-blur-xl border border-white/50/20 rounded-2xl p-6 md:p-12 shadow-2xl">
            {/* Mission Control Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50/10 border border-white/50/30 mb-8"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium text-yellow-200">Systems Online</span>
            </motion.div>

            {/* Staggered Headline Animation */}
            <div className="space-y-3 mb-6">
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {/* Staggered text reveal */}
                {"Hi, I'm ".split("").map((char, i) => (
                  <motion.span
                    key={`hi-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
                <span className="relative inline-block">
                  {"Monica".split("").map((char, i) => (
                    <motion.span
                      key={`name-${i}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.05 }}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-300 to-yellow-300"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="text-lg md:text-xl lg:text-2xl text-muted-foreground"
              >
                Economics and Public Policy @ UChicago
              </motion.p>
            </div>

            {/* Introduction */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6"
            >
              I'm a software developer with a computer engineering background, and 
              a passion for building applied, data-driven solutions across various domains.
            </motion.p>

            {/* Portal-Style CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6"
            >
              <Link href="/projects" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  {/* Button glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/30 to-white/30 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300" />
                  
                  <Button size="lg" className="relative w-full bg-gradient-to-r from-white/30 to-white/30 hover:from-white/50 hover:to-white/50 border-0">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Explore Projects
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
              
              <Link href="/contact" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" variant="outline" className="w-full border-white/50/50 hover:bg-white/50/10">
                    Contact Me
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Social Links with stagger */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.5 }}
              className="flex gap-4 md:gap-6 justify-center pt-2"
            >
              {[
                { href: "https://github.com/monical-cell", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/monicalai06/", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:monical@uchicago.edu", icon: Mail, label: "Email" },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.label !== "Email" ? "_blank" : undefined}
                  rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.2 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-muted-foreground hover:text-yellow-300 transition-colors relative group"
                >
                  <div className="absolute inset-0 bg-white/50/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  <social.icon className="h-6 w-6 relative" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Floating orbs decoration */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-5 md:top-20 md:left-10 w-24 h-24 md:w-32 md:h-32 bg-white/50/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      
      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-10 right-5 md:bottom-20 md:right-10 w-32 h-32 md:w-40 md:h-40 bg-white/50/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
