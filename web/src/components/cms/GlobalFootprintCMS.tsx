import { useGlobalFootprint } from "@/hooks/useSanityData";
import { urlFor } from "@/lib/sanity";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const GlobalFootprintCMS = () => {
  const { data, isLoading, error } = useGlobalFootprint();
  const globalFootprint = data;

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded animate-pulse mb-6 mx-auto w-96"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse mx-auto w-2xl"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
        </div>
      </section>
    );
  }

  if (error || !globalFootprint) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Global {" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">Footprint</span>
          </h2>
          <p className="text-xl text-text-gray mb-8">
            Unable to load global footprint information at this time.
          </p>
        </div>
      </section>
    );
  }

  const { title, subtitle, worldMap, statistics, locations, contactSection } = globalFootprint;

  // Prepare highlighted heading without repeating the last word
  const rawTitle = title || "Our Global Footprint";
  const titleParts = rawTitle.trim().split(" ");
  const highlightedWord = titleParts.pop();
  const leadingText = titleParts.join(" ");

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {leadingText}{leadingText ? " " : ""}
            <span className="bg-gradient-hero bg-clip-text text-transparent">{highlightedWord}</span>
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto">
            {subtitle || "With dual headquarters and a growing network of partners, we're building sustainable healthcare infrastructure across continents."}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* World Map Visualization */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              {worldMap?.asset?._ref ? (
                <img 
                  src={urlFor(worldMap).width(800).height(600).quality(80).url()} 
                  alt={worldMap.alt || "Global medical mission map showing connection points"}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <div className="text-center text-blue-600">
                    <MapPin className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-medium">World Map Image</p>
                    <p className="text-sm">Upload a world map image in Sanity Studio</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card/90 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-trust-blue">
                      {statistics?.countriesActive || 0}
                    </div>
                    <div className="text-sm text-text-gray">Countries Active</div>
                  </div>
                  <div className="bg-card/90 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-trust-blue">
                      {statistics?.partnerHospitalsText || "Multiple Renowned Hospitals"}
                    </div>
                    <div className="text-sm text-text-gray">Partner Hospitals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="order-1 lg:order-2 space-y-6">
            {Array.isArray(locations) && locations.length > 0 ? (
              locations.map((location, index) => (
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
              ))
            ) : (
              <div className="space-y-6">
                <Card className="p-6 bg-card shadow-soft border-l-4 border-l-trust-blue">
                  <div className="text-center text-text-gray">
                    <p className="text-lg font-medium mb-2">No locations configured</p>
                    <p className="text-sm">Add office locations in Sanity Studio</p>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-subtle rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">
            {contactSection?.title || "Get in Touch"}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 bg-card shadow-soft">
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-trust-blue" />
                United States Office
              </h4>
              <div className="space-y-2 text-text-gray">
                <p>21C Orinda Way, Suite #267, Orinda, CA 94563</p>
                <p>Email: standingstraight@standingstraight.org</p>
                <p>Phone: 925 900-3451</p>
              </div>
            </Card>

            <Card className="p-6 bg-card shadow-soft">
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-warm-orange" />
                India Office
              </h4>
              <div className="space-y-2 text-text-gray">
                <p>Standing Straight Welfare Society, 1st Floor, Akal Metal Works, Lamba Pind, G.T Road, Bye Pass, Jalandhar</p>
                <p>Email: standingstraight@standingstraight.org</p>
              </div>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button variant="mission" size="lg" asChild>
              <Link to={contactSection?.ctaButton?.link || "/contact"}>
                {contactSection?.ctaButton?.text || "Contact Our Team"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalFootprintCMS;
