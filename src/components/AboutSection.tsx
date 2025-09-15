// src/components/HeroSection.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Trophy,
  Globe2,
  Plane,
  Boxes,
  Building2,
  MapPinned,
  Package,
  ArrowRight,
} from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

// ---------- Stats Data ----------
const ITEMS = [
  
];

// ---------- Stats Grid ----------
const StatsGrid: React.FC = () => (
  <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {ITEMS.map(({ title, value, caption, Icon, tone }, idx) => (
      <div
        key={idx}
        className="flex flex-col items-center rounded-2xl bg-white shadow-lg p-6 text-center transition-transform hover:-translate-y-1 hover:shadow-xl"
      >
        <div
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
          style={{
            backgroundColor:
              tone === "gold"
                ? "#FFD70033"
                : tone === "blue"
                ? "#3B82F633"
                : "#EF444433",
          }}
        >
          <Icon
            className={`h-7 w-7 ${
              tone === "gold"
                ? "text-yellow-500"
                : tone === "blue"
                ? "text-blue-600"
                : "text-red-500"
            }`}
          />
        </div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-2xl font-extrabold text-gray-800 mt-1">
          {value.toLocaleString()}
        </p>
        <p className="mt-2 text-sm text-gray-600">{caption}</p>
      </div>
    ))}
  </div>
);

// ---------- Hero / About Section ----------
const HeroSection: React.FC = () => {
  const location = useLocation();
  const currentCountry = getCurrentCountryFromPath(location.pathname);

  const getNavLink = (basePath: string) =>
    currentCountry.code === "SG"
      ? basePath
      : `/${currentCountry.name.toLowerCase().replace(" ", "-")}${basePath}`;

  return (
    <section className="bg-slate-100 py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Two-column promo layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left image */}
          <div className="text-center order-2 lg:order-1">
            <ScrollAnimation>
              <img
                src="/aboutus2.png" // replace with your own image
                alt="Years Of Experience"
                className="mx-auto max-h-[420px] w-auto object-contain rounded-lg shadow-lg"
              />
              <h5 className="mt-6 text-lg md:text-xl text-slate-700">
                Years Of Experience With{" "}
                <b className="text-slate-900">Creative Team</b>
              </h5>
            </ScrollAnimation>
          </div>

          {/* Right content */}
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
                  Capitalise on low hanging fruit to identify a ballpark value
                  added activity to beta test.
                </h4>

                <p className="mt-4 text-slate-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to={getNavLink("/contact")}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-amass-blue px-5 py-3 font-semibold text-white hover:bg-amass-dark-blue transition"
                  >
                    Get In Touch
                    <ArrowRight className="w-5 h-5" />
                  </Link>

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

        {/* Stats grid below About content */}
        <StatsGrid />
      </div>
    </section>
  );
};

export default HeroSection;
