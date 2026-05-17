import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageHeader } from "@/components/sections/page-header";
import { BlogCard } from "@/components/common/cards";
import { BLOG_POSTS } from "@/constants/data";
import { stagger } from "@/animations/variants";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () => buildHead({ title: "Blog", description: "Strategy, syllabus and service insights from Alia Academy's faculty — NDA, CDS, AFCAT, SSB and more.", path: "/blog" }),
  component: Blog,
});

function Blog() {
  return (
    <>
      <PageHeader eyebrow="Insights" title="Strategy & service writing" description="Long-form articles from our faculty — practical, specific and based on what actually works." />
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((p) => (<BlogCard key={p.slug} post={p} />))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
