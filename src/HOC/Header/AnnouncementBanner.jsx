import { Link } from "react-router-dom";
import { Truck, ShieldCheck, RotateCcw, Zap } from "lucide-react";

/**
 * HealthKart sale strip.
 * Sits directly below the header, dark grey bar with rotating offers.
 */
const OFFERS = [
  { icon: Zap, text: "Upto 60% Off on top brands", href: "/gomzi-supplement?search=deal" },
  { icon: Truck, text: "Free shipping on orders above ₹999", href: "/gomzi-supplement" },
  { icon: ShieldCheck, text: "100% genuine products, direct from brands", href: "/about" },
  { icon: RotateCcw, text: "Easy 14-day returns", href: "/refund-policy" },
];

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-[#45484e]">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-2 flex items-center justify-center gap-8 overflow-x-auto scrollbar-hide">
        {OFFERS.map((offer) => {
          const Icon = offer.icon;
          return (
            <Link
              key={offer.text}
              to={offer.href}
              className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-white/90 hover:text-white transition-colors whitespace-nowrap"
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span>{offer.text}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
