import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { fadeIn } from "@/lib/motion";

export default function About() {
  return (
    <div className="relative overflow-hidden">
      <video
        src={`${import.meta.env.BASE_URL}video/nhi-about-2.mp4`}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "80% 35%" }}
      />
      {/* Scrim: keeps the text readable and crops the CapCut watermark (top-left) out of view */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/40" />

      <SectionWrapper id="about">
        <SectionHeading kicker="Introduction" title="About Me." size="compact" gradient="violet" />

        <motion.div
          variants={fadeIn("right", "tween", 0.1, 1)}
          className="mt-4 max-w-xl space-y-5 text-gray-400 text-[17px] leading-[30px]"
        >
          <p>
            I'm a Finance &amp; Strategy professional with extensive experience turning complex
            business challenges into{" "}
            <strong className="text-foreground font-semibold">
              clear strategies, practical solutions, and measurable outcomes
            </strong>
            . My work sits at the intersection of{" "}
            <strong className="text-foreground font-semibold">
              finance, strategy, technology, and transformation
            </strong>
            , where I bring together commercial thinking, data, and technology to solve problems
            and create value.
          </p>
          <p>
            I'm also a <strong className="text-foreground font-semibold">creative at heart</strong>,
            with a deep appreciation for art, design, and unconventional ideas. I'm energised by
            solving business problems, exploring possibilities, and turning ideas into something
            tangible.
          </p>
          <p>
            <strong className="text-foreground font-semibold">
              This website was created by me and my AI partner.
            </strong>
          </p>
        </motion.div>
      </SectionWrapper>
    </div>
  );
}
