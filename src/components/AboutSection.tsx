import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

/* ---- Enhanced count-up hook with easing ---- */
function useCountUp(end: number, duration = 2000, delay = 0) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  
  useEffect(() => {
    if (!started) return;
    
    const timeout = setTimeout(() => {
      const t0 = performance.now();
      const step = (t: number) => {
        const elapsed = t - t0;
        const progress = Math.min(1, elapsed / duration);
        
        // Smooth easing function
        const eased = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        setVal(Math.round(end * eased));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [end, duration, delay, started]);
  
  // Trigger animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  return val;
}

/* ---- Enhanced stats with icons and formatting ---- */
const RING = [
  { 
    label: "Countries & Regions", 
    value: 200, 
    color: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
    suffix: "+",
    icon: "🌍"
  },
  { 
    label: "Weekly Direct Services", 
    value: 1000, 
    color: "linear-gradient(135deg, #1F2A72 0%, #4338CA 100%)",
    suffix: "+",
    icon: "🚢"
  },
  { 
    label: "Cubic Meters Global Export", 
    value: 3000000, 
    color: "linear-gradient(135deg, #C62828 0%, #EF4444 100%)",
    formatAs: "millions",
    icon: "📦"
  },
  { 
    label: "Branches & Offices", 
    value: 84, 
    color: "linear-gradient(135deg, #2B3F8F 0%, #6366F1 100%)",
    suffix: "+",
    icon: "🏢"
  },
  { 
    label: "Global Destinations", 
    value: 20000, 
    color: "linear-gradient(135deg, #1FA6C7 0%, #06B6D4 100%)",
    formatAs: "thousands",
    icon: "✈️"
  },
  { 
    label: "Annual Shipments", 
    value: 555000, 
    color: "linear-gradient(135deg, #059669 0%, #10B981 100%)",
    formatAs: "thousands",
    icon: "📊"
  },
];

/* ---- Enhanced hexagon component ---- */
const Hexagon: React.FC<{
  bg: string;
  size: number;
  title?: string;
  value?: number;
  sub?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: string;
  suffix?: string;
  formatAs?: string;
  delay?: number;
}> = ({ bg, size, title, value, sub, className = "", style, icon, suffix = "", formatAs, delay = 0 }) => {
  const n = value ?? 0;
  const animatedValue = useCountUp(n, 2000, delay);
  
  // Format large numbers
  const formatNumber = (num: number) => {
    if (formatAs === "millions" && num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (formatAs === "thousands" && num >= 1000) {
      return `${Math.round(num / 1000)}K`;
    }
    return num.toLocaleString();
  };

  return (
    <div
      className={`hex group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl ${className}`}
      style={{
        width: size,
        height: size,
        background: bg,
        clipPath: "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
        filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.15))",
        ...style,
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center text-center px-2 sm:px-3 relative overflow-hidden">
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {title ? (
          <div className="relative z-10 text-white font-bold leading-tight text-xs sm:text-sm lg:text-base whitespace-pre-line drop-shadow-sm">
            {title}
          </div>
        ) : null}
        
        {value !== undefined ? (
          <>
            {icon && (
              <div className="text-lg sm:text-xl mb-1 transform group-hover:scale-110 transition-transform duration-300">
                {icon}
              </div>
            )}
            <div className="relative z-10 text-white font-extrabold leading-none text-xl sm:text-2xl lg:text-3xl drop-shadow-sm">
              {formatNumber(animatedValue)}{suffix}
            </div>
            {sub ? (
              <div className="relative z-10 mt-1 text-[9px] sm:text-[10px] lg:text-xs font-medium text-white/95 leading-tight drop-shadow-sm">
                {sub}
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};

/* ---- Main enhanced section ---- */
const AboutHexCircle: React.FC = () => {
  const location = useLocation();
  const currentCountry = getCurrentCountryFromPath(location.pathname);
  const getNavLink = (p: string) =>
    currentCountry.code === "SG"
      ? p
      : `/${currentCountry.name.toLowerCase().replace(" ", "-")}${p}`;

  /* Enhanced responsive layout */
  const angles = useMemo(() => {
    return Array.from({ length: RING.length }, (_, i) => (i * 360) / RING.length - 90);
  }, []);

  const [vars, setVars] = useState({ center: 240, item: 140, radius: 250 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setVars({ center: 200, item: 120, radius: 0 });
      } else if (w < 768) {
        setVars({ center: 220, item: 130, radius: 200 });
      } else if (w < 1024) {
        setVars({ center: 240, item: 140, radius: 230 });
      } else {
        setVars({ center: 260, item: 150, radius: 270 });
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Intersection observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById("hex-circle-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="hex-circle-section" className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-200/20 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Enhanced text content */}
          <div className="space-y-6 lg:pr-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                  About Amass
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-tight">
                Who we{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  are
                </span>
              </h2>
            </div>

            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p className="text-base lg:text-lg">
                <span className="font-bold text-slate-900">Amass Middle East Shipping Services LLC</span>, 
                a premier Neutral LCL Consolidation Service Provider serving the UAE market with excellence. 
                Our headquarters are strategically located in Oudh Mehta–Dubai with our CFS facility in Jebel Ali.
              </p>

              <p className="text-base lg:text-lg">
                As part of our ambitious global expansion, we've established key branches across Saudi Arabia 
                including Dammam, Riyadh, and Jeddah, with our headquarters in Dammam featuring state-of-the-art 
                bonded warehouses in both Jeddah and Dammam.
              </p>

              <p className="text-base lg:text-lg">
                Our phenomenal growth over the past 9 years has positioned us as one of the region's leading 
                consolidators. Our expert teams, led by seasoned logistics professionals, continue to drive 
                innovation. Amass China proudly founded the CWN network, connecting dedicated members worldwide.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to={getNavLink("/contact")}>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                  Learn More About Us
                </Button>
              </Link>
              <Link to={getNavLink("/services")}>
                <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                  Our Services
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT: Enhanced hexagon visualization */}
          <div className="relative mx-auto flex justify-center items-center min-h-[500px] lg:min-h-[600px]">
            
            {/* Central hexagon with enhanced styling */}
            <div className="relative">
              <Hexagon
                bg="linear-gradient(135deg, #1e3a8a 0%, #1f2a72 50%, #312e81 100%)"
                size={vars.center}
                title="NO. 1\nDOMESTIC LCL\nMARKET"
                className="relative z-10 animate-pulse"
                style={{
                  color: "white",
                  display: "grid",
                  placeItems: "center",
                  filter: "drop-shadow(0 20px 40px rgba(30, 58, 138, 0.3))",
                }}
              />
              
              {/* Glowing background effect */}
              <div 
                className="absolute inset-0 -z-10 animate-pulse opacity-30"
                style={{
                  width: vars.center + 40,
                  height: vars.center + 40,
                  left: -20,
                  top: -20,
                  background: "radial-gradient(circle, #1e3a8a, transparent 70%)",
                  borderRadius: "50%",
                  filter: "blur(20px)",
                }}
              />
            </div>

            {/* Ring of statistical hexagons */}
            {vars.radius > 0 && (
              <div className="absolute inset-0">
                {RING.map((item, i) => {
                  const angle = (angles[i] * Math.PI) / 180;
                  const x = Math.cos(angle) * vars.radius;
                  const y = Math.sin(angle) * vars.radius;
                  
                  return (
                    <Hexagon
                      key={i}
                      bg={item.color}
                      size={vars.item}
                      value={item.value}
                      sub={item.label}
                      icon={item.icon}
                      suffix={item.suffix}
                      formatAs={item.formatAs}
                      delay={i * 200}
                      className="absolute animate-fade-in"
                      style={{
                        left: `calc(50% + ${x}px - ${vars.item / 2}px)`,
                        top: `calc(50% + ${y}px - ${vars.item / 2}px)`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  );
                })}
              </div>
            )}

            {/* Mobile stacked layout */}
            {vars.radius === 0 && (
              <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-md">
                {RING.map((item, i) => (
                  <Hexagon
                    key={`stack-${i}`}
                    bg={item.color}
                    size={vars.item}
                    value={item.value}
                    sub={item.label}
                    icon={item.icon}
                    suffix={item.suffix}
                    formatAs={item.formatAs}
                    delay={i * 150}
                    className="mx-auto"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default AboutHexCircle;
