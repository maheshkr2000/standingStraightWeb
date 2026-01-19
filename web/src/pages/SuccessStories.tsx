import { Navigation, Footer } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, ArrowRight, MapPin } from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useFeaturedStories, usePatientStories } from "@/hooks/useSanityData";
import { urlFor } from "@/lib/sanity";

type Story = {
  name: string;
  age?: number;
  condition?: string;
  treatment?: string;
  location?: string;
  story: string;
  image?: string;
  gallery?: string[];
  hasBeforeAfter?: boolean;
  beforeImage?: string;
  afterImage?: string;
  year?: string;
  videoUrl?: string;
};

type SanityImage = { _type: "image"; asset: { _type: "reference"; _ref: string } };
type SanityImageRef = { _type?: string; asset?: { _type?: string; _ref?: string } };

type CmsStory = {
  featuredImage?: SanityImageRef;
  beforeImage?: SanityImageRef;
  afterImage?: SanityImageRef;
  gallery?: SanityImageRef[];
  images?: SanityImageRef[];
  beforeSurgeryImages?: SanityImageRef[];
  afterSurgeryImages?: SanityImageRef[];
  beforeImages?: SanityImageRef[];
  afterImages?: SanityImageRef[];
  videoUrl?: string;
  video?: {
    asset?: { url?: string };
    file?: { asset?: { url?: string } };
    url?: string;
  };
  patientName?: string;
  title?: string;
  age?: number;
  condition?: string;
  location?: string | { city?: string; country?: string };
  missionDate?: string;
  summary?: string;
  outcome?: string;
};

const SuccessStories = () => {
  const { data: cmsFeatured } = useFeaturedStories();
  const { data: cmsStories } = usePatientStories();
  const [currentCarouselSlide, setCurrentCarouselSlide] = useState(0);
  const [showAllStories, setShowAllStories] = useState(false);
  const [expandedStory, setExpandedStory] = useState<number | null>(null);
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  type MediaItem = { url: string; type: "image" | "video"; label?: string };
  const [activeMediaItem, setActiveMediaItem] = useState<MediaItem | null>(null);
  // default to mobile to avoid peeking on first paint; effect will update
  const [isMobile, setIsMobile] = useState(true);
  const slideWidthPercent = isMobile ? 100 : 70; // mobile full width, desktop shows peeks
  const slidePeekOffset = isMobile ? 0 : (100 - slideWidthPercent) / 2; // 0 on mobile, 15 on desktop

  // Top featured stories fallback (local)
  const localFeaturedStories: Story[] = useMemo(
    () => [
    {
      name: "Ravneet",
      age: 4,
      condition: "Severe Spinal Deformity",
      treatment: "Pediatric Spinal Surgery",
      location: "Punjab, India",
      story: "After two unsuccessful surgeries, 4-year-old Ravneet's family was losing hope. Today she is able to stand straight for the first time in her young life.",
      image: "/successStories/1/1.avif",
      gallery: ["/successStories/1/1.avif", "/successStories/1/11.avif", "/successStories/1/12.avif", "/successStories/1/13.avif"],
      hasBeforeAfter: false
    },
    {
      name: "Happy",
      age: 12,
      condition: "Spinal Deformity from Tuberculosis",
      treatment: "Spinal Correction Surgery",
      location: "Mumbai, India",
      story: "Poor Happy's young life was marred by spinal deformity caused by tuberculosis when he was a small child. Today he is restored to his 'happy' self, resuming the life he was meant to lead.",
      image: "/successStories/2/2.avif",
      gallery: [
        "/successStories/2/2.avif",
        "/successStories/2/before1.avif",
        "/successStories/2/before2.avif",
        "/successStories/2/after3.avif",
        "/successStories/2/after4.avif",
        "/successStories/2/21.avif",
        "/successStories/2/22.avif",
        "/successStories/2/23.avif",
        "/successStories/2/24.avif",
      ],
      hasBeforeAfter: true,
      beforeImage: "/successStories/2/before1.avif",
      afterImage: "/successStories/2/after3.avif",
    },
    {
      name: "Tanya",
      age: 13,
      condition: "90° Spinal Curve",
      treatment: "Scoliosis Correction",
      location: "Delhi, India",
      story: "With a 90-degree curve in her spine, Tanya spent her life in pain, unable to enjoy life, education or family like her peers. Today her spine is strong and her spirit restored.",
      image: "/successStories/3/3.avif",
      gallery: [
        "/successStories/3/3.avif",
        "/successStories/3/before1.avif",
        "/successStories/3/after1.avif",
        "/successStories/3/31.avif",
        "/successStories/3/32.avif",
        "/successStories/3/33.avif",
      ],
      hasBeforeAfter: true,
      beforeImage: "/successStories/3/before1.avif",
      afterImage: "/successStories/3/after1.avif",
    },
    {
      name: "Rajesh",
      age: 13,
      condition: "Progressive Scoliosis",
      treatment: "Spinal Fusion Surgery",
      location: "Bangalore, India",
      story: "Progressive scoliosis kept Rajesh twisted in pain, with no hope of relief. Today he is able to stand straight and embrace all of the adventure the world holds for a young man.",
      image: "/successStories/4/4.avif",
      gallery: [
        "/successStories/4/4.avif",
        "/successStories/4/before3.avif",
        "/successStories/4/after1.avif",
        "/successStories/4/41.avif",
        "/successStories/4/42.avif",
        "/successStories/4/43.avif",
        "/successStories/4/44.avif",
      ],
      hasBeforeAfter: true,
      beforeImage: "/successStories/4/before3.avif",
      afterImage: "/successStories/4/after1.avif",
      }
    ],
    []
  );

  // All stories fallback (local)
  const localAllStories: Story[] = useMemo(
    () => [
    {
      name: "Ravneet",
      age: 4,
      condition: "Spinal Deformity",
      story: "After two unsuccessful surgeries, 4-year-old Ravneet's family was losing hope. Today she is able to stand straight for the first time in her young life.",
      location: "Punjab, India",
      year: "Surgery in 2015",
      image: "/successStories/1/1.avif",
      gallery: ["/successStories/1/1.avif", "/successStories/1/11.avif", "/successStories/1/12.avif", "/successStories/1/13.avif"],
    },
    {
      name: "Happy",
      age: 12,
      condition: "Spinal Deformity from Tuberculosis",
      story: "Poor Happy's young life was marred by spinal deformity caused by tuberculosis when he was a small child. Today he is restored to his 'happy' self, resuming the life he was meant to lead.",
      location: "India",
      year: "Surgery in 2015",
      image: "/successStories/2/2.avif",
      gallery: [
        "/successStories/2/2.avif",
        "/successStories/2/before1.avif",
        "/successStories/2/before2.avif",
        "/successStories/2/after3.avif",
        "/successStories/2/after4.avif",
        "/successStories/2/21.avif",
        "/successStories/2/22.avif",
        "/successStories/2/23.avif",
        "/successStories/2/24.avif",
      ],
      hasBeforeAfter: true,
      beforeImage: "/successStories/2/before1.avif",
      afterImage: "/successStories/2/after3.avif",
    },
    {
      name: "Tanya",
      age: 13,
      condition: "90-Degree Spinal Curve",
      story: "With a 90-degree curve in her spine, Tanya spent her life in pain, unable to enjoy life, education or family like her peers. Today her spine is strong and her spirit restored.",
      location: "India",
      year: "Treated 2015",
      image: "/successStories/3/3.avif",
      gallery: [
        "/successStories/3/3.avif",
        "/successStories/3/before1.avif",
        "/successStories/3/after1.avif",
        "/successStories/3/31.avif",
        "/successStories/3/32.avif",
        "/successStories/3/33.avif",
      ],
      hasBeforeAfter: true,
      beforeImage: "/successStories/3/before1.avif",
      afterImage: "/successStories/3/after1.avif",
    },
    {
      name: "Rajesh",
      age: 13,
      condition: "Progressive Scoliosis",
      story: "Progressive scoliosis kept Rajesh twisted in pain, with no hope of relief. Today he is able to stand straight and embrace all of the adventure the world holds for a young man.",
      location: "India",
      year: "Surgery in 2015",
      image: "/successStories/4/4.avif",
      gallery: [
        "/successStories/4/4.avif",
        "/successStories/4/before3.avif",
        "/successStories/4/after1.avif",
        "/successStories/4/41.avif",
        "/successStories/4/42.avif",
        "/successStories/4/43.avif",
        "/successStories/4/44.avif",
      ],
      hasBeforeAfter: true,
      beforeImage: "/successStories/4/before3.avif",
      afterImage: "/successStories/4/after1.avif",
    },
    {
      name: "Jaspreet",
      age: 20,
      condition: "Spinal Deformity",
      story: "After years of suffering through spinal deformity and failed surgeries, Jaspreet now lives the carefree, painless life of a normal young woman.",
      location: "India",
      year: "Surgery in 2015",
      image: "/successStories/5/5.avif",
      gallery: ["/successStories/5/5.avif", "/successStories/5/51.avif", "/successStories/5/52.avif", "/successStories/5/53.avif"],
      hasBeforeAfter: true,
      beforeImage: "/successStories/5/before2.avif",
      afterImage: "/successStories/5/after2.avif",
    },
   
    ],
    []
  );

  const prepareImage = (img?: SanityImageRef): SanityImage | undefined => {
    if (!img?.asset?._ref) return undefined;
    return { _type: "image", asset: { _type: "reference", _ref: img.asset._ref } };
  };

  const getImageUrl = (
    img?: SanityImageRef | { asset?: { _ref?: string; url?: string }; url?: string }
  ): string | undefined => {
    if (!img) return undefined;
    const ref = img?.asset?._ref;
    if (ref) {
      return urlFor({ _type: "image", asset: { _type: "reference", _ref: ref } }).width(1400).quality(85).url();
    }
    const assetUrl = (img as { asset?: { url?: string } })?.asset?.url;
    if (assetUrl) return assetUrl;
    const directUrl = (img as { url?: string })?.url;
    if (directUrl) return directUrl;
    return undefined;
  };

  const mapCmsStory = useCallback((story: CmsStory): Story => {
    const beforeUrl = getImageUrl(story?.beforeImage || story?.beforeSurgeryImages?.[0]);
    const afterUrl = getImageUrl(story?.afterImage || story?.afterSurgeryImages?.[0]);
    const videoUrl =
      story?.videoUrl ||
      story?.video?.file?.asset?.url ||
      story?.video?.asset?.url ||
      story?.video?.url;

    const gallerySources: (SanityImageRef | { asset?: { _ref?: string; url?: string }; url?: string } | undefined)[] = [
      ...(story?.beforeSurgeryImages || []),
      ...(story?.afterSurgeryImages || []),
      ...(story?.beforeImages || []),
      ...(story?.afterImages || []),
      ...(story?.gallery || []),
      ...(story?.images || []),
      story?.featuredImage,
      story?.beforeImage,
      story?.afterImage,
    ];

    const galleryUrls = gallerySources
      .map((item) => getImageUrl(item) || (prepareImage(item) ? urlFor(prepareImage(item)!).width(1400).quality(85).url() : undefined))
      .filter(Boolean) as string[];

    const mainUrl = getImageUrl(story?.featuredImage) || galleryUrls[0];
    const missionYear = story?.missionDate ? new Date(story.missionDate).getFullYear() : undefined;
    const loc =
      typeof story?.location === "string"
        ? story.location
        : story?.location?.city || story?.location?.country
        ? [story.location.city, story.location.country].filter(Boolean).join(", ")
        : undefined;
    return {
      name: story?.patientName || story?.title || "Patient Story",
      age: story?.age,
      condition: story?.condition,
      location: loc,
      story: story?.summary || story?.outcome || "Story coming soon.",
      image: mainUrl || galleryUrls[0],
      gallery: galleryUrls.length ? galleryUrls : mainUrl ? [mainUrl] : [],
      hasBeforeAfter: Boolean(beforeUrl && afterUrl),
      beforeImage: beforeUrl,
      afterImage: afterUrl,
      videoUrl,
      year: missionYear ? `Mission ${missionYear}` : undefined,
    };
  }, []);

  const featuredStories: Story[] = useMemo(() => {
    const cmsAll = Array.isArray(cmsStories)
      ? cmsStories.map(mapCmsStory).filter((s) => s.image || s.story)
      : [];
    // If no CMS stories, show locals; otherwise show CMS stories ordered by mission date (descending)
    if (cmsAll.length === 0) return localFeaturedStories;
    return cmsAll.sort((a, b) => {
      const yearA = Number(a.year?.replace(/\D/g, "")) || 0;
      const yearB = Number(b.year?.replace(/\D/g, "")) || 0;
      return yearB - yearA;
    });
  }, [cmsStories, localFeaturedStories, mapCmsStory]);

  const allStories: Story[] = useMemo(() => {
    const cmsAll = Array.isArray(cmsStories)
      ? cmsStories.map(mapCmsStory).filter((s) => s.image || s.story)
      : [];
    return [...cmsAll, ...localAllStories];
  }, [cmsStories, localAllStories, mapCmsStory]);

  const displayedStories = showAllStories ? allStories : allStories.slice(0, 6);

  useEffect(() => {
    if (selectedStory === null) {
      setActiveMediaItem(null);
      return;
    }
    const story =
      selectedStory < featuredStories.length
        ? featuredStories[selectedStory]
        : allStories[selectedStory - featuredStories.length];

    const mediaItems: MediaItem[] = [];
    if (story.videoUrl) mediaItems.push({ url: story.videoUrl, type: "video", label: "Video" });
    if (story.beforeImage) mediaItems.push({ url: story.beforeImage, type: "image", label: "Before" });
    if (story.afterImage) mediaItems.push({ url: story.afterImage, type: "image", label: "After" });
    if (story.gallery?.length) {
      mediaItems.push(...story.gallery.map((url) => ({ url, type: "image" as const })));
    }
    if (story.image && !mediaItems.find((m) => m.url === story.image)) {
      mediaItems.unshift({ url: story.image, type: "image" });
    }

    setActiveMediaItem(mediaItems[0] || null);
  }, [selectedStory, featuredStories, allStories]);

  const goToSlide = useCallback(
    (index: number) => {
      const normalizedIndex = (index + featuredStories.length) % featuredStories.length;
      setCurrentCarouselSlide(normalizedIndex);
    },
    [featuredStories.length]
  );

  // Auto-run carousel
  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide(currentCarouselSlide + 1);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentCarouselSlide, goToSlide]);

  // Responsive detection for carousel layout
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
           

            {/* Top Carousel Section */}
            <div className="mb-20">
              <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                <div
                  className="flex gap-4 md:gap-6 transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateX(calc(-${currentCarouselSlide * slideWidthPercent}% + ${slidePeekOffset}%))`,
                  }}
                >
                  {featuredStories.map((story, index) => (
                    <div
                      key={index}
                      className={`${isMobile ? "min-w-full" : "min-w-[70%] md:min-w-[70%] lg:min-w-[70%]"} shrink-0 px-2 md:px-3 lg:px-4`}
                    >
                      <div
                        className={`relative aspect-[9/14] max-h-[640px] w-[90%] rounded-3xl overflow-hidden transition duration-300 ${
                          index === currentCarouselSlide ? "opacity-100" : "opacity-80"
                        }`}
                      >
                              {story.hasBeforeAfter ? (
                          <div className="relative h-full w-full flex bg-slate-900">
                            <div className="w-1/2 relative bg-black">
                                    <img
                                      src={story.beforeImage}
                                      alt={`${story.name} before treatment`}
                                className="w-full h-full object-contain"
                                    />
                                    <div className="absolute top-4 left-4">
                                      <Badge className="bg-red-500 text-white px-4 py-1 rounded-full text-xs font-semibold uppercase">
                                        Before
                                      </Badge>
                                    </div>
                                  </div>
                            <div className="w-1/2 relative bg-black">
                                    <img
                                      src={story.afterImage}
                                      alt={`${story.name} after treatment`}
                                className="w-full h-full object-contain"
                                    />
                                    <div className="absolute top-4 right-4">
                                      <Badge className="bg-medical-teal text-white px-4 py-1 rounded-full text-xs font-semibold uppercase">
                                        After
                                      </Badge>
                                    </div>
                                  </div>
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                              <div className="w-px h-5/6 bg-white/30" />
                                    </div>
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/50 to-transparent p-6 md:p-8">
                              <div className="flex items-center gap-3 mb-3">
                                <Badge className="bg-medical-teal/90 text-white px-4 py-1 rounded-full text-xs font-semibold">
                                      Before & After
                                    </Badge>
                                <Badge className="bg-white/15 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                  Slide {index + 1} of {featuredStories.length}
                                </Badge>
                              </div>
                                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                                      {story.name}'s Remarkable Recovery
                                    </h3>
                                    <button
                                onClick={() => setSelectedStory(index)}
                                      className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors cursor-pointer"
                                    >
                                      Read Full Story <ArrowRight className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="relative h-full">
                                  <img
                                    src={story.image}
                                    alt={story.name}
                                    className="w-full h-full object-cover"
                                  />
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6 md:p-8">
                                <div className="mb-3">
                                  <Badge className="bg-medical-teal/90 text-white px-4 py-1 rounded-full text-xs font-semibold mb-2">
                                    {story.condition}
                                  </Badge>
                                  <div className="flex items-center gap-2 text-white/80 text-sm">
                                    <MapPin className="w-4 h-4" />
                                    <span>{story.location}</span>
                                  </div>
                                </div>
                                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                                  {story.name}'s Path to Pain-Free Life
                                </h3>
                                <button
                                  onClick={() => setSelectedStory(index)}
                                  className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors cursor-pointer"
                                >
                                  Read Full Story <ArrowRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() => goToSlide(currentCarouselSlide - 1)}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg z-20 transition-all hover:scale-110"
                  aria-label="Previous story"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>
                <button
                  onClick={() => goToSlide(currentCarouselSlide + 1)}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg z-20 transition-all hover:scale-110"
                  aria-label="Next story"
                >
                  <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>

                {/* Pagination Dots */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {featuredStories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                    className={`h-2.5 rounded-full transition-all ${
                        index === currentCarouselSlide
                          ? "bg-medical-teal w-8"
                        : "bg-gray-300 w-2.5 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Stories Section */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Stories of Hope & Healing
                </h2>
                <p className="text-lg text-text-gray max-w-3xl mx-auto">
                  Discover the inspiring journeys of children whose lives have been transformed through dedicated care and treatment.
                </p>
              </div>

              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {displayedStories.map((story, index) => (
                  <Card
                    key={index}
                    id={`story-${index}`}
                    onClick={() => setExpandedStory(expandedStory === index ? null : index)}
                    className="overflow-hidden bg-card shadow-soft hover:shadow-card transition-all duration-300 hover:scale-105 md:cursor-default cursor-pointer"
                  >
                    <div className="relative aspect-[9/12] w-full overflow-hidden">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">{story.name}</h3>
                      <p className="text-sm text-medical-teal font-medium mb-2">{story.condition}</p>
                      <div className="flex items-center gap-2 text-sm text-text-gray mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{story.location}</span>
                      </div>
                      {/* Mobile: Show story text only when expanded, Desktop: Always show */}
                      <div
                        className={`transition-all duration-300 ${
                          expandedStory === index ? "block" : "hidden md:block"
                        }`}
                      >
                        <p className="text-sm text-text-gray mb-4 line-clamp-3 md:line-clamp-none">{story.story}</p>
                      </div>
                      <Button
                        variant="story"
                        size="sm"
                        className="w-full hidden md:block"
                        onClick={() => {
                          // Find the story in featuredStories first, otherwise use index from allStories
                          const featuredIndex = featuredStories.findIndex(s => s.name === story.name);
                          if (featuredIndex !== -1) {
                            setSelectedStory(featuredIndex);
                          } else {
                            // For stories not in featured, we'll show them in modal too
                            setSelectedStory(index + featuredStories.length);
                          }
                        }}
                      >
                        Read More
                      </Button>
                      <p className="text-xs text-medical-teal font-medium text-center mt-2 md:hidden">
                        {expandedStory === index ? "Tap to collapse" : "Tap to view story"}
                      </p>
                  </div>
                </Card>
              ))}
              </div>

              {/* Show All Stories Button */}
              {allStories.length > 6 && (
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowAllStories(!showAllStories)}
                    className="px-8"
                  >
                    {showAllStories ? "Show Less Stories" : "Show All Stories"}
                  </Button>
                </div>
              )}
            </div>

          </div>
        </section>
      </main>
      <Footer />

      {/* Story Modal */}
      <Dialog open={selectedStory !== null} onOpenChange={(open) => !open && setSelectedStory(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedStory !== null && (() => {
            const story = selectedStory < featuredStories.length 
              ? featuredStories[selectedStory]
              : allStories[selectedStory - featuredStories.length];
            
            if (!story) return null;

            return (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl md:text-3xl font-bold">
                    {story.name}'s Story
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      <span className="text-medical-teal font-medium">{story.condition}</span>
                      {story.location && (
                        <div className="flex items-center gap-2 text-text-gray">
                          <MapPin className="w-4 h-4" />
                          <span>{story.location}</span>
                        </div>
                      )}
                      {story.age && <span className="text-text-gray">Age: {story.age}</span>}
                      {story.year && (
                        <span className="text-sm text-warm-orange font-medium">{story.year}</span>
                      )}
                    </div>
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-4 grid md:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
                  <div className="space-y-4">
                    {activeMediaItem && (
                      <div className="rounded-xl overflow-hidden bg-black/5 border border-border">
                        {activeMediaItem.type === "video" ? (
                          <video
                            controls
                            className="w-full h-full max-h-[420px] object-cover"
                            src={activeMediaItem.url}
                          />
                        ) : (
                          <img
                            src={activeMediaItem.url}
                            alt={story.name}
                            className="w-full h-full max-h-[420px] object-cover"
                          />
                        )}
                      </div>
                    )}

                    {/* Thumbnails */}
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {(() => {
                        const thumbs: MediaItem[] = [];
                        if (story.videoUrl) thumbs.push({ url: story.videoUrl, type: "video", label: "Video" });
                        if (story.beforeImage) thumbs.push({ url: story.beforeImage, type: "image", label: "Before" });
                        if (story.afterImage) thumbs.push({ url: story.afterImage, type: "image", label: "After" });
                        if (story.gallery?.length) {
                          thumbs.push(...story.gallery.map((url) => ({ url, type: "image" as const })));
                        }
                        if (story.image && !thumbs.find((m) => m.url === story.image)) {
                          thumbs.unshift({ url: story.image, type: "image" });
                        }
                        return thumbs;
                      })().map((item, idx) => (
                        <button
                          key={item.url + idx}
                          onClick={() => setActiveMediaItem(item)}
                          className={`relative h-24 w-full overflow-hidden rounded-md border transition ${
                            activeMediaItem?.url === item.url ? "border-medical-teal ring-1 ring-medical-teal/50" : "border-transparent"
                          }`}
                        >
                          {item.type === "video" ? (
                            <div className="relative h-full w-full bg-black/60 flex items-center justify-center text-white text-xs font-semibold">
                              <span className="px-2 py-1 bg-black/70 rounded">Video</span>
                            </div>
                          ) : (
                            <img src={item.url} alt={`${story.name} thumb ${idx + 1}`} className="h-full w-full object-cover" />
                          )}
                          {item.label && (
                            <Badge className="absolute top-1 left-1 bg-black/70 text-white text-[10px] px-2 py-0.5">{item.label}</Badge>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-text-gray leading-relaxed text-base">{story.story}</p>
                    {story.treatment && (
                      <p className="text-sm text-medical-teal font-semibold">Treatment: {story.treatment}</p>
                    )}
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuccessStories;
