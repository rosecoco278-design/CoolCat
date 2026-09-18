import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/SectionWrapper";
import { fadeIn } from "@/lib/motion";
import { socials } from "@/data";

export default function FollowCta() {
  return (
    <SectionWrapper id="follow">
      <motion.div variants={fadeIn("up", "spring", 0.1, 1)} className="text-center">
        <p className="text-muted-foreground text-[16px] mb-8">
          Follow along for more insights on finance, strategy, and AI
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
            <a href={socials.substack} target="_blank" rel="noopener noreferrer">
              Subscribe on Substack
            </a>
          </Button>
          <Button asChild size="lg" className="bg-blue-700 hover:bg-blue-800 text-white">
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
              Follow on LinkedIn
            </a>
          </Button>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
