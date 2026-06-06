import { motion } from "motion/react";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { useSiteData } from "@/lib/site-data";
import { stagger } from "@/animations/variants";
export function StatsBand() {
  const { stats: STATS } = useSiteData();
  return (
    <section className="border-y border-border bg-secondary/40 py-14 md:py-16">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="container mx-auto grid grid-cols-2 gap-y-10 px-4 md:grid-cols-4">
        {STATS.map((s) => (<AnimatedCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />))}
      </motion.div>
    </section>
  );
}
