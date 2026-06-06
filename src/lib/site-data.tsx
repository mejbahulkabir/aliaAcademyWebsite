import { createContext, useContext, type ReactNode } from "react";
import type { SiteData, SiteSettingsData, WhyUsItem } from "@/lib/api-client";
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

const DEFAULT_DATA: SiteData = {
  site: SITE_FALLBACK as SiteSettingsData,
  courses: COURSES_FALLBACK,
  exams: EXAMS_FALLBACK,
  faculty: FACULTY_FALLBACK,
  testimonials: TESTIMONIALS_FALLBACK,
  blog: BLOG_FALLBACK,
  stats: STATS_FALLBACK,
  whyUs: WHY_US_FALLBACK as WhyUsItem[],
  banners: [],
  gallery: [],
};

const SiteDataContext = createContext<SiteData>(DEFAULT_DATA);

export function SiteDataProvider({ value, children }: { value: SiteData; children: ReactNode }) {
  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData(): SiteData {
  return useContext(SiteDataContext);
}
