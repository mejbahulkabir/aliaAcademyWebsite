import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageHeader } from "@/components/sections/page-header";
import { TestimonialCard } from "@/components/common/cards";
import { StatsBand } from "@/components/sections/stats";
import { CTASection } from "@/components/common/cta-section";
import { TESTIMONIALS } from "@/constants/data";
import { stagger } from "@/animations/variants";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/success-stories")({
  head: () => buildHead({ title: "Success Stories", description: "Read how cadets and officers — from NDA toppers to AFCAT all-India rankers — began their journey at Alia Academy.", path: "/success-stories" }),
  component: Stories,
});

function Stories() {
  return (
    <>
      <PageHeader eyebrow="Results" title="3,200+ officers. One academy." description="The numbers tell one story. The voices tell another." />
      <StatsBand />
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (<TestimonialCard key={t.id} t={t} />))}
          </motion.div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
