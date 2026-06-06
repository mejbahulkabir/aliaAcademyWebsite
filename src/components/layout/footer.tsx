import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Shield, Twitter, Youtube } from "lucide-react";
import { NAV_LINKS } from "@/constants/site";
import { useSiteData } from "@/lib/site-data";
export function Footer() {
  const { site: SITE } = useSiteData();
  const social = [
    { href: SITE.socials?.facebook ?? "#", label: "Facebook", Icon: Facebook },
    { href: SITE.socials?.instagram ?? "#", label: "Instagram", Icon: Instagram },
    { href: SITE.socials?.youtube ?? "#", label: "YouTube", Icon: Youtube },
    { href: SITE.socials?.twitter ?? "#", label: "Twitter", Icon: Twitter },
    { href: SITE.socials?.linkedin ?? "#", label: "LinkedIn", Icon: Linkedin },
  ];
  return (
    <footer className="bg-gradient-ocean relative mt-20 overflow-hidden text-white">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.08]" />
      <div className="container relative mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur"><Shield className="h-5 w-5 text-white" /></div>
              <div className="font-display text-lg font-semibold tracking-tight">{SITE.name}</div>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/70">{SITE.tagline}. Training the next generation of officers since 2007.</p>
            <div className="mt-5 flex gap-2">{social.map(({ href, label, Icon }) => (<a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15"><Icon className="h-4 w-4" /></a>))}</div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal-soft)]">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm">{NAV_LINKS.map((l) => (<li key={l.to}><Link to={l.to} className="text-white/80 transition-colors hover:text-white">{l.label}</Link></li>))}</ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal-soft)]">Programs</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/courses" className="text-white/80 hover:text-white">NDA Foundation</Link></li>
              <li><Link to="/courses" className="text-white/80 hover:text-white">CDS Intensive</Link></li>
              <li><Link to="/courses" className="text-white/80 hover:text-white">AFCAT Pro</Link></li>
              <li><Link to="/courses" className="text-white/80 hover:text-white">SSB Interview</Link></li>
              <li><Link to="/courses" className="text-white/80 hover:text-white">CAPF AC</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal-soft)]">Get in touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {SITE.address}</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> <a href={`tel:${SITE.phoneRaw}`} className="hover:text-white">{SITE.phone}</a></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Crafted with discipline · Built for India's future officers</p>
        </div>
      </div>
    </footer>
  );
}
