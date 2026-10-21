import { useNavigate } from "react-router-dom";

/**
 * Ads banner block — a single wide banner.
 */
const AD = {
  image: "/images/banners/banner-creatine.svg",
  alt: "Creatine monohydrate - pure strength, zero compromise",
  href: "/gomzi-supplement?search=creatine",
};

export default function AdsBannerSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-6 md:py-8">
        <button
          type="button"
          onClick={() => navigate(AD.href)}
          className="block w-full cursor-pointer overflow-hidden rounded-xl"
        >
          <img
            src={AD.image}
            alt={AD.alt}
            loading="lazy"
            className="block h-auto w-full"
          />
        </button>
      </div>
    </section>
  );
}
