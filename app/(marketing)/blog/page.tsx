import Link from "next/link";

export const metadata = {
  title: "Blog — block.me",
  description: "Tips, guides, and updates from block.me.",
};

const POSTS = [
  {
    slug: "why-ai-scraping",
    title: "Why AI Companies Are Scraping Your Website (And How to Stop Them)",
    excerpt: "AI companies need massive amounts of training data. Your content is part of that data — whether you agreed to it or not.",
    category: "Education",
    date: "Jun 15, 2026",
    readTime: "5 min",
  },
  {
    slug: "blockme-wix-guide",
    title: "How to Add block.me to Your Wix Site in 30 Seconds",
    excerpt: "A step-by-step guide to protecting your Wix site from AI scrapers without any coding knowledge.",
    category: "Tutorial",
    date: "Jun 10, 2026",
    readTime: "3 min",
  },
  {
    slug: "legal-to-block-ai",
    title: "Is It Legal to Block AI Scrapers? What Website Owners Should Know",
    excerpt: "Robots.txt is voluntary. Many AI companies ignore it. Here's what your legal options actually are.",
    category: "Legal",
    date: "Jun 5, 2026",
    readTime: "7 min",
  },
  {
    slug: "case-study-10k-scrapers",
    title: "Case Study: How One Blog Blocked 10,000 AI Scrapers in a Week",
    excerpt: "A food blogger was losing organic traffic to AI chatbots summarizing her recipes. Here's how she fought back.",
    category: "Case Study",
    date: "May 28, 2026",
    readTime: "4 min",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Education: "bg-accent/15 text-accent",
  Tutorial: "bg-success/15 text-success",
  Legal: "bg-warning/15 text-warning",
  "Case Study": "bg-white/10 text-white/70",
};

export default function BlogPage() {
  return (
    <div className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-14">
          <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-3" style={{ fontFamily: "var(--font-syne)" }}>Blog</span>
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>Tips, guides & updates.</h1>
          <p className="text-white/60 text-lg">From the block.me team.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category]}`}>
                  {post.category}
                </span>
              </div>
              <h2 className="font-bold text-white mb-3 group-hover:text-accent transition-colors leading-snug" style={{ fontFamily: "var(--font-syne)" }}>
                {post.title}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-white/30">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime} read</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
