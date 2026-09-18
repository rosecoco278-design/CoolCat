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
            I'm a Finance and Strategy professional with extensive experience in FP&amp;A,
            business partnering, strategic planning, and business transformation. I enjoy
            turning complex financial and operational challenges into practical, data-driven
            solutions by combining finance expertise with AI, analytics, and technology.
          </p>
          <p>
            Beyond the numbers, I'm an old romantic soul who loves art and creativity. I'm
            naturally more introverted, but I can become quite the extrovert when I'm
            surrounded by people who are passionate about their vision, projects, and business
            insights.
          </p>
          <p>
            I'm also nearing the end of my MBA journey with NUS Business School and currently
            exploring the possibilities of AI through hands-on experiments and building things
            with AI.
          </p>
          <p>
            Always happy to connect, exchange ideas, collaborate, and build something
            meaningful together.
          </p>
          <p>Cheers!</p>
        </motion.div>
      </SectionWrapper>
    </div>
  );
}
