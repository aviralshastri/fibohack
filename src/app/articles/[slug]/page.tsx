import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import Layout from "@/components/Layout/Layout";
import Image from "next/image";

export async function generateStaticParams() {
  const articles = ["article1", "article2"];
  return articles.map((slug: string) => ({ slug }));
}


async function getArticleContent(slug: string) {
  const filePath = path.join(process.cwd(), "public", "articles", `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const processedContent = await remark().use(html).process(fileContents);
  const contentHtml = processedContent.toString();

  return contentHtml;
}

export default async function ArticlePage({ params }) {
  const { slug } = params;
  const contentHtml = await getArticleContent(slug);
  const imageUrl = `/articles/${slug}.jpg`;

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
