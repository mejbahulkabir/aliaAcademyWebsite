import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { useCountUp } from "@/hooks/use-count-up";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export function AnimatedCounter({ value, suffix = "", label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (inView) setStarted(true);
  }, [inView]);
  const count = useCountUp(value, 1600, started);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
        <span>{count.toLocaleString()}</span>
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
    </div>
  );
}