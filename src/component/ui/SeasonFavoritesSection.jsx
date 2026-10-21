import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCategoriesApi } from "../../api/category.api";
import { getLocalCache, setLocalCache } from "../../utils/storage";
import SectionHeader from "../common/SectionHeader";
import Marquee from "../common/Marquee";
import CategoryRangeCard from "../common/CategoryRangeCard";

const CATEGORIES_CACHE_KEY = "gomzi_categories_cache";

const FALLBACK_CATEGORIES = [
  {
    id: "pre-workout",
    title: "Pre Workout",
    badge: "Peak Energy",
    subtitle:
      "Clinical performance formulas to ignite explosive energy, vascular pumps, and total focus.",
    image: "/images/product-category/pre-workout.webp",
    url: "/gomzi-supplement?search=pre-workout",
    productCount: 4,
  },
  {
    id: "bcaa-amino-acids",
    title: "BCAA & Amino",
    badge: "Intra-Workout",
    subtitle:
      "Fermented 2:1:1 BCAAs with key electrolytes to prevent muscle breakdown.",
    image: "/images/product-category/bcaa.jpg",
    url: "/gomzi-supplement?search=bcaa",
    productCount: 3,
  },
  {
    id: "creatine-monohydrate",
    title: "Pure Creatine",
    badge: "Strength & Power",
    subtitle:
      "100% micronized monohydrate to replenish cellular ATP and boost strength.",
    image: "/images/product-category/creatine.webp",
    url: "/gomzi-supplement?search=creatine",
    productCount: 2,
  },
  {
    id: "wellness-health",
    title: "Daily Wellness",
    badge: "Daily Vitality",
    subtitle:
      "Essential multivitamins, omega-3, and immunity boosters for everyday health.",
    image: "/images/product-category/APEX-MULTIVITAMIN.jpg",
    url: "/gomzi-supplement?search=wellness",
    productCount: 6,
  },
  {
    id: "whey-protein",
    title: "Why Protein",
    badge: "Muscle Growth",
    subtitle:
      "Fast-absorbing whey isolate and concentrate for clean muscle synthesis.",
    image: "/images/product-category/whey-protein.webp",
    url: "/gomzi-supplement?search=whey",
    productCount: 8,
  },
  {
    id: "mass-gainer",
    title: "Mass Gainer",
    badge: "Weight Gain",
    subtitle:
      "Calorie-dense carbohydrate and whey matrix for rapid, clean bulking.",
    image: "/images/product-category/mass-gainer.webp",
    url: "/gomzi-supplement?search=gainer",
    productCount: 5,
  },
  {
    id: "plant-protein",
    title: "Plant Protein",
    badge: "Vegan Power",
    subtitle:
      "Complete plant-based protein with digestive enzymes for easy absorption.",
    image: "/images/product-category/plant-protein.webp",
    url: "/gomzi-supplement?search=plant",
    productCount: 4,
  },
];

const resolveImageUrl = (img) => {
  if (!img || typeof img !== "string" || !img.trim()) return "";
  const clean = img.trim();
  if (
    clean.startsWith("http://") ||
    clean.startsWith("https://") ||
    clean.startsWith("/")
  ) {
    return clean;
  }
  return `https://files.fggroup.in/${clean}`;
};

export default function SeasonFavoritesSection() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState(() => {
    const cached = getLocalCache(CATEGORIES_CACHE_KEY);
    return Array.isArray(cached) && cached.length > 0 ? cached : FALLBACK_CATEGORIES;
  });

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const res = await getCategoriesApi();
        const raw = res?.data?.data?.categories || [];
        if (!isMounted || raw.length === 0) return;

        const seen = new Set();
        const unique = [];

        for (const cat of raw) {
          if (!cat) continue;
          const key = (cat.slug || cat.title || cat.name || "").toLowerCase().trim();
          if (!key || seen.has(key)) continue;
          seen.add(key);
          unique.push({
            id: cat._id || cat.slug || key,
            title: cat.title || cat.name || "Category",
            image: resolveImageUrl(cat.image),
            url:
              cat.url ||
              (cat.slug ? `/gomzi-supplement/${cat.slug}` : "/category"),
            raw: cat,
          });
        }

        if (unique.length > 0) {
          setCategories(unique);
          setLocalCache(CATEGORIES_CACHE_KEY, unique);
        }
      } catch {
        // keep fallback categories
      }
    };

    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // Merge API data over the curated fallback so badges, copy and product
  // counts are always present — for both fresh and cached data.
  const enriched = categories.map((cat) => {
    const key = (cat.slug || cat.title || cat.name || "").toLowerCase().trim();
    const fallback = FALLBACK_CATEGORIES.find(
      (f) => f.id === cat.slug || f.title.toLowerCase() === key
    );
    const raw = cat.raw || {};

    return {
      ...cat,
      subtitle:
        cat.subtitle ||
        raw.subtitle ||
        raw.description ||
        fallback?.subtitle ||
        "Science-backed nutrition for everyday performance.",
      badge:
        cat.badge ||
        raw.tag ||
        raw.badge ||
        fallback?.badge ||
        "Premium",
      image: cat.image || fallback?.image || "/images/product-placeholder.webp",
      productCount: Number(
        cat.productCount ??
          raw.productCount ??
          raw.products?.length ??
          fallback?.productCount ??
          0
      ),
    };
  });

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-6 md:py-8">
        <SectionHeader
          title="Browse by Category"
          onViewAll={() => navigate("/category")}
        />

        <Marquee duration={55} className="px-4 md:px-0">
          {enriched.map((cat) => (
            <div key={cat.id} className="mx-2 flex items-stretch">
              <CategoryRangeCard
                title={cat.title}
                subtitle={cat.subtitle}
                image={cat.image}
                badge={cat.badge}
                count={cat.productCount}
                onClick={() => navigate(cat.url || "/category")}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
