"use client";

import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import Image from "next/image";

export default function Guides() {
  const guides = [
    {
      title: "Guide to Saving Water in the Kitchen",
      slug: "guide1",
      description:
        "Conserving water in the kitchen is both easy and impactful. By following practices such as running full dishwasher loads, fixing leaks promptly, and using water-efficient fixtures, you can significantly reduce your household's water usage. Simple steps like turning off taps while scrubbing and reusing water can also make a big difference.",
    },
    {
      title: "Water Saving Guide for Domestic Spaces (Outside the Kitchen)",
      slug: "guide2",
      description:
        "Effective water conservation involves more than just kitchen practices. By focusing on efficient water use in the bathroom, laundry room, and outdoor areas, you can make a substantial impact on your household’s water consumption. Simple actions like fixing leaks, using water-saving fixtures, and optimizing irrigation practices help preserve this vital resource and lower your utility costs.",
    },
    {
      title: "Water Saving Guide for Farmers: Efficient Irrigation Practices",
      slug: "guide3",
      description:
        "Efficient irrigation is key to sustainable farming. By adopting water-saving practices such as drip irrigation, smart scheduling, and soil moisture management, farmers can significantly reduce water use and improve crop productivity. Implementing these strategies not only conserves water but also lowers costs and supports environmental sustainability.",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Guides</h1>
        <div className="flex flex-col items-center space-y-6">
          {guides.map((guide) => (
            <Link
              href={`/guides/${guide.slug}`}
              key={guide.slug}
              className="group w-full md:w-3/4 lg:w-2/3 transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 p-6">
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  <Image
                    src={`/guides/${guide.slug}.jpg`}
                    alt={guide.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="w-full md:w-2/3 md:pl-6">
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {guide.title}
                  </h2>
                  <p className="text-gray-500 mb-4">{guide.description}</p>
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
