import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

type Office = {
  name: string;
  address: string;
  phone?: string;
  fax?: string;
  email?: string;
  country?: string;
};

const Footer = () => {
  const location = useLocation();
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);

  const footerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const keyAddresses: { country: string; offices: Office[] }[] = [
    {
      country: "UAE",
      offices: [
        {
          name: "Head Office",
          address: "202, Sultan Business Centre\nOud Metha, P.O.Box 33463\nDubai – UAE",
          phone: "+971 4 3575508",
          fax: "+971 4 2221794",
          email: "contact@dxb.amassfreight.com",
        },
        {
          name: "CFS",
          address: "Plot No S20312,\nJafza South,\nJebel Ali, Dubai – UAE",
          phone: "+971 4 3400298",
          fax: "+971 4 8831004",
          email: "contact@dxb.amassfreight.com",
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
        },
        {
          name: "Jeddah",
          address:
            "Room No. 408, Saudi Business Centre\n7859 Al Madinah Al Munawarah Road\nAl Sharafeyah, Jeddah 4542-22234",
          phone: "+966 12 578 0874",
          email: "contact@dxb.amassfreight.com",
        },
        {
          name: "Riyadh",
          address:
            "ROOM NO. 20, AL MALAZ\nBLDG. NO. 104, 2 FLOOR AL QIRAWANI ST.\nAL MALAZ DISTRICT RIYADH 11332, K.S.A",
          phone: "+966 13 849 8630",
          email: "contact@dxb.amassfreight.com",
        },
      ],
    },
  ];

  const currentCountry = () =>
    location.pathname.toLowerCase().includes("saudi") ? "Saudi Arabia" : "UAE";

  const offices = useMemo(
    () =>
      keyAddresses.flatMap((c) =>
        c.offices.map((o) => ({ ...o, country: c.country }))
      ),
    []
  );

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % offices.length),
      4000
    );
    return () => clearInterval(id);
  }, [auto, offices.length]);

  const current = offices[index];

  return (
    <footer className="pt-16 pb-8 text-white bg-blue-950">
      <div className="container mx-auto px-4">
        <div className="h-1 bg-gradient-to-r from-gc-gold via-gc-light-gold to-gc-gold rounded-full mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo / About */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerAnimation}
          >
            {/* ...same logo/about content... */}
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={footerAnimation}
            transition={{ delay: 0.2 }}
          >
            {/* ...links unchanged... */}
          </motion.div>

          {/* One-by-one office scroll */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={footerAnimation}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl text-gc-gold">Contact Us</h3>
              <button
                onClick={() => {
                  setAuto(false);
                  setIndex((i) => (i + 1) % offices.length);
                }}
                className="bg-gc-gold text-gc-dark-blue p-1.5 rounded-full"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 text-white/90"
            >
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-gc-gold mt-1" />
                <div>
                  <p className="font-semibold text-gc-gold mb-1">
                    {current.name} – {current.country}
                  </p>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-50">
                    {current.address}
                  </p>
                </div>
              </div>

              {current.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={18} className="text-gc-gold" />
                  <p className="text-sm text-slate-50">{current.phone}</p>
                </div>
              )}
              {current.fax && (
                <div className="flex items-center gap-2">
                  <Phone size={18} className="text-gc-gold" />
                  <p className="text-sm text-slate-50">Fax: {current.fax}</p>
                </div>
              )}
              {current.email && (
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-gc-gold" />
                  <p className="text-sm text-slate-50">{current.email}</p>
                </div>
              )}
            </motion.div>

            {/* Dots */}
            <div className="flex mt-4 space-x-2">
              {offices.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setAuto(false);
                    setIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === index
                      ? "bg-gc-gold"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="text-center text-white/70 mt-12 pt-8 border-t border-gc-gold/20 text-sm">
          &copy; {new Date().getFullYear()} Amass Middle East Shipping Services LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
