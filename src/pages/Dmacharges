// src/pages/DmaCharges.tsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PDF_PATH = "/dma-charges.pdf"; // public/dma-charges.pdf

const DmaCharges: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Header />

      {/* PDF viewer */}
      <main className="flex-1 pt-[80px] pb-6">
        <div className="max-w-6xl mx-auto w-full h-[calc(100vh-180px)]">
          <iframe
            src={PDF_PATH}
            title="DMA Charges"
            className="w-full h-full border border-gray-200 rounded-lg"
          />
        </div>

        {/* Fallback link (in case iframe is blocked on some browsers) */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DmaCharges;
