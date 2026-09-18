"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import ParticleBackground from "@/components/ui/particle-background";

interface AetherFlowHeroProps {
  badgeLabel?: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaIcon?: ReactNode;
  onCtaClick?: () => void;
  /** Shorter, content-sized banner instead of a full 100vh hero. */
  compact?: boolean;
}

export default function AetherFlowHero({
  badgeLabel,
  title,
  subtitle,
  ctaLabel,
  ctaIcon,
  onCtaClick,
  compact = false,
}: AetherFlowHeroProps) {
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 + 0.2, duration: 0.8, ease: "easeInOut" },
    }),
  };

  return (
    <div
      className={cn(
        "relative w-full flex flex-col items-center justify-center overflow-hidden bg-black",
        compact ? "pt-10 pb-4 sm:pt-12 sm:pb-6" : "h-screen",
      )}
    >
      <ParticleBackground />

      <div className={cn("relative z-10 text-center px-6", compact ? "pt-6" : "py-6")}>
        {badgeLabel && (
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-sm",
              compact ? "mb-3" : "mb-6",
            )}
          >
            <span className="text-sm font-medium text-gray-200">{badgeLabel}</span>
          </motion.div>
        )}

        <motion.h2
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={cn(
            "font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400",
            compact ? "text-3xl md:text-5xl mb-3" : "text-5xl md:text-8xl mb-6",
          )}
        >
          {title}
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={cn(
            "max-w-2xl mx-auto text-gray-400",
            compact ? "text-base mb-5" : "text-lg mb-10",
          )}
        >
          {subtitle}
        </motion.p>

        {ctaLabel && (
          <motion.div custom={3} variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <button
              onClick={onCtaClick}
              className={cn(
                "bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition-colors duration-300 flex items-center gap-2 mx-auto",
                compact ? "px-6 py-3 text-sm" : "px-8 py-4",
              )}
            >
              {ctaLabel}
              {ctaIcon}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
