import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";
import {
  Trophy,
  Globe2,
  Plane,
  Boxes,
  Building2,
  MapPinned,
  Package,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

/** ----- Your stats (can be imported from elsewhere) ----- */
const STATS = [
  { title: "NO. 1", value: 1, caption: "Domestic LCL Market • Undisputed Leader", Icon: Trophy, tone: "gold" as const },
  { title: "Countries & Regions", value: 200, caption: "Global coverage", Icon: Globe2, tone: "blue" as const },
  { title: "Weekly Direct Service", value: 1000, caption: "High-frequency schedules", Icon: Plane, tone: "blue" as const },
  { title: "Cubic Meters • Global Export LCL Freight", value: 3_000_000, caption: "Proven consolidation capacity", Icon: Boxes, tone: "red" as const },
  { title: "Branches & Offices", value: 84, caption: "On-ground expertise", Icon: Building2, tone: "blue" as const },
  { title: "Destinations", value: 20_000, caption: "Door-to-door reach", Icon: MapPinned, tone: "gold" as const },
  { title: "Shipments / Year", value: 555_000, caption: "Trusted by shippers worldwide", Icon: Package, tone: "red" as const },
];

type Tone = "gold" | "blue" | "red";
const toneBg: Record<Tone, string> = { gold: "#FFD70033", blue: "#3B82F633", red: "#EF444433" };
const toneText: Record<Tone, string> = { gold: "text-yellow-500", blue: "text-blue-600", red: "text-red-500" };

type StatsCarouselProps = {
  title?: string;             // Section heading (e.g., "Expertise")
  items?: typeof STATS;       // Defaults to STATS above
};

const StatsCarousel: React.FC<StatsCarouselProps> = ({ title = "Expertise", items = STATS }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Each slide width (including gap) for programmatic scroll
  const getSlideWidth = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    const slide = el.querySelector<HTMLDivElement>("[data-slide]");
    if (!slide) return 0;
    // slide width + column-gap
    const styles = window.getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || "0");
    return slide.getBoundingClientRect().width + gap;
  }, []);

  const slideTo = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(index, items.length - 1));
    const w = getSlideWidth();
    el.scrollTo({ left: clamped * w, behavior: "smooth" });
  };

  const next = () => slideTo(active + 1);
  const prev = () => slideTo(active - 1);

  // Update active index while scrolling (snap-aware)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let rAF = 0;
    const handler = () => {
      rAF = requestAnimationFrame(() => {
        const w = getSlideWidth() || 1;
        const idx = Math.round(el.scrollLeft / w);
        setActive(Math.max(0, Math.min(idx, items.length - 1)));
      });
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => {
      el.removeEventListener("scroll", handler);
      cancelAnimationFrame(rAF);
    };
  }, [getSlideWidth, items.length]);

  const dots = useMemo(() => new Array(items.length).fill(0), [items.length]);

  return (
    <section className="relative bg-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Section heading like the reference */}
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            {title}
          </h2>

          {/* Prev / Next controls (desktop) */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <button
              onClick={prev}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
              aria-label="Previous"
              disabled={active === 0}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              onClick={next}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
              aria-label="Next"
              disabled={active === items.length - 1}
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Viewport frame (rounded like the screenshot) */}
        <div className="rounded-2xl border border-black/10 shadow-[0_8px_28px_rgba(0,0,0,0.08)] overflow-hidden bg-white">
          {/* Scrollable track */}
          <div
            ref={trackRef}
            className="grid auto-cols-[85%] sm:auto-cols-[60%] md:auto-cols-[45%] lg:auto-cols-[33%] grid-flow-col gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth px-5 py-6"
            style={{ scrollbarWidth: "none" }}
          >
            {items.map(({ title, value, caption, Icon, tone }, i) => (
              <div
                key={i}
                data-slide
                className="snap-start"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${items.length}`}
              >
                <div className="h-full rounded-xl border border-black/5 bg-white shadow-[0_6px_18px_rgba(0,0,0,0.06)] p-5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.09)] transition">
                  {/* Icon badge */}
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: toneBg[tone] }}
                  >
                    <Icon className={`h-6 w-6 ${toneText[tone]}`} />
                  </div>

                  <div className="text-xs uppercase tracking-wide text-slate-500 font-medium">
                    {title}
                  </div>

                  <div className="mt-1 text-2xl font-extrabold text-slate-900">
                    {value.toLocaleString()}
                  </div>

                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {caption}
                  </p>

                  {/* Read more (optional) */}
                  <div className="mt-4">
                    <button className="text-fuchsia-600 font-semibold text-sm hover:underline">
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom controls like the reference (mobile-friendly) */}
          <div className="flex items-center justify-between px-5 pb-5">
            <button
              onClick={prev}
              className="md:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
              aria-label="Previous"
              disabled={active === 0}
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>

            {/* Dots */}
            <div className="mx-auto md:mx-0 flex items-center gap-1.5">
              {dots.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    active === idx ? "w-6 bg-slate-700" : "w-1.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="md:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
              aria-label="Next"
              disabled={active === items.length - 1}
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsCarousel;
