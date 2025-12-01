import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage1 from "@/assets/hero-child-surgery.jpg";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

const HeroSection = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [api]);

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

  const slides = [
    { src: heroImage1, alt: "Child smiling after successful spinal surgery" },
    {
      src:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1920&h=1080&q=80",
      alt: "Child receiving care at hospital",
    },
    {
      src:
        "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1920&h=1080&q=80",
      alt: "Hospital corridor with modern equipment",
    },
    {
      src:
        "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1920&h=1080&q=80",
      alt: "Volunteers offering support",
    },
  ];

  return <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <Carousel opts={{ loop: true }} setApi={setApi} className="h-full">
          <CarouselContent className="h-full">
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="h-full">
                <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover object-center" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
            {slides.map((_, i) => (
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
      </div>
      
      {/* Content - styling aligned with Our Mission hero, content unchanged */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12 items-center pt-44 md:pt-48 pb-32">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
              <span className="block lg:whitespace-nowrap">Every Straightened Spine</span>
              <span className="block lg:whitespace-nowrap bg-gradient-hero bg-clip-text text-transparent">Begins with a Story</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              World‑class pediatric spinal surgeries for underprivileged children—powered by generous donors, volunteers, and care teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="donate" size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/donate">Donate Now</Link>
              </Button>
              <Button variant="hero" size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/our-mission">Our Mission</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;