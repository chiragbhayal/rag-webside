import { useNavigate } from "react-router-dom";

/**
 * Single offer banner shown at the top of the product listing page.
 */
const OFFER = {
  image: "/images/banners/banner-combo-performance.svg",
  alt: "Performance power combos - whey, creatine and a free shaker",
  href: "/gomzi-supplement?search=fuel+one",
};

export default function OfferBanner() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1240px] mx-auto px-4 md:px-0 pt-5">
        <button
          type="button"
          onClick={() => navigate(OFFER.href)}
          className="block w-full cursor-pointer overflow-hidden rounded-xl"
        >
          <img
            src={OFFER.image}
            alt={OFFER.alt}
            loading="eager"
            className="block h-auto w-full"
          />
        </button>
      </div>
    </section>
  );
}
