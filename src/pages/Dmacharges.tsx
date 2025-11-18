// src/pages/DmaCharges.tsx
import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PDF_PATH = "/DMA-Charges.pdf"; // keep this in public/

const DmaCharges: React.FC = () => {
  // Scroll to top whenever this page is opened
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />

      {/* Make PDF fill almost entire viewport between header & footer */}
      <main className="flex-1">
        <div className="w-full h-[calc(100vh-150px)]">
          <iframe
            src={PDF_PATH}
            title="DMA Charges"
            className="w-full h-full"
            style={{ border: "none" }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DmaCharges;
