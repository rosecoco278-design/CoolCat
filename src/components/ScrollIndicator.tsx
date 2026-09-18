import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ScrollIndicator({
  targetId,
  className,
  light = true,
}: {
  targetId: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" })}
      aria-label="Scroll to next section"
      className={cn(
        "absolute xs:bottom-10 bottom-8 left-1/2 -translate-x-1/2 z-10",
        className,
      )}
    >
      <div
        className={cn(
          "w-[35px] h-16 rounded-3xl border-4 flex justify-center items-start p-2 transition-colors",
          light
            ? "border-violet-300/50 hover:border-violet-300"
            : "border-violet-400/50 hover:border-violet-400",
        )}
      >
        <motion.div
          animate={{ y: [0, 24, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          className={cn("w-3 h-3 rounded-full mb-1", light ? "bg-violet-300" : "bg-violet-400")}
        />
      </div>
    </button>
  );
}
