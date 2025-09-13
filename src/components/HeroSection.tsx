import React, { useState, useEffect } from "react";
import {
  Users,
  ArrowRight,
  Play,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCustomerPortalOpen, setIsCustomerPortalOpen] = useState(false);

  const sliderImages = [
    {
      url: "/h1.png",
      title: "AMASS FREIGHT",
      description: "Your Trusted Partner in Global Logistics Solutions.",
      gradient: "",
    },
    {
      url: "/h2.png",
      title: "LCL CONSOLIDATION",
      description:
        "Neutral LCL consolidation services connecting UAE and Middle East.",
      gradient: "",
    },
    {
      url: "/h3.png",
      title: "CFS SERVICES",
      description: "State-of-the-art container freight station in Jebel Ali.",
      gradient: "",
    },
    {
      url: "/h4.png",
      title: "REGIONAL NETWORK",
      description:
        "Strategic offices across UAE and Saudi Arabia for seamless logistics.",
      gradient: "",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => setActiveSlide((prev) => (prev + 1) % sliderImages.length),
      6000
    );
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  const currentSlide = sliderImages[activeSlide];

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background twinkles */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Slider images */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {sliderImages.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              activeSlide === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            style={{ zIndex: activeSlide === i ? 1 : 0 }}
          >
            <img
              src={slide.url}
              alt={`Slide ${i}`}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-black/40 z-[1]" />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-20 flex items-center min-h-screen px-6 lg:px-12">
        <div className="max-w-4xl space-y-8 mx-auto text-center lg:text-left lg:ml-20">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            {currentSlide.title}
          </h1>

          <p
            className={`text-xl md:text-2xl text-gray-200 leading-relaxed transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-2"
            }`}
          >
            {currentSlide.description}
          </p>

          <div
            className={`hidden md:flex gap-4 transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-2"
            }`}
          >
            <Link to="/contact" className="group">
              <button className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-8 py-4 text-lg font-semibold flex items-center gap-3 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30 border border-blue-500/30">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Zap className="w-5 h-5" />
                <span>GET STARTED</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          {/* Indicators */}
          <div className="flex space-x-2 pt-2">
            {sliderImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSlide === i
                    ? "bg-blue-500 scale-125 shadow-lg shadow-blue-500/50"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 🔴 Bottom CTA bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        {/* subtle divider curve/glow (optional) */}
        <div className="h-2 w-full bg-gradient-to-b from-transparent to-[#E1251B]/80" />
        <div className="w-full bg-[#E1251B]">
          <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-center gap-6 py-8 px-4">
            {[
              { label: "Consol Mate", href: "/consol-mate" },
              { label: "Partner Portal", href: "/partner-portal" },
              { label: "Container Enquiry", href: "/container-enquiry" },
              { label: "Tracking", href: "/tracking" },
            ].map((btn) => (
              <Link key={btn.label} to={btn.href}>
                <button
                  className="
                    group
                    px-8 py-4 text-lg font-semibold
                    bg-white text-[#1B2B87]
                    rounded-full
                    shadow-[0_6px_20px_rgba(0,0,0,.15)]
                    transition-all duration-300
                    hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,0,0,.20)]
                    focus:outline-none focus:ring-4 focus:ring-white/40
                  "
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                    {btn.label}
                  </span>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Portal Modal */}
      {isCustomerPortalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 animate-in slide-in-from-bottom duration-500">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Customer Portal
                  </h2>
                </div>
                <button
                  onClick={() => setIsCustomerPortalOpen(false)}
                  className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Play className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Tutorial Videos
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      src: "/OECL_ad.mp4",
                      label: "Amass Services Overview",
                      duration: "3:45",
                    },
                    {
                      src: "/OECl_Customer_Portal_Explainer.mp4",
                      label: "Customer Portal Guide",
                      duration: "5:20",
                    },
                  ].map((video, i) => (
                    <div
                      key={i}
                      className="group border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="aspect-video relative">
                        <video
                          controls
                          className="w-full h-full object-cover"
                          poster={`/video-thumbnail-${i + 1}.jpg`}
                        >
                          <source src={video.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {video.label}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Learn how to use the portal effectively
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
                <button
                  onClick={() => setIsCustomerPortalOpen(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Close
                </button>
                <a
                  href="https://cp.onlinetracking.co/#/login/1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium flex items-center gap-2 justify-center transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span>Login to Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
