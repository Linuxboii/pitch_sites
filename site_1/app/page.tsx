"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroDashboardPreview } from "@/components/hero-dashboard-preview";
import { motion, useScroll, useTransform } from "framer-motion";

function BackgroundMesh() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[120px] animate-float opacity-40" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] animate-pulse-glow opacity-30" />
      <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px]" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
    </div>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, 50]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden relative">
      <BackgroundMesh />

      <div className="container px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center gap-12 pt-20 pb-20 md:py-32">
        {/* Left Column: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 space-y-8 text-center md:text-left"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
            NEXUS AI v2.0 Live
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/50 pb-2">
            Transform Data into <br />
            <span className="neon-gradient-text">Automated Decisions</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto md:mx-0 leading-relaxed">
            NEXUS AI connects your live business data to intelligent automation workflows powered by AI and Nexus Automate.
            From chaos to clarity in milliseconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <Link href="/dashboard">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all">
                Launch Live Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="#features">
              <Button size="lg" variant="ghost" className="h-14 px-8 text-lg rounded-full border border-white/10 hover:bg-white/5 backdrop-blur-md">
                <Play className="mr-2 h-4 w-4 fill-current" /> Watch Trailer
              </Button>
            </Link>
          </div>

          <div className="pt-8 flex items-center gap-6 justify-center md:justify-start text-sm text-muted-foreground/60">
            <div className="flex items-center gap-2">
              <div className="w-16 h-8 bg-white/5 rounded animate-pulse" />
              <span>Trusted by innovators</span>
            </div>
            <span>•</span>
            <span>SOC2 Type II Certified</span>
            <span>•</span>
            <span>99.99% Uptime</span>
          </div>
        </motion.div>

        {/* Right Column: Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 w-full max-w-[800px] perspective-container"
        >
          <HeroDashboardPreview />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
      </motion.div>
    </main>
  );
}
