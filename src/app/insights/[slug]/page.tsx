import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { insights } from "@/lib/data/insights";
import { buildInsightMetadata } from "@/lib/metadata";

// Generate static parameters for all known insights
export function generateStaticParams() {
  return insights.map((post) => ({
    slug: post.slug,
  }));
}

// Dynamic per-article metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) return {};
  return buildInsightMetadata(post);
}


export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Navigation Bar matching the theme */}
      <div className="w-full h-24 border-b border-gray-100 flex items-center px-6 md:px-16 sticky top-0 bg-white/80 backdrop-blur-md z-40">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>

      <main className="max-w-[800px] mx-auto px-6 md:px-0 mt-16">
        {/* Article Header */}
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 px-4 py-1.5 bg-[#E5ED64]/20 text-[#8b9117] rounded-full text-sm font-semibold tracking-wide uppercase inline-block">
            {post.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-500 font-medium">
            <span>{post.author}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
            <span>{post.date}</span>
          </div>
        </header>

        {/* Hero Image */}
        <div className="w-full aspect-[16/9] md:aspect-[21/9] relative rounded-3xl overflow-hidden mb-16 shadow-lg border border-gray-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#8b9117] hover:prose-a:text-black prose-img:rounded-2xl">
          {/* We use dangerouslySetInnerHTML because our mock data stores content as HTML strings */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
    </div>
  );
}
