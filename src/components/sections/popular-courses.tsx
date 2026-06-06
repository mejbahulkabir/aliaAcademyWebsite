import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { CourseCard } from "@/components/common/cards";
import { useSiteData } from "@/lib/site-data";
import { stagger } from "@/animations/variants";
export function PopularCourses() {
  const { courses: COURSES } = useSiteData();
  const list = COURSES.filter((c) => c.popular).concat(COURSES.filter((c) => !c.popular)).slice(0, 3);
  return (
    <section className="bg-secondary/40 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="Popular Courses" title="Programs built for India's toughest exams" />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (<CourseCard key={c.slug} course={c} />))}
        </motion.div>
        <div className="mt-10 text-center"><Link to="/courses" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-[var(--navy)]">View all courses <ArrowRight className="h-4 w-4" /></Link></div>
      </div>
    </section>
  );
}
