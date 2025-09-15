// src/components/AboutSection.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

const AboutSection: React.FC = () => {
  const location = useLocation();
  const currentCountry = getCurrentCountryFromPath(location.pathname);

  const getNavLink = (p: string) =>
    currentCountry.code === "SG"
      ? p
      : `/${currentCountry.name.toLowerCase().replace(" ", "-")}${p}`;

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT: clean text only (no colored sections before paragraphs) */}
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

          {/* RIGHT: rectangular image (replaces the hexagon circle) */}
          <div className="order-first lg:order-none">
            <div className="w-full overflow-hidden rounded-2xl shadow-xl border border-slate-200">
              {/* Replace src with your actual image path */}
              <img
                src="/amass.jpg"
                alt="Global Consol operations"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: "16 / 10" }} /* keeps a nice rectangle */
              />
            </div>
            {/* Optional small caption under image */}
            {/* <p className="mt-3 text-sm text-slate-500 text-center">Our network & operations</p> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
