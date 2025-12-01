import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/shared";
import { Building2, Users, Globe } from "lucide-react";

const MissionSnapshot = () => {
  return (
    <section id="mission" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why We Exist
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto">
          Every Child Deserves to Stand Straight and be able to lead a normal and productive live. 
          We deliver life-changing spinal surgeries and train local medical teams 
          to create lasting impact in underserved communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Mission Cards */}
          <div className="space-y-6">
            <Card className="p-6 bg-card border-trust-blue/20 shadow-soft hover:shadow-card hover:scale-105 transition-all duration-300 ease-out group">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-hero rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-8 h-8 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-trust-blue transition-colors duration-300">Free Life-Changing Surgeries</h3>
                  <p className="text-text-gray">
                    Complete spinal correction surgeries delivered mission by mission, 
                    restoring mobility and confidence to children who need it most.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-medical-teal/20 shadow-soft hover:shadow-card hover:scale-105 transition-all duration-300 ease-out group">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-medical-teal rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-medical-teal transition-colors duration-300">Training Local Teams</h3>
                  <p className="text-text-gray">
                    Empowering local medical professionals with advanced surgical techniques 
                    to continue life-changing work long after our missions end.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-warm-orange/20 shadow-soft hover:shadow-card hover:scale-105 transition-all duration-300 ease-out group">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-action rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-8 h-8 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-warm-orange transition-colors duration-300">Global Impact</h3>
                  <p className="text-text-gray">
                    Building sustainable healthcare infrastructure that creates 
                    ripple effects of hope across entire communities.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Impact Stats */}
          <div className="bg-gradient-hero rounded-2xl p-8 text-primary-foreground">
            <h3 className="text-2xl font-bold mb-8 text-center">Our Impact So Far</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <AnimatedCounter 
                  value={500} 
                  suffix="+" 
                  className="text-4xl font-bold mb-2"
                />
                <div className="text-primary-foreground/80">Successful Surgeries</div>
              </div>
              <div className="text-center">
                <AnimatedCounter 
                  value={15} 
                  className="text-4xl font-bold mb-2"
                />
                <div className="text-primary-foreground/80">Medical Missions</div>
              </div>
              <div className="text-center">
                <AnimatedCounter 
                  value={50} 
                  suffix="+" 
                  className="text-4xl font-bold mb-2"
                />
                <div className="text-primary-foreground/80">Medical Volunteers</div>
              </div>
              <div className="text-center">
                <AnimatedCounter 
                  value={100} 
                  suffix="%" 
                  className="text-4xl font-bold mb-2"
                />
                <div className="text-primary-foreground/80">Success Rate</div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
                View Our Reports
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSnapshot;