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
import { useState, useEffect, useCallback } from "react";

const SuccessStories = () => {
  const [currentCarouselSlide, setCurrentCarouselSlide] = useState(0);
  const [showAllStories, setShowAllStories] = useState(false);
  const [expandedStory, setExpandedStory] = useState<number | null>(null);
  const [selectedStory, setSelectedStory] = useState<number | null>(null);

  // Top 4 featured stories for carousel
  const featuredStories = [
    {
      name: "Happy",
      age: 12,
      condition: "Spinal Deformity from Tuberculosis",
      treatment: "Spinal Correction Surgery",
      location: "Mumbai, India",
      story: "Poor Happy's young life was marred by spinal deformity caused by tuberculosis when he was a small child. Today he is restored to his 'happy' self, resuming the life he was meant to lead.",
      beforeImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=80&brightness=1.1&contrast=1.1",
      hasBeforeAfter: true
    },
    {
      name: "Tanya",
      age: 13,
      condition: "90° Spinal Curve",
      treatment: "Scoliosis Correction",
      location: "Delhi, India",
      story: "With a 90-degree curve in her spine, Tanya spent her life in pain, unable to enjoy life, education or family like her peers. Today her spine is strong and her spirit restored.",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=600&fit=crop",
      hasBeforeAfter: false
    },
    {
      name: "Ravneet",
      age: 4,
      condition: "Severe Spinal Deformity",
      treatment: "Pediatric Spinal Surgery",
      location: "Punjab, India",
      story: "After two unsuccessful surgeries, 4-year-old Ravneet's family was losing hope. Today she is able to stand straight for the first time in her young life.",
      beforeImage: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop&q=80&brightness=1.15&saturation=1.1",
      hasBeforeAfter: true
    },
    {
      name: "Rajesh",
      age: 13,
      condition: "Progressive Scoliosis",
      treatment: "Spinal Fusion Surgery",
      location: "Bangalore, India",
      story: "Progressive scoliosis kept Rajesh twisted in pain, with no hope of relief. Today he is able to stand straight and embrace all of the adventure the world holds for a young man.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      hasBeforeAfter: false
    }
  ];

  // All stories for bottom section
  const allStories = [
    {
      name: "Ravneet",
      age: 4,
      condition: "Spinal Deformity",
      story: "After two unsuccessful surgeries, 4-year-old Ravneet's family was losing hope. Today she is able to stand straight for the first time in her young life.",
      location: "Punjab, India",
      year: "Surgery in 2015",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop"
    },
    {
      name: "Happy",
      age: 12,
      condition: "Spinal Deformity from Tuberculosis",
      story: "Poor Happy's young life was marred by spinal deformity caused by tuberculosis when he was a small child. Today he is restored to his 'happy' self, resuming the life he was meant to lead.",
      location: "India",
      year: "Surgery in 2015",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
    },
    {
      name: "Tanya",
      age: 13,
      condition: "90-Degree Spinal Curve",
      story: "With a 90-degree curve in her spine, Tanya spent her life in pain, unable to enjoy life, education or family like her peers. Today her spine is strong and her spirit restored.",
      location: "India",
      year: "Treated 2015",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&h=300&fit=crop"
    },
    {
      name: "Rajesh",
      age: 13,
      condition: "Progressive Scoliosis",
      story: "Progressive scoliosis kept Rajesh twisted in pain, with no hope of relief. Today he is able to stand straight and embrace all of the adventure the world holds for a young man.",
      location: "India",
      year: "Surgery in 2015",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
    },
    {
      name: "Jaspreet",
      age: 20,
      condition: "Spinal Deformity",
      story: "After years of suffering through spinal deformity and failed surgeries, Jaspreet now lives the carefree, painless life of a normal young woman.",
      location: "India",
      year: "Surgery in 2015",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop"
    },
    {
      name: "Maria",
      age: 8,
      condition: "Congenital Scoliosis",
      story: "Born with severe spinal curvature, Maria's parents traveled from rural Mexico seeking help. After her surgery, she can now run and play like any other child.",
      location: "Oaxaca, Mexico",
      year: "Surgery in 2016",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&h=300&fit=crop"
    },
    {
      name: "Ahmed",
      age: 15,
      condition: "Kyphoscoliosis",
      story: "Ahmed's severe spinal deformity affected his breathing and mobility. Today, he's planning to become a doctor himself to help others like him.",
      location: "Morocco",
      year: "Surgery in 2017",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
    },
    {
      name: "Priya",
      age: 11,
      condition: "Neuromuscular Scoliosis",
      story: "Priya's condition was progressing rapidly, threatening her lung function. After surgery, she returned to school and is now top of her class.",
      location: "Kerala, India",
      year: "Surgery in 2018",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop"
    }
  ];

  const displayedStories = showAllStories ? allStories : allStories.slice(0, 6);

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
                  className="flex transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(-${currentCarouselSlide * 100}%)` }}
                >
                  {featuredStories.map((story, index) => (
                    <div key={index} className="min-w-full shrink-0 px-2 md:px-4">
                      <div
                        className={`relative aspect-[16/9] max-h-[640px] w-full rounded-3xl overflow-hidden transition duration-500 ${
                          index === currentCarouselSlide ? "opacity-100" : "opacity-70"
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

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {displayedStories.map((story, index) => (
                  <Card
                    key={index}
                    id={`story-${index}`}
                    onClick={() => setExpandedStory(expandedStory === index ? null : index)}
                    className="overflow-hidden bg-card shadow-soft hover:shadow-card transition-all duration-300 hover:scale-105 md:cursor-default cursor-pointer"
                  >
                    <div className="relative h-64">
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

            {/* Impact Statistics */}
            <div className="mt-20 bg-gradient-action rounded-2xl p-8 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">Our Impact in Numbers</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">500+</div>
                  <p className="text-white/90">Lives Transformed</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">15</div>
                  <p className="text-white/90">Countries Served</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">98%</div>
                  <p className="text-white/90">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Story Modal */}
      <Dialog open={selectedStory !== null} onOpenChange={(open) => !open && setSelectedStory(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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
                      <div className="flex items-center gap-2 text-text-gray">
                        <MapPin className="w-4 h-4" />
                        <span>{story.location}</span>
                      </div>
                      {story.age && <span className="text-text-gray">Age: {story.age}</span>}
                    </div>
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-4 space-y-4">
                  {story.hasBeforeAfter && story.beforeImage && story.afterImage ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="relative">
                        <img
                          src={story.beforeImage}
                          alt={`${story.name} before treatment`}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                          Before
                        </Badge>
                      </div>
                      <div className="relative">
                        <img
                          src={story.afterImage}
                          alt={`${story.name} after treatment`}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <Badge className="absolute top-2 left-2 bg-medical-teal text-white">
                          After
                        </Badge>
                      </div>
                    </div>
                  ) : story.image ? (
                    <div className="relative">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  ) : null}
                  
                  <div className="prose max-w-none">
                    <p className="text-text-gray leading-relaxed text-base">
                      {story.story}
                    </p>
                    {story.treatment && (
                      <p className="text-sm text-medical-teal font-medium mt-4">
                        Treatment: {story.treatment}
                      </p>
                    )}
                    {story.year && (
                      <p className="text-sm text-warm-orange font-medium mt-2">
                        {story.year}
                      </p>
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
