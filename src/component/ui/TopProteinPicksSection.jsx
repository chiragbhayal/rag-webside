import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductCard from "../common/ProductCard";
import SectionHeader from "../common/SectionHeader";

const TABS = [
  { id: "yeast-plant", label: "Yeast / Plant" },
  { id: "whey", label: "Whey" },
  { id: "whey-isolate", label: "Whey Isolate" },
  { id: "us-imported", label: "US Imported" },
];

const PROTEIN_PRODUCTS = {
  "yeast-plant": [
    {
      id: "mb-yeast-protein-2-2",
      name: "MuscleBlaze Yeast Protein, 2.2 lb Rich Chocolate",
      badge: "Trending Now",
      rating: 4.4,
      price: 2099,
      originalPrice: 2899,
      premiumPrice: 2036,
      image: "/images/product-category/plant-protein.webp",
      url: "/gomzi-supplement?search=yeast+protein",
    },
    {
      id: "gnc-plant-protein-isolate",
      name: "GNC Plant Protein Isolate, 2 lb Chocolate Hazelnut",
      rating: 4.9,
      price: 1399,
      originalPrice: 2399,
      premiumPrice: 1329,
      image: "/images/product-category/plant-protein.webp",
      url: "/gomzi-supplement?search=gnc+plant",
    },
    {
      id: "truebasics-clean-plant-protein",
      name: "TrueBasics Clean Plant Protein, 2.2 lb Chocolate",
      badge: "Trustified",
      rating: 4.6,
      price: 2099,
      originalPrice: 2999,
      premiumPrice: 2036,
      image: "/images/product-category/protein-1.jpg",
      url: "/gomzi-supplement?search=clean+plant",
    },
    {
      id: "cosmix-fermented-yeast-protein",
      name: "Cosmix Fermented Yeast Protein, 2.2 lb Indonesian Cacao",
      rating: 4.8,
      price: 1999,
      originalPrice: 3250,
      premiumPrice: 1939,
      image: "/images/deals/picks/nakpro-deal.png",
      url: "/gomzi-supplement?search=cosmix+yeast",
    },
    {
      id: "gomzi-plant-superfood-isolate",
      name: "Gomzi Nutrition Superfood Plant Protein Isolate, 2 lb Belgian Chocolate",
      badge: "Bestseller",
      rating: 4.8,
      price: 1899,
      originalPrice: 2599,
      premiumPrice: 1842,
      image: "/images/protein-removebg.png",
      url: "/gomzi-supplement?search=plant",
    },
  ],
  whey: [
    {
      id: "mb-biozyme-perf-whey",
      name: "MuscleBlaze Biozyme Performance Whey, 4.4 lb Rich Chocolate",
      badge: "Trending Now",
      rating: 4.5,
      price: 4329,
      originalPrice: 4629,
      premiumPrice: 4199,
      image: "/images/deals/whey-range-deal.jpg",
      url: "/gomzi-supplement?search=biozyme+whey",
    },
    {
      id: "on-gold-standard-whey",
      name: "Optimum Nutrition (ON) Gold Standard 100% Whey, 5 lb Double Rich Chocolate",
      badge: "Bestseller",
      rating: 4.8,
      price: 6499,
      originalPrice: 7999,
      premiumPrice: 6299,
      image: "/images/product-category/whey-protein.webp",
      url: "/gomzi-supplement?search=optimum+nutrition",
    },
    {
      id: "nakpro-platinum-whey",
      name: "Nakpro Platinum 100% Whey Protein Concentrate, 2.2 lb Chocolate",
      rating: 4.4,
      price: 1899,
      originalPrice: 2499,
      premiumPrice: 1842,
      image: "/images/deals/picks/nakpro-deal.png",
      url: "/gomzi-supplement?search=nakpro",
    },
    {
      id: "asitis-whey-80",
      name: "AS-IT-IS Nutrition Whey Protein Concentrate 80%, 2.2 lb Raw Unflavoured",
      rating: 4.3,
      price: 1549,
      originalPrice: 1999,
      premiumPrice: 1499,
      image: "/images/protein.jpg",
      url: "/gomzi-supplement?search=asitis",
    },
    {
      id: "gomzi-raw-whey-blend",
      name: "Gomzi 100% Raw Whey Blend, 2.2 lb Swiss Chocolate",
      badge: "Lab Verified",
      rating: 4.7,
      price: 2199,
      originalPrice: 2999,
      premiumPrice: 2133,
      image: "/images/Gomzi_Protein_Product_HD.webp",
      url: "/gomzi-supplement?search=whey",
    },
  ],
  "whey-isolate": [
    {
      id: "mb-biozyme-iso-zero",
      name: "MuscleBlaze Biozyme Iso-Zero, 4.4 lb Low Carb Chocolate",
      badge: "Trending Now",
      rating: 4.7,
      price: 5499,
      originalPrice: 6499,
      premiumPrice: 5334,
      image: "/images/deals/whey-range-deal.jpg",
      url: "/gomzi-supplement?search=iso+zero",
    },
    {
      id: "dymatize-iso-100",
      name: "Dymatize ISO 100 Whey Protein Isolate, 5 lb Gourmet Chocolate",
      badge: "Trustified",
      rating: 4.9,
      price: 7999,
      originalPrice: 9999,
      premiumPrice: 7759,
      image: "/images/deals/picks/muscletech-deal.png",
      url: "/gomzi-supplement?search=dymatize+iso",
    },
    {
      id: "on-gold-isolate",
      name: "Optimum Nutrition (ON) Gold Standard 100% Isolate, 5 lb Chocolate Bliss",
      rating: 4.8,
      price: 7299,
      originalPrice: 8999,
      premiumPrice: 7080,
      image: "/images/product-category/whey-protein.webp",
      url: "/gomzi-supplement?search=on+isolate",
    },
    {
      id: "one-science-iso-gold",
      name: "One Science 100% ISO Gold Whey Protein Isolate, 5 lb Rich Chocolate",
      rating: 4.6,
      price: 6199,
      originalPrice: 7799,
      premiumPrice: 6013,
      image: "/images/deals/picks/one-science-deal.png",
      url: "/gomzi-supplement?search=one+science",
    },
  ],
  "us-imported": [
    {
      id: "dymatize-iso-fudge",
      name: "Dymatize ISO 100 Hydrolyzed 100% Whey Isolate, 5 lb Fudge Brownie",
      badge: "Imported",
      rating: 4.9,
      price: 8199,
      originalPrice: 10499,
      premiumPrice: 7953,
      image: "/images/deals/picks/muscletech-deal.png",
      url: "/gomzi-supplement?search=dymatize",
    },
    {
      id: "on-standard-5lb",
      name: "Optimum Nutrition Gold Standard Whey, 5 lb Double Rich Chocolate (US)",
      badge: "Top Rated",
      rating: 4.8,
      price: 6599,
      originalPrice: 8199,
      premiumPrice: 6399,
      image: "/images/product-category/whey-protein.webp",
      url: "/gomzi-supplement?search=optimum+nutrition",
    },
    {
      id: "rule1-r1-protein",
      name: "Rule 1 R1 Protein WPI Blend, 5 lb Chocolate Fudge",
      rating: 4.7,
      price: 6499,
      originalPrice: 7999,
      premiumPrice: 6304,
      image: "/images/deals/picks/labrada-deal.png",
      url: "/gomzi-supplement?search=rule1",
    },
    {
      id: "muscletech-nitrotech-gold",
      name: "MuscleTech NitroTech 100% Whey Gold, 5 lb Double Rich Chocolate",
      rating: 4.6,
      price: 5799,
      originalPrice: 7299,
      premiumPrice: 5625,
      image: "/images/deals/picks/muscletech-deal.png",
      url: "/gomzi-supplement?search=muscletech",
    },
  ],
};

/**
 * HealthKart-identical "Top Protein Picks" Product Rail.
 *
 * Features:
 * - Clean title & category filter tabs (Yeast / Plant, Whey, Whey Isolate, US Imported)
 * - Swiper product rail, 4 per view on desktop
 */
export default function TopProteinPicksSection() {
  const [activeTab, setActiveTab] = useState("yeast-plant");

  const currentProducts = PROTEIN_PRODUCTS[activeTab] || [];

  return (
    <section className="w-full bg-white" aria-label="Top Protein Picks">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-6 md:py-8">
        <SectionHeader
          title="Top Protein Picks"
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Carousel */}
        <Swiper
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 16 },
            640: { slidesPerView: 2.2, spaceBetween: 18 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="pb-2"
        >
          {currentProducts.map((product) => (
            <SwiperSlide key={product.id} className="h-auto">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
