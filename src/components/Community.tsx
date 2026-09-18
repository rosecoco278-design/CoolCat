import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import ParticleBackground from "@/components/ui/particle-background";
import CircularTestimonials from "@/components/ui/circular-testimonials";

const placeholderTestimonials = [
  {
    quote:
      "Add a real quote here — what did this person say about working or connecting with you?",
    name: "Placeholder Name",
    designation: "Role / Relationship",
    src: "https://placehold.co/600x600/1a1a1a/8b5cf6?text=Photo+1",
  },
  {
    quote:
      "Add a real quote here — what did this person say about working or connecting with you?",
    name: "Placeholder Name",
    designation: "Role / Relationship",
    src: "https://placehold.co/600x600/1a1a1a/8b5cf6?text=Photo+2",
  },
  {
    quote:
      "Add a real quote here — what did this person say about working or connecting with you?",
    name: "Placeholder Name",
    designation: "Role / Relationship",
    src: "https://placehold.co/600x600/1a1a1a/8b5cf6?text=Photo+3",
  },
];

export default function Community() {
  return (
    <section id="community" className="relative bg-black py-20 sm:py-28 overflow-hidden">
      <ParticleBackground className="-z-10" />
      <SectionWrapper id="community-content">
        <SectionHeading kicker="Work" title="Community" align="center" />
        <p className="mt-3 text-muted-foreground text-[16px] max-w-2xl mx-auto text-center">
          Placeholder testimonials — swap in real photos, names, and quotes from people I've
          connected with.
        </p>

        <div className="mt-8 flex justify-center">
          <CircularTestimonials
            testimonials={placeholderTestimonials}
            autoplay
            colors={{
              name: "var(--foreground)",
              designation: "var(--muted-foreground)",
              testimony: "var(--foreground)",
              arrowBackground: "rgba(255,255,255,0.08)",
              arrowForeground: "var(--foreground)",
              arrowHoverBackground: "#8b5cf6",
            }}
            fontSizes={{ name: "24px", designation: "16px", quote: "18px" }}
          />
        </div>
      </SectionWrapper>
    </section>
  );
}
