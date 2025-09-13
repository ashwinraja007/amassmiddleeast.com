import React, { useState, useEffect } from "react";
import {
  Users,
  UserCircle,
  SearchCode,
  Ship,
} from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const sliderImages = [
    { url: "/h1.png", title: "AMASS FREIGHT", description: "Your Trusted Partner in Global Logistics Solutions." },
    { url: "/h2.png", title: "LCL CONSOLIDATION", description: "Neutral LCL consolidation services connecting UAE and Middle East." },
    { url: "/h3.png", title: "CFS SERVICES", description: "State-of-the-art container freight station in Jebel Ali." },
    { url: "/h4.png", title: "REGIONAL NETWORK", description: "Strategic offices across UAE and Saudi Arabia for seamless logistics." },
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

  const buttons = [
    { label: "Consol Mate", href: "/consol-mate", icon: Users },
    { label: "Partner Portal", href: "/partner-portal", icon: UserCircle },
    { label: "Tracking", href: "/tracking", icon: SearchCode },
    { label: "Sailing Schedule", href: "/sailing-schedule", icon: Ship },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background stars */}
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

      {/* Background slider */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {sliderImages.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              activeSlide === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            style={{ zIndex: activeSlide === i ? 1 : 0 }}
          >
            <img
              src={slide.url}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-20 flex items-center min-h-screen px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center lg:text-left lg:ml-20 space-y-8">
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

      {/* 🔴 Bottom Strip with white cards */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#E1251B] bg-opacity-90 z-30">
        <div className="container mx-auto flex flex-wrap justify-center gap-6 py-8 px-4">
          {buttons.map(({ label, href, icon: Icon }) => (
            <Link key={label} to={href}>
              <div
                className="
                  group
                  w-48 h-28
                  bg-white
                  rounded-xl
                  flex flex-col items-center justify-center
                  text-[#1B2B87]
                  font-semibold
                  shadow-md
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                <Icon className="w-6 h-6 text-[#E1251B] mb-2 transition-colors duration-300 group-hover:text-[#B51B17]" />
                <span className="text-base">{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
