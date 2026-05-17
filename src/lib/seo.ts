import { SITE } from "@/constants/site";
export interface PageSeo { title: string; description: string; path: string; ogType?: "website" | "article" }
export function buildHead({ title, description, path, ogType = "website" }: PageSeo) {
  const fullTitle = `${title} — ${SITE.name}`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: path },
      { property: "og:type", content: ogType },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}
