import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageHeader } from "@/components/sections/page-header";
import { CourseCard } from "@/components/common/cards";
import { CTASection } from "@/components/common/cta-section";
import { COURSES } from "@/constants/data";
import { stagger } from "@/animations/variants";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/courses")({
  head: () => buildHead({ title: "Courses", description: "Explore Afrin Defence Academy's full range of defence preparation courses: NDA Foundation, CDS Intensive, AFCAT Pro, SSB Mastery, Agniveer and CAPF AC.", path: "/courses" }),
  component: Courses,
});

function Courses() {
  return (
    <>
      <PageHeader eyebrow="Programs" title="Choose your training track" description="Six specialised programs covering every officer entry into the Indian Armed Forces and CAPF." />
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {COURSES.map((c) => (<CourseCard key={c.slug} course={c} />))}
          </motion.div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
