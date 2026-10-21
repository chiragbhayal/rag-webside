import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { successToast } from "../../utils/toast";
import { addProductToCart } from "../../services/cartStorage.service";
import SectionHeader from "../common/SectionHeader";
import ProductCard from "../common/ProductCard";

const TABS = [
  "Creatine",
  "Pre Workouts",
  "BCAA/EAA",
  "Electrolyte",
  "Carbs Blend",
  "L-Arginine",
];

const PRE_INTRA_PRODUCTS = {
  Creatine: [
    {
      id: "mb-creamp-creatine",
      name: "MuscleBlaze Creatine Monohydrate CreAMP, Watermelon Kool Aid, 250g",
      rating: 4.5,
      price: 1799,
      originalPrice: 2698,
      premiumPrice: 1745,
      freeGift: "Free Shaker",
      image: "/images/products/pre-workout/mb-creamp-creatine.png",
      url: "/gomzi-supplement?search=creatine",
    },
    {
      id: "rc-creatine-xs",
      name: "Renegade Creatine XS, Unflavoured, 300g",
      rating: 4.6,
      price: 2199,
      originalPrice: 2999,
      premiumPrice: 2133,
      freeGift: "Free Shaker",
      image: "/images/products/pre-workout/rc-creatine-xs.png",
      url: "/gomzi-supplement?search=creatine",
    },
    {
      id: "fuelone-creatine",
      name: "Fuel One Creatine Monohydrate, Unflavoured, 300g",
      rating: 4.4,
      price: 1499,
      originalPrice: 2199,
      premiumPrice: 1454,
      freeGift: "Free Shaker",
      image: "/images/products/pre-workout/fuelone-creatine.png",
      url: "/gomzi-supplement?search=creatine",
    },
    {
      id: "mb-creatine-xtra",
      name: "MuscleBlaze Creatine Xtra, 100 servings, Watermelon",
      rating: 4.3,
      price: 1899,
      originalPrice: 2499,
      premiumPrice: 1842,
      freeGift: "Free Shaker",
      image: "/images/product-category/creatine.webp",
      url: "/gomzi-supplement?search=creatine",
    },
  ],
  "Pre Workouts": [
    {
      id: "mb-preworkout",
      name: "MuscleBlaze Pre Workout Superhero, Watermelon, 60 servings",
      rating: 4.4,
      price: 2299,
      originalPrice: 2999,
      premiumPrice: 2230,
      freeGift: "Free Shaker",
      image: "/images/products/pre-workout/mb-preworkout.png",
      url: "/gomzi-supplement?search=pre-workout",
    },
    {
      id: "blackbeast-preworkout",
      name: "Black Beast Pre Workouts, Alien Blood, 30 servings",
      rating: 4.2,
      price: 1699,
      originalPrice: 2299,
      premiumPrice: 1648,
      freeGift: "Free Shaker",
      image: "/images/products/pre-workout/blackbeast-alien-blood.png",
      url: "/gomzi-supplement?search=pre-workout",
    },
    {
      id: "mb-preworkout-legacy",
      name: "MuscleBlaze Pre Workout, 100 servings, Berry Blast",
      rating: 4.1,
      price: 1999,
      originalPrice: 2599,
      premiumPrice: 1939,
      freeGift: "",
      image: "/images/product-category/pre-workout.webp",
      url: "/gomzi-supplement?search=pre-workout",
    },
    {
      id: "pumpd-preworkout",
      name: "PUMP Pre Workout for Women, Peach, 20 servings",
      rating: 4.3,
      price: 1399,
      originalPrice: 1899,
      premiumPrice: 1357,
      freeGift: "Free Shaker",
      image: "/images/deals/pumpd-deal.jpg",
      url: "/gomzi-supplement?search=pre-workout",
    },
  ],
  "BCAA/EAA": [
    {
      id: "mb-bcaa",
      name: "MuscleBlaze BCAA 2:1:1, Lemon Ice, 400g",
      rating: 4.4,
      price: 1899,
      originalPrice: 2499,
      premiumPrice: 1842,
      freeGift: "Free Shaker",
      image: "/images/product-category/bcaa.jpg",
      url: "/gomzi-supplement?search=bcaa",
    },
    {
      id: "mb-bcaa-tangy",
      name: "MuscleBlaze BCAA 2:1:1, Tangy Orange, 400g",
      rating: 4.3,
      price: 1899,
      originalPrice: 2499,
      premiumPrice: 1842,
      freeGift: "",
      image: "/images/product-category/Bcaa-tangy-orange.webp",
      url: "/gomzi-supplement?search=bcaa",
    },
    {
      id: "mb-eaa",
      name: "MuscleBlaze EAA 2:1:1, Lemon Ice, 400g",
      rating: 4.2,
      price: 1799,
      originalPrice: 2399,
      premiumPrice: 1745,
      freeGift: "Free Shaker",
      image: "/images/product-category/bcaa.jpg",
      url: "/gomzi-supplement?search=eaa",
    },
    {
      id: "gnc-bcaa",
      name: "GNC Amplified BCAA, Blue Raspberry, 30 servings",
      rating: 4.0,
      price: 1599,
      originalPrice: 2099,
      premiumPrice: 1551,
      freeGift: "",
      image: "/images/product-category/pre-workout-bcaa-creatine.webp",
      url: "/gomzi-supplement?search=bcaa",
    },
  ],
  Electrolyte: [
    {
      id: "gnc-electrolyte",
      name: "GNC Hydration Electrolytes, Lemon Lime, 30 servings",
      rating: 4.3,
      price: 899,
      originalPrice: 1199,
      premiumPrice: 872,
      freeGift: "",
      image: "/images/product-category/whey-protein.webp",
      url: "/gomzi-supplement?search=electrolyte",
    },
    {
      id: "gnc-hydration-packets",
      name: "GNC Hydration Electrolyte Powder, 20 stick packs",
      rating: 4.1,
      price: 649,
      originalPrice: 899,
      premiumPrice: 629,
      freeGift: "Free Shaker",
      image: "/images/product-category/multi-vitamin.webp",
      url: "/gomzi-supplement?search=electrolyte",
    },
    {
      id: "mb-electrolyte",
      name: "MuscleBlaze Hydration Electrolytes, Orange, 30 servings",
      rating: 4.2,
      price: 749,
      originalPrice: 999,
      premiumPrice: 726,
      freeGift: "",
      image: "/images/product-category/pre-workout.webp",
      url: "/gomzi-supplement?search=electrolyte",
    },
    {
      id: "fuelone-electrolyte",
      name: "Fuel One Hydrate Electrolytes, Watermelon, 40 servings",
      rating: 4.0,
      price: 699,
      originalPrice: 949,
      premiumPrice: 678,
      freeGift: "Free Shaker",
      image: "/images/deals/carnitine-deal.jpg",
      url: "/gomzi-supplement?search=electrolyte",
    },
  ],
  "Carbs Blend": [
    {
      id: "mb-carbs",
      name: "MuscleBlaze Carb Blend, Chocolate, 2 kg",
      rating: 4.5,
      price: 1799,
      originalPrice: 2199,
      premiumPrice: 1745,
      freeGift: "Free Shaker",
      image: "/images/deals/carnitine-deal.jpg",
      url: "/gomzi-supplement?search=carbs",
    },
    {
      id: "mb-carbs-vanilla",
      name: "MuscleBlaze Carb Blend, Vanilla, 2 kg",
      rating: 4.3,
      price: 1799,
      originalPrice: 2199,
      premiumPrice: 1745,
      freeGift: "",
      image: "/images/deals/carnitine-deal.jpg",
      url: "/gomzi-supplement?search=carbs",
    },
    {
      id: "mb-carbs-60",
      name: "MuscleBlaze Carb Blend 2.0, 60 servings, Chocolate",
      rating: 4.4,
      price: 2099,
      originalPrice: 2599,
      premiumPrice: 2036,
      freeGift: "Free Shaker",
      image: "/images/deals/creatine-dual-deal.jpg",
      url: "/gomzi-supplement?search=carbs",
    },
    {
      id: "rc-carbs",
      name: "Renegade Carb Matrix, 2 kg, Chocolate",
      rating: 4.1,
      price: 1699,
      originalPrice: 2099,
      premiumPrice: 1648,
      freeGift: "",
      image: "/images/deals/pumpd-deal.jpg",
      url: "/gomzi-supplement?search=carbs",
    },
  ],
  "L-Arginine": [
    {
      id: "mb-arginine-caps",
      name: "MuscleBlaze L-Arginine Maximum Nitric Oxide, 60 Capsules",
      rating: 4.6,
      price: 549,
      originalPrice: 799,
      premiumPrice: 520,
      freeGift: "",
      image: "/images/deals/carnitine-deal.jpg",
      url: "/gomzi-supplement?search=arginine",
    },
    {
      id: "mb-arginine-powder",
      name: "MuscleBlaze L-Arginine Powder, Unflavoured, 250g",
      rating: 4.3,
      price: 899,
      originalPrice: 1199,
      premiumPrice: 872,
      freeGift: "Free Shaker",
      image: "/images/deals/collagen-deal.jpg",
      url: "/gomzi-supplement?search=arginine",
    },
    {
      id: "gnc-arginine",
      name: "GNC L-Arginine 500mg, 120 Capsules",
      rating: 4.2,
      price: 799,
      originalPrice: 1099,
      premiumPrice: 775,
      freeGift: "",
      image: "/images/product-category/pre-workout-bcaa-creatine.webp",
      url: "/gomzi-supplement?search=arginine",
    },
    {
      id: "mb-arginine-pump",
      name: "MuscleBlaze Arginine Alpha Formula, 60 Capsules",
      rating: 4.1,
      price: 649,
      originalPrice: 899,
      premiumPrice: 629,
      freeGift: "Free Shaker",
      image: "/images/deals/pumpd-deal.jpg",
      url: "/gomzi-supplement?search=arginine",
    },
  ],
};

export default function PreIntraWorkoutSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Creatine");

  const products = PRE_INTRA_PRODUCTS[activeTab] || [];

  const handleAddToCart = async (product) => {
    await addProductToCart({
      _id: product.id,
      name: product.name,
      price: product.price,
      original_price: product.originalPrice,
      image: product.image,
      slug: product.id,
    });
    successToast(`${product.name} added to cart`);
  };

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-6 md:py-8">
        <SectionHeader
          title="Best in Pre/Intra Workout"
          tabs={TABS.map((t) => ({ id: t, label: t }))}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onViewAll={() => navigate("/gomzi-supplement")}
        />

        <div className="grid grid-cols-2 items-stretch gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                slug: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                originalPrice: product.originalPrice,
                premiumPrice: product.premiumPrice,
                rating: product.rating,
                badge: product.freeGift || undefined,
                badgeTone: product.freeGift ? "success" : undefined,
              }}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
