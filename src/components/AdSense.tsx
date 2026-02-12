// src/components/AdSense.tsx
import { useEffect } from "react";

interface AdSenseProps {
  adSlot: string;
  adFormat?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  adLayout?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

const AdSense = ({
  adSlot,
  adFormat = "auto",
  adLayout,
  className = "",
}: AdSenseProps) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <div className={`ad-container my-6 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8129142327887394"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSense;
