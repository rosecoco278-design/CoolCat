import { useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { fadeIn } from "@/lib/motion";
import PlanetCanvas from "@/components/Planet";

const EMAILJS_PUBLIC_KEY = "8hYof8kJYVV4O_0P9";
const EMAILJS_SERVICE_ID = "service_86uro5f";
const EMAILJS_TEMPLATE_ID = "template_36m1ss9";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          title: "New Message from Portfolio",
          time: new Date().toLocaleString(),
        },
        EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Ahh, something went wrong. Please try again.");
        },
      );
  };

  return (
    <SectionWrapper id="contact">
      <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
        <motion.div variants={fadeIn("left", "tween", 0.2, 1)} className="flex-[0.75]">
          <Card className="bg-card border-border p-8">
            <SectionHeading kicker="Get in touch" title="Contact." size="compact" />

            <form ref={formRef} onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's your good name?"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your email address?"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={7}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What do you want to say?"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-fit" disabled={loading}>
                {loading ? "Sending..." : "Send"}
              </Button>
            </form>
          </Card>
        </motion.div>

        <motion.div
          variants={fadeIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
        >
          <PlanetCanvas />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
