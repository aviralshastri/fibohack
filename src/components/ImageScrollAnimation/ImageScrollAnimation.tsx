"use client";

import React, { useRef, useEffect, useState } from "react";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import NextImage from "next/image";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url: string;
      };
    }
  }
}

function getCurrentFrame(index: number): string {
  return `/frames/frame_${index.toString().padStart(4, "0")}.jpeg`;
}

interface ImageCanvasAnimationProps {
  scrollHeight: number;
  numFrames: number;
}

const ImageCanvasAnimation: React.FC<ImageCanvasAnimationProps> = ({ scrollHeight, numFrames }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const [splineVisible, setSplineVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [navigating, setNavigating] = useState(false); // New state for navigation loader

  const preloadImages = () => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    const quarterImages = Math.ceil(numFrames / 4);

    for (let i = 1; i <= numFrames; i++) {
      const img = new globalThis.Image();
      img.src = getCurrentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount <= quarterImages) {
          const progress = Math.round((loadedCount / quarterImages) * 100);
          setLoadingProgress(progress);
        }
        if (loadedCount === quarterImages) {
          setLoadingComplete(true);
        }
      };
      loadedImages.push(img);
    }

    setImages(loadedImages);
  };

  const handleScroll = () => {
    const maxScrollTop =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = window.scrollY / maxScrollTop;

    const index = Math.min(
      numFrames - 1,
      Math.floor(scrollFraction * (numFrames - 1))
    );

    setFrameIndex(index);
  };

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    context.canvas.width = width;
    context.canvas.height = height;
  };

  useEffect(() => {
    if (!loadingComplete) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.height = "100%";
      document.documentElement.style.height = "100%";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      document.body.style.height = "auto";
      document.documentElement.style.height = "auto";
    }
  }, [loadingComplete]);

  useEffect(() => {
    preloadImages();
    renderCanvas();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;

    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    let requestId: number;

    const render = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      if (images[frameIndex]) {
        context.drawImage(
          images[frameIndex],
          0,
          0,
          context.canvas.width,
          context.canvas.height
        );
      }
      requestId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(requestId);
  }, [frameIndex, images]);

  // Navigation Loader Component
  const NavigationLoader = () => (
    <div
      id="navigation-loader"
      className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-75 z-50"
    >
      <NextImage
        src="/loader.gif"
        alt="Navigating..."
        width={100}
        height={100}
        className="contrast-150 saturate-125"
      />
      <h1 className="text-xl text-white mt-4">Navigating to home...</h1>
    </div>
  );

  return (
    <div style={{ height: scrollHeight }}>
      {!loadingComplete && (
        <div
          id="loader"
          className="fixed inset-0 flex flex-col justify-center items-center bg-gray-950 z-50"
        >
          <NextImage
            src="/loader.gif"
            alt="Loading..."
            width={100}
            height={100}
            className="contrast-150 saturate-125"
          />
          <h1 className="text-xl text-white mt-4">
            Loading assets ({loadingProgress}%)
          </h1>
        </div>
      )}
      <div
        className="watermark-container"
        style={{ position: "relative", zIndex: 2 }}
      >
        <script
          type="module"
          src="https://unpkg.com/@splinetool/viewer@1.9.23/build/spline-viewer.js"
        ></script>
        <spline-viewer
          className="spline-viewer"
          url="https://prod.spline.design/UH45a3K61LBSZmzv/scene.splinecode"
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            zIndex: 2,
            display: splineVisible ? "block" : "none",
          }}
        />
        <div
          className="px-10 py-6 rounded-full flex flex-row space-x-2"
          style={{
            position: "absolute",
            fontSize: "1.5em",
            bottom: "12px",
            right: "8px",
            zIndex: 3,
            backgroundColor: "black",
            color: "white",
          }}
        >
          <h1>Scroll</h1>
          <ArrowDownIcon className="size-8 p-2 bg-white text-black rounded-full" />
        </div>
      </div>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "auto",
          zIndex: 1,
        }}
      />
      {navigating && <NavigationLoader />}
      <Link
        href="/home"
        className="bg-slate-800 text-white text-xl py-2 px-4 rounded-full z-50 fixed bottom-12 left-16 hover:bg-black"
        onClick={(e) => {
          e.preventDefault();
          setNavigating(true);
          setTimeout(() => {
            window.location.href = "/home";
          }, 1000);
        }}
      >
        Go to Home
      </Link>
    </div>
  );
};

export default ImageCanvasAnimation;
