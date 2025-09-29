import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getCurrentCountryFromPath } from "@/services/countryDetection";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

/* ===== IP → country (cached 24h) ===== */
type GeoCountry = { code: string; name: string };
const GEO_CACHE_KEY = "geoCountryCache:v1";
const GEO_TTL_MS = 24 * 60 * 60 * 1000;

async function fetchGeo(): Promise<GeoCountry | null> {
  try {
    const r = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (r.ok) {
      const j = await r.json();
      if (j?.country && j?.country_name) return { code: j.country, name: j.country_name };
    }
  } catch {}
  try {
    const r2 = await fetch("https://ipwho.is/", { cache: "no-store" });
    if (r2.ok) {
      const j2 = await r2.json();
      if (j2?.success && j2?.country_code && j2?.country)
        return { code: j2.country_code, name: j2.country };
    }
  } catch {}
  return null;
}

function useGeoCountry(defaultCountry: GeoCountry = { code: "AE", name: "United Arab Emirates" }) {
  const [geo, setGeo] = useState<GeoCountry>(defaultCountry);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(GEO_CACHE_KEY);
      if (raw) {
        const { value, ts } = JSON.parse(raw) as { value: GeoCountry; ts: number };
        if (Date.now() - ts < GEO_TTL_MS && value?.code) {
          setGeo(value);
          setLoading(false);
          return;
        }
      }
    } catch {}

    let cancelled = false;
    (async () => {
      const res = await fetchGeo();
      if (!cancelled) {
        if (res) {
          setGeo(res);
          try {
            localStorage.setItem(GEO_CACHE_KEY, JSON.stringify({ value: res, ts: Date.now() }));
          } catch {}
        }
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { geo, loading };
}

/* emoji fallback */
function isoToFlagEmoji(iso2?: string) {
  if (!iso2 || iso2.length !== 2) return "🌐";
  const A = 0x1f1e6;
  const c = iso2.toUpperCase();
  return String.fromCodePoint(A + (c.charCodeAt(0) - 65), A + (c.charCodeAt(1) - 65));
}

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  // used for building links only
  const currentCountry = getCurrentCountryFromPath(location.pathname);

  // flag from IP (SVG or emoji)
  const { geo, loading } = useGeoCountry({ code: "AE", name: "United Arab Emirates" });
  const [svgError, setSvgError] = useState(false);
  const code2 = (geo.code || "AE").toLowerCase();
  const flagSrc = useMemo(() => `/flags/${code2}.svg`, [code2]);

  const isActive = (path: string) => location.pathname === path;

  const getNavLink = (basePath: string) => {
    if (currentCountry.code === "SG") return basePath;
    return `/${currentCountry.name.toLowerCase().replace(" ", "-")}${basePath}`;
  };

  const isCompanyLinkActive = () =>
    isActive(getNavLink("/about-us")) ||
    isActive(getNavLink("/gallery")) ||
    isActive(getNavLink("/career"));

  const SOCIALS = [
    { name: "LinkedIn", href: "https://www.linkedin.com/company/amassmiddleeast/", Icon: FaLinkedinIn },
    { name: "Facebook", href: "https://www.facebook.com/Amassmiddleeast?mibextid=ZbWKwL", Icon: FaFacebookF },
  ];

  useEffect(() => {
    setSvgError(false); // reset if country code changes
    // console.log("[IP Country]", geo); // uncomment to debug
  }, [code2]);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 shadow-md backdrop-blur supports-[backdrop-filter]:backdrop-blur transition-all duration-300 bg-slate-50">
      {/* Main Nav Bar */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-4 lg:py-[18px]">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/lovable-uploads/a44481e1-bf8c-43ab-b259-b833b252e1ed.png"
              alt="Amass Middle East Shipping Services LLC"
              className="h-6 sm:h-10 lg:h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to={getNavLink("/home")}
              className={`nav-link font-medium text-base xl:text-lg hover:text-amass-blue transition-colors ${
                isActive(getNavLink("/home")) || (currentCountry.code === "SG" && isActive("/"))
                  ? "text-amass-blue"
                  : "text-black"
              }`}
            >
              Home
            </Link>

            {/* Info Dropdown */}
            <DropdownMenu open={isCompanyDropdownOpen} onOpenChange={setIsCompanyDropdownOpen}>
              <DropdownMenuTrigger
                className={`nav-link font-medium text-base xl:text-lg flex items-center gap-1 hover:text-amass-blue transition-colors ${
                  isCompanyLinkActive() ? "text-amass-blue" : "text-black"
                }`}
              >
                Info <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-lg border rounded-md p-2 z-50">
                <DropdownMenuItem asChild>
                  <Link to={getNavLink("/about-us")} className="w-full px-3 py-2 text-base hover:bg-gray-100 rounded-md block">
                    About Us
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={getNavLink("/gallery")} className="w-full px-3 py-2 text-base hover:bg-gray-100 rounded-md block">
                    Gallery
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={getNavLink("/career")} className="w-full px-3 py-2 text-base hover:bg-gray-100 rounded-md block">
                    Career
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to={getNavLink("/services")}
              className={`nav-link font-medium text-base xl:text-lg hover:text-amass-blue transition-colors ${
                isActive(getNavLink("/services")) ? "text-amass-blue" : "text-black"
              }`}
            >
              Services
            </Link>

            <Link
              to={getNavLink("/blog")}
              className={`nav-link font-medium text-base xl:text-lg hover:text-amass-blue transition-colors ${
                isActive(getNavLink("/blog")) || isActive(getNavLink("/blogs")) ? "text-amass-blue" : "text-black"
              }`}
            >
              Blogs
            </Link>

            <Link
              to={getNavLink("/global-presence")}
              className={`nav-link font-medium text-base xl:text-lg transition-colors ${
                isActive(getNavLink("/global-presence")) ? "text-amass-blue" : "text-black"
              }`}
            >
              Global Presence
            </Link>

            <Link
              to={getNavLink("/contact")}
              className={`nav-link font-medium text-base xl:text-lg transition-colors ${
                isActive(getNavLink("/contact")) ? "text-amass-blue" : "text-black"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right side: ONLY the IP-based flag + socials */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <div className="flex items-center justify-center h-6 w-8">
              {loading ? (
                <span className="text-lg">🌐</span>
              ) : svgError ? (
                <span className="text-lg" title={geo.name}>{isoToFlagEmoji(geo.code)}</span>
              ) : (
                <img
                  src={flagSrc}
                  alt={geo.name}
                  className="h-5 w-7 object-contain rounded-[2px]"
                  onError={() => setSvgError(true)}
                />
              )}
            </div>

            {/* Social Icons */}
            <div className="ml-1 flex items-center gap-2">
              {[
                { name: "LinkedIn", href: "https://www.linkedin.com/company/amassmiddleeast/", Icon: FaLinkedinIn },
                { name: "Facebook", href: "https://www.facebook.com/Amassmiddleeast?mibextid=ZbWKwL", Icon: FaFacebookF },
              ].map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 hover:border-amass-blue hover:text-amass-blue text-gray-700 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="text-black" size={20} /> : <Menu className="text-black" size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white py-4 shadow-md animate-fade-in border-t max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="container mx-auto px-4">
            {/* Mobile: tiny flag row (no text) */}
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-200">
              {loading ? (
                <span className="text-lg">🌐</span>
              ) : svgError ? (
                <span className="text-lg">{isoToFlagEmoji(geo.code)}</span>
              ) : (
                <img src={flagSrc} alt="" aria-hidden className="h-5 w-7 object-contain rounded-[2px]" />
              )}
            </div>

            <nav className="flex flex-col space-y-4">
              {[
                { label: "HOME", path: "/home" },
                { label: "ABOUT US", path: "/about-us" },
                { label: "GALLERY", path: "/gallery" },
                { label: "CAREER", path: "/career" },
                { label: "SERVICES", path: "/services" },
                { label: "BLOGS", path: "/blog" },
                { label: "CONTACT", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path === "/gallery" ? "/gallery" : getNavLink(item.path)}
                  className={`font-medium py-2 text-lg hover:text-amass-blue transition-colors ${
                    isActive(item.path === "/gallery" ? "/gallery" : getNavLink(item.path)) ||
                    (item.path === "/home" && currentCountry.code === "SG" && isActive("/"))
                      ? "text-amass-blue"
                      : "text-black"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                to={`${getNavLink("/contact")}#contact-form`}
                onClick={() => setIsMenuOpen(false)}
                className="pt-2"
              >
                <Button className="bg-amass-blue hover:bg-amass-dark-blue text-white w-full rounded-md">
                  GET QUOTE
                </Button>
              </Link>

              {/* Mobile Social Icons */}
              <div className="pt-3 flex items-center gap-3">
                {[
                  { name: "LinkedIn", href: "https://www.linkedin.com/company/amassmiddleeast/", Icon: FaLinkedinIn },
                  { name: "Facebook", href: "https://www.facebook.com/Amassmiddleeast?mibextid=ZbWKwL", Icon: FaFacebookF },
                ].map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
