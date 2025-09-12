import { useEffect, useRef, useState } from "react";
import { Handshake, Megaphone, TrendingUp, Users } from "lucide-react";

/* count-up (no libs) */
function useCountUp(end: number, ms = 1200) {
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
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(end * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, ms, start]);

  return { ref, text: val.toString() };
}

type Item = {
  value: number;               // 94
  text: string;                // paragraph
  Icon: React.ElementType;     // badge icon
  color: "teal" | "orange" | "rose" | "blue";
};

const palette = {
  teal:   { badge: "bg-teal-500",  number: "text-teal-600",  ribbon: "from-teal-400 to-teal-600" },
  orange: { badge: "bg-orange-500",number: "text-orange-600",ribbon: "from-orange-400 to-orange-600" },
  rose:   { badge: "bg-rose-500",  number: "text-rose-600",  ribbon: "from-rose-400 to-rose-600" },
  blue:   { badge: "bg-blue-600",  number: "text-blue-600",  ribbon: "from-blue-500 to-blue-700" },
};

const DEFAULT: Item[] = [
  {
    value: 94,
    text: "of all first impressions on a website are design - related.",
    Icon: Handshake,
    color: "teal",
  },
  {
    value: 73,
    text: "of companies invest in design to differentiate their brand from the competition",
    Icon: Megaphone,
    color: "orange",
  },
  {
    value: 62,
    text: "of companies that invested in responsive design saw an increase in sales .",
    Icon: TrendingUp,
    color: "rose",
  },
  {
    value: 46,
    text: "of consumers judge the credibility of a website from its visual appeal & aesthetics.",
    Icon: Users,
    color: "blue",
  },
];

export default function ExactPillStats({ items = DEFAULT }: { items?: Item[] }) {
  return (
    <section className="py-12 md:py-16 bg-[radial-gradient(ellipse_at_top,_#f4f6f8,_#ffffff)]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ value, text, Icon, color }, i) => {
            const { ref, text: n } = useCountUp(value);
            const c = palette[color];

            return (
              <div
                key={i}
                className="relative overflow-visible bg-white rounded-[28px] pt-14 pb-12 px-7 shadow-[0_8px_24px_rgba(16,24,40,0.08)] hover:shadow-[0_12px_28px_rgba(16,24,40,0.12)] transition-shadow text-center"
              >
                {/* top circular badge */}
                <div className="absolute -top-9 left-1/2 -translate-x-1/2">
                  <div className={`h-18 w-18 md:h-20 md:w-20 ${c.badge} rounded-full grid place-items-center shadow-[0_8px_18px_rgba(0,0,0,0.15)] ring-8 ring-white`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* percentage number */}
                <div ref={ref as any} className="mb-3">
                  <span className={`text-4xl md:text-5xl font-extrabold tracking-tight ${c.number}`}>
                    {n}
                    <span className="align-top text-2xl md:text-3xl ml-0.5">%</span>
                  </span>
                </div>

                {/* body text */}
                <p className="text-[15px] leading-6 md:text-base md:leading-7 text-slate-700">
                  {text}
                </p>

                {/* bottom ribbon tail */}
                <div
                  className={`absolute -bottom-4 left-1/2 -translate-x-1/2 h-8 w-32 bg-gradient-to-b ${c.ribbon} shadow-[0_8px_18px_rgba(0,0,0,0.12)]`}
                  style={{
                    clipPath:
                      "polygon(10% 0, 90% 0, 100% 100%, 50% 74%, 0 100%)",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
