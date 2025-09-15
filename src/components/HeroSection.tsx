import React from "react";
import { Users, UserCircle, SearchCode, Ship } from "lucide-react";

const HeroSection: React.FC = () => {
  const portalLinks = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Customer Portal",
      url: "https://cp.onlinetracking.co/#/login/1",
    },
    {
      icon: <UserCircle className="w-5 h-5" />,
      title: "Partner Portal",
      url: "https://pp.onlinetracking.co/auth/login/1",
    },
    {
      icon: <SearchCode className="w-5 h-5" />,
      title: "Tracking",
      url: "http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:102:::::P0_GROUP_RID:54",
    },
    {
      icon: <Ship className="w-5 h-5" />,
      title: "Sailing Schedule",
      url: "http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:104:::::P0_GROUP_RID:54",
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero5.mp4"   // ← your video
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark-blue overlay */}
      <div className="absolute inset-0 bg-blue-900/70" />

      {/* Portal Buttons */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl w-full">
          {portalLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-4 rounded-xl bg-blue-800/70 border border-blue-300/20 text-white hover:bg-blue-700/80 transition transform hover:scale-105 shadow-lg"
            >
              <div className="p-2 bg-white/20 rounded-full group-hover:bg-white/30 transition">
                {link.icon}
              </div>
              <span className="mt-2 text-sm font-semibold text-center">
                {link.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
