import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCurrentCountryFromPath } from "@/services/countryDetection";
import { Button } from "@/components/ui/button";

/** Count-up hook for numbers */
function useCountUp(end: number, duration = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.round(end * (1 - Math.pow(1 - p, 3)))); // easeOutCubic
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);
  return val;
}

/** Stats other than the center one */
const HEX_STATS = [
  { label: "Countries & Regions", value: 200, color: "bg-blue-600" },
  { label: "Weekly Direct Service", value: 1000, color: "bg-indigo-600" },
  { label: "Cubic Meters • Global Export LCL Freight", value: 3_000_000, color: "bg-red-600" },
  { label: "Branches & Offices", value: 84, color: "bg-purple-700" },
  { label: "Destinations", value: 20_000, color: "bg-cyan-600" },
  { label: "Shipments / Year", value: 555_000, color: "bg-gray-500" },
];

const AboutHexStats: React.FC = () => {
  const location = useLocation();
  const currentCountry = getCurrentCountryFromPath(location.pathname);
  const getNavLink = (p: string) =>
    currentCountry.code === "SG"
      ? p
      : `/${currentCountry.name.toLowerCase().replace(" ", "-")}${p}`;

  return (
    <section className="relative bg-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* ---- Text intro ---- */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Who we are
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            <span className="font-semibold">Amass Middle East Shipping Services LLC</span>, a Neutral LCL
            Consolidation Service Provider to serve the UAE market. Our Office is in Oudh Mehta-Dubai and
            the CFS is in Jebel Ali.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            As part of an expansion of our business worldwide, we have opened our branches in Saudi Arabia
            with offices in Dammam, Riyadh, and Jeddah; our headquarters is in Dammam, and we operate bonded
            warehouses in Jeddah and Dammam.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Our growth has been phenomenal over the last 9 years, and we are now one of the leading
            consolidators in the region. Our 40-member team is led by experienced logistics professionals.
            Amass China is the founder of the CWN network, which has dedicated members worldwide.
          </p>
          <Link to={getNavLink("/contact")}>
            <Button className="bg-amass-blue hover:bg-amass-dark-blue text-white mt-4">
              Read More
            </Button>
          </Link>
        </div>

        {/* ---- Hexagon stats layout ---- */}
        <div className="relative flex flex-col items-center">
          {/* Center hexagon */}
          <div className="relative z-10 mb-10">
            <div className="hex-center bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-10 text-center">
              <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
                NO. 1 <br />
                DOMESTIC LCL MARKET
              </h3>
              <p className="text-sm mt-2 font-medium">UNDISPUTED LEADER</p>
            </div>
          </div>

          {/* Ring of outer hexagons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl">
            {HEX_STATS.map((s, i) => {
              const num = useCountUp(s.value);
              return (
                <div
                  key={i}
                  className={`hex-tile ${s.color} text-white p-6 flex flex-col items-center text-center
                              transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl`}
                >
                  <div className="text-3xl font-extrabold">{num.toLocaleString()}</div>
                  <p className="text-sm mt-2 font-medium">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- Hexagon styles --- */}
      <style>{`
        .hex-center, .hex-tile {
          clip-path: polygon(
            25% 6.7%, 75% 6.7%,
            100% 50%, 75% 93.3%,
            25% 93.3%, 0% 50%
          );
        }
        .hex-center { width: 240px; }
        .hex-tile { width: 180px; }
      `}</style>
    </section>
  );
};

export default AboutHexStats;
