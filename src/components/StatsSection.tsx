import React from "react";
import ScrollAnimation from "./ScrollAnimation";

/* ✅ Numbers + emojis you asked to show */
const RING = [
  { label: "Countries & Regions", value: 200, emoji: "🌍" },
  { label: "Weekly Direct Service", value: 1000, emoji: "⏱️" },
  { label: "Cubic Meters Export", value: 3_000_000, emoji: "📦" },
  { label: "Branches & Offices", value: 84, emoji: "🏢" },
  { label: "Destinations", value: 20_000, emoji: "🗺️" },
  { label: "Shipments / Year", value: 555_000, emoji: "🚢" },
];

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

        {/* Grid of stats with numbers visible */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {RING.map((item, idx) => (
            <ScrollAnimation
              key={idx}
              delay={idx * 150}
              className="bg-white/20 backdrop-blur-lg border border-white/10 rounded-xl shadow-xl p-8 text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full text-5xl">
                  {item.emoji}
                </div>
              </div>
              {/* 🔢 actual numbers rendered here */}
              <div className="text-5xl font-bold text-white mb-2">
                {item.value.toLocaleString()}
              </div>
              <div className="text-lg font-medium text-white/80">
                {item.label}
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
