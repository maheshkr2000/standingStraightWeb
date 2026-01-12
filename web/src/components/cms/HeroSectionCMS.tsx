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
    <section className="relative min-h-screen h-[100svh] flex items-stretch overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <Carousel opts={{ loop: true }} setApi={setApi} className="h-full">
          <CarouselContent className="h-full">
             {hero.slides?.map((slide, index) => (
               <CarouselItem key={index} className="h-full relative overflow-hidden">
                 <div className="absolute inset-0">
                   {slide.image?.asset?._ref && slide.image.asset._ref.startsWith('image-') ? (() => {
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
                       <>
                         {/* Blurred backdrop to fill gray bars while keeping main image contained */}
                         {baseUrl && (
                           <div
                             aria-hidden
                             className="absolute inset-0 bg-center bg-cover bg-no-repeat scale-105 blur-lg opacity-60"
                             style={{ backgroundImage: `url(${baseUrl})` }}
                           />
                         )}
                         <img 
                           src={baseUrl}
                           srcSet={srcSet}
                           sizes="100vw"
                           alt={slide.image.alt || `Hero slide ${index + 1}`}
                           className="relative w-full h-full object-contain mt-14"
                           onError={(e) => {
                             const target = e.target as HTMLImageElement;
                             target.style.visibility = 'hidden';
                           }}
                         />
                       </>
                     );
                   })() : (
                     <div className="w-full h-full bg-gradient-to-br from-trust-blue to-medical-teal" />
                   )}
                 </div>
               </CarouselItem>
             ))}
          </CarouselContent>
        </Carousel>
        
        {/* Background overlay */}
        <div 
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: hero.overlayOpacity || 0.4 }}
        ></div>
        
        {/* Slide indicators */}
        {hero.showIndicators && hero.slides && hero.slides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
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
      
      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full h-full flex items-start pt-32 md:pt-40 lg:pt-44 pb-12">
        <div className="text-center lg:text-left w-full mt-6 md:mt-10">
          {/* Loading state */}
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-16 bg-white/20 rounded-lg mb-6"></div>
              <div className="h-8 bg-white/20 rounded-lg mb-8"></div>
              <div className="flex gap-4">
                <div className="h-12 w-32 bg-white/20 rounded-lg"></div>
                <div className="h-12 w-32 bg-white/20 rounded-lg"></div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl lg:max-w-5xl">
              <h1 className="text-4xl md:text-[52px] lg:text-[64px] font-bold mb-6 leading-[1.1] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                <span className="block text-balance">{hero.title}</span>
                <span className="block bg-gradient-hero bg-clip-text text-transparent">
                  {hero.subtitle}
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed drop-shadow-[0_6px_18px_rgba(0,0,0,0.3)] bg-black/15 backdrop-blur-sm px-4 py-3 rounded-xl inline-block">
                {hero.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSectionCMS;
