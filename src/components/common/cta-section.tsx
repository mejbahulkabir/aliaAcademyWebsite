import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteData } from "@/lib/site-data";
import ctaImg from "@/assets/cta-training.jpg";
export function CTASection() {
  const { site: SITE } = useSiteData();
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <img src={ctaImg} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-deep)]/95 via-[var(--navy)]/85 to-[var(--navy-deep)]/70" />
      </div>
      <div className="container mx-auto max-w-5xl px-4">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="text-center text-white">
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--teal-soft)]">Admissions Open · Batch 2026</span>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight md:text-5xl">Your shoulders deserve those stars.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 md:text-lg">Join 12,500+ aspirants who chose Afrin Defence Academy to take the disciplined route to a commissioned career.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-white text-[var(--navy-deep)] hover:bg-white/90"><Link to="/admission">Apply for Admission <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"><a href={`tel:${SITE.phoneRaw}`}><Phone className="mr-2 h-4 w-4" /> {SITE.phone}</a></Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
