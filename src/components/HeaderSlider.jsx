"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getSlider } from "@/lib/api";

const HeaderSlider = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await getSlider(); // expects [{ image: "url" }]
        setSlides(data);
      } catch (error) {
        console.error("Slider fetch error:", error);
      }
    };
    fetchSlides();
  }, []);

  // Auto-slide every 3s
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative  background" style={{ height: "350px" }}>
      {/* Slides container */}
      <div className="relative h-full">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-1000 ease-in-out ${idx === currentSlide ? "translate-x-0 rounded-sm" :
                idx < currentSlide ? "-translate-x-full" : "translate-x-full"
              }`}
          >
            <Image
              src={slide.image}
              alt={`Slide ${idx + 1}`}
              width={1920}
              height={350}
              className="w-full h-full object-cover pl-12 pr-12 rounded-[5px]"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 ${currentSlide === index ? "bg-white w-4" : "bg-gray-400/50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
     
    </div>
  );
};

export default HeaderSlider;
