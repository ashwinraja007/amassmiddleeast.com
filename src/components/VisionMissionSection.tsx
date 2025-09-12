import { useEffect, useRef, useState } from "react";
import { Trophy, Globe2, Plane, Boxes, Building2, MapPinned, Package } from "lucide-react";

/* ---- tiny count-up (no libs) ---- */
function useCountUp(end: number, ms = 1400) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStart(true); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.floor(end * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, ms, start]);

  const text = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return { ref, text };
}

/* ---- data model ---- */
type StatItem = {
  title?: string;          // small line above number (e.g., "NO. 1")
  value: number;           // number to show
  unit?: string;           // optional suffix
  caption: string;         // main description
  Icon: React.ElementType; // lucide icon
  tone: "blue" | "red" | "gold" | "slate";
};

const toneGrad = {
  blue:  "from-kargon-blue to-kargon-blue/90",
  red:   "from-kargon-red to-kargon-red/90",
  gold:  "from-gc-gold to-gc-gold",
  slate: "from-slate-400 to-slate-600",
};

/* ---- YOUR EXACT STATS ---- */
const LOGISTICS_STATS: StatItem[] = [
  {
    title: "NO. 1",
    value: 1,
    unit: "",
    caption: "Domestic LCL Market • Undisputed Leader",
    Icon: Trophy,
    tone: "gold",
  },
  {
    title: "Countries & Regions",
    value: 200,
    unit: "",
    caption: "Global coverage at scale",
    Icon: Globe2,
    tone: "blue",
  },
  {
    title: "Weekly Direct Service",
    value: 1000,
    unit: "",
    caption: "High-frequency schedules",
    Icon: Plane,
    tone: "blue",
  },
  {
    title: "Cubic Meters • Global Export LCL Freight",
    value: 3_000_000,
    unit: "",
    caption: "Proven consolidation capacity",
    Icon: Boxes,
    tone: "red",
  },
  {
    title: "Branches & Offices",
    value: 84,
    unit: "",
    caption: "On-ground expertise",
    Icon: Building2,
    tone: "blue",
  },
  {
    title: "Destinations",
    value: 20_000,
    unit: "",
    caption: "Door-to-door reach",
    Icon: MapPinned,
    tone: "blue",
  },
  {
    title: "Shipments / Year",
    value: 555_000,
    unit: "",
    caption: "Trusted by shippers worldwide",
    Icon: Package,
    tone: "red",
  },
];

/* ---- card ---- */
function PillCard({ item }: { item: StatItem }) {
  const { ref, text } = useCountUp(item.value);
  const Icon = item.Icon;
  const grad = toneGrad[item.tone];

  return (
    <div className="relative bg-white rounded-3xl pt-12 pb-10 px-6 shadow-md hover:shadow-lg transition-shadow text-center">
      {/* Top circular badge */}
      <div
        className={`absolute -top-7 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full ring-4 ring-white shadow-md grid place-items-center bg-gradient-to-b ${grad}`}
      >
        <Icon className="h-7 w-7 text-white" />
      </div>

      {/* Optional small title */}
      {item.title && (
        <p className="text-[11px] md:text-xs uppercase tracking-wide text-slate-500 mb-2">
          {item.title}
        </p>
      )}

      {/* Number */}
      <div ref={ref as any} className="mb-2">
        <span className="text-4xl md:text-5xl font-extrabold text-slate-800">
          {text}
          {item.unit && (
            <span className="align-top text-2xl md:text-3xl">{item.unit}</span>
          )}
        </span>
      </div>

      {/* Caption */}
      <p className="text-sm md:text-base text-slate-600 leading-relaxed">
        {item.caption}
      </p>

      {/* Ribbon tail */}
      <div
        className={`absolute -bottom-3 left-1/2 -translate-x-1/2 h-7 w-28 bg-gradient-to-b ${grad} shadow-sm`}
        style={{ clipPath: "polygon(10% 0, 90% 0, 100% 100%, 50% 72%, 0 100%)" }}
      />
    </div>
  );
}

/* ---- section ---- */
export default function LogisticsPillStats() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LOGISTICS_STATS.map((it, i) => (
            <PillCard key={i} item={it} />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-600">
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
}
