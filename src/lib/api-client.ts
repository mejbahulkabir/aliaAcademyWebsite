import type { Course, Exam, Faculty, Testimonial, BlogPost, Stat, GalleryItem } from "@/types";
import { SITE as SITE_FALLBACK } from "@/constants/site";
import {
  COURSES as COURSES_FALLBACK,
  EXAMS as EXAMS_FALLBACK,
  FACULTY as FACULTY_FALLBACK,
  TESTIMONIALS as TESTIMONIALS_FALLBACK,
  BLOG_POSTS as BLOG_FALLBACK,
  STATS as STATS_FALLBACK,
  WHY_US as WHY_US_FALLBACK,
} from "@/constants/data";

export interface Banner {
  id: string;
  slot: "hero" | "cta";
  image: string;
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  active?: boolean;
  order?: number;
}

export interface SiteSettingsData {
  name: string;
  shortName?: string;
  tagline?: string;
  description?: string;
  phone?: string;
  phoneRaw?: string;
  email?: string;
  whatsapp?: string;
  address?: string;
  mapsEmbed?: string;
  socials?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface WhyUsItem {
  title: string;
  desc: string;
}

export interface SiteData {
  site: SiteSettingsData;
  courses: Course[];
  exams: Exam[];
  faculty: Faculty[];
  testimonials: Testimonial[];
  blog: BlogPost[];
  stats: Stat[];
  whyUs: WhyUsItem[];
  banners: Banner[];
  gallery: GalleryItem[];
}

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:4000";

async function fetchOrFallback<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, { headers: { Accept: "application/json" } });
    if (!res.ok) return fallback;
    const data = (await res.json()) as T;
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

export async function loadSiteData(): Promise<SiteData> {
  const [site, courses, exams, faculty, testimonials, blog, stats, whyUs, banners, gallery] = await Promise.all([
    fetchOrFallback<SiteSettingsData | null>("/api/site", null),
    fetchOrFallback<Course[]>("/api/courses", []),
    fetchOrFallback<Exam[]>("/api/exams", []),
    fetchOrFallback<Faculty[]>("/api/faculty", []),
    fetchOrFallback<Testimonial[]>("/api/testimonials", []),
    fetchOrFallback<BlogPost[]>("/api/blog", []),
    fetchOrFallback<Stat[]>("/api/stats", []),
    fetchOrFallback<WhyUsItem[]>("/api/why-us", []),
    fetchOrFallback<Banner[]>("/api/banners", []),
    fetchOrFallback<GalleryItem[]>("/api/gallery", []),
  ]);

  return {
    site: site ?? SITE_FALLBACK,
    courses: courses.length ? courses : COURSES_FALLBACK,
    exams: exams.length ? exams : EXAMS_FALLBACK,
    faculty: faculty.length ? faculty : FACULTY_FALLBACK,
    testimonials: testimonials.length ? testimonials : TESTIMONIALS_FALLBACK,
    blog: blog.length ? blog : BLOG_FALLBACK,
    stats: stats.length ? stats : STATS_FALLBACK,
    whyUs: whyUs.length ? whyUs : WHY_US_FALLBACK,
    banners,
    gallery,
  };
}

export async function loadBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_URL}/api/blog/${encodeURIComponent(slug)}`, {
      headers: { Accept: "application/json" },
    });
    if (res.ok) return (await res.json()) as BlogPost;
  } catch {
    /* fallthrough */
  }
  return BLOG_FALLBACK.find((p) => p.slug === slug) ?? null;
}

export interface SubmitResult {
  ok: boolean;
  data?: { applicationId?: string; id?: string };
  error?: string;
}

async function submit(path: string, payload: unknown): Promise<SubmitResult> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await res.json().catch(() => null);
    if (!res.ok) {
      return { ok: false, error: body?.error ?? `Request failed: ${res.status}` };
    }
    return { ok: true, data: body };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}

export function submitContact(payload: unknown) {
  return submit("/api/forms/contact", payload);
}

export function submitAdmission(payload: unknown) {
  return submit("/api/forms/admission", payload);
}
