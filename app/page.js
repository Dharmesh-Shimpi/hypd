
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const textData = [
  "01 create 🛒🛒 sign up & create your own store in under 30 seconds",
  "02 curate 👗👔👟 curate collections, add your favorite products or simply make your content shop-able",
  "03 share 🔗 share your store link, collections & your product recommendations across all social media channels.",
  "04 ka-ching! 🤑🤑 earn real money every time someone buys anything from your store",
];

const imageData = [
  "https://dmk9je7eclmvw.cloudfront.net/assets/img/a0bacreate.png",
  "https://dmk9je7eclmvw.cloudfront.net/assets/img/b1e2curate.png",
  "https://dmk9je7eclmvw.cloudfront.net/assets/img/d40asharing.png",
  "https://dmk9je7eclmvw.cloudfront.net/assets/img/e2c5earn.png",
];

const ScrollComponent = () => {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = sectionsRef.current.indexOf(entry.target);
            if (sectionIndex !== -1 && sectionIndex !== index) {
              setPrevIndex(index);
              setIndex(sectionIndex);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = sectionsRef.current;
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [index]);

  return (
<div className="flex bg-black relative z-10">
  {/* Text Section with scrolling */}
  <div>
    {textData.map((text, i) => (
      <div
        key={i}
        ref={(el) => (sectionsRef.current[i] = el)}
        className={`h-screen p-10 md:p-60 flex justify-center items-center transition-opacity duration-700 ${
          index === i ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-xl xs:text-2xl md:text-4xl text-white font-semibold">{text}</p>
      </div>
    ))}
  </div>
  {/* Image Section with Transition */}
  <div className="sticky top-16 md:top-24 xs:right-0 right-16 w-3/4 h-screen flex justify-center items-center overflow-hidden">
    <div
      className={`transition-transform duration-700 ease-in-out`}
      style={{
        transform: `translateX(-${index * 100}%)`, // Move based on index
        display: "flex",
        position: "absolute",
        top: 0,
        right: 0,
      }}
    >
      {imageData.map((src, i) => (
        <div key={i} style={{ minWidth: "100%" }}>
          <Image
            src={src}
            alt={`Image ${i + 1}`}
            width={800}
            height={1200}
            className={`object-cover transition-opacity duration-700 ${
              index === i ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

const ParallaxComponent = () => (
  <div className="fixed top-40 left-0 h-screen w-full overflow-hidden z-0">
    <Image
      src="data:image/jpeg;base64,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"
      alt="Parallax Image"
      layout="fill"
      objectFit="cover"
      className="object-cover"
    />
  </div>
);

const RandomImagesComponent = () => (
  <div className="flex relative z-10 bg-black h-screen">
    <Image
      src="https://dmk9je7eclmvw.cloudfront.net/assets/filters:strip_exif()/fit-in/150x150/img/1625mythpat.png"
      alt="Random"
      width={300}
      height={200}
    />
    <Image
      src="https://dmk9je7eclmvw.cloudfront.net/assets/filters:strip_exif()/fit-in/200x200/img/224dtanmay-bhatt.png"
      alt="Random"
      width={300}
      height={200}
    />
    <Image
      src="https://dmk9je7eclmvw.cloudfront.net/assets/filters:strip_exif()/fit-in/200x200/img/351ebhuvam-bam.png"
      alt="Random"
      width={300}
      height={200}
    />
  </div>
);

export default function Home() {
  return (
    <div>
      <ScrollComponent />
      <ParallaxComponent />
      <div className="h-[700px]"></div>
      <RandomImagesComponent />
    </div>
  );
}
