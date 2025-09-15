import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Full-screen background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero5.mp4"   // ← replace with your video file
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Optional dark overlay for better contrast if you add text later */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Optional centered text or controls can go here */}
      {/* <div className="relative z-10 flex items-center justify-center h-full text-white text-4xl">
          Your Text or Buttons
      </div> */}
    </section>
  );
};

export default HeroSection;
