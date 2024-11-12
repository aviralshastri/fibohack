"use client";

import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import Image from "next/image";

export default function Tutorials() {
  const tutorials = [
    {
      title: "Introduction to Water Conservation",
      slug: "tutorial2",
      description:
        " This tutorial offers a comprehensive introduction to water conservation, covering its importance, environmental impact, and practical strategies for reducing water use. Gain essential knowledge on how to contribute to sustainability and implement effective conservation practices in your daily life.",
    },
    {
      title: "Top 10 Tips to Save Water",
      slug: "tutorial1",
      description:
        "Our tutorial presents the top 10 tips for conserving water, offering practical and actionable strategies you can easily incorporate into your daily routine. Gain insights into effective water-saving techniques that not only help reduce your water usage but also contribute to environmental sustainability.",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Tutorials</h1>
        <div className="flex flex-wrap justify-center gap-4 w-full px-4">
          {tutorials.map((tutorial) => (
            <Link
              href={`/tutorials/${tutorial.slug}`}
              key={tutorial.slug}
              className="group w-full md:w-1/2 lg:w-1/3 px-4 mb-6 hover:-translate-y-2 duration-200"
            >
              <div className="flex flex-col h-full bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 p-6">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={`/tutorials/${tutorial.slug}.jpg`}
                    alt={tutorial.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col flex-grow text-start">
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {tutorial.title}
                  </h2>
                  <p className="text-gray-500 mb-4 flex-grow text-balance">
                    {tutorial.description}
                  </p>
                  <div className="text-blue-600 group-hover:underline">
                    → Watch Now
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
