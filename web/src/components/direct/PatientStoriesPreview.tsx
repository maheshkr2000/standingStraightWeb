import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PatientStoriesPreview = () => {
  const featuredStories = [
    {
      name: "Ravneet",
      age: 4,
      condition: "Spinal Deformity",
      quote: "Today she is able to stand straight for the first time in her young life.",
      location: "Punjab, India",
      year: "Surgery in 2015"
    },
    {
      name: "Happy",
      age: 12,
      condition: "Spinal Deformity from Tuberculosis",
      quote: "Today he is restored to his 'happy' self, resuming the life he was meant to lead.",
      location: "India",
      year: "Surgery in 2015"
    },
    {
      name: "Tanya",
      age: 13,
      condition: "90-Degree Spinal Curve",
      quote: "Today her spine is strong and her spirit restored.",
      location: "India",
      year: "Treated 2015"
    }
  ];

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
            Behind every surgery is a child with dreams, a family with hope, 
            and a future full of possibilities.
          </p>
        </div>

        {/* Featured Stories Preview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featuredStories.map((story, index) => (
            <Card key={index} className="p-6 bg-card shadow-soft hover:shadow-card hover:scale-105 transition-bounce border-l-4 border-l-trust-blue h-full">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground">{story.name}</h3>
                    <span className="text-sm text-text-gray bg-soft-gray px-3 py-1 rounded-full">
                      Age {story.age}
                    </span>
                  </div>
                  <p className="text-sm text-medical-teal font-medium">{story.condition}</p>
                  <p className="text-xs text-text-gray">{story.location}</p>
                  <p className="text-xs text-warm-orange font-medium">{story.year}</p>
                </div>
                
                <p className="text-text-gray leading-relaxed flex-grow italic">
                  "{story.quote}"
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="mission" size="lg" asChild>
            <Link to="/success-stories" className="flex items-center gap-2">
              View All Success Stories <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PatientStoriesPreview;