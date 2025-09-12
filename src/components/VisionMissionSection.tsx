import { useEffect, useRef, useState } from "react";
import ScrollAnimation from "./ScrollAnimation";
import { Trophy, Globe2, Plane, Boxes, Building2, MapPinned, Package } from "lucide-react";

/** Tiny count-up hook (no external libs) */
function useCountUp(end: number, duration = 1400, startWhenVisible = true) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(!startWhenVisible);

  useEffect(() => {
    if (!startWhenVisible) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [startWhenVisible]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.floor(end * (1 - Math.pow(1 - p, 3)))); // easeOutCubic
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, started]);

  // format with commas
  const text = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return { ref, text, done: val >= end };
}

type Stat = {
  label: string;
  value: number;
  suffix?: string;         // e.g., " YEAR", " m³"
  caption?: string;        // smaller helper line
  icon: React.ElementType; // lucide icon
  color: "blue" | "red" | "gold" | "slate";
  big?: boolean;           // wide/tall feature card
};

const STATS: Stat[] = 
  { label: "Countries & Regions", value: 200, icon: Globe2, color: "blue" },
  { label: "Weekly Direct Service", value: 1000, icon: Plane, color: "blue" },
  { label: "Cubic Meters • Global Export LCL Freight", value: 3000000, icon: Boxes, color: "blue", big: true },
  { label: "Branches & Offices", value: 84, icon: Building2, color: "red" },
  { label: "Destinations", value: 20000, icon: MapPinned, color: "red" },
  { label: "Shipments / Year", value: 555000, icon: Package, color: "red", big: true },
];

const colorMap = {
  blue: "bg-kargon-blue text-white",
  red: "bg-kargon-red text-white",
};

const ringMap = {
  blue: "ring-kargon-blue/30",
  red: "ring-kargon-red/30",
};

function StatCard({ s }: { s: Stat }) {
  const { ref, text } = useCountUp(s.value);
  const Icon = s.icon;

  return (
    <div
      className={[
        "rounded-2xl p-5 sm:p-6 md:p-7 shadow-sm ring-1",
        colorMap[s.color],
        ringMap[s.color],
        s.big ? "lg:col-span-2" : "",
        "transition-transform duration-300 hover:-translate-y-1 hover:shadow-md",
      ].join(" ")}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
          <Icon className="h-5 w-5" />
        </div>
        <p className="uppercase tracking-wide text-xs sm:text-sm opacity-90">
          {s.label}
        </p>
      </div>

      <div ref={ref as any} className="flex items-end gap-2">
        <span className="leading-none font-extrabold text-4xl sm:text-5xl md:text-6xl">
          {text}
        </span>
        {s.suffix && (
          <span className="leading-none pb-1 font-semibold opacity-80">
            {s.suffix}
          </span>
        )}
      </div>

      {s.caption && (
        <p className="mt-2 text-sm sm:text-base opacity-90">{s.caption}</p>
      )}
    </div>
  );
}

const StatsHighlight = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Numbers That Move Us</h2>
          <p className="text-gray-600 mt-2">Scale, reliability, and reach—at a glance.</p>
        </ScrollAnimation>

        {/* Responsive Mosaic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {STATS.map((s, i) => (
            <ScrollAnimation key={i} delay={i * 70}>
              <StatCard s={s} />
            </ScrollAnimation>
          ))}
        </div>

        {/* Subtle legend bar */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-kargon-blue" /> Core Network
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-kargon-red" /> Capacity
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-gc-gold" /> Reach
          </span>
        </div>
      </div>
    </section>
  );
};

export default StatsHighlight;
