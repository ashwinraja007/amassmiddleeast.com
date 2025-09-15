import React, { useEffect, useState } from "react";
import ScrollAnimation from "./ScrollAnimation";

/* Stats with plain numbers + labels */
const RING = [
  { label: "Countries & Regions", value: 200 },
  { label: "Weekly Direct Service", value: 1000 },
  { label: "Cubic Meters Export", value: 3_000_000 },
  { label: "Branches & Offices", value: 84 },
  { label: "Destinations", value: 20_000 },
  { label: "Shipments / Year", value: 555_000 },
];

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
    <section className="relative py-16">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/lovable-uploads/6fa84550-fe8c-4549-a9c9-c0f071c2cd75.png"
          alt="Logistics Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-kargon-dark/80" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center">
          Our <span className="text-kargon-red">Key Numbers</span>
        </h2>

        {/* Single horizontal row on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {RING.map((item, idx) => {
            const count = useCountUp(item.value);
            return (
              <ScrollAnimation
                key={idx}
                delay={idx * 120}
                className="bg-white/20 backdrop-blur-lg border border-white/10 rounded-xl shadow-xl p-6 text-center"
              >
                {/* 🔢 animated running number */}
                <div className="text-4xl font-bold text-white mb-2 tabular-nums">
                  {count.toLocaleString()}
                </div>
                <div className="text-sm font-medium text-white/80">
                  {item.label}
                </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
