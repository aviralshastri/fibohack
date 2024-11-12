"use client";

import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import Image from "next/image";

export default function Articles() {
  const articles = [
    {
      title: "Water Scarcity: A Global Crisis",
      slug: "article1",
      description:
        "Water scarcity is one of the most pressing challenges of our time, driven by climate change, population growth, and pollution. As freshwater sources dwindle, millions of people face water shortages, leading to health, agricultural, and economic crises. To overcome this, we must adopt sustainable practices and foster international cooperation.",
    },
    {
      title:
        "The Importance of Water Conservation: Saving Our Most Vital Resource",
      slug: "article2",
      description:
        "Water conservation is crucial as growing populations and climate change increase demand on limited freshwater supplies. Simple changes in household, agricultural, and industrial water usage, combined with new technologies, can significantly reduce waste and protect our ecosystems. Together, we can secure water resources for future generations.",
    },
    {
      title: "Sustainable Water Management: A Blueprint for the Future",
      slug: "article3",
      description:
        "Sustainable water management focuses on balancing current water needs with future availability through integrated planning and conservation. By protecting ecosystems, using efficient technologies, and addressing challenges like climate change and pollution, we can secure a stable water supply for generations to come. Effective water management requires the collaboration of governments, industries, and communities.",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Articles</h1>
        <div className="flex flex-col items-center space-y-6">
          {articles.map((article) => (
            <Link
              href={`/articles/${article.slug}`}
              key={article.slug}
              className="group w-full md:w-3/4 lg:w-2/3 transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 p-6">
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  <Image
                    src={`/articles/${article.slug}.jpg`}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="w-full md:w-2/3 md:pl-6">
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {article.title}
                  </h2>
                  <p className="text-gray-500 mb-4">{article.description}</p>
                  <div className="text-blue-600 group-hover:underline">
                    → Explore
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
