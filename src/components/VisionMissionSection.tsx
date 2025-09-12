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
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setStarted(true);
        io.disconnect();
      }
    }, {
      threshold: 0.4
    });
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
  return {
    ref,
    text,
    done: val >= end
  };
}
type Stat = {
  label: string;
  value: number;
  suffix?: string; // e.g., " YEAR", " m³"
  caption?: string; // smaller helper line
  icon: React.ElementType; // lucide icon
  color: "blue" | "red" | "gold" | "slate";
  big?: boolean; // wide/tall feature card
};
const STATS: Stat[] = [{
  label: "NO. 1",
  value: 1,
  caption: "Domestic LCL Market • Undisputed Leader",
  icon: Trophy,
  color: "slate"
}, {
  label: "Countries & Regions",
  value: 200,
  icon: Globe2,
  color: "blue"
}, {
  label: "Weekly Direct Service",
  value: 1000,
  icon: Plane,
  color: "blue"
}, {
  label: "Cubic Meters • Global Export LCL Freight",
  value: 3000000,
  icon: Boxes,
  color: "red",
  big: true
}, {
  label: "Branches & Offices",
  value: 84,
  icon: Building2,
  color: "blue"
}, {
  label: "Destinations",
  value: 20000,
  icon: MapPinned,
  color: "gold"
}, {
  label: "Shipments / Year",
  value: 555000,
  icon: Package,
  color: "slate",
  big: true
}];
const colorMap = {
  blue: "bg-kargon-blue text-white",
  red: "bg-kargon-red text-white",
  gold: "bg-gc-gold text-gray-900",
  slate: "bg-gray-100 text-gray-900"
};
const ringMap = {
  blue: "ring-kargon-blue/30",
  red: "ring-kargon-red/30",
  gold: "ring-gc-gold/40",
  slate: "ring-gray-300"
};
function StatCard({
  s
}: {
  s: Stat;
}) {
  const {
    ref,
    text
  } = useCountUp(s.value);
  const Icon = s.icon;
  return;
}
const StatsHighlight = () => {
  return <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Numbers That Move Us</h2>
          <p className="text-gray-600 mt-2">Scale, reliability, and reach—at a glance.</p>
        </ScrollAnimation>

        {/* Responsive Mosaic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {STATS.map((s, i) => <ScrollAnimation key={i} delay={i * 70}>
              <StatCard s={s} />
            </ScrollAnimation>)}
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
    </section>;
};
export default StatsHighlight;