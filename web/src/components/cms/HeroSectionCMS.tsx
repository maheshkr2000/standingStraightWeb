import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useHeroSection } from "@/hooks/useSanityData";
import { urlFor } from "@/lib/sanity";
import type { HeroSection as HeroSectionType } from "@/lib/sanity";

const HeroSectionCMS = () => {
  const { data: heroData, isLoading, error } = useHeroSection();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Fallback data for when CMS is not available
  const fallbackHero: HeroSectionType = {
    title: "Every Straightened Spine",
    subtitle: "Begins with a Story",
    description: "World‑class pediatric spinal surgeries for underprivileged children—powered by generous donors, volunteers, and care teams.",
    slides: [
      {
        image: {
          _type: 'image',
          asset: { _ref: 'placeholder', _type: 'reference' },
          alt: "Child smiling after successful spinal surgery"
        }
      }
    ],
    primaryButton: {
      text: "Donate Now",
      link: "/donate",
      style: "donate"
    },
    secondaryButton: {
      text: "Our Mission",
      link: "/our-mission", 
      style: "hero"
    },
    autoplaySpeed: 5,
    showIndicators: true,
    overlayOpacity: 0.4
  };

  // Use CMS data if available, otherwise fallback
  const hero = heroData ? {
    ...fallbackHero,
    ...heroData,
    // Use actual slides from Sanity, not fallback
    slides: heroData.slides || fallbackHero.slides,
    // Ensure buttons exist with fallback values
    primaryButton: heroData.primaryButton || fallbackHero.primaryButton,
    secondaryButton: heroData.secondaryButton || fallbackHero.secondaryButton,
    autoplaySpeed: heroData.autoplaySpeed || fallbackHero.autoplaySpeed,
    showIndicators: heroData.showIndicators !== undefined ? heroData.showIndicators : fallbackHero.showIndicators,
    overlayOpacity: heroData.overlayOpacity !== undefined ? heroData.overlayOpacity : fallbackHero.overlayOpacity,
  } : fallbackHero;

  // clamp autoplay to a sensible minimum (3s)
  const autoplayMs = Math.max(3, Number(hero.autoplaySpeed) || 5) * 1000;

  useEffect(() => {
    if (!api || !hero.slides?.length) return;
    const id = setInterval(() => api.scrollNext(), autoplayMs);
    return () => clearInterval(id);
  }, [api, autoplayMs, hero.slides?.length]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  if (error) {
    console.error('Hero section error:', error);
    // Return fallback hero section on error
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-trust-blue to-medical-teal">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12 items-center pt-44 md:pt-48 pb-32">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
                <span className="block lg:whitespace-nowrap">Every Straightened Spine</span>
                <span className="block lg:whitespace-nowrap bg-gradient-hero bg-clip-text text-transparent">
                  Begins with a Story
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                World‑class pediatric spinal surgeries for underprivileged children—powered by generous donors, volunteers, and care teams.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex flex-col items-stretch overflow-hidden mt-8 bg-[#d5d8da] min-h-0">
      <div className="relative z-20 max-w-6xl mx-auto px-6 pt-10 text-center space-y-3">
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-6 bg-white/30 rounded mx-auto w-2/3"></div>
            <div className="h-4 bg-white/20 rounded mx-auto w-1/2"></div>
          </div>
        ) : (
          <>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold drop-shadow-md leading-tight overflow-hidden text-ellipsis max-w-full mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 md:gap-2 text-center md:text-left md:whitespace-nowrap">
              <span className="text-[#222]">{hero.title}</span>
              <span className="text-[#0e9eb6]">{hero.subtitle}</span>
            </h1>
            <p className="hidden md:block mt-2 text-sm md:text-base lg:text-sm text-white leading-relaxed max-w-6xl mx-auto bg-[#4a525a] px-4 md:px-5 py-2.5 md:py-3 rounded-full drop-shadow">
              {hero.description}
            </p>
          </>
        )}
      </div>

      {/* Slideshow */}
      <div className="relative w-full px-4 md:px-6 mt-4">
        <Carousel opts={{ loop: true }} setApi={setApi} className="w-full">
            <CarouselContent className="gap-4 md:gap-6">
             {hero.slides?.map((slide, index) => (
               <CarouselItem
                 key={index}
                 className="relative overflow-hidden basis-[90%] sm:basis-[80%] md:basis-[72%] lg:basis-[68%]"
               >
                 {slide.image?.asset ? (() => {
                   let baseUrl = "";
                   try {
                     baseUrl = urlFor(slide.image).width(1920).quality(80).url();
                   } catch (error) {
                     console.warn('Error generating image URL:', error);
                   }

                   const srcSet = (() => {
                     try {
                       return [
                         `${urlFor(slide.image).width(640).quality(80).url()} 640w`,
                         `${urlFor(slide.image).width(1024).quality(80).url()} 1024w`,
                         `${urlFor(slide.image).width(1440).quality(80).url()} 1440w`,
                         `${urlFor(slide.image).width(1920).quality(80).url()} 1920w`,
                         `${urlFor(slide.image).width(2560).quality(80).url()} 2560w`
                       ].join(', ');
                     } catch (error) {
                       console.warn('Error generating srcSet:', error);
                       return "";
                     }
                   })();

                   return (
                     <div className="relative w-full mx-auto rounded-[4px] overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
                       {/* Blurred backdrop to fill gray bars while keeping main image contained */}
                       {baseUrl && (
                         <div
                           aria-hidden
                           className="absolute inset-0 bg-center bg-cover bg-no-repeat scale-105 blur-lg opacity-60"
                           style={{ backgroundImage: `url(${baseUrl})` }}
                         />
                       )}
                       {baseUrl ? (
                         <img 
                           src={baseUrl}
                           srcSet={srcSet}
                           sizes="100vw"
                           alt={slide.image.alt || `Hero slide ${index + 1}`}
                           className="relative w-full h-full object-cover rounded-[4px]"
                           onError={(e) => {
                             const target = e.target as HTMLImageElement;
                             target.style.visibility = 'hidden';
                           }}
                         />
                       ) : (
                         <div className="w-full h-full bg-gradient-to-br from-trust-blue to-medical-teal" />
                       )}
                     </div>
                   );
                 })() : (
                   <div className="w-full h-full bg-gradient-to-br from-trust-blue to-medical-teal" />
                 )}
               </CarouselItem>
             ))}
          </CarouselContent>
        </Carousel>

        {hero.showIndicators && hero.slides && hero.slides.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {hero.slides.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={selectedIndex === i}
                className={`h-2.5 rounded-full transition-all ${
                  selectedIndex === i ? "w-6 bg-white" : "w-2.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Content removed from overlay; title/description shown above */}
    </section>
  );
};

export default HeroSectionCMS;
