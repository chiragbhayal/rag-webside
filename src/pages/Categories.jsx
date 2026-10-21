import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Plus,
  X,
  FlaskConical,
  BadgeCheck,
  Truck,
  Crown,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
} from "lucide-react";
import SEO from "../component/SEO";
import { getCategoriesApi } from "../api/category.api";
import { CategoryGridSkeleton } from "../component/common/SkeletonLoaders";
import CategoryRangeCard from "../component/common/CategoryRangeCard";
import { getLocalCache, setLocalCache } from "../utils/storage";

const CATEGORIES_PAGE_CACHE_KEY = "gomzi_categories_page_cache";

const resolveImageUrl = (img) => {
  if (!img) return "/images/product-placeholder.webp";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/")) {
    return img;
  }
  return `https://files.fggroup.in/${img}`;
};

const standards = [
  {
    number: "01",
    title: "LAB TESTED FORMULAS",
    description:
      "Every product is third-party tested for purity, potency, and label accuracy. What the label states is exactly what you consume—zero hidden spikes, zero fillers.",
  },
  {
    number: "02",
    title: "ZERO PROTEIN SPIKING",
    description:
      "No amino spiking, no cheap bulking agents, and no proprietary blend trickery. Genuine bioavailable protein verified by certified independent laboratory assays.",
  },
  {
    number: "03",
    title: "FSSAI & GMP APPROVED",
    description:
      "Fully compliant with FSSAI regulations and produced exclusively in GMP-certified, ISO 22000:2018 facilities to guarantee peak pharmaceutical-grade safety.",
  },
  {
    number: "04",
    title: "THE LEGACY OF RAG",
    description:
      "Forged from the athletic legacy of Gomzi Supplement by RAG. Built on 15+ years of athlete feedback, clinical formulation, and uncompromising quality standards.",
  },
];

const highlights = [
  {
    text: "LAB TESTED",
    sub: "100% Third-Party Verified",
    icon: FlaskConical,
  },
  {
    text: "FSSAI CERTIFIED",
    sub: "GMP Compliant Facility",
    icon: BadgeCheck,
  },
  {
    text: "FREE SHIPPING",
    sub: "Pan-India on Orders ₹999+",
    icon: Truck,
  },
  {
    text: "THE LEGACY OF RAG",
    sub: "Trusted by 500k+ Athletes",
    icon: Crown,
  },
];

const faqs = [
  {
    question: "Which Gomzi supplement should I begin with?",
    answer:
      "For lean muscle development and recovery, start with our 100% Whey Protein combined with Micronized Creatine. For individuals aiming to increase body weight and caloric intake, Mass Gainer is ideal. For overall vitality and immune support, daily Multivitamins pair seamlessly with any fitness regimen.",
  },
  {
    question: "Are Gomzi supplements tested and FSSAI certified?",
    answer:
      "Yes. Every Gomzi Supplement batch is manufactured strictly in FSSAI-licensed, GMP-certified, and ISO-compliant facilities in India. Every single batch undergoes third-party testing to guarantee zero heavy metal contamination and 100% label accuracy.",
  },
  {
    question: "Do Gomzi supplements contain any banned substances or dope agents?",
    answer:
      "No. All formulations are manufactured in compliance with international anti-doping standards, completely free from prohibited anabolic steroids, stimulants, or adulterants, making them fully safe for competitive national athletes.",
  },
  {
    question: "Whey Protein Isolate vs Whey Concentrate - which is right for me?",
    answer:
      "Choose Whey Isolate if you want ultra-fast absorption with near-zero carbs, lactose, and fat. Choose Whey Concentrate if you seek a rich, creamy everyday protein with balanced macronutrients at exceptional value.",
  },
  {
    question: "How long does shipping take across India?",
    answer:
      "We offer priority dispatch on all prepaid orders. Metro cities typically receive deliveries within 24 to 48 hours, while all other locations across 19,000+ pin codes are serviced in 3 to 4 business days.",
  },
];

function CategoryCard({ category }) {
  return (
    <CategoryRangeCard
      to={category.url || `/gomzi-supplement/${category.slug}`}
      title={category.title}
      subtitle={category.subtitle}
      image={resolveImageUrl(category.image)}
      badge={category.tag || "Premium"}
      count={category.productCount || 0}
    />
  );
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState(() => {
    const cached = getLocalCache(CATEGORIES_PAGE_CACHE_KEY);
    return Array.isArray(cached?.categories) && cached.categories.length > 0
      ? cached.categories
      : [];
  });
  const [loading, setLoading] = useState(() => {
    const cached = getLocalCache(CATEGORIES_PAGE_CACHE_KEY);
    return Array.isArray(cached?.categories) && cached.categories.length > 0
      ? false
      : true;
  });
  const [totalProducts, setTotalProducts] = useState(() => {
    const cached = getLocalCache(CATEGORIES_PAGE_CACHE_KEY);
    return cached?.totalProducts || 153;
  });
  const [activeFaq, setActiveFaq] = useState(0);

  // Fetch dynamic categories from the API on mount (SWR revalidation)
  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        if (categories.length === 0) {
          setLoading(true);
        }
        const res = await getCategoriesApi();
        if (isMounted && res.data?.data) {
          const data = res.data.data;
          if (Array.isArray(data.categories) && data.categories.length > 0) {
            setCategories(data.categories);
            if (data.totalProducts) setTotalProducts(data.totalProducts);
            setLocalCache(CATEGORIES_PAGE_CACHE_KEY, {
              categories: data.categories,
              totalProducts: data.totalProducts || 153,
            });
          }
        }
      } catch (err) {
        console.warn("Failed to fetch dynamic categories:", err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-bg-cream text-text">
      <SEO
        title="Shop by Category | Whey Protein, Mass Gainer & Supplements | Gomzi Nutrition"
        description="Explore Gomzi Nutrition categories: 100% Whey Protein Isolate, Mass Gainer, Plant Protein, Pre-Workout, BCAA and Essential Health Supplements."
      />

      {/* ── 1. HERO SECTION ── */}
      <section className="w-full border-b border-border bg-white">
        <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-6">
          {/* Top Live Status Pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-light px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary mb-3">
            <Sparkles size={12} className="text-primary" />
            <span>
              {loading
                ? "Connecting to Live Catalog..."
                : `${totalProducts}+ Verified Formulations Across ${categories.length} Categories`}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl md:text-[40px] leading-tight">
            Find Your Perfect Nutrition
          </h1>


          {/* Subtext */}
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-light">
            Engineered for peak performance, muscle synthesis, and daily vitality.
            Explore clinical-grade sports supplements tailored to your athletic
            ambitions.
          </p>

          {/* Trust Highlights Bar */}
          <div className="mt-6 w-full">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {highlights.map((item) => {
                const HighlightIcon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-2.5 rounded-lg border border-border bg-white p-3 text-left"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary-light">
                      <HighlightIcon size={15} className="text-primary" />
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="text-xs font-semibold text-text">
                        {item.text}
                      </span>
                      <span className="text-[10px] leading-tight text-text-light">
                        {item.sub}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. DYNAMIC CATEGORY CARDS GRID ── */}
      <section className="py-8 sm:py-12 bg-bg-cream">
        <div className="max-w-[1170px] mx-auto px-4 md:px-0">
          {/* Section Header with 100% Dynamic Count */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 pb-4 border-b border-primary-border">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-1">
                <Layers size={14} />
                <span>Explore Formulations</span>
              </div>
              <h2 className="text-2xl sm:text-3xl text-text font-extrabold tracking-tight">
                Product Categories ({categories.length || 7})
              </h2>
            </div>
          </div>

          {/* Cards Grid or Skeletons */}
          {loading ? (
            <CategoryGridSkeleton count={8} />
          ) : (
            <div className="grid grid-cols-2 items-stretch gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category._id || category.id}
                  category={category}
                />
              ))}
            </div>
          )}

          {!loading && categories.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500 text-sm">
                No product categories available at this moment.
              </p>
            </div>
          )}
        </div>
      </section>



      {/* ── 4. THE GOMZI STANDARD SECTION ── */}
      <section
        className="group/standard py-16 sm:py-24 text-white relative overflow-hidden border-t border-b border-[#3a1d15] hover:border-amber-400/35 transition-colors duration-500 select-none"
        style={{
          background:
            "linear-gradient(180deg, #120b08 0%, #1a0f0a 50%, #0d0705 100%)",
        }}
      >


        {/* Ambient Background Typographic Watermark */}
        <div className="absolute inset-0 flex justify-end items-center pr-4 sm:pr-12 pointer-events-none select-none overflow-hidden">
          <span
            className="font-black uppercase leading-none text-white/[0.02] group-hover/standard:text-white/[0.04] tracking-widest transition-all duration-700 ease-out group-hover/standard:scale-105"
            style={{ fontSize: "clamp(80px, 16vw, 200px)" }}
          >
            STANDARD
          </span>
        </div>

        {/* Subtle Sheen Highlight Sweep across section on hover */}

        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Standard Badge Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-amber-400/40 backdrop-blur-md text-xs font-semibold uppercase tracking-widest text-[#ff8914] hover:text-amber-200 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 cursor-default group/pill mb-3">
              <Zap size={13} className="text-[#ff8914] transition-transform duration-300 group-hover/pill:rotate-12 group-hover/pill:scale-110" />
              <span>The Gomzi Quality Standard</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl uppercase leading-tight font-black tracking-tight text-white transition-all duration-300 group-hover/standard:drop-shadow-[0_4px_24px_rgba(255,170,90,0.22)]">
              Why Serious Athletes
              <br />
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Trust Gomzi Nutrition
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16">
            {standards.map((item) => (
              <div
                key={item.number}
                className="group relative overflow-hidden p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-400/40 hover:bg-white/[0.06] hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl sm:text-5xl font-black text-primary group-hover:text-[#ff8914] transition-colors">
                      {item.number}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/[0.05] group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary-hover group-hover:border group-hover:border-amber-400/30 flex items-center justify-center transition-all duration-300 shadow-xs">
                      <ShieldCheck size={16} className="text-gray-400 group-hover:text-amber-200 transition-colors" />
                    </div>
                  </div>

                  <div className="h-[2px] w-12 bg-[#ff8914] mb-4 group-hover:w-full transition-all duration-500" />

                  <h3 className="text-base sm:text-lg uppercase font-bold text-white group-hover:text-amber-100 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FAQS ACCORDION SECTION ── */}
      <section className="py-16 sm:py-24 bg-bg-cream">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-light border border-primary-border text-xs font-bold uppercase tracking-wider text-primary mb-3">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-5xl uppercase font-black tracking-tight text-text mt-1">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto mt-2">
              Everything you need to know about our sourcing, verification, and supplement recommendations.
            </p>
          </div>

          <div className="flex flex-col gap-3.5">
            {faqs.map((faq, index) => {
              const open = activeFaq === index;
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer border ${
                    open
                      ? "border-amber-400/50 bg-gradient-to-br from-[#fdfbf9] to-white shadow-[0_8px_24px_rgba(92,49,36,0.08)] ring-1 ring-amber-400/20"
                      : "border-primary-border bg-white hover:border-amber-400/40 hover:bg-[#fdfbf9]/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(92,49,36,0.08)] hover:-translate-y-0.5"
                  }`}
                >
                  {/* Subtle moving card sheen sweep on hover */}

                  <button
                    onClick={() => setActiveFaq(open ? null : index)}
                    className="w-full flex justify-between items-center px-6 py-4.5 text-left cursor-pointer relative z-10"
                  >
                    <span className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-primary transition-colors pr-4">
                      {faq.question}
                    </span>
                    <div
                      className={`relative overflow-hidden w-8.5 h-8.5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        open
                          ? "btn-gradient border border-amber-400/30 text-white rotate-180 shadow-md shadow-primary/25"
                          : "bg-gray-100 text-gray-500 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-primary group-hover:to-primary-hover group-hover:border-amber-400/30 group-hover:text-white group-hover:shadow-md group-hover:scale-105"
                      }`}
                    >
                      <span className="relative z-10">{open ? <X size={15} className="text-amber-100" /> : <Plus size={15} />}</span>
                    </div>
                  </button>

                  {open && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed font-light border-t border-gray-100 animate-fadeIn relative z-10">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. BOTTOM CATALOG CTA ── */}
      <section className="py-12 sm:py-16 bg-white border-t border-border">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl border border-border bg-gradient-to-r from-primary-light/60 via-white to-primary-light/40 p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-xl text-center md:text-left">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary bg-white px-3 py-1 rounded-full border border-primary-border shadow-xs mb-3">
                Direct From Laboratory To Athlete
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text tracking-tight leading-tight">
                Ready to Experience Verified Purity?
              </h2>
              <p className="text-xs sm:text-sm text-text-light mt-2 leading-relaxed font-normal">
                Explore our complete range of certified sports nutrition products with free shipping across India.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                to="/gomzi-supplement"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-hover active:scale-[0.98] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                <span>Shop Full Catalog</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}