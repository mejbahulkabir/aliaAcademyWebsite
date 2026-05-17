import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageHeader } from "@/components/sections/page-header";
import { FacultyCard } from "@/components/common/cards";
import { CTASection } from "@/components/common/cta-section";
import { FACULTY } from "@/constants/data";
import { stagger } from "@/animations/variants";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/faculty")({
  head: () => buildHead({ title: "Faculty", description: "Meet Alia Academy's faculty — retired officers from Army, Navy and Air Force, and subject specialists with decades of teaching experience.", path: "/faculty" }),
  component: Faculty,
});

function Faculty() {
  return (
    <>
      <PageHeader eyebrow="The mentors" title="Faculty who have served, and now teach." description="Operational experience meets pedagogy." />
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {FACULTY.map((f) => (<FacultyCard key={f.id} faculty={f} />))}
          </motion.div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
