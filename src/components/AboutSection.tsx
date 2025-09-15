// src/components/FeatureCards.tsx
import React from "react";
import { ClipboardList, Briefcase, Chess } from "lucide-react";

type Feature = {
  title: string;
  description: string;
  // Tailwind color or hex (used for the icon badge + grid tint)
  accent?: string;   // e.g. "orange-500" or "#F59E0B"
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const features: Feature[] = [
  {
    title: "List Tracking",
    description:
      "We make smart tracking so simple you’ll actually use it. Even if you forget, our tracking reminders and site detection have your back.",
    accent: "orange-500",
    Icon: ClipboardList,
  },
  {
    title: "Sales Track",
    description:
      "Know where every product stands, from leads to paychecks—clear steps and tasks to see what’s making you money.",
    accent: "blue-500",
    Icon: Briefcase,
  },
  {
    title: "Strategy",
    description:
      "Start tracking in your browser, right from the sites you use—then review between the phone app, desktop, or dashboards.",
    accent: "violet-500",
    Icon: Chess,
  },
];

const getAccentClasses = (accent?: string) => {
  // Accepts tailwind tokens like "orange-500" or raw hex
  const badgeBg =
    accent && accent.startsWith("#")
      ? accent
      : `hsl(var(--tw-${accent || "orange-500"}))`; // fallback

  // Grid tint (very subtle)
  const tint =
    accent && accent.startsWith("#")
      ? accent
      : `var(--tw-${accent || "orange-500"})`;

  return { badgeBg, tint };
};

const FeatureCard: React.FC<Feature> = ({ title, description, Icon, accent }) => {
  const { badgeBg, tint } = getAccentClasses(accent);

  return (
    <div className="relative rounded-2xl border border-black/[0.06] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6 overflow-hidden hover:shadow-[0_12px_28px_rgba(0,0,0,0.09)] transition-shadow">
      {/* Subtle grid background on top area */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-0 left-0 right-0 top-0 h-28"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              to right,
              color-mix(in srgb, ${tint} 10%, transparent) 0,
              color-mix(in srgb, ${tint} 10%, transparent) 1px,
              transparent 1px,
              transparent 24px
            ),
            repeating-linear-gradient(
              to bottom,
              color-mix(in srgb, ${tint} 10%, transparent) 0,
              color-mix(in srgb, ${tint} 10%, transparent) 1px,
              transparent 1px,
              transparent 24px
            )
          `,
        }}
      />

      {/* Rounded inner “frame” look */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-black/[0.04] pointer-events-none" />

      {/* Icon badge */}
      <div
        className="relative z-10 mx-auto -mt-2 mb-4 flex h-12 w-12 items-center justify-center rounded-full text-white"
        style={{ background: badgeBg }}
      >
        <Icon className="h-6 w-6" />
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-center text-[1.1rem] font-semibold text-slate-900">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 mt-2 text-center text-sm leading-relaxed text-slate-600">
        {description}
      </p>

      {/* Optional “pager dots” like the reference (decorative) */}
      <div className="relative z-10 mt-5 flex items-center justify-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <span className="h-1.5 w-6 rounded-full bg-slate-400" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
      </div>
    </div>
  );
};

const FeatureCards: React.FC<{ items?: Feature[] }> = ({ items = features }) => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
