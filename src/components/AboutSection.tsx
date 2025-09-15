// src/components/HeroSection.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

// Optional: replace with your own image import or public path
// import HeroImg from "@/assets/img/age.png";

const HeroSection: React.FC = () => {
  const location = useLocation();
  const currentCountry = getCurrentCountryFromPath(location.pathname);

  const getNavLink = (basePath: string) => {
    if (currentCountry.code === "SG") return basePath;
    return `/${currentCountry.name.toLowerCase().replace(" ", "-")}${basePath}`;
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Image (like Promo) */}
          <div className="text-center order-2 lg:order-1">
            <ScrollAnimation>
              <img
                // src={HeroImg}
                src="/aboutus2.png" // swap to your preferred image
                alt="Years Of Experience"
                className="mx-auto max-h-[420px] w-auto object-contain"
              />
              <h5 className="mt-6 text-lg md:text-xl text-slate-700">
                Years Of Experience With <b className="text-slate-900">Creative Team</b>
              </h5>
            </ScrollAnimation>
          </div>

          {/* Right: Text block (like Promo) */}
          <div className="order-1 lg:order-2">
            <ScrollAnimation delay={150}>
              <div className="max-w-xl lg:ml-8">
                <span className="inline-block text-sm font-medium tracking-wide uppercase text-amass-blue">
                  Easily import the whole Industry
                </span>

                <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight text-slate-900">
                  Amwerk is always interested.
                </h1>

                <h4 className="mt-4 text-lg md:text-xl font-semibold text-slate-800">
                  Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.
                </h4>

                <p className="mt-4 text-slate-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to={getNavLink("/contact")}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-amass-blue px-5 py-3 font-semibold text-white hover:bg-amass-dark-blue transition"
                  >
                    Get In Touch
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  {/* Optional secondary button */}
                  <Link
                    to={getNavLink("/about-us")}
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Know More
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
