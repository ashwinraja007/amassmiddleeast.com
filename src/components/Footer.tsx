import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

type Office = {
  name: string;
  address: string;      // multi-line with \n
  phone?: string;
  fax?: string;         // NEW: optional fax
  email?: string;
  map?: string;
  country?: string;     // filled later
};

const Footer = () => {
  const location = useLocation();
  const [currentAddressIndex, setCurrentAddressIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const footerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // --- UPDATED ADDRESSES (from the screenshot) ---
  const keyAddresses: { country: string; offices: Office[] }[] = [
    {
      country: "UAE",
      offices: [
        {
          name: "Head Office",
          address:
            "202, Sultan Business Centre\nOud Metha, P.O.Box 33463\nDubai – UAE",
          phone: "+971 4 3575508",
          fax: "+971 4 2221794",
          email: "contact@dxb.amassfreight.com",
          map: "",
        },
        {
          name: "CFS",
          address:
            "Plot No S20312,\nJafza South,\nJebel Ali, Dubai – UAE",
          phone: "+971 4 3400298",
          fax: "+971 4 8831004",
          email: "contact@dxb.amassfreight.com",
          map: "",
        },
      ],
    },
    {
      country: "Saudi Arabia",
      offices: [
        {
          name: "Dammam – Head Office",
          address:
            "RASHIDIYA BUSINESS CENTER\nBUILD NO:7257 ROOM 308, 3RD FLOOR – AL AMAMRAH\nDAMMAM – 32415 – KSA",
          phone: "+966 13 849 8637",
          email: "contact@dxb.amassfreight.com",
          map: "",
        },
        {
          name: "Jeddah",
          address:
            "Room No. 408, Saudi Business Centre\n7859 Al Madinah Al Munawarah Road\nAl Sharafeyah, Jeddah 4542-22234",
          phone: "+966 12 578 0874",
          email: "contact@dxb.amassfreight.com",
          map: "",
        },
        {
          name: "Riyadh",
          address:
            "ROOM NO. 20, AL MALAZ\nBLDG. NO. 104, 2 FLOOR AL QIRAWANI ST.\nAL MALAZ DISTRICT RIYADH 11332, K.S.A",
          phone: "+966 13 849 8630",
          email: "contact@dxb.amassfreight.com",
          map: "",
        },
      ],
    },
  ];
  // -----------------------------------------------

  // Detect current country (kept your logic, just a tiny improvement to match both slugs)
  const getCurrentCountryFromUrl = () => {
    const pathname = location.pathname.toLowerCase();
    if (pathname.includes("/saudi")) return "Saudi Arabia";
    if (pathname.includes("/saudi-arabia")) return "Saudi Arabia";
    return "UAE";
  };

  // Filter addresses for current route
  const getFilteredAddresses = () => {
    const currentCountry = getCurrentCountryFromUrl();
    return keyAddresses.filter((addr) => addr.country === currentCountry);
  };

  const filteredAddresses = getFilteredAddresses();
  const allOffices: Office[] = filteredAddresses.flatMap((country) =>
    country.offices.map((office) => ({ ...office, country: country.country }))
  );

  // Auto-scroll between offices
  useEffect(() => {
    if (isAutoScrolling && allOffices.length > 1) {
      const interval = setInterval(() => {
        setCurrentAddressIndex((prev) => (prev + 1) % allOffices.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoScrolling, allOffices.length]);

  const handleNextAddress = () => {
    setIsAutoScrolling(false);
    setCurrentAddressIndex((prev) => (prev + 1) % allOffices.length);
  };

  const currentOffice = allOffices[currentAddressIndex];

  return (
    <footer className="pt-16 pb-8 text-white bg-blue-950">
      <div className="container mx-auto px-4">
        <div className="h-1 bg-gradient-to-r from-gc-gold via-gc-light-gold to-gc-gold rounded-full mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-4">
          {/* Column 1: Logo & About */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerAnimation}
            className="flex flex-col items-start"
          >
            <div className="mb-4 bg-white p-3 rounded-lg">
              <img
                src="/lovable-uploads/a44481e1-bf8c-43ab-b259-b833b252e1ed.png"
                alt="Amass Middle East"
                className="h-16 w-auto object-contain"
                loading="lazy"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-slate-50">
              Amass Middle East Shipping Services LLC
            </h3>
            <p className="text-sm md:text-base max-w-xs text-left leading-relaxed mb-4 text-slate-50">
              We were established in the year 2015, as a Neutral LCL Consolidation
              Service Provider to serve the UAE market.
            </p>

            <div className="space-y-2 text-sm text-white/80">
              <h4 className="font-medium text-slate-50">DO Counter & CFS Timings</h4>
              <p className="text-slate-50">
                Monday to Thursday: 8.00 AM to 12.30 PM, 2.00 PM to 4.00 PM
              </p>
              <p className="text-slate-50">
                Friday: 8.00 AM to 12.00 PM, 2.00 PM to 4.30 PM
              </p>
              <p className="text-xs text-slate-50">
                (12.00 PM to 2.00 PM – Friday Prayer and Lunch Break)
              </p>
              <p className="text-slate-50">Saturday & Sunday CLOSED</p>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerAnimation}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-start md:items-end lg:items-start lg:pl-10"
          >
            <h3 className="font-bold text-xl text-gc-gold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about-us" },
                { name: "Services", path: "/services" },
                { name: "Global Presence", path: "/global-presence" },
                { name: "Contact Us", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy-policy" },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-white/90 hover:text-black transition-colors duration-300 flex items-center gap-2"
                >
                  <ArrowRight size={14} className="text-gc-gold" />
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Contact Info (auto-rotating by country) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerAnimation}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-start md:items-end lg:items-start lg:pl-10"
          >
            <div className="flex items-center justify-between w-full mb-4">
              <h3 className="font-bold text-xl text-gc-gold">Contact Us</h3>
              {allOffices.length > 1 && (
                <button
                  onClick={handleNextAddress}
                  className="bg-gc-gold text-gc-dark-blue p-1.5 rounded-full hover:bg-gc-light-gold transition-colors"
                  title="Next Address"
                >
                  <ChevronRight size={16} />
                </button>
              )}
            </div>

            {currentOffice && (
              <motion.div
                key={currentAddressIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 text-white/90"
              >
                <div className="flex items-start gap-2">
                  <MapPin size={18} className="text-gc-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gc-gold mb-1">
                      {currentOffice.name} - {currentOffice.country}
                    </p>
                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-50">
                      {currentOffice.address}
                    </p>
                  </div>
                </div>

                {currentOffice.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-gc-gold flex-shrink-0" />
                    <p className="text-sm text-slate-50">{currentOffice.phone}</p>
                  </div>
                )}

                {currentOffice.fax && (
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-gc-gold flex-shrink-0" />
                    <p className="text-sm text-slate-50">Fax: {currentOffice.fax}</p>
                  </div>
                )}

                {currentOffice.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-gc-gold flex-shrink-0" />
                    <p className="text-sm text-slate-50">{currentOffice.email}</p>
                  </div>
                )}
              </motion.div>
            )}

            {allOffices.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {allOffices.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentAddressIndex(index);
                      setIsAutoScrolling(false);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentAddressIndex
                        ? "bg-gc-gold"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom Line */}
        <div className="text-center text-white/70 mt-12 pt-8 border-t border-gc-gold/20 text-sm">
          &copy; {new Date().getFullYear()} Amass Middle East Shipping Services LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
