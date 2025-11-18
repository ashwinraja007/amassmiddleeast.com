// src/pages/DmaCharges.tsx
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PDF_PATH = "DMA_Charges.pdf"; // must match file name in public/

const DmaCharges: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />

      <main className="flex-1 pt-[80px] pb-6">
        <div className="max-w-6xl mx-auto w-full h-[calc(100vh-180px)]">
          <iframe
            src={PDF_PATH}
            title="DMA Charges"
            className="w-full h-full"
            style={{ border: "none" }}
          />
        </div>

        <div className="mt-4 text-center">
          <a
            href={PDF_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-700"
          >
            Open DMA Charges PDF in a new tab
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DmaCharges;
