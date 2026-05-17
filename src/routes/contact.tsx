import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactSchema, type ContactFormValues } from "@/schemas/forms";
import { submitContact } from "@/services/api";
import { SITE } from "@/constants/site";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => buildHead({ title: "Contact", description: "Get in touch with Alia Academy — call, email, WhatsApp or visit our campus in New Delhi.", path: "/contact" }),
  component: Contact,
});

function Contact() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });
  const onSubmit = async (values: ContactFormValues) => {
    setLoading(true);
    const res = await submitContact(values);
    setLoading(false);
    if (res.ok) { toast.success("Message sent — we'll reply within 24 hours."); reset(); }
    else toast.error(res.error ?? "Failed to send. Please try again.");
  };
  return (
    <>
      <PageHeader eyebrow="Get in touch" title="Talk to our admissions team" description="We're here Monday to Saturday, 9 AM to 7 PM IST." />
      <section className="py-20 md:py-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            {[
              { Icon: Phone, title: "Call us", value: SITE.phone, href: `tel:${SITE.phoneRaw}` },
              { Icon: Mail, title: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
              { Icon: MapPin, title: "Visit", value: SITE.address },
            ].map(({ Icon, title, value, href }) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="bg-gradient-ocean flex h-11 w-11 items-center justify-center rounded-xl text-white"><Icon className="h-5 w-5" /></div>
                <div><div className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{title}</div>{href ? <a href={href} className="mt-1 block text-sm font-medium text-foreground hover:text-accent">{value}</a> : <p className="mt-1 text-sm text-foreground">{value}</p>}</div>
              </div>
            ))}
            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe title="Alia Academy location" src={SITE.mapsEmbed} loading="lazy" className="h-72 w-full" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-2xl font-semibold">Send us a message</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div><Label htmlFor="name">Name</Label><Input id="name" {...register("name")} aria-invalid={!!errors.name} />{errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}</div>
              <div><Label htmlFor="email">Email</Label><Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />{errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}</div>
              <div><Label htmlFor="phone">Phone</Label><Input id="phone" {...register("phone")} aria-invalid={!!errors.phone} />{errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}</div>
              <div><Label htmlFor="subject">Subject</Label><Input id="subject" {...register("subject")} aria-invalid={!!errors.subject} />{errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>}</div>
              <div className="md:col-span-2"><Label htmlFor="message">Message</Label><Textarea id="message" rows={5} {...register("message")} aria-invalid={!!errors.message} />{errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}</div>
            </div>
            <Button type="submit" disabled={loading} className="mt-6 bg-[var(--navy-deep)] text-white hover:bg-[var(--navy)]">{loading ? "Sending..." : (<>Send message <Send className="ml-2 h-4 w-4" /></>)}</Button>
          </form>
        </div>
      </section>
    </>
  );
}
