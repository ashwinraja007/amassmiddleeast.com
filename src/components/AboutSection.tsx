import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCurrentCountryFromPath } from "@/services/countryDetection";
import { motion } from "framer-motion";

const AboutSection: React.FC = () => {
  const location = useLocation();

  // Defensive fallback in case countryDetection returns null/undefined
  const detected = getCurrentCountryFromPath(location.pathname);
  const currentCountry = detected ?? { code: "SG", name: "Singapore" };

  const getNavLink = (p: string) =>
    currentCountry?.code === "SG"
      ? p
      : `/${(currentCountry?.name ?? "Singapore").toLowerCase().replace(/\s+/g, "-")}${p}`;

  // Put your images in /public and reference with leading slashes
  const images = [
    "/Dubai.jpg",
    "/jebelali1.png",
    "/burj-khalifa.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images.length) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT: text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              Who we are
            </h2>

            <p className="mt-5 text-slate-800">
              <span className="font-semibold">Amass Middle East Shipping Services LLC</span>, a Neutral
              LCL Consolidation Service Provider to serve the UAE market. Our office is in Oudh
              Mehta–Dubai and the CFS is in Jebel Ali.
            </p>

            <p className="mt-4 text-slate-700">
              We have expanded globally with branches in Saudi Arabia (Dammam, Riyadh, Jeddah) and
              bonded warehouses in Jeddah and Dammam. Our team of 40+ professionals brings decades of
              logistics expertise.
            </p>

            <p className="mt-4 text-slate-700">
              Amass China founded the CWN network with dedicated members worldwide, enabling our
              phenomenal growth over the last 9 years to become a leading regional consolidator.
            </p>

            <div className="mt-6">
              <Link to={getNavLink("/contact")}>
                <Button className="bg-amass-blue hover:bg-amass-dark-blue text-white">
                  Read More
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT: auto-scrolling images */}
          <div className="order-first lg:order-none">
            {/* Ensure visible height with aspect ratio (or replace with fixed h-[...]) */}
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl shadow-xl border border-slate-200 bg-slate-100">
              {images.map((src, i) => (
                <motion.img
                  key={src}
                  src={src}
                  alt={`slide-${i}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: i === index ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                  onError={(e) => {
                    // hide broken images so they don't block others
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
