import ImageCanvasAnimation from "@/components/ImageScrollAnimation/ImageScrollAnimation";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div>
      <ImageCanvasAnimation numFrames={2987} scrollHeight={25000} />
    </div>
  );
}
