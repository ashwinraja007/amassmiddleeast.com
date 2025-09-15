// src/components/AboutWithKPI.tsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

/** ---------- Count-up (no libs) ---------- */
function useCountUp(end: number, startOnVisible = true, duration = 1400) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(!startOnVisible);

  useEffect(() => {
    if (!startOnVisible) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const from = 0;
    const diff = end - from;

    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setValue(Math.round(from + diff * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [end, duration, started]);

  return { ref, value };
}

/** ---------- Data ---------- */
type Tone = "gold" | "blue" | "red" | "sky" | "gray";

const TILE_COLORS: Record<Tone, { bg: string; text: string }> = {
  gold: { bg: "bg-[#1D2A61]", text: "text-[#D4AF37]" }, // dark blue base, gold text for “NO.1” block
  blue: { bg: "bg-[#1D2A61]", text: "text-[#D2B77E]" }, // royal blue with warm-gold text
  red:  { bg: "bg-[#C62828]", text: "text-white" },     // red bar
  sky:  { bg: "bg-[#46B9DB]", text: "text-white" },     // light blue bar
  gray: { bg: "bg-[#BDBDBD]", text: "text-white" },     // grey bar
};

const STATS = [
  { title: "NO.", value: 1, caption: "DOMESTIC LCL MARKET • UNDISPUTED LEADER", tone: "gold" as Tone },
  { title: "", value: 200, caption: "COUNTRIES & REGIONS", tone: "blue" as Tone },
  { title: "", value: 1_000, caption: "WEEKLY DIRECT SERVICE", tone: "blue" as Tone },
  { title: "", value: 3_000_000, caption: "CUBIC METERS • GLOBAL EXPORT LCL FREIGHT", tone: "red" as Tone },
  { title: "", value: 84, caption: "BRANCHES & OFFICES", tone: "blue" as Tone },
  { title: "", value: 20_000, caption: "DESTINATIONS", tone: "sky" as Tone },
  { title: "", value: 555_000, caption: "SHIPMENTS / YEAR", tone: "gray" as Tone },
];

/** ---------- Tile ---------- */
const KpiTile: React.FC<{
  title?: string;
  value: number;
  caption: string;
  tone: Tone;
  big?: boolean;
}> = ({ title = "", value, caption, tone, big }) => {
  const { ref, value: count } = useCountUp(value);

  return (
    <div
      className={[
        "relative rounded-md overflow-hidden",
        TILE_COLORS[tone].bg,
        "shadow-lg",
        big ? "py-6 px-6" : "py-4 px-5",
      ].join(" ")}
    >
      {/* subtle decorative sprinkles */}
      <div className="pointer-events-none absolute inset-0 opacity-10 [background:radial-gradient(circle_at_20%_-10%,white_2px,transparent_2px)_0_0/28px_28px]"></div>

      <div className="relative z-10 flex items-center gap-4">
        {/* Left small label (for the NO.1 block) */}
        {title ? (
          <div className="text-white/90 text-2xl font-extrabold leading-none pr-2 border-r border-white/20">
            {title}
          </div>
        ) : null}

        <div className="flex-1">
          <div
            ref={ref as any}
            className={[
              "font-extrabold leading-none",
              TILE_COLORS[tone].text,
              big ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl",
            ].join(" ")}
          >
            {count.toLocaleString()}
          </div>
          <div className="mt-1 text-white/95 text-xs md:text-sm font-semibold tracking-wide">
            {caption}
          </div>
        </div>
      </div>
    </div>
  );
};

/** ---------- Section ---------- */
const AboutWithKPI: React.FC = () => {
  const location = useLocation();
  const currentCountry = getCurrentCountryFromPath(location.pathname);

  const getNavLink = (basePath: string) =>
    currentCountry.code === "SG"
      ? basePath
      : `/${currentCountry.name.toLowerCase().replace(" ", "-")}${basePath}`;

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">Who we are</h2>

            <p className="mt-5 text-slate-800">
              <span className="font-semibold">Amass Middle East Shipping Services LLC</span>, a Neutral LCL
              Consolidation Service Provider to serve the UAE market. Our Office is in Oudh Mehta–Dubai and
              the CFS is in Jebel Ali.
            </p>

            <p className="mt-4 text-slate-700">
              As part of an expansion of our business all over the world, we have opened our branches in
              Saudi Arabia with 3 branches in Dammam, Riyadh, and Jeddah; our headquarters is in Dammam, and
              we have our own bonded warehouse facilities in Jeddah and Dammam.
            </p>

            <p className="mt-4 text-slate-700">
              Our growth has been phenomenal in the last 9 years, and we are now one of the leading
              consolidators in the region.
            </p>

            <p className="mt-4 text-slate-700">
              The strength of any organization is its individuals, and we are no different. We have
              approximately 40 staff members catering to the business needs of the market. The departments are
              headed by professionals who have many years of experience in the logistics field. Amass China is
              the founder of the CWN network, which has dedicated members worldwide.
            </p>

            <div className="mt-6">
              <Link to={getNavLink("/about-us")}>
                <Button className="bg-amass-blue hover:bg-amass-dark-blue text-white">Read More</Button>
              </Link>
            </div>
          </div>

          {/* Right: KPI stack */}
          <div className="flex flex-col gap-3">
            <KpiTile title="NO." value={1} caption="DOMESTIC LCL MARKET • UNDISPUTED LEADER" tone="gold" />
            <KpiTile value={200} caption="COUNTRIES & REGIONS" tone="blue" />
            <KpiTile value={1_000} caption="WEEKLY DIRECT SERVICE" tone="blue" />
            <KpiTile value={3_000_000} caption="CUBIC METERS • GLOBAL EXPORT LCL FREIGHT" tone="red" />
            <div className="grid grid-cols-2 gap-3">
              <KpiTile value={84} caption="BRANCHES & OFFICES" tone="blue" />
              <KpiTile value={20_000} caption="DESTINATIONS" tone="sky" />
            </div>
            <KpiTile value={555_000} caption="SHIPMENTS / YEAR" tone="gray" big />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWithKPI;
