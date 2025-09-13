import React, { useState, useEffect } from "react";
import {
  Users,
  UserCircle,
  SearchCode,
  Ship,
  Calendar,
  Globe,
  ArrowRight,
  Play,
  Sparkles,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCustomerPortalOpen, setIsCustomerPortalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const sliderImages = [
    { url: "/h1.png", title: "AMASS FREIGHT", description: "Your Trusted Partner in Global Logistics Solutions.", gradient: "" },
    { url: "/h2.png", title: "LCL CONSOLIDATION", description: "Neutral LCL consolidation services connecting UAE and Middle East.", gradient: "" },
    { url: "/h3.png", title: "CFS SERVICES", description: "State-of-the-art container freight station in Jebel Ali.", gradient: "" },
    { url: "/h4.png", title: "REGIONAL NETWORK", description: "Strategic offices across UAE and Saudi Arabia for seamless logistics.", gradient: "" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const interval = setInterval(
      () => setActiveSlide((prev) => (prev + 1) % sliderImages.length),
      6000
    );
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  const currentSlide = sliderImages[activeSlide];

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background + slider (unchanged) */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 z-10 overflow-hidden">
        {sliderImages.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
              activeSlide === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            style={{ zIndex: activeSlide === i ? 1 : 0 }}
          >
            <img
              src={slide.url}
              alt={`Slide ${i}`}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-black/40 z-[1]" />
          </div>
        ))}
      </div>

      {/* Main hero content */}
      <div className="relative z-20 flex items-center min-h-screen px-6 lg:px-12">
        <div className="max-w-4xl space-y-8 mx-auto text-center lg:text-left lg:ml-20">
          <h1 className="text-4xl md:text-6xl font-bold">
            {currentSlide.title}
          </h1>
          <p
            className={`text-xl md:text-2xl text-gray-200 transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-4"
            }`}
          >
            {currentSlide.description}
          </p>
        </div>
      </div>

      {/* 🔴 Bottom Red Strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#E1251B] z-30">
        <div className="container mx-auto flex flex-wrap justify-center gap-4 py-4">
          {[
            { label: "Consol Mate", href: "/consol-mate" },
            { label: "Partner Portal", href: "/partner-portal" },
            { label: "Container Enquiry", href: "/container-enquiry" },
            { label: "Tracking", href: "/tracking" },
          ].map((btn) => (
            <Link
              key={btn.label}
              to={btn.href}
              className="bg-white text-[#1B2B87] hover:bg-gray-100 font-semibold px-4 py-2 rounded-md shadow transition"
            >
              {btn.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
