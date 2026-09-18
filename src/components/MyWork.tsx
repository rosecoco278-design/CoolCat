import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AetherFlowHero from "@/components/ui/aether-flow-hero";
import Tech from "@/components/Tech";
import { workCategories } from "@/data";
import { fadeIn } from "@/lib/motion";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function MyWork({ onSelectCategory }: { onSelectCategory: (id: string) => void }) {
  const handleClick = (id: string) => {
    if (id === "community") {
      scrollToId("community");
    } else {
      onSelectCategory(id);
      scrollToId("work-folders");
    }
  };

  return (
    <section id="work" className="relative">
      <AetherFlowHero
        compact
        badgeLabel="Explore"
        title="Work"
        subtitle="Six spaces for the different things I build, think about, and share — click any of them below to dive in."
      />

      <div className="relative bg-black pb-20 sm:pb-24 px-6 sm:px-16">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {workCategories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => handleClick(category.id)}
              variants={fadeIn("up", "spring", index * 0.1, 0.6)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -4 }}
              className="text-left rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-violet-400/40 transition-colors p-6 group"
            >
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                {category.label}
              </h3>
              <p className="mt-2 text-gray-400 text-[15px] leading-relaxed">{category.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-violet-300 text-sm font-semibold">
                View section
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/8 text-foreground group-hover:bg-violet-500 group-hover:text-white transition-colors">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </span>
            </motion.button>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-12 border-t border-white/10">
          <p className="text-center text-gray-400 text-sm uppercase tracking-wider mb-8">
            Skills &amp; Tools
          </p>
          <Tech />
        </div>
      </div>
    </section>
  );
}
