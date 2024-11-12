import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import Layout from "@/components/Layout/Layout";

export async function generateStaticParams() {
  const tutorials = ["tutorial1", "tutorial2"];
  return tutorials.map((slug: string) => ({ slug }));
}

async function getTutorialContent(slug: string) {
  const filePath = path.join(process.cwd(), "public", "tutorials", `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const processedContent = await remark().use(html).process(fileContents);
  const contentHtml = processedContent.toString();

  return contentHtml;
}

export default async function TutorialPage({ params }) {
  const { slug } = params;
  const contentHtml = await getTutorialContent(slug);

  const videoUrl = `/tutorials/${slug}.mp4`;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl mb-24 flex justify-center">
          <video
            controls
            className="w-4/5 max-w-full h-auto rounded-lg shadow-lg"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <article className="prose prose-lg max-w-3xl items-center justify-center pl-8">
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>
      </div>
    </Layout>
  );
}
