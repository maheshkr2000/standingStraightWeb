import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useFeaturedStories } from "@/hooks/useSanityData";
import type { PatientStory } from "@/lib/sanity";

const PatientStoriesPreviewCMS = () => {
  const { data, isLoading, error } = useFeaturedStories();

  const stories: PatientStory[] = Array.isArray(data) ? data.slice(0, 3) : [];

  return (
    <section id="stories" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Real Stories of{" "}
            <span className="bg-gradient-action bg-clip-text text-transparent">
              Transformation
            </span>
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto">
            Behind every surgery is a child with dreams, a family with hope, and a future full of possibilities.
          </p>
        </div>

        {/* Loading skeleton */}
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-6 bg-card shadow-soft h-full">
                <div className="h-6 w-40 bg-muted rounded mb-4 animate-pulse" />
                <div className="h-4 w-56 bg-muted rounded mb-2 animate-pulse" />
                <div className="h-4 w-36 bg-muted rounded mb-1 animate-pulse" />
                <div className="h-4 w-28 bg-muted rounded mb-6 animate-pulse" />
                <div className="h-20 w-full bg-muted/60 rounded animate-pulse" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {stories.map((story, index) => (
              <Card key={index} className="p-6 bg-card shadow-soft hover:shadow-card hover:scale-105 transition-bounce border-l-4 border-l-trust-blue h-full">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-foreground">{story.patientName || story.title}</h3>
                      {typeof story.age === 'number' && (
                        <span className="text-sm text-text-gray bg-soft-gray px-3 py-1 rounded-full">Age {story.age}</span>
                      )}
                    </div>
                    {story.condition && (
                      <p className="text-sm text-medical-teal font-medium">{story.condition}</p>
                    )}
                    {story.location?.country && (
                      <p className="text-xs text-text-gray">{[story.location.city, story.location.country].filter(Boolean).join(', ')}</p>
                    )}
                    {story.missionDate && (
                      <p className="text-xs text-warm-orange font-medium">
                        {new Date(story.missionDate).getFullYear()}
                      </p>
                    )}
                  </div>

                  {story.summary && (
                    <p className="text-text-gray leading-relaxed flex-grow italic">"{story.summary}"</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {!error && (
          <div className="text-center">
            <Button variant="mission" size="lg" asChild>
              <Link to="/success-stories" className="flex items-center gap-2">
                View All Success Stories <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PatientStoriesPreviewCMS;
