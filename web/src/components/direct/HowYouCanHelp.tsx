import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Heart, HandHeart, Megaphone } from "lucide-react";

const HowYouCanHelp = () => {
  return (
    <section id="help" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How You Can{" "}
            <span className="bg-gradient-action bg-clip-text text-transparent">
              Make a Difference
            </span>
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto">
            Every contribution, big or small, helps us reach more children 
            and transform more lives. Choose how you'd like to be part of our mission.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Give */}
          <Card className="p-8 bg-card shadow-soft hover:shadow-warm transition-smooth group h-full">
            <div className="text-center flex flex-col h-full">
              <div className="w-20 h-20 bg-gradient-action rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-bounce">
                <Heart className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Give</h3>
              <p className="text-text-gray mb-6 leading-relaxed">
                Your donation directly funds life-changing surgeries. Every $5,000 
                can transform a child's life forever through our surgical missions.
              </p>
              
              <div className="space-y-3 mb-6 flex-grow">
                <div className="bg-soft-gray rounded-lg p-3">
                  <div className="text-sm text-text-gray">$50 - Medical supplies</div>
                </div>
                <div className="bg-soft-gray rounded-lg p-3">
                  <div className="text-sm text-text-gray">$500 - Pre-surgery care</div>
                </div>
                <div className="bg-soft-gray rounded-lg p-3">
                  <div className="text-sm text-text-gray">$5,000 - Complete surgery</div>
                </div>
              </div>
              
              <Button variant="donate" className="w-full mt-auto" asChild>
                <Link to="/donate">Donate Now</Link>
              </Button>
            </div>
          </Card>

          {/* Volunteer */}
          <Card className="p-8 bg-card shadow-soft hover:shadow-card transition-smooth group h-full">
            <div className="text-center flex flex-col h-full">
              <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-bounce">
                <HandHeart className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Volunteer</h3>
              <p className="text-text-gray mb-6 leading-relaxed">
                Join our team of dedicated volunteers. Whether you're a medical professional 
                or want to help with operations, there's a place for you.
              </p>
              
              <div className="space-y-3 mb-6 text-left flex-grow">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-trust-blue rounded-full"></div>
                  <span className="text-sm text-text-gray">Medical professionals</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-trust-blue rounded-full"></div>
                  <span className="text-sm text-text-gray">Mission coordinators</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-trust-blue rounded-full"></div>
                  <span className="text-sm text-text-gray">Community outreach</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-trust-blue rounded-full"></div>
                  <span className="text-sm text-text-gray">Story sharing</span>
                </div>
              </div>
              
              <Button variant="mission" className="w-full mt-auto" asChild>
                <Link to="/volunteers">Volunteer With Us</Link>
              </Button>
            </div>
          </Card>

          {/* Engage */}
          <Card className="p-8 bg-card shadow-soft hover:shadow-card transition-smooth group h-full">
            <div className="text-center flex flex-col h-full">
              <div className="w-20 h-20 bg-medical-teal rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-bounce">
                <Megaphone className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Engage</h3>
              <p className="text-text-gray mb-6 leading-relaxed">
                Spread awareness about our mission. Follow our journey, share our stories, 
                and help us reach more families who need our help.
              </p>
              
              <div className="space-y-3 mb-6 text-left flex-grow">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-medical-teal rounded-full"></div>
                  <span className="text-sm text-text-gray">Subscribe to updates</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-medical-teal rounded-full"></div>
                  <span className="text-sm text-text-gray">Share on social media</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-medical-teal rounded-full"></div>
                  <span className="text-sm text-text-gray">Tell your network</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-medical-teal rounded-full"></div>
                  <span className="text-sm text-text-gray">Corporate partnerships</span>
                </div>
              </div>
              
              <Button variant="story" className="w-full mt-auto" asChild>
                <Link to="/success-stories">Stay Connected</Link>
              </Button>
            </div>
          </Card>
        </div>

        {/* Call to Action Banner */}
        <div className="mt-16 bg-gradient-hero rounded-2xl p-8 text-center text-primary-foreground">
          <h3 className="text-3xl font-bold mb-4">Ready to Change a Life Today?</h3>
          <p className="text-xl mb-6 text-primary-foreground/90">
            Join thousands of supporters who believe every child deserves to stand tall.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20" asChild>
              <Link to="/contact">Start Your Impact Journey</Link>
            </Button>
            <Button variant="ghost" size="lg" className="text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/our-mission">Learn More About Our Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowYouCanHelp;