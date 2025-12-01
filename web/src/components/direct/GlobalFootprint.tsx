import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Stethoscope, MapPin } from "lucide-react";
import globalFootprintImage from "@/assets/global-footprint.jpg";

const GlobalFootprint = () => {
  const teamMembers = [
    {
      name: "Dr. Bains",
      role: "Chief Medical Officer",
      location: "California, USA",
      specialty: "Pediatric Spine Surgery"
    },
    {
      name: "Dr. Rinella",
      role: "Senior Surgeon",
      location: "Chicago, USA",
      specialty: "Spinal Deformity Correction"
    }
  ];

  const locations = [
    {
      country: "United States",
      city: "San Francisco",
      role: "Headquarters & Operations",
      description: "Strategic planning, fundraising, and volunteer coordination"
    },
    {
      country: "India",
      city: "Mumbai",
      role: "Field Operations",
      description: "Direct patient care, local partnerships, and mission execution"
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Global{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Footprint
            </span>
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto">
            With dual headquarters and a growing network of partners, 
            we're building sustainable healthcare infrastructure across continents.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* World Map Visualization */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              <img 
                src={globalFootprintImage} 
                alt="Global medical mission map showing connection points"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card/90 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-trust-blue">2</div>
                    <div className="text-sm text-text-gray">Countries Active</div>
                  </div>
                  <div className="bg-card/90 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-trust-blue">5+</div>
                    <div className="text-sm text-text-gray">Partner Hospitals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="order-1 lg:order-2 space-y-6">
            {locations.map((location, index) => (
              <Card key={index} className="p-6 bg-card shadow-soft border-l-4 border-l-trust-blue">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{location.country}</h3>
                    <p className="text-sm text-text-gray">{location.city}</p>
                  </div>
                  <span className="text-xs bg-soft-gray text-text-gray px-3 py-1 rounded-full">
                    {location.role}
                  </span>
                </div>
                <p className="text-text-gray leading-relaxed">
                  {location.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-subtle rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Get in Touch</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 bg-card shadow-soft">
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-trust-blue" />
                United States Office
              </h4>
              <div className="space-y-2 text-text-gray">
                <p>San Francisco, California</p>
                <p>Email: usa@standingstraight.org</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </Card>

            <Card className="p-6 bg-card shadow-soft">
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-warm-orange" />
                India Office
              </h4>
              <div className="space-y-2 text-text-gray">
                <p>Mumbai, Maharashtra</p>
                <p>Email: india@standingstraight.org</p>
                <p>Phone: +91 22 1234 5678</p>
              </div>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button variant="mission" size="lg" asChild>
              <Link to="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalFootprint;