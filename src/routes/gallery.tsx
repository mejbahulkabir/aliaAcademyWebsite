import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/sections/page-header";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { CTASection } from "@/components/common/cta-section";
import { buildHead } from "@/lib/seo";
import classroom from "@/assets/gallery-classroom.jpg";
import pt from "@/assets/gallery-pt.jpg";
import grad from "@/assets/gallery-graduation.jpg";
import navy from "@/assets/gallery-navy.jpg";
import hero from "@/assets/hero-cadets.jpg";
import cta from "@/assets/cta-training.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => buildHead({ title: "Gallery", description: "A look inside Afrin Defence Academy — classrooms, parade ground, physical training, commissioning ceremonies and naval alumni.", path: "/gallery" }),
  component: Gallery,
});

function Gallery() {
  const items = [
    { src: hero, alt: "Cadets on parade", caption: "Annual passing-out parade" },
    { src: classroom, alt: "Cadets in strategy class", caption: "Map briefing & GS class" },
    { src: pt, alt: "Cadets PT", caption: "Dawn PT on the field" },
    { src: grad, alt: "Graduation", caption: "Commissioning ceremony" },
    { src: navy, alt: "Naval alumni", caption: "Naval Academy alumni at sea" },
    { src: cta, alt: "Cadets running", caption: "Endurance training" },
    { src: pt, alt: "Push-ups", caption: "Strength block" },
    { src: classroom, alt: "Briefing", caption: "Officer-led briefing" },
  ];
  return (
    <>
      <PageHeader eyebrow="Gallery" title="Inside Afrin Defence Academy" />
      <section className="py-20 md:py-24"><div className="container mx-auto px-4"><GalleryGrid items={items} /></div></section>
      <CTASection />
    </>
  );
}
