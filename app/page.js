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
    <div className="w-screen flex bg-black relative z-10">
  {/* Text Section with scrolling */}
  <div className="w-full md:w-1/3">
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

  {/* Fixed Image Section with Transition */}
  <div className="sticky top-16 md:top-24 right-0 w-full md:w-2/3 h-screen flex justify-center items-center overflow-hidden">
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
      {/* Loop through images */}
      {imageData.map((src, i) => (
        <div key={i} style={{ minWidth: "100%" }}>
          <Image
            src={src}
            alt={`Image ${i + 1}`}
            height={800}
            width={600}
            layout="responsive"
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
