"use client";
import React from "react";
import { motion } from "framer-motion";
import ImageCarousel from "@/components/ImageSlider/HomeImageSlider";
import FadeInXComponent from "@/components/FadeInEffect/FadeIn";

import {
  CubeIcon,
  FileTextIcon,
  Pencil2Icon,
  PersonIcon,
  VideoIcon,
} from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import Layout from "@/components/Layout/Layout";

const features = [
  {
    Icon: FileTextIcon,
    name: "Guides",
    description: "We automatically save your files as you type.",
    href: "/guides",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: VideoIcon,
    name: "Tutorials",
    description: "Search through all your files in one place.",
    href: "/tutorials",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: CubeIcon,
    name: "Tools",
    description:
      "Supports both English and Hindi language to target larger audience.",
    href: "/tools",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: Pencil2Icon,
    name: "Articles",
    description: "Use the calendar to filter your files by date.",
    href: "/articles",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className:
      "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2 lg:h-56",
  },
  {
    Icon: PersonIcon,
    name: "Community Forum",
    description:
      "Get notified when someone shares a file or mentions you in a comment.",
    href: "/forum",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

const homeImg = [
  { src: "/assets/HomeCarousel/img2.jpeg", alt: "Image 2" },
  { src: "/assets/HomeCarousel/img3.jpeg", alt: "Image 3" },
  { src: "/assets/HomeCarousel/img4.jpeg", alt: "Image 4" },
  { src: "/assets/HomeCarousel/img5.jpeg", alt: "Image 5" },
  { src: "/assets/HomeCarousel/img6.jpeg", alt: "Image 6" },
];

export default function Home() {
  return (
    <Layout showFooter={true} showNavbar={true}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="justify-center min-h-screen flex w-full flex-col"
      >
        <ImageCarousel images={homeImg} />
        <div className=" bg-white items-center flex px-5 md:px-10 py-14 flex-col">
          <div className="lg:w-3/4 sm:w-4/5 w-full space-y-4">
            <h2 className="text-3xl font-bold text-blue-900">
              Jal Jagran: Uniting India for Water Conservation
            </h2>
            <FadeInXComponent>
              <p className="text-lg text-gray-700 text-justify">
                <strong>Introduction:</strong> Jal Jagran, a pioneering
                initiative under the aegis of the Indian government, stands as a
                beacon of hope and action in the face of one of the most
                pressing challenges of our time—water scarcity. Our platform is
                dedicated to raising awareness, educating the masses, and
                guiding communities across India in the crucial task of
                conserving water. Jal Jagran aims to empower every citizen, from
                the bustling cities to the quiet villages, with the knowledge
                and tools needed to preserve our nation’s precious water
                resources for future generations.
              </p>
            </FadeInXComponent>
            <FadeInXComponent>
              <p className="text-lg text-gray-700 text-justify">
                <strong>Our Mission:</strong> At Jal Jagran, our mission is
                simple yet profound: to ensure that every drop of water is
                conserved, valued, and utilized responsibly. We believe that by
                fostering a culture of awareness and proactive engagement, we
                can collectively address the water scarcity crisis that
                threatens our country. Our platform serves as a comprehensive
                guide, offering tutorials, best practices, and community-driven
                solutions to promote water conservation at every level of
                society.
              </p>
            </FadeInXComponent>
            <FadeInXComponent>
              <p className="text-lg text-gray-700 text-justify">
                <strong>Education and Awareness:</strong> Education is at the
                heart of Jal Jagran. We understand that lasting change begins
                with knowledge, which is why our platform offers a wealth of
                resources designed to educate the public on the importance of
                water conservation. From interactive tutorials and informative
                articles to expert-led webinars and workshops, Jal Jagran
                provides accessible, engaging, and actionable content tailored
                to the needs of diverse audiences. Whether you're a student
                eager to learn about sustainable practices or a farmer seeking
                ways to optimize water usage in agriculture, Jal Jagran is your
                go-to source for reliable information and guidance.
              </p>
            </FadeInXComponent>
            <FadeInXComponent>
              <p className="text-lg text-gray-700 text-justify">
                <strong>Community Engagement and Empowerment:</strong> Jal
                Jagran recognizes the power of community in driving meaningful
                change. Our platform is designed to not only inform but also to
                inspire collective action. We facilitate the formation of local
                water conservation groups, enabling communities to come together
                and implement water-saving initiatives that are tailored to
                their unique needs and environments. Through our platform, users
                can share success stories, exchange ideas, and collaborate on
                projects that make a real difference in their communities. By
                harnessing the strength of community, Jal Jagran is fostering a
                nationwide movement for water conservation.
              </p>
            </FadeInXComponent>
            <FadeInXComponent>
              <p className="text-lg text-gray-700 text-justify">
                <strong>Innovative Solutions for a Sustainable Future:</strong>{" "}
                In addition to raising awareness, Jal Jagran is committed to
                promoting innovative solutions that address the challenges of
                water scarcity. Our platform showcases the latest advancements
                in water-saving technologies, sustainable agricultural
                practices, and efficient water management systems. We provide
                step-by-step guides and tutorials that empower individuals,
                businesses, and governments to implement these solutions
                effectively. From rainwater harvesting techniques to smart
                irrigation systems, Jal Jagran offers practical tools and
                strategies that contribute to a more sustainable future.
              </p>
            </FadeInXComponent>
            <FadeInXComponent>
              <p className="text-lg text-gray-700 text-justify">
                <strong>Government Collaboration and Policy Advocacy:</strong>{" "}
                Jal Jagran works in close collaboration with various government
                bodies, NGOs, and other stakeholders to advocate for policies
                that support water conservation efforts across India. We provide
                a platform for dialogue between policymakers and the public,
                ensuring that the voices of citizens are heard in the
                decision-making process. By aligning our efforts with national
                and state-level initiatives, Jal Jagran is helping to shape a
                regulatory environment that prioritizes the protection and
                sustainable management of water resources.
              </p>
            </FadeInXComponent>
            <FadeInXComponent>
              <p className="text-lg text-gray-700 text-justify">
                <strong>Our Vision:</strong> Jal Jagran envisions a future where
                every Indian citizen is not only aware of the importance of
                water conservation but is also actively involved in safeguarding
                this vital resource. We dream of a country where water scarcity
                is a challenge of the past, and where sustainable water
                management practices are embedded in the fabric of everyday
                life. Through education, community engagement, and innovative
                solutions, Jal Jagran is working tirelessly to turn this vision
                into reality.
              </p>
            </FadeInXComponent>
            <FadeInXComponent>
              <p className="text-lg text-gray-700 text-justify">
                <strong>Join Us in the Jal Jagran Movement:</strong> Water is
                life, and at Jal Jagran, we are dedicated to ensuring that this
                life-sustaining resource is preserved for generations to come.
                We invite you to join us in this crucial mission. Explore our
                platform, participate in our initiatives, and become a part of
                the Jal Jagran movement. Together, we can make a difference.
                Together, we can secure India’s water future.
              </p>
            </FadeInXComponent>
          </div>
        </div>
        <div className="py-20 px-4 bg-black items-center justify-center flex flex-col mt-4">
          <div className="md:w-3/4 w-full space-y-10">
            <FadeInXComponent>
              <h1 className="md:text-5xl text-3xl font-bold text-white">
                Features
              </h1>
            </FadeInXComponent>
            <FadeInXComponent>
              <BentoGrid className="lg:grid-rows-3">
                {features.map((feature) => (
                  <BentoCard key={feature.name} {...feature} />
                ))}
              </BentoGrid>
            </FadeInXComponent>
          </div>
        </div>
        <div className="py-20 px-4 bg-white items-center justify-center flex flex-col mt-4"></div>
        <div className="flex flex-col items-center justify-center"></div>
      </motion.div>
    </Layout>
  );
}
