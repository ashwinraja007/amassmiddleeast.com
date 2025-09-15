import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* ✅ Fullscreen background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero5.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Main hero content */}
      <div className="relative z-20 flex items-center min-h-screen px-6 lg:px-12">
        <div className="max-w-4xl space-y-8 mx-auto text-center lg:text-left lg:ml-20">
          <h1 className="text-4xl md:text-6xl font-bold">
            AMASS FREIGHT
          </h1>
          <p
            className={`text-xl md:text-2xl text-gray-200 transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-4"
            }`}
          >
            Your Trusted Partner in Global Logistics Solutions.
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
