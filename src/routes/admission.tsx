import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2, Send } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { admissionSchema, type AdmissionFormValues } from "@/schemas/forms";
import { submitAdmission } from "@/services/api";
import { useSiteData } from "@/lib/site-data";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/admission")({
  head: () => buildHead({ title: "Online Admission", description: "Apply online for Afrin Defence Academy's defence preparation programs. Limited seats per batch.", path: "/admission" }),
  component: Admission,
});

function Admission() {
  const { courses: COURSES, exams: EXAMS } = useSiteData();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<AdmissionFormValues>({ resolver: zodResolver(admissionSchema), defaultValues: { course: COURSES[0]?.title ?? "", targetExam: EXAMS[0]?.name ?? "" } });
  const consent = watch("consent");

  const onSubmit = async (values: AdmissionFormValues) => {
    setLoading(true);
    const res = await submitAdmission(values);
    setLoading(false);
    if (res.ok) {
      const id = (res.data as { applicationId: string }).applicationId;
      setSuccess(id);
      toast.success(`Application received — reference ${id}`);
      reset();
    } else toast.error(res.error ?? "Could not submit. Please try again.");
  };

  return (
    <>
      <PageHeader eyebrow="Online Admission" title="Begin your application" description="Fill the form — our admissions officer will call you within one working day." />
      <section className="py-20 md:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          {success ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="bg-gradient-ocean mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full text-white"><CheckCircle2 className="h-6 w-6" /></div>
              <h2 className="font-display mt-4 text-2xl font-semibold">Application received</h2>
              <p className="mt-2 text-sm text-muted-foreground">Reference ID: <span className="font-mono text-foreground">{success}</span></p>
              <Button onClick={() => setSuccess(null)} className="mt-6 bg-[var(--navy-deep)] text-white hover:bg-[var(--navy)]">Submit another</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <div><Label htmlFor="fullName">Full name</Label><Input id="fullName" {...register("fullName")} aria-invalid={!!errors.fullName} />{errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p>}</div>
                <div><Label htmlFor="dob">Date of birth</Label><Input id="dob" type="date" {...register("dob")} aria-invalid={!!errors.dob} />{errors.dob && <p className="mt-1 text-xs text-destructive">{errors.dob.message}</p>}</div>
                <div><Label htmlFor="email">Email</Label><Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />{errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}</div>
                <div><Label htmlFor="phone">Phone</Label><Input id="phone" {...register("phone")} aria-invalid={!!errors.phone} />{errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}</div>
                <div><Label htmlFor="qualification">Qualification</Label><Input id="qualification" placeholder="e.g. Class 12 (Science)" {...register("qualification")} />{errors.qualification && <p className="mt-1 text-xs text-destructive">{errors.qualification.message}</p>}</div>
                <div><Label htmlFor="city">City</Label><Input id="city" {...register("city")} />{errors.city && <p className="mt-1 text-xs text-destructive">{errors.city.message}</p>}</div>
                <div><Label htmlFor="course">Preferred course</Label><select id="course" {...register("course")} className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">{COURSES.map((c) => (<option key={c.slug} value={c.title}>{c.title}</option>))}</select></div>
                <div><Label htmlFor="targetExam">Target exam</Label><select id="targetExam" {...register("targetExam")} className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">{EXAMS.map((e) => (<option key={e.slug} value={e.name}>{e.name}</option>))}</select></div>
                <div className="md:col-span-2"><Label htmlFor="message">Anything we should know?</Label><Textarea id="message" rows={4} {...register("message")} /></div>
                <div className="md:col-span-2 flex items-start gap-2">
                  <Checkbox id="consent" checked={!!consent} onCheckedChange={(v) => setValue("consent", v === true, { shouldValidate: true })} />
                  <label htmlFor="consent" className="text-sm text-muted-foreground">I agree to be contacted by Afrin Defence Academy and accept the privacy policy.</label>
                </div>
                {errors.consent && <p className="md:col-span-2 -mt-2 text-xs text-destructive">{errors.consent.message}</p>}
              </div>
              <Button type="submit" disabled={loading} className="mt-6 bg-[var(--navy-deep)] text-white hover:bg-[var(--navy)]">{loading ? "Submitting..." : (<>Submit application <Send className="ml-2 h-4 w-4" /></>)}</Button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
