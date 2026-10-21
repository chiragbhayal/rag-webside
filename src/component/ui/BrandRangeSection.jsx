import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Marquee from "../common/Marquee";

const BRANDS = [
  {
    name: "TrueBasics",
    logo: "/images/brands/truebasics.svg",
    href: "/gomzi-supplement?search=truebasics",
  },
  {
    name: "Ronnie Coleman",
    logo: "/images/brands/ronnie-coleman.svg",
    href: "/gomzi-supplement?search=gainer",
  },
  {
    name: "Optimum Nutrition",
    logo: "/images/brands/optimum-nutrition.svg",
    href: "/gomzi-supplement?search=optimum",
  },
  {
    name: "Gritzo",
    logo: "/images/brands/gritzo.svg",
    href: "/gomzi-supplement?search=gritzo",
  },
  {
    name: "Fuel One",
    logo: "/images/brands/fuel-one.svg",
    href: "/gomzi-supplement?search=fuel+one",
  },
  {
    name: "Isopure",
    logo: "/images/brands/isopure.svg",
    href: "/gomzi-supplement?search=isopure",
  },
  {
    name: "Dymatize",
    logo: "/images/brands/dymatize.svg",
    href: "/gomzi-supplement?search=dymatize",
  },
  {
    name: "MuscleBlaze",
    logo: "/images/brands/muscleblaze.svg",
    href: "/gomzi-supplement?search=muscleblaze",
  },
  {
    name: "MuscleTech",
    logo: "/images/brands/muscletech.svg",
    href: "/gomzi-supplement?search=muscletech",
  },
  {
    name: "MyProtein",
    logo: "/images/brands/myprotein.svg",
    href: "/gomzi-supplement?search=myprotein",
  },
  {
    name: "GNC",
    logo: "/images/brands/gnc.svg",
    href: "/gomzi-supplement?search=gnc",
  },
  {
    name: "AS-IT-IS",
    logo: "/images/brands/as-it-is.svg",
    href: "/gomzi-supplement?search=asitis",
  },
  {
    name: "HK Vitals",
    logo: "/images/brands/hk-vitals.svg",
    href: "/gomzi-supplement?search=shilajit",
  },
  {
    name: "Gomzi Nutrition",
    logo: "/images/brands/gomzi.svg",
    href: "/gomzi-supplement",
  },
];

/**
 * HealthKart "Brand Range" rail.
 * Plain wordmarks on white with thin edge chevrons.
 */
export default function BrandRangeSection() {
  const navigate = useNavigate();
  const railRef = useRef(null);

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-6 md:py-8">
        {/* <h2 className="section-title mb-6">Brand Range</h2> */}

        <div className="relative">
          <Marquee ref={railRef} duration={60} className="px-4">
            {BRANDS.map((brand) => (
              <button
                key={brand.name}
                onClick={() => navigate(brand.href)}
                title={brand.name}
                aria-label={brand.name}
                className="mx-5 flex h-[56px] w-[170px] shrink-0 items-center justify-center bg-white"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.style.display = "none";
                  }}
                />
              </button>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
