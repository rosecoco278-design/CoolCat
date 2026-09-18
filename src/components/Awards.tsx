import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import ParticleBackground from "@/components/ui/particle-background";
import { fadeIn } from "@/lib/motion";
import { awards } from "@/data";

function AwardCard({
  index,
  name,
  description,
  tags,
  image,
}: {
  index: number;
  name: string;
  description: string;
  tags: string[];
  image: string;
}) {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.4, 0.75)}>
      <Card className="bg-white/5 border-white/10 p-4 rounded-2xl h-full">
        <div className="w-full h-[132px] bg-white rounded-xl flex justify-center items-center p-7">
          <img src={image} alt={name} className="max-w-full max-h-full object-contain" />
        </div>
        <div className="mt-4">
          <h3 className="text-foreground font-bold text-[16px] leading-snug">{name}</h3>
          <p className="mt-2 text-muted-foreground text-[13px] leading-relaxed">{description}</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-[11px] border-violet-400/30 text-violet-300 bg-violet-500/10"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

export default function Awards() {
  return (
    <section className="relative bg-black overflow-hidden">
      <ParticleBackground className="-z-10" />
      <SectionWrapper id="awards">
        <SectionHeading kicker="Achievements" title="Awards & Recognition." />
        <div className="w-full flex">
          <motion.p
            variants={fadeIn("", "tween", 0.1, 1)}
            className="mt-3 text-muted-foreground text-[17px] max-w-3xl leading-[30px]"
          >
            Following highlights showcase my key business transformation projects and
            achievements. Each project demonstrates my strategic impact, technical expertise, and
            ability to drive measurable business results. These initiatives reflect my impact in
            financial strategy, operational excellence, and leveraging technology for competitive
            advantage.
          </motion.p>
        </div>
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {awards.map((award, index) => (
            <AwardCard key={award.name} index={index} {...award} />
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
