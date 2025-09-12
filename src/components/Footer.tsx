
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, Facebook, Linkedin, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Footer = () => {
  const location = useLocation();
  const [currentAddressIndex, setCurrentAddressIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const footerAnimation = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const keyAddresses = [
    {
      country: "Singapore",
      offices: [
        {
          name: "Global Consolidators",
          address:
            "Blk 511 Kampong Bahru Road, #03-01 Keppel Distripark, Singapore 099447",
          phone: "+65 6224 1338 / +65 6224 1336",
          email: "buddhika@globalconsol.com",
          map: "https://www.google.com/maps/d/u/0/embed?mid=1U_72YwJ_4E6SQSrx2E6eWegoUTQesgo&ehbc=2E312F&noprof=1",
        },
      ],
    },
    {
      country: "Sri Lanka",
      offices: [
        {
          name: "Colombo Office",
          address:
            "Ceylinco House, 9th Floor, No. 69, Janadhipathi Mawatha, Colombo 01, Sri Lanka",
          phone: "+94 114477499 / +94 114477494",
          email: "thilanka.cmb@globalconsol.com",
          map: "https://www.google.com/maps/d/u/0/embed?mid=1Nt9tx3aLmBNO-Sf6oJxm3WxfmbDIF0I&ehbc=2E312F&noprof=1",
        },
      ],
    },
    {
      country: "Myanmar",
      offices: [
        {
          name: "Yangon Office",
          address:
            "No.608, Room 8B, Bo Soon Pat Tower, Merchant Street, Pabedan Township, Yangon, Myanmar",
          phone: "+951 243158 / +951 377985",
          email: "info@globalconsol.com",
          map: "https://www.google.com/maps/d/u/0/embed?mid=1S0BF3WzohAIQGBr9w6ryuexAnYj8AVc&ehbc=2E312F&noprof=1",
        },
      ],
    },
    {
      country: "Bangladesh",
      offices: [
        {
          name: "Dhaka Office",
          address:
            "ID #9-N (New), 9-M(Old-N), 9th floor, Tower 1, Police Plaza Concord No.2, Road # 144, Gulshan Model Town, Dhaka 1215, Bangladesh",
          phone: "+880 1716 620989",
           email: "info@globalconsol.com",
          map: "https://www.google.com/maps/d/u/0/embed?mid=1X0GsrCFJRFoj6Q67PJztKAAzkDlKkXY&ehbc=2E312F&noprof=1",
        },
      ],
    },
    {
      country: "Pakistan",
      offices: [
        {
          name: "Karachi Office",
          address:
            "Suite No.301, 3rd Floor, Fortune Center, Shahrah-e-Faisal, Block 6, PECHS, Karachi, Pakistan",
          phone: "+92-300-8282511 / +92-21-34302281-5",
           email: "khalid.pk@globalconsol.com",
          map: "https://www.google.com/maps/d/u/0/embed?mid=1reXoq38Nt5GKCCpv-f_cb1UwG-Ko30o&ehbc=2E312F&noprof=1",
        },
        {
          name: "Lahore Office",
          address:
            "Office # 301, 3rd Floor, Gulberg Arcade Main Market, Gulberg 2, Lahore, Pakistan",
          phone: "+92 42-35782306/07/08",
          email: "shazia.pklhe@globalconsol.com",
          map: "https://www.google.com/maps/d/u/0/embed?mid=1ObHyVRDeNaWR7qOyMHKqqvqWbqjsCVk&ehbc=2E312F&noprof=1",
        },
      ],
    },
  ];

  // Get current country from URL slug
  const getCurrentCountryFromUrl = () => {
    const pathname = location.pathname.toLowerCase();
    
    if (pathname.includes('/sri-lanka')) return 'Sri Lanka';
    if (pathname.includes('/myanmar')) return 'Myanmar';
    if (pathname.includes('/bangladesh')) return 'Bangladesh';
    if (pathname.includes('/pakistan')) return 'Pakistan';
    
    // Default to Singapore
    return 'Singapore';
  };

  // Filter addresses based on current route
  const getFilteredAddresses = () => {
    const currentCountry = getCurrentCountryFromUrl();
    return keyAddresses.filter(addr => addr.country === currentCountry);
  };

  const filteredAddresses = getFilteredAddresses();
  const allOffices = filteredAddresses.flatMap(country => 
    country.offices.map(office => ({
      ...office,
      country: country.country
    }))
  );

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling && allOffices.length > 1) {
      const interval = setInterval(() => {
        setCurrentAddressIndex(prev => (prev + 1) % allOffices.length);
      }, 4000); // Change address every 4 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoScrolling, allOffices.length]);

  const handleNextAddress = () => {
    setIsAutoScrolling(false);
    setCurrentAddressIndex(prev => (prev + 1) % allOffices.length);
  };

  const currentOffice = allOffices[currentAddressIndex];

  return (
    <footer className="pt-16 pb-8 bg-gc-dark-blue text-white">
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
            <div className="mb-4">
              <img
                src="/logo.png"
                alt="GC Logo"
                className="h-16 w-auto object-contain mb-2"
                loading="lazy"
              />
            </div>
            <p className="text-sm md:text-base text-white/80 max-w-xs text-left leading-relaxed">
              15 Years Excellence in Logistics Industry GC, a Singapore-based global freight forwarding and logistics solutions provider, establishes its presence in the region with a reliable network of experienced agents spanning the globe. Backed by a highly
            </p>
          </motion.div>

          {/* Column 2: Navigation */}
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
                  className="text-white/90 hover:text-gc-gold transition-colors duration-300 flex items-center gap-2"
                >
                  <ArrowRight size={14} className="text-gc-gold" />
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Contact Info with Country-specific Addresses */}
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
                    <p className="whitespace-pre-line text-sm leading-relaxed">
                      {currentOffice.address}
                    </p>
                  </div>
                </div>
                
                 {currentOffice.phone && (
      <div className="flex items-center gap-2">
        <Phone size={18} className="text-gc-gold flex-shrink-0" />
        <p className="text-sm">{currentOffice.phone}</p>
      </div>
    )}

    {currentOffice.email && (
      <div className="flex items-center gap-2">
        <Mail size={18} className="text-gc-gold flex-shrink-0" />
        <p className="text-sm">{currentOffice.email}</p>
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
                        ? 'bg-gc-gold'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom Line */}
        <div className="text-center text-white/70 mt-12 pt-8 border-t border-gc-gold/20 text-sm">
          &copy; {new Date().getFullYear()} Site Powered by Global Consolidators Pte Ltd,. All right reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
