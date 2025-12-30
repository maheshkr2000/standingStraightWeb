import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/shared";
import { Building2, Users, Globe, Stethoscope, Heart, MapPin, HandHeart } from "lucide-react";
import { useMissionSnapshot } from "@/hooks/useSanityData";
import type { MissionSnapshot } from "@/lib/sanity";
import { LucideIcon } from "lucide-react";

// Icon mapping for dynamic icons
const iconMap: { [key: string]: LucideIcon } = {
  building2: Building2,
  users: Users,
  globe: Globe,
  stethoscope: Stethoscope,
  heart: Heart,
  mappin: MapPin,
};

const MissionSnapshotCMS = () => {
  const { data: missionData, isLoading, error } = useMissionSnapshot();
  const [ctaHidden, setCtaHidden] = useState(false);
  const location = useLocation();

  // Fallback data for when CMS is not available
  const fallbackData: MissionSnapshot = {
    title: "How We Create Change",
    description: "From first consultation to life-changing surgery, our process turns hope into healing for children who need it most.",
    missionStatement: "From first consultation to life-changing surgery, our process turns hope into healing for children who need it most.",
    statistics: {
      surgeriesPerformed: 500,
      childrenHelped: 500,
      countriesServed: 2,
      localSurgeonsTrained: 25,
      partnersActive: 15,
      volunteersEngaged: 50,
    },
    keyPrograms: [
      {
        title: "Free Life-Changing Surgeries",
        description: "Complete spinal correction surgeries delivered mission by mission, restoring mobility and confidence to children who need it most.",
        icon: "building2"
      },
      {
        title: "Training Local Teams",
        description: "Empowering local medical professionals with advanced surgical techniques to continue life-changing work long after our missions end.",
        icon: "users"
      },
      {
        title: "Global Impact",
        description: "Building sustainable healthcare infrastructure that creates ripple effects of hope across entire communities.",
        icon: "globe"
      }
    ],
    impactHighlights: [
      { metric: "Successful Surgeries", value: "500+", description: "Successful Surgeries" },
      { metric: "Medical Missions", value: "15", description: "Medical Missions" },
      { metric: "Medical Volunteers", value: "50+", description: "Medical Volunteers" },
      { metric: "Success Rate", value: "100%", description: "Success Rate" }
    ],
    lastUpdated: new Date().toISOString(),
    isActive: true
  };

  // Use CMS data if available, otherwise fallback
  const data: MissionSnapshot = missionData || fallbackData;

  // Get icon component or fallback to default
  const getIconComponent = (iconName: string) => {
    const IconComponent = iconMap[iconName?.toLowerCase()] || Building2;
    return IconComponent;
  };

  useEffect(() => {
    const onScroll = () => setCtaHidden(window.scrollY > 140);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (error) {
    console.error('Mission snapshot error:', error);
    // Return fallback component on error
    return (
      <section id="mission" className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {fallbackData.title}
            </h2>
            <p className="text-xl text-text-gray max-w-3xl mx-auto">
              {fallbackData.description}
            </p>
          </div>
          <div className="text-center">
            <p className="text-text-gray">Unable to load mission data. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="mission" className="py-20 bg-gradient-subtle">
      {/* Top-right CTAs mirroring OurMission page */}
      {location.pathname !== "/our-mission" && (
        <div className="hidden lg:block">
          <div
            className={`fixed right-6 top-24 z-30 flex flex-col gap-3 transition-all duration-500 ease-out ${
              ctaHidden ? "opacity-0 pointer-events-none translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            <a
              href="/donate"
              className="inline-flex items-center justify-center gap-2 bg-warm-orange text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-2xl hover:bg-warm-orange/90 hover:scale-105 transition-all duration-300"
            >
              <HandHeart className="w-5 h-5" />
              <span>Support Our Mission</span>
            </a>
            <a
              href="/volunteers"
              className="inline-flex items-center justify-center gap-2 bg-white text-foreground border border-border px-6 py-3 rounded-full shadow-md hover:bg-soft-gray/30 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Users className="w-5 h-5" />
              <span>Volunteer With Us</span>
            </a>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {data.title || "How We Create Change"}
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto">
            {data.missionStatement || data.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Mission Cards */}
          <div className="space-y-6">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="p-6 bg-card border-trust-blue/20 shadow-soft">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-hero rounded-lg animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              data.keyPrograms?.map((program: MissionSnapshot['keyPrograms'][0], index: number) => {
                const IconComponent = getIconComponent(program.icon);
                const borderColors = [
                  'border-trust-blue/20',
                  'border-medical-teal/20', 
                  'border-warm-orange/20'
                ];
                const bgColors = [
                  'bg-gradient-hero',
                  'bg-medical-teal',
                  'bg-gradient-action'
                ];
                const textColors = [
                  'group-hover:text-trust-blue',
                  'group-hover:text-medical-teal',
                  'group-hover:text-warm-orange'
                ];
                
                return (
                  <Card key={index} className={`p-6 bg-card ${borderColors[index % borderColors.length]} shadow-soft hover:shadow-card hover:scale-105 transition-all duration-300 ease-out group`}>
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 ${bgColors[index % bgColors.length]} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <h3 className={`text-xl font-semibold mb-2 ${textColors[index % textColors.length]} transition-colors duration-300`}>
                          {program.title}
                        </h3>
                        <p className="text-text-gray">
                          {program.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>

          {/* Impact Stats */}
          <div className="relative overflow-hidden rounded-3xl p-10 md:p-12 text-white bg-gradient-to-br from-sky-500 via-teal-500 to-emerald-500 shadow-xl">
            <div className="absolute inset-0 opacity-25">
              <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
              <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
            </div>
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-bold text-center">Our Impact So Far</h3>

              {isLoading ? (
                <div className="grid sm:grid-cols-3 gap-6 mt-10">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="text-center">
                      <div className="h-10 bg-white/30 rounded animate-pulse mb-2"></div>
                      <div className="h-4 bg-white/30 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-3 gap-6 mt-10 text-center">
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur">
                      <div className="text-3xl md:text-4xl font-bold">1000+</div>
                      <div className="text-lg md:text-xl mt-1">Consultations</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur">
                      <div className="text-3xl md:text-4xl font-bold">5000+</div>
                      <div className="text-lg md:text-xl mt-1">Lives Impacted</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur">
                      <div className="text-3xl md:text-4xl font-bold">150+</div>
                      <div className="text-lg md:text-xl mt-1">Surgeries</div>
                    </div>
                  </div>

                  <p className="mt-10 text-lg md:text-xl text-white/90 text-center max-w-4xl mx-auto">
                    Every number tells a story. Every surgery changes a life.
                  </p>
                  <p className="mt-6 text-lg md:text-xl text-white/90 text-center max-w-5xl mx-auto">
                    With over <span className="font-bold">150 life-changing spinal surgeries</span>, Standing Straight is turning pain into possibility – one child, one family, one future at a time.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSnapshotCMS;
