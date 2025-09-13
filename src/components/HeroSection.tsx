import React, { useState, useEffect } from "react";
import { Users, UserCircle, SearchCode, Ship } from "lucide-react";
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
      () => setActiveSlide((p) => (p + 1) % sliderImages.length),
      6000
    );
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  const current = sliderImages[activeSlide];

  const ctas = [
    { label: "Consol Mate", href: "/consol-mate", Icon: Users },
    { label: "Partner Portal", href: "/partner-portal", Icon: UserCircle },
    { label: "Tracking", href: "/tracking", Icon: SearchCode },
    { label: "Sailing Schedule", href: "/sailing-schedule", Icon: Ship },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Starlet background */}
      <div className="absolute inset-0 z-0">
        {[...Array(42)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/25 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2.5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Background slider */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {sliderImages.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              activeSlide === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            style={{ zIndex: activeSlide === i ? 1 : 0 }}
          >
            <img src={s.url} alt={s.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/45" />
          </div>
        ))}
      </div>

      {/* Headline / copy */}
      <div className="relative z-20 flex items-center min-h-screen px-6 lg:px-12">
        <div className="max-w-4xl mx-auto lg:ml-20 text-center lg:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{current.title}</h1>
          <p
            className={`text-lg md:text-2xl text-gray-200 leading-relaxed transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-2"
            }`}
          >
            {current.description}
          </p>
        </div>
      </div>

      {/* ==== Bottom CTA Strip (red) ==== */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        {/* soft divider */}
        <div className="h-3 w-full bg-gradient-to-b from-transparent to-[#E1251B]/90" />
        {/* red bar */}
        <div className="w-full bg-[#E1251B] relative">
          {/* subtle highlight */}
          <div className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-gradient-to-b from-white/10 to-transparent" />
          <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-7">
            {/* responsive grid for cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 place-items-center">
              {ctas.map(({ label, href, Icon }) => (
                <Link key={label} to={href} className="w-full max-w-[280px]">
                  <div
                    className="
                      group relative w-full h-28 md:h-32
                      bg-white
                      rounded-2xl
                      shadow-[0_10px_28px_rgba(0,0,0,.18)]
                      ring-1 ring-black/5
                      flex items-center justify-center
                      transition-all duration-300
                      hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(0,0,0,.22)]
                    "
                  >
                    {/* sheen on hover */}
                    <span
                      className="
                        pointer-events-none absolute inset-0 rounded-2xl opacity-0
                        group-hover:opacity-100 transition-opacity duration-300
                        bg-[radial-gradient(120%_60%_at_50%_-20%,rgba(225,37,27,0.12),transparent_60%)]
                      "
                    />
                    <div className="relative z-[1] flex flex-col items-center gap-2">
                      <span
                        className="
                          inline-flex items-center justify-center
                          w-9 h-9 rounded-full
                          bg-[#E1251B]/10
                          ring-1 ring-[#E1251B]/20
                          text-[#E1251B]
                          transition-colors duration-300
                          group-hover:bg-[#E1251B]/15 group-hover:text-[#B51B17]
                        "
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="text-[15px] md:text-base font-semibold text-[#1B2B87]">
                        {label}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* ==== /Bottom CTA Strip ==== */}
    </section>
  );
};

export default HeroSection;
