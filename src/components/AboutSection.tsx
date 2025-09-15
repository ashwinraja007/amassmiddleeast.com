import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

/* ---- Enhanced count-up hook ---- */
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
  
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  return val;
}

/* ---- Stats with positioning and labels ---- */
const RING = [
  { 
    label: "Countries & Regions", 
    value: 200, 
    color: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
    suffix: "+",
    icon: "🌍",
    position: "top-right"
  },
  { 
    label: "Weekly Direct Service", 
    value: 1000, 
    color: "linear-gradient(135deg, #1F2A72 0%, #4338CA 100%)",
    suffix: "+",
    icon: "🚢",
    position: "right"
  },
  { 
    label: "Cubic Meters • Global Export LCL Freight", 
    value: 3000000, 
    color: "linear-gradient(135deg, #C62828 0%, #EF4444 100%)",
    formatAs: "millions",
    icon: "📦",
    position: "bottom-right"
  },
  { 
    label: "Branches & Offices", 
    value: 84, 
    color: "linear-gradient(135deg, #2B3F8F 0%, #6366F1 100%)",
    suffix: "+",
    icon: "🏢",
    position: "bottom-left"
  },
  { 
    label: "Destinations", 
    value: 20000, 
    color: "linear-gradient(135deg, #1FA6C7 0%, #06B6D4 100%)",
    formatAs: "thousands",
    icon: "✈️",
    position: "left"
  },
  { 
    label: "Shipments / Year", 
    value: 555000, 
    color: "linear-gradient(135deg, #059669 0%, #10B981 100%)",
    formatAs: "thousands",
    icon: "📊",
    position: "top-left"
  },
];

/* ---- Hexagon component ---- */
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
      className={`hex group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl ${className}`}
      style={{
        width: size,
        height: size,
        background: bg,
        clipPath: "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
        filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.15))",
        ...style,
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center text-center px-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {title ? (
          <div className="relative z-10 text-white font-bold leading-tight text-xs sm:text-sm lg:text-base whitespace-pre-line drop-shadow-sm">
            {title}
          </div>
        ) : null}
        
        {value !== undefined ? (
          <>
            {icon && (
              <div className="text-base sm:text-lg mb-1 transform group-hover:scale-110 transition-transform duration-300">
                {icon}
              </div>
            )}
            <div className="relative z-10 text-white font-extrabold leading-none text-lg sm:text-xl lg:text-2xl drop-shadow-sm">
              {formatNumber(animatedValue)}{suffix}
            </div>
            {sub ? (
              <div className="relative z-10 mt-1 text-[8px] sm:text-[9px] lg:text-[10px] font-medium text-white/95 leading-tight drop-shadow-sm px-1">
                {sub}
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};

/* ---- Connector Line Component ---- */
const ConnectorLine: React.FC<{
  from: { x: number; y: number };
  to: { x: number; y: number };
  label: string;
  position: string;
  delay: number;
}> = ({ from, to, label, position, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const length = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
  const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);
  
  // Label positioning based on connector position
  const getLabelPosition = () => {
    switch(position) {
      case 'top-right': return { top: '-40px', right: '0px', textAlign: 'right' as const };
      case 'right': return { top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: '20px', textAlign: 'left' as const };
      case 'bottom-right': return { bottom: '-40px', right: '0px', textAlign: 'right' as const };
      case 'bottom-left': return { bottom: '-40px', left: '0px', textAlign: 'left' as const };
      case 'left': return { top: '50%', right: '100%', transform: 'translateY(-50%)', marginRight: '20px', textAlign: 'right' as const };
      case 'top-left': return { top: '-40px', left: '0px', textAlign: 'left' as const };
      default: return { top: '-40px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' as const };
    }
  };

  return (
    <div 
      className="absolute pointer-events-none"
      style={{
        left: from.x,
        top: from.y,
        width: length,
        height: '3px',
        background: 'linear-gradient(90deg, #3B82F6, #06B6D4)',
        transformOrigin: '0 50%',
        transform: `rotate(${angle}deg)`,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s ease-out',
        borderRadius: '2px',
      }}
    >
      {/* End dot */}
      <div 
        className="absolute w-2 h-2 bg-blue-500 rounded-full -top-[2px]"
        style={{ right: '-4px' }}
      />
      
      {/* Label */}
      <div
        className="absolute text-xs font-semibold text-slate-700 uppercase tracking-wide whitespace-nowrap"
        style={{
          ...getLabelPosition(),
          maxWidth: '140px',
          lineHeight: '1.2',
        }}
      >
        {label}
      </div>
    </div>
  );
};

/* ---- Main component ---- */
const AboutHexCircle: React.FC = () => {
  const location = useLocation();
  const currentCountry = getCurrentCountryFromPath(location.pathname);
  const getNavLink = (p: string) =>
    currentCountry.code === "SG"
      ? p
      : `/${currentCountry.name.toLowerCase().replace(" ", "-")}${p}`;

  const [vars, setVars] = useState({ center: 200, item: 120, radius: 180 });

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setVars({ center: 160, item: 100, radius: 0 });
      } else if (w < 768) {
        setVars({ center: 180, item: 110, radius: 150 });
      } else if (w < 1024) {
        setVars({ center: 200, item: 120, radius: 180 });
      } else {
        setVars({ center: 220, item: 130, radius: 200 });
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Position calculations for hexagons
  const positions = useMemo(() => {
    const angles = [-30, 30, 90, 150, 210, 270]; // Adjusted angles for better layout
    return angles.map(angle => {
      const rad = (angle * Math.PI) / 180;
      const x = Math.cos(rad) * vars.radius;
      const y = Math.sin(rad) * vars.radius;
      return { x, y };
    });
  }, [vars.radius]);

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Text content with images */}
          <div className="space-y-6 lg:pr-8">
            {/* Header with icon */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">🏢</span>
                </div>
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

            {/* Content with icons */}
            <div className="space-y-6 text-slate-700 leading-relaxed">
              {/* First paragraph with UAE/Dubai icon */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mt-1">
                  <span className="text-white text-lg">🇦🇪</span>
                </div>
                <p className="text-base lg:text-lg">
                  <span className="font-bold text-slate-900">Amass Middle East Shipping Services LLC</span>, 
                  a Neutral LCL Consolidation Service Provider to serve the UAE market. Our Office is in Oudh Mehta–Dubai and the CFS is in Jebel Ali.
                </p>
              </div>

              {/* Second paragraph with Saudi Arabia expansion icon */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mt-1">
                  <span className="text-white text-lg">🇸🇦</span>
                </div>
                <p className="text-base lg:text-lg">
                  As part of our global expansion, we opened branches in Saudi Arabia (Dammam, Riyadh, Jeddah). HQ in Dammam with bonded warehouses in Jeddah and Dammam.
                </p>
              </div>

              {/* Third paragraph with growth/network icon */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mt-1">
                  <span className="text-white text-lg">📈</span>
                </div>
                <p className="text-base lg:text-lg">
                  Our growth has been phenomenal in the last 9 years, and we are now one of the leading consolidators in the region. Teams are led by seasoned logistics professionals. Amass China founded the CWN network with dedicated members worldwide.
                </p>
              </div>
            </div>

            {/* Key highlights with icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">⭐</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">9 Years</div>
                  <div className="text-xs text-slate-600">Industry Experience</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🌐</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">CWN Network</div>
                  <div className="text-xs text-slate-600">Global Presence</div>
                </div>
              </div>
            </div>

            {/* Buttons with icons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to={getNavLink("/contact")}>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
                  <span>📖</span>
                  Read More
                </Button>
              </Link>
              
              <Link to={getNavLink("/services")}>
                <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
                  <span>🚢</span>
                  Our Services
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile order adjustment - hexagons appear after text on mobile */}
        </div>
      </div>
    </section>
  );
};

export default AboutHexCircle;
