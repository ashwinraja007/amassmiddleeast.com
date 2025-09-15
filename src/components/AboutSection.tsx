import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

/* ---- tiny count-up hook ---- */
function useCountUp(end: number, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(end * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);
  return val;
}

/* ---- your stats (outside the center) ---- */
const RING = [
  { label: "Countries & Regions", value: 200, color: "#1E3A8A" },     // blue-800
  { label: "Weekly Direct Service", value: 1000, color: "#1F2A72" },  // deep indigo
  { label: "Cubic Meters • Global Export LCL Freight", value: 3_000_000, color: "#C62828" }, // red
  { label: "Branches & Offices", value: 84, color: "#2B3F8F" },
  { label: "Destinations", value: 20_000, color: "#1FA6C7" },         // sky
  { label: "Shipments / Year", value: 555_000, color: "#9CA3AF" },    // gray
];

/* ---- hexagon component ---- */
const Hexagon: React.FC<{
  bg: string;
  size: number;
  title?: string;
  value?: number;
  sub?: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ bg, size, title, value, sub, className = "", style }) => {
  const n = value ?? 0;
  const num = useCountUp(n);
  return (
    <div
      className={`hex shadow-lg hover:-translate-y-1 transition-transform duration-300 ${className}`}
      style={{
        width: size,
        height: size,
        background: bg,
        clipPath:
          "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
        ...style,
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center text-center px-3">
        {title ? (
          <div className="text-white font-extrabold leading-tight text-sm md:text-base">
            {title}
          </div>
        ) : null}
        {value !== undefined ? (
          <>
            <div className="text-white font-extrabold leading-none text-2xl md:text-3xl">
              {num.toLocaleString()}
            </div>
            {sub ? (
              <div className="mt-1 text-[10px] md:text-xs font-medium text-white/95">
                {sub}
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};

/* ---- main section ---- */
const AboutHexCircle: React.FC = () => {
  const location = useLocation();
  const currentCountry = getCurrentCountryFromPath(location.pathname);
  const getNavLink = (p: string) =>
    currentCountry.code === "SG"
      ? p
      : `/${currentCountry.name.toLowerCase().replace(" ", "-")}${p}`;

  /* layout numbers for ring */
  const angles = useMemo(() => {
    // 6 hexes evenly spaced around a circle
    return Array.from({ length: RING.length }, (_, i) => (i * 360) / RING.length - 90);
  }, []);
  // hex sizes + radius responsive via CSS variables
  const [vars, setVars] = useState({ center: 220, item: 140, radius: 220 });
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 640) setVars({ center: 180, item: 120, radius: 0 }); // stack (no circle) on mobile
      else if (w < 1024) setVars({ center: 200, item: 130, radius: 190 });
      else setVars({ center: 220, item: 140, radius: 220 });
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section className="bg-white py-14 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT: text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">Who we are</h2>

            <p className="mt-5 text-slate-800">
              <span className="font-semibold">Amass Middle East Shipping Services LLC</span>, a Neutral LCL
              Consolidation Service Provider to serve the UAE market. Our Office is in Oudh Mehta–Dubai and
              the CFS is in Jebel Ali.
            </p>

            <p className="mt-4 text-slate-700">
              As part of our global expansion, we opened branches in Saudi Arabia (Dammam, Riyadh, Jeddah).
              HQ in Dammam with bonded warehouses in Jeddah and Dammam.
            </p>

            <p className="mt-4 text-slate-700">
              Our growth has been phenomenal in the last 9 years, and we are now one of the leading
              consolidators in the region. Teams are led by seasoned logistics professionals. Amass China
              founded the CWN network with dedicated members worldwide.
            </p>

            <div className="mt-6">
              <Link to={getNavLink("/contact")}>
                <Button className="bg-amass-blue hover:bg-amass-dark-blue text-white">
                  Read More
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT: hexagon circle */}
          <div className="relative mx-auto">
            {/* center */}
            <Hexagon
              bg="linear-gradient(135deg,#1e3a8a,#1f2a72)"
              size={vars.center}
              title={"NO. 1\nDOMESTIC LCL MARKET"}
              // show only text in center per your ask
              className="text-white font-extrabold"
              style={{
                color: "white",
                display: "grid",
                placeItems: "center",
              }}
            />
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-2xl opacity-20"
                 style={{ background: "radial-gradient(circle,#1e3a8a,transparent 60%)" }} />

            {/* ring items */}
            <div className={vars.radius ? "block" : "hidden md:block"}>
              {RING.map((item, i) => {
                const num = useCountUp(item.value);
                const ang = (angles[i] * Math.PI) / 180;
                const x = Math.cos(ang) * vars.radius;
                const y = Math.sin(ang) * vars.radius;
                return (
                  <Hexagon
                    key={i}
                    bg={item.color}
                    size={vars.item}
                    value={num}
                    sub={item.label}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${x}px - ${vars.item / 2}px)`,
                      top: `calc(50% + ${y}px - ${vars.item / 2}px)`,
                      color: "white",
                    }}
                  />
                );
              })}
            </div>

            {/* stacked layout for small screens */}
            <div className={!vars.radius ? "mt-8 grid grid-cols-2 gap-4 sm:hidden" : "hidden"}>
              {RING.map((item, i) => (
                <Hexagon
                  key={`stack-${i}`}
                  bg={item.color}
                  size={vars.item}
                  value={item.value}
                  sub={item.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHexCircle;
