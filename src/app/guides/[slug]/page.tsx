import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import Layout from "@/components/Layout/Layout";
import Image from "next/image";

export async function generateStaticParams() {
  const guides = ["guide1", "guide2"];
  return guides.map((slug: string) => ({ slug }));
}

async function getGuideContent(slug: string) {
  const filePath = path.join(process.cwd(), "public", "guides", `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const processedContent = await remark().use(html).process(fileContents);
  const contentHtml = processedContent.toString();

  return contentHtml;
}

export default async function GuidePage({ params }) {
  const { slug } = params;
  const contentHtml = await getGuideContent(slug);
  const imageUrl = `/guides/${slug}.jpg`;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-1/2 mb-6">
          <Image
            src={imageUrl}
            alt={`${slug} thumbnail`} 
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <article className="prose prose-lg max-w-3xl">
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>
      </div>
    </Layout>
  );
}
