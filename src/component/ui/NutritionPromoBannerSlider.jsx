import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Flagship landscape promotional banner.
 * Single image, single action. No decorative overlay.
 */
export default function NutritionPromoBannerSlider() {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    navigate("/gomzi-supplement?search=shilajit");
  };

  return (
    <section className="w-full bg-white" aria-label="Flagship Promotional Banner">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-6 md:py-8">
        <div
          onClick={handleBannerClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleBannerClick();
            }
          }}
          className="hk-card cursor-pointer overflow-hidden"
        >
          <img
            src="/images/deals/koshaveda-shilajit-bogo-banner.jpg"
            alt="MuscleBlaze Koshaveda Shilajit - Buy 1 Get 1 Free"
            className="block h-auto w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
