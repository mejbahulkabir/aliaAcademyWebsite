import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/sections/page-header";
import { StatsBand } from "@/components/sections/stats";
import { WhyUs } from "@/components/sections/why-us";
import { CTASection } from "@/components/common/cta-section";
import { SectionHeading } from "@/components/common/section-heading";
import { buildHead } from "@/lib/seo";
import { motion } from "motion/react";
import { fadeUp, stagger } from "@/animations/variants";
import { Award, Target, Users, Compass } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => buildHead({ title: "About Academy", description: "Founded in 2007, Alia Academy is India's premier coaching institute for defence forces, with 3,200+ commissioned officers and 18+ years of training excellence.", path: "/about" }),
  component: About,
});

const VALUES = [
  { Icon: Award, title: "Excellence", body: "Officer-grade standards in every class, mock and conference." },
  { Icon: Target, title: "Discipline", body: "A military-style schedule and code of conduct on campus." },
  { Icon: Users, title: "Mentorship", body: "1:30 mentor-to-cadet ratio with weekly 1-on-1 reviews." },
  { Icon: Compass, title: "Integrity", body: "Honest feedback, transparent fees, no false promises." },
];

function About() {
  return (
    <>
      <PageHeader eyebrow="About the Academy" title="Eighteen years of training India's officers" description="Founded in 2007 by serving and retired officers, Alia Academy has prepared over 12,500 aspirants for the Indian Armed Forces with measurable, repeatable results." />
      <section className="py-20 md:py-24">
        <div className="container mx-auto grid items-start gap-12 px-4 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Our mission</h2>
            <p className="mt-4 text-muted-foreground">To train every cadet who walks through our gates not just to clear an exam, but to wear the uniform with the bearing, integrity and competence the Indian Armed Forces deserve.</p>
            <p className="mt-4 text-muted-foreground">From the foundation classes for class-11 aspirants to the SSB mastery program for last-mile candidates, every course is designed by serving and retired officers who have lived the syllabus.</p>
          </div>
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Our story</h2>
            <p className="mt-4 text-muted-foreground">Started in a single classroom in 2007 by Col. Arvind Mehra (Retd.), Alia has grown into a multi-acre campus with a real GTO ground, psychology labs, an obstacle course, and live AFSB simulators.</p>
            <p className="mt-4 text-muted-foreground">Through 18 years and 36+ NDA batches, our principle has remained unchanged: small classes, deep mentorship, and faculty who have served.</p>
          </div>
        </div>
      </section>
      <StatsBand />
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading eyebrow="Our values" title="Four pillars that shape every cadet" />
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ Icon, title, body }) => (
              <motion.div key={title} variants={fadeUp} className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="bg-gradient-ocean inline-flex h-11 w-11 items-center justify-center rounded-xl text-white"><Icon className="h-5 w-5" /></div>
                <h3 className="font-display mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <WhyUs />
      <CTASection />
    </>
  );
}
