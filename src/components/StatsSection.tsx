import React, { useEffect, useState } from "react";
import ScrollAnimation from "./ScrollAnimation";

/* Stats with plain numbers + labels */
const RING = [
  { label: "Countries & Regions", value: 200 },
  { label: "Weekly Direct Service", value: 1_000 },
  { label: "Cubic Meters Export", value: 3_000_000 },
  { label: "Branches & Offices", value: 84 },
  { label: "Destinations", value: 20_000 },
  { label: "Shipments / Year", value: 555_000 },
];

/* compact formatter: 1,000 -> 1K, 1,000,000 -> 1M */
function formatCompact(n: number) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return `${n}`;
}

/* simple count-up hook */
function useCountUp(end: number, duration = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(end * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);
  return val;
}

const StatsSection: React.FC = () => {
  return (
    <section className="relative py-14 md:py-20 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/lovable-uploads/6fa84550-fe8c-4549-a9c9-c0f071c2cd75.png"
          alt="Logistics Background"
          className="w-full h-full object-cover"
        />
        {/* Soft overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-kargon-dark/75 via-kargon-dark/70 to-kargon-dark/80" />
        {/* Decorative radial glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-kargon-red/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 [mask-image:radial-gradient(transparent,black_70%)] opacity-[0.06] bg-[linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:28px_28px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Title */}
        <h2
          className="
            mx-auto mb-10 md:mb-12 text-center font-extrabold leading-tight text-white
            text-[clamp(1.25rem,3vw,2rem)]
          "
        >
          <span className="opacity-90">NO.1</span>{" "}
          <span className="text-kargon-red">
            Domestic LCL Market Undisputed Leader
          </span>
        </h2>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {RING.map((item, idx) => {
            const count = useCountUp(item.value);
            const compact = formatCompact(count);

            return (
              <ScrollAnimation
                key={idx}
                delay={idx * 100}
                className="
                  group relative rounded-2xl p-[1px]
                  bg-gradient-to-b from-white/20 via-white/10 to-transparent
                  hover:from-white/30 hover:via-white/15
                  transition-transform duration-300
                  will-change-transform
                "
              >
                {/* inner glass card */}
                <div
                  className="
                    rounded-2xl border border-white/10
                    bg-white/10 backdrop-blur-md
                    shadow-[0_6px_20px_rgba(0,0,0,.20)]
                    p-4 md:p-6 text-center
                    group-hover:-translate-y-0.5 transition
                  "
                >
                  {/* subtle top accent line */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-16 rounded-full bg-kargon-red/60 group-hover:w-20 transition-all" />

                  {/* number */}
                  <div
                    className="
                      tabular-nums font-extrabold text-white mb-1
                      text-2xl sm:text-3xl lg:text-4xl tracking-tight
                    "
                    aria-label={`${item.label}: ${count.toLocaleString()}`}
                  >
                    {compact}
                    <span className="ml-1 text-white/60 text-lg align-top">+</span>
                  </div>

                  {/* label */}
                  <div className="text-[10px] sm:text-xs md:text-sm font-medium text-white/85 leading-snug">
                    {item.label}
                  </div>

                  {/* soft bottom glow */}
                  <div className="pointer-events-none absolute inset-x-6 -bottom-2 h-8 blur-2xl bg-white/15 rounded-full" />
                </div>
              </ScrollAnimation>
            );
          })}
        </div>

        {/* small footnote / credibility line */}
        <p className="mt-6 text-center text-[11px] sm:text-xs text-white/60">
          Figures are indicative and updated periodically based on operational data.
        </p>
      </div>
    </section>
  );
};

export default StatsSection;
