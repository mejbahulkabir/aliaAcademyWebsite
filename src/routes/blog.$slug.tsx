import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { loadBlogPost } from "@/lib/api-client";
import { CTASection } from "@/components/common/cta-section";
import { SITE } from "@/constants/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await loadBlogPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    const title = `${post.title} — ${SITE.name}`;
    return {
      meta: [
        { title },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${post.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${post.slug}` }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: post.title, author: { "@type": "Person", name: post.author }, datePublished: post.date }) }],
    };
  },
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="font-display text-4xl font-bold">Article not found</h1>
      <Link to="/blog" className="mt-4 inline-flex items-center gap-1 text-accent">← All articles</Link>
    </div>
  ),
  component: Post,
});

function Post() {
  const { post } = Route.useLoaderData();
  return (
    <>
      <article className="container mx-auto max-w-3xl px-4 py-20 md:py-28">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-navy"><ArrowLeft className="h-4 w-4" /> All articles</Link>
        <div className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{post.category}</div>
        <h1 className="font-display mt-2 text-4xl font-bold tracking-tight md:text-5xl">{post.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>{post.author}</span><span>·</span>
          <span>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
          <span>·</span><span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readingTime}</span>
        </div>
        <p className="mt-8 text-xl font-medium text-foreground/90">{post.excerpt}</p>
        <div className="prose prose-lg mt-6 max-w-none text-foreground/85 leading-relaxed">
          {post.content.split("\n\n").map((para, i) => (<p key={i} className="mt-4">{para}</p>))}
        </div>
      </article>
      <CTASection />
    </>
  );
}
