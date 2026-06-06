import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/hero";
import { StatsBand } from "@/components/sections/stats";
import { PopularCourses } from "@/components/sections/popular-courses";
import { ExamCategories } from "@/components/sections/exam-categories";
import { WhyUs } from "@/components/sections/why-us";
import { FacultyPreview } from "@/components/sections/faculty-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/common/cta-section";
import { SectionHeading } from "@/components/common/section-heading";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { BlogCard } from "@/components/common/cards";
import { motion } from "motion/react";
import { stagger } from "@/animations/variants";
import { useSiteData } from "@/lib/site-data";
import { buildHead } from "@/lib/seo";
import classroom from "@/assets/gallery-classroom.jpg";
import pt from "@/assets/gallery-pt.jpg";
import grad from "@/assets/gallery-graduation.jpg";
import navy from "@/assets/gallery-navy.jpg";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => buildHead({ title: "Home", description: "Afrin Defence Academy — India's premier defence forces coaching academy for NDA, CDS, AFCAT, SSB and CAPF. 97% SSB recommendation rate.", path: "/" }),
  component: Home,
});

function Home() {
  const { blog: BLOG_POSTS } = useSiteData();
  const gallery = [
    { src: classroom, alt: "Cadets in classroom", caption: "Strategy & GS classroom" },
    { src: pt, alt: "Cadets PT", caption: "Morning physical training" },
    { src: grad, alt: "Graduation", caption: "Commissioning ceremony" },
    { src: navy, alt: "Navy ship", caption: "Naval Academy alumni" },
  ];
  return (
    <>
      <Hero />
      <StatsBand />
      <WhyUs />
      <PopularCourses />
      <ExamCategories />
      <FacultyPreview />
      <Testimonials />
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <SectionHeading eyebrow="Inside the academy" title="Life at Afrin" description="Discipline, camaraderie and a campus built for officer training." />
          <div className="mt-12"><GalleryGrid items={gallery} /></div>
        </div>
      </section>
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <SectionHeading eyebrow="Latest from the blog" title="Strategy, syllabus & service insights" />
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.slice(0, 3).map((p) => (<BlogCard key={p.slug} post={p} />))}
          </motion.div>
          <div className="mt-10 text-center"><Link to="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-[var(--navy)]">All articles <ArrowRight className="h-4 w-4" /></Link></div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
