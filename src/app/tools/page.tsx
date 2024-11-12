import React from "react";
import Layout from "@/components/Layout/Layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Wrench, Code, BarChart, FileText, Zap, PenTool } from "lucide-react";

const tools = [
  {
    href: "/tools/water-scarcity-map",
    name: "Water Scarcity Map",
    description:
      "Visualize global water scarcity levels across different regions. Understand the impact of water shortages on various ecosystems and communities.",
  },
  {
    href: "/tools/water-footprint-calculator",
    name: "Water Footprint Calculator",
    description:
      "Calculate your individual or household water consumption. Discover how daily activities contribute to your overall water footprint and identify areas for conservation.",
  },
  {
    href: "/tools/water-irrigation-calculator",
    name: "Water Irrigation Calculator",
    description:
      "Estimate the optimal amount of water required for crop irrigation. This tool helps farmers manage water resources efficiently based on crop type and local conditions.",
  },
  {
    href: "/tools/water-consumption-calculator",
    name: "Water Consumption Calculator",
    description:
      "Explore detailed maps highlighting regions facing critical water shortages. Get insights into the environmental and social challenges posed by water scarcity.",
  },
  {
    href: "/tools/weather-rainwater-calculator",
    name: "Weather Rainwater Calculator",
    description:
      "Determine how much rainwater you can collect based on local weather patterns. Plan sustainable water harvesting systems to reduce dependency on external water sources.",
  },
  {
    href: "/tools/chatbot",
    name: "Chatbot",
    description:
      "Engage with an AI-powered chatbot for instant answers to your water-related queries. Gain insights and recommendations on water conservation, tools, and more.",
  },
];

export default function Tools() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Tools</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-xl font-semibold mb-2">
                  {tool.name}
                </CardTitle>
                <CardDescription className="text-center">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <div className="p-4 bg-gray-50 text-center">
                <a
                  href={tool.href}
                  className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  Learn More
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
