import { Navigation, Footer } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Heart, Star, ArrowRight } from "lucide-react";
import { usePatientStories } from "@/hooks/useSanityData";
import { urlFor } from "@/lib/sanity";
import type { PatientStory } from "@/lib/sanity";
import patientStoriesImage from "@/assets/patient-stories.jpg";

const SuccessStories = () => {
  const allStories = [
    {
      name: "Ravneet",
      age: 4,
      condition: "Spinal Deformity",
      story: "After two unsuccessful surgeries, 4-year-old Ravneet's family was losing hope. Today she is able to stand straight for the first time in her young life.",
      location: "Punjab, India",
      year: "Surgery in 2015"
    },
    {
      name: "Happy",
      age: 12,
      condition: "Spinal Deformity from Tuberculosis",
      story: "Poor Happy's young life was marred by spinal deformity caused by tuberculosis when he was a small child. Today he is restored to his 'happy' self, resuming the life he was meant to lead.",
      location: "India",
      year: "Surgery in 2015"
    },
    {
      name: "Tanya",
      age: 13,
      condition: "90-Degree Spinal Curve",
      story: "With a 90-degree curve in her spine, Tanya spent her life in pain, unable to enjoy life, education or family like her peers. Today her spine is strong and her spirit restored.",
      location: "India",
      year: "Treated 2015"
    },
    {
      name: "Rajesh",
      age: 13,
      condition: "Progressive Scoliosis",
      story: "Progressive scoliosis kept Rajesh twisted in pain, with no hope of relief. Today he is able to stand straight and embrace all of the adventure the world holds for a young man.",
      location: "India",
      year: "Surgery in 2015"
    },
    {
      name: "Jaspreet",
      age: 20,
      condition: "Spinal Deformity",
      story: "After years of suffering through spinal deformity and failed surgeries, Jaspreet now lives the carefree, painless life of a normal young woman.",
      location: "India",
      year: "Surgery in 2015"
    },
    {
      name: "Maria",
      age: 8,
      condition: "Congenital Scoliosis",
      story: "Born with severe spinal curvature, Maria's parents traveled from rural Mexico seeking help. After her surgery, she can now run and play like any other child.",
      location: "Oaxaca, Mexico",
      year: "Surgery in 2016"
    },
    {
      name: "Ahmed",
      age: 15,
      condition: "Kyphoscoliosis",
      story: "Ahmed's severe spinal deformity affected his breathing and mobility. Today, he's planning to become a doctor himself to help others like him.",
      location: "Morocco",
      year: "Surgery in 2017"
    },
    {
      name: "Priya",
      age: 11,
      condition: "Neuromuscular Scoliosis",
      story: "Priya's condition was progressing rapidly, threatening her lung function. After surgery, she returned to school and is now top of her class.",
      location: "Kerala, India",
      year: "Surgery in 2018"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Stories of{" "}
                <span className="bg-gradient-action bg-clip-text text-transparent">
                  Transformation
                </span>
              </h1>
              <p className="text-xl text-text-gray max-w-3xl mx-auto">
                Every surgery represents a life transformed, a family reunited with hope, 
                and a young person empowered to pursue their dreams. These are their stories.
              </p>
            </div>

            {/* Featured Image */}
            <div className="mb-16 rounded-2xl overflow-hidden shadow-card">
              <img 
                src={patientStoriesImage} 
                alt="Happy children after successful spinal surgery"
                className="w-full h-96 object-cover"
              />
            </div>

            {/* All Patient Story Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allStories.map((story, index) => (
                <Card key={index} className="p-6 bg-card shadow-soft hover:shadow-card hover:scale-105 transition-bounce border-l-4 border-l-trust-blue h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-foreground">{story.name}</h3>
                        <span className="text-sm text-text-gray bg-soft-gray px-3 py-1 rounded-full">
                          Age {story.age}
                        </span>
                      </div>
                      <p className="text-sm text-medical-teal font-medium">{story.condition}</p>
                      <p className="text-xs text-text-gray">{story.location}</p>
                      <p className="text-xs text-warm-orange font-medium">{story.year}</p>
                    </div>
                    
                    <p className="text-text-gray leading-relaxed mb-6 flex-grow">
                      {story.story}
                    </p>
                    
                    <Button variant="story" size="sm" className="w-full mt-auto">
                      Read Full Story
                    </Button>
                  </div>
                </Card>
              ))}
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
    </div>
  );
};

export default SuccessStories;