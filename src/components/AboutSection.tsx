import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollAnimation from "@/components/ScrollAnimation";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

import {
  Trophy,
  Globe2,
  Plane,
  Boxes,
  Building2,
  MapPinned,
  Package,
} from "lucide-react";

// --- Stats data ---
const STATS = [
  {
    title: "NO. 1",
    value: 1,
    caption: "Domestic LCL Market • Undisputed Leader",
    Icon: Trophy,
    tone: "gold" as const,
  },
  {
    title: "Countries & Regions",
    value: 200,
    caption: "Global coverage",
    Icon: Globe2,
    tone: "blue" as const,
  },
  {
    title: "Weekly Direct Service",
    value: 1000,
    caption: "High-frequency schedules",
    Icon: Plane,
    tone: "blue" as const,
  },
  {
    title: "Cubic Meters • Global Export LCL Freight",
    value: 3_000_000,
    caption: "Proven consolidation capacity",
    Icon: Boxes,
    tone: "red" as const,
  },
  {
    title: "Branches & Offices",
    value: 84,
    caption: "On-ground expertise",
    Icon: Building2,
    tone: "blue" as const,
  },
  {
    title: "Destinations",
    value: 20_000,
    caption: "Door-to-door reach",
    Icon: MapPinned,
    tone: "gold" as const,
  },
  {
    title: "Shipments / Year",
    value: 555_000,
    caption: "Trusted by shippers worldwide",
    Icon: Package,
    tone: "red" as const,
  },
];

const toneBg: Record<"gold" | "blue" | "red", string> = {
  gold: "#FFD70033",
  blue: "#3B82F633",
  red: "#EF444433",
};
const toneText: Record<"gold" | "blue" | "red", string> = {
  gold: "text-yellow-500",
  blue: "text-blue-600",
  red: "text-red-500",
};

const AboutSection: React.FC = () => {
  const location = useLocation();
  const currentCountry = getCurrentCountryFromPath(location.pathname);

  const getNavLink = (basePath: string) =>
    currentCountry.code === "SG"
      ? basePath
      : `/${currentCountry.name.toLowerCase().replace(" ", "-")}${basePath}`;

  return (
    <section className="bg-slate-50 py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* --- About text & image --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <ScrollAnimation>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
                About Us
              </h2>
              <div className="w-16 h-1 bg-amass-blue mb-6"></div>

              <p className="text-gray-700 leading-relaxed mb-6">
                We are a neutral LCL consolidation partner dedicated to
                providing global coverage and local accountability. With
                branches across the Middle East and an expanding worldwide
                network, we move cargo with precision—supported by modern
                technology, transparent updates, and on-ground expertise.
              </p>

              <p className="text-gray-700 leading-relaxed mb-8">
                Our mission is to empower freight forwarders with reliable
                schedules, competitive rates, and seamless digital tools for
                booking and tracking. From our Dubai headquarters to our growing
                presence across Asia and beyond, we’re committed to operational
                excellence and sustainability.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to={getNavLink("/about-us")}>
                  <Button className="bg-amass-blue hover:bg-amass-dark-blue text-white rounded-md px-6 py-3">
                    Learn More
                  </Button>
                </Link>
                <Link to={getNavLink("/contact")}>
                  <Button variant="secondary" className="px-6 py-3">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </ScrollAnimation>
          </div>

          <div className="order-1 lg:order-2">
            <ScrollAnimation delay={150}>
              <img
                src="/aboutus2.png" // replace with your own image
                alt="Our Operations"
                className="rounded-xl shadow-lg w-full object-cover"
              />
            </ScrollAnimation>
          </div>
        </div>

        {/* --- Stats Grid --- */}
        <div className="mt-16">
          <ScrollAnimation>
            <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
              Our Global Impact
            </h3>
          </ScrollAnimation>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {STATS.map(({ title, value, caption, Icon, tone }, idx) => (
              <ScrollAnimation key={idx} delay={idx * 60}>
                <div className="flex flex-col items-center rounded-2xl bg-white shadow-lg p-6 text-center transition-transform hover:-translate-y-1 hover:shadow-xl">
                  <div
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ backgroundColor: toneBg[tone] }}
                  >
                    <Icon className={`h-7 w-7 ${toneText[tone]}`} />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
                  <p className="text-2xl font-extrabold text-gray-800 mt-1">
                    {value.toLocaleString()}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">{caption}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
