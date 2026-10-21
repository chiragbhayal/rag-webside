import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { fetchProducts } from "../../services/product.service";
import ProductCard from "../common/ProductCard";
import SectionHeader from "../common/SectionHeader";

const TABS = [
  { id: "omegas", label: "Omegas" },
  { id: "magnesium", label: "Magnesium" },
  { id: "vitamins", label: "Vitamins" },
  { id: "antioxidants", label: "Anti-Oxidants" },
];

export default function DailyWellnessSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const res = await fetchProducts({
          page: 1,
          limit: 8,
          search: activeTab === "omegas" ? "fish oil" : activeTab,
        });
        if (!isMounted) return;

        const list = Array.isArray(res.data) ? res.data : [];
        setProducts(
          list.slice(0, 4).map((p, idx) => ({
            id: p._id || `wellness-${idx}`,
            slug: p.slug || p._id,
            name: p.name,
            image:
              p.displayImages?.[0] ||
              p.image ||
              "/images/product-placeholder.webp",
            price: Number(p.price || 0),
            originalPrice: Number(p.price || 0) * 1.35,
            rating: 4.4 + (idx % 3) * 0.1,
            totalReviews: 300 + idx * 90,
            raw: p,
          }))
        );
      } catch {
        if (isMounted) setProducts([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [activeTab]);

  return (
    <section className="w-full bg-bg-page">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-6 md:py-8">
        <SectionHeader
          title="Daily Wellness"
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="grid grid-cols-2 items-stretch gap-4 lg:grid-cols-4 lg:gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton-shimmer h-[430px] rounded-lg" />
              ))
            : products.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  badge={idx === 0 ? "Trending Now" : undefined}
                />
              ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/gomzi-supplement?search=wellness")}
            className="view-all"
          >
            View All
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </section>
  );
}
