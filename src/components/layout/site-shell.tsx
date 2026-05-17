import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { BackToTop } from "@/components/common/back-to-top";
import { MobileStickyCTA } from "@/components/common/mobile-sticky-cta";
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <MobileStickyCTA />
    </div>
  );
}
