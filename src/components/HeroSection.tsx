import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* ✅ Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero5.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 🔴 Bottom Button Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="container mx-auto flex flex-wrap justify-center gap-6 py-6">
          {[
            { label: "Consolmate", href: "/consol-mate" },
            { label: "Partner Portal", href: "/partner-portal" },
            { label: "Tracking", href: "/tracking" },
            { label: "Sailing Schedule", href: "/sailing-schedule" },
          ].map((btn) => (
            <Link
              key={btn.label}
              to={btn.href}
              className="bg-[#E1251B] text-white hover:bg-red-700 font-semibold px-6 py-3 rounded-md shadow-md transition"
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
