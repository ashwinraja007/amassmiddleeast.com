// src/pages/DmaCharges.tsx
import { useEffect } from "react";

const DmaCharges = () => {
  useEffect(() => {
    window.location.href = "/DMA-charges.pdf";
  }, []);

  return null; // nothing on screen
};

export default DmaCharges;
