import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { textVariant } from "@/lib/motion";

export default function SectionHeading({
  kicker,
  title,
  align = "left",
  size = "default",
  gradient = false,
  className,
}: {
  kicker: string;
  title: string;
  align?: "left" | "center";
  size?: "default" | "compact";
  gradient?: boolean | "violet";
  className?: string;
}) {
  return (
    <motion.div variants={textVariant()} className={cn(align === "center" && "text-center", className)}>
      <p
        className={cn(
          "sm:text-[18px] text-[14px] uppercase tracking-wider",
          gradient ? "text-gray-400" : "text-muted-foreground",
        )}
      >
        {kicker}
      </p>
      <h2
        className={cn(
          "font-black",
          gradient === "violet"
            ? "bg-clip-text text-transparent bg-gradient-to-b from-violet-300 to-violet-500"
            : gradient
              ? "bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
              : "text-foreground",
          size === "compact"
            ? "md:text-[42px] sm:text-[36px] xs:text-[30px] text-[24px]"
            : "md:text-[56px] sm:text-[46px] xs:text-[36px] text-[28px]",
        )}
      >
        {title}
      </h2>
    </motion.div>
  );
}
