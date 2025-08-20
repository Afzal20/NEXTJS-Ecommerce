"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { getHeroSections } from "@/lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const buildImageSrc = (imagePath) => {
  if (!imagePath || typeof imagePath !== "string") return null;
  try {
    return new URL(imagePath, API_BASE).href;
  } catch {
    return null;
  }
};

const HeroSection = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

 useEffect(() => {
  let ignore = false;

  const fetchSlides = async () => {
    try {
      const data = await getHeroSections();
      if (!Array.isArray(data) || ignore) return;

      // Only transform what is needed
      const mapped = data.map((item, idx) => ({
        id: item.id || idx, // keep idx only if id missing
        title: item.title || "",
        offer: item.offer || "",
        buttonText1: item.button_1_Text || "",
        buttonText2: item.button_2_Text || "",
        imgSrc: buildImageSrc(item.image),
      }));

      setSlides(mapped);
    } catch (e) {
      // TODO: optional fallback
    }
  };

  fetchSlides();

  return () => {
    ignore = true;
  };
}, []);


  useEffect(() => {
    if (!slides.length || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  const handleSlideChange = (index) => setCurrentSlide(index);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div 
      className="overflow-hidden relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {(slides.length ? slides : []).map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-muted py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base text-muted-foreground pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold text-foreground">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 ">
                <button className="md:px-10 px-7 md:py-2.5 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium text-foreground hover:text-primary">
                  {slide.buttonText2}
                  <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon} alt="arrow_icon" />
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              {slide.imgSrc ? (
                <Image className="md:w-72 w-48" src={slide.imgSrc} alt={`Slide ${index + 1}`} width={288} height={160} />
              ) : (
                <div className="md:w-72 w-48 h-40 bg-gray-200 rounded" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* <div className="items-center justify-center gap-2 mt-8 hidden">
        {(slides.length ? slides : []).map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={` ${currentSlide === index ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default HeroSection;
