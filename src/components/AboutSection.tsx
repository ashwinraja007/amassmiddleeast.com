// src/components/AboutWithKPIInteractive.tsx
import React, { useEffect, useRef, useState, MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

/* ------------------ tiny count-up hook ------------------ */
function useCountUp(end: number, duration = 1400, startOnVisible = true) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(!startOnVisible);
  const ref = useRef<HTMLDivElement | null>(null);

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
    const t0 = performance.now();
    const from = 0, diff = end - from;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const ease = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + diff * ease));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [end, duration, started]);

  return { ref, value };
}

/* ------------------ theme helpers ------------------ */
type Tone = "gold" | "blue" | "red" | "sky" | "gray";
const TILE = {
  gold: { bg: "#1D2A61", text: "#D4AF37" }, // dark blue + gold
  blue: { bg: "#1D2A61", text: "#D2B77E" },
  red:  { bg: "#C62828", text: "#ffffff" },
  sky:  { bg: "#46B9DB", text: "#ffffff" },
  gray: { bg: "#BDBDBD", text: "#ffffff" },
} as const;

/* ------------------ data ------------------ */
const KPIS: Array<{
  title?: string;
  value: number;
  caption: string;
  tone: Tone;
  detail?: string;
  big?: boolean;
}> = [
  { title: "NO.", value: 1, caption: "DOMESTIC LCL MARKET • UNDISPUTED LEADER", tone: "gold", detail: "Market leadership built on reliability, schedule integrity, and neutrality." },
  { value: 200, caption: "COUNTRIES & REGIONS", tone: "blue", detail: "Global coverage through owned branches and vetted partner network." },
  { value: 1_000, caption: "WEEKLY DIRECT SERVICE", tone: "blue", detail: "High-frequency departures for predictable transit and capacity." },
  { value: 3_000_000, caption: "CUBIC METERS • GLOBAL EXPORT LCL FREIGHT", tone: "red", detail: "Proven consolidation capacity across key tradelanes." },
  { value: 84, caption: "BRANCHES & OFFICES", tone: "blue", detail: "On-ground teams for last-mile clarity and accountability." },
  { value: 20_000, caption: "DESTINATIONS", tone: "sky", detail: "Door-to-door reach with local compliance and handling." },
  { value: 555_000, caption: "SHIPMENTS / YEAR", tone: "gray", big: true, detail: "Trusted by forwarders worldwide for volume and velocity." },
];

/* ------------------ interactive tile ------------------ */
const KpiTile: React.FC<{
  kpi: (typeof KPIS)[number];
  idx: number;
}> = ({ kpi: { title, value, caption, tone, big, detail }, idx }) => {
  const { ref, value: count } = useCountUp(value);
  const [open, setOpen] = useState(false);
  const tileRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const onMouseMove = (e: MouseEvent) => {
    const el = tileRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setPos({ x, y });
  };

  return (
    <div
      ref={tileRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setPos({ x: 50, y: 50 })}
      className={`relative rounded-xl shadow-lg overflow-hidden will-change-transform
                  transition-[transform,box-shadow] duration-300
                  ${big ? "py-6 px-6" : "py-4 px-5"}
                  focus-within:ring-2 ring-offset-2 ring-offset-white`}
      style={{
        background: TILE[tone].bg,
        transform: `translateY(${open ? "-2px" : "0"})`,
      }}
    >
      {/* parallax inner wrapper */}
      <div
        className="relative z-10"
        style={{
          transform: `translate(${(pos.x - 50) / 40}px, ${(pos.y - 50) / 40}px)`,
          transition: "transform 120ms ease",
        }}
      >
        {/* sheen sweep */}
        <span
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px 120px at ${pos.x}% -20%, rgba(255,255,255,0.25), transparent 55%)`,
            transition: "opacity 300ms ease",
          }}
          aria-hidden
        />

        {/* subtle pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(circle at 20% -10%, white 2px, transparent 2px) 0 0/28px 28px",
          }}
        />

        {/* main row */}
        <div className="relative flex items-center gap-4">
          {title ? (
            <div className="text-white/90 text-2xl md:text-3xl font-extrabold leading-none pr-3 border-r border-white/20 select-none">
              {title}
            </div>
          ) : null}

          <div className="flex-1">
            <div
              ref={ref as any}
              className="font-extrabold leading-none select-none"
              style={{ color: TILE[tone].text, fontSize: big ? "3rem" : "2.25rem" }}
            >
              {count.toLocaleString()}
            </div>
            <div className="mt-1 text-white/95 text-[11px] md:text-xs font-semibold tracking-wide select-none">
              {caption}
            </div>
          </div>

          {/* toggle */}
          <button
            onClick={() => setOpen((s) => !s)}
            className="ml-2 shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold bg-white/15 text-white hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-expanded={open}
            aria-controls={`kpi-detail-${idx}`}
          >
            {open ? "Hide" : "More"}
          </button>
        </div>

        {/* detail collapse */}
        <div
          id={`kpi-detail-${idx}`}
          className="overflow-hidden transition-[max-height,opacity] duration-300"
          style={{ maxHeight: open ? 120 : 0, opacity: open ? 1 : 0 }}
        >
          <p className="mt-3 text-white/90 text-sm">{detail}</p>
        </div>
      </div>
    </div>
  );
};

/* ------------------ section ------------------ */
const AboutWithKPIInteractive: React.FC = () => {
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
          {/* left copy */}
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
              The strength of any organization is its individuals, and we are no different. We have ~40 staff
              members. Departments are headed by professionals with years of experience. Amass China is the
              founder of the CWN network, which has dedicated members worldwide.
            </p>

            <div className="mt-6">
              <Link to={getNavLink("/about-us")}>
                <Button className="bg-amass-blue hover:bg-amass-dark-blue text-white">Read More</Button>
              </Link>
            </div>
          </div>

          {/* right KPI stack */}
          <div className="flex flex-col gap-3">
            {KPIS.map((kpi, i) => (
              <div
                key={i}
                className="group opacity-0 translate-y-3 animate-[fadeUp_0.55s_ease_forwards]"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <KpiTile kpi={kpi} idx={i} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* tiny keyframes */}
      <style>{`
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default AboutWithKPIInteractive;
