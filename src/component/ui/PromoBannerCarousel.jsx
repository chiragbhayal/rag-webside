import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    image: "/images/banners/banner-sale-myprotein.svg",
    alt: "Myprotein - your workout deserves better nutrition, up to 50% off",
    href: "/gomzi-supplement?search=myprotein",
  },
  {
    image: "/images/banners/banner-sale-muscleblaze.svg",
    alt: "MuscleBlaze - power every single rep, up to 40% off",
    href: "/gomzi-supplement?search=muscleblaze",
  },
  {
    image: "/images/banners/banner-combo-performance.svg",
    alt: "Performance power combos - whey, creatine and a free shaker",
    href: "/gomzi-supplement?search=fuel+one",
  },
  {
    image: "/images/banners/banner-creatine.svg",
    alt: "Creatine monohydrate - pure strength, zero compromise",
    href: "/gomzi-supplement?search=creatine",
  },
  {
    image: "/images/banners/banner-preworkout.svg",
    alt: "Pre-workout formulas - train like you mean it",
    href: "/gomzi-supplement?search=pre-workout",
  },
];

/**
 * Wide promotional banner carousel.
 * Full-width banner, round arrows on the edges, pill pagination dots.
 */
export default function PromoBannerCarousel() {
  const navigate = useNavigate();
  const [swiper, setSwiper] = useState(null);
  const [active, setActive] = useState(0);

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-6 md:py-8">
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            onSwiper={setSwiper}
            onSlideChange={(s) => setActive(s.realIndex)}
            slidesPerView={1}
            loop={SLIDES.length > 1}
            speed={500}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="!overflow-hidden !rounded-xl"
          >
            {SLIDES.map((slide) => (
              <SwiperSlide key={slide.image}>
                <button
                  type="button"
                  onClick={() => navigate(slide.href)}
                  className="block w-full cursor-pointer"
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    loading="lazy"
                    className="block h-auto w-full"
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Edge arrows */}
          <button
            type="button"
            onClick={() => swiper?.slidePrev()}
            aria-label="Previous banner"
            className="absolute left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/70 sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => swiper?.slideNext()}
            aria-label="Next banner"
            className="absolute right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/70 sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Pill pagination dots */}
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/45 px-3 py-2 backdrop-blur-sm">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => swiper?.slideToLoop(i)}
                aria-label={`Go to banner ${i + 1}`}
                className={`h-1.5 rounded-full border-none p-0 transition-all duration-300 ${
                  active === i ? "w-4 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
