import { useMemo } from "react";
import { Navigation, Footer, AnimatedCounter } from "@/components/shared";
import { Card } from "@/components/ui/card";
import { HandHeart, Heart, Users, Stethoscope, Award, MapPin, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import heroMissionImage from "@/assets/hero-child-surgery.jpg";
import { useHeroSection } from "@/hooks/useSanityData";
import { urlFor } from "@/lib/sanity";

const OurMissionPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: heroData } = useHeroSection();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const actionHighlights = [
    "Life-changing surgeries",
    "Local doctor training",
    "Long-term recovery care"
  ];

  const missionPillars = [
    {
      title: "Surgery",
      icon: Stethoscope,
      description: "Providing free, life-changing spinal surgeries to children who cannot afford treatment. Our expert surgical teams use the latest techniques to correct spinal deformities and restore hope.",
      stats: "500+ surgeries performed",
      details: [
        "Pediatric scoliosis correction",
        "Spina bifida treatment", 
        "Kyphosis and lordosis repair",
        "Complex spinal deformity reconstruction",
        "Post-surgical rehabilitation support"
      ]
    },
    {
      title: "Education", 
      icon: Award,
      description: "Training local medical professionals to build sustainable healthcare capacity. We share knowledge, techniques, and best practices to ensure long-term impact in communities we serve.",
      stats: "200+ doctors trained",
      details: [
        "Hands-on surgical training programs",
        "Advanced technique workshops",
        "Telemedicine consultations",
        "Medical equipment training",
        "Continuing education partnerships"
      ]
    },
    {
      title: "Sustainability",
      icon: Users, 
      description: "Building lasting healthcare infrastructure and partnerships. Our goal is to create self-sufficient medical programs that continue transforming lives long after our missions end.",
      stats: "15 partner hospitals",
      details: [
        "Local partnership development",
        "Medical equipment donations",
        "Healthcare system strengthening",
        "Community health worker training",
        "Long-term patient follow-up programs"
      ]
    }
  ];

  const impactStats = [
    { number: 500, label: "Lives Transformed", suffix: "+" },
    { number: 15, label: "Countries Served", suffix: "" },
    { number: 200, label: "Local Doctors Trained", suffix: "+" },
    { number: 98, label: "Success Rate", suffix: "%" },
    { number: 25, label: "Partner Hospitals", suffix: "" },
    { number: 50, label: "Medical Missions", suffix: "+" }
  ];

  const timeline = [
    {
      year: "2008 - 2015",
      title: "Early Years",
      description: "Dr. Bains performed spine surgeries across Central America, South America, the Caribbean, and Kenya with charitable groups.",
      milestone: "Global charitable missions"
    },
    {
      year: "2012",
      title: "Lessons From the Field",
      description: "A suboptimal mission trip highlighted the need for a dedicated, standards-driven spine mission program.",
      milestone: "Blueprint for change"
    },
    {
      year: "2013",
      title: "Standing Straight Founded",
      description: "Established Standing Straight to deliver consistent, high-quality spinal deformity care on missions.",
      milestone: "Organization launched"
    },
    {
      year: "2013 - 2015",
      title: "North India Hospital Visits",
      description: "Multiple visitations in North India; developed a spine surgery checklist and requirements for safe missions.",
      milestone: "Clinical standards built"
    },
    {
      year: "2015",
      title: "First Mission at SGL Hospital",
      description: "Screened 40+ patients and performed 6 surgeries with a 20-specialist team at SGL Hospital, Jalandhar.",
      milestone: "Inaugural mission success"
    },
    {
      year: "2017",
      title: "Biannual Missions Begin",
      description: "Increased cadence to biannual trips to meet growing demand for complex spinal surgeries.",
      milestone: "Twice-yearly missions"
    },
    {
      year: "2018",
      title: "AIIMS Delhi Invitation",
      description: "Invited by AIIMS, Delhi to present and assist in scoliosis surgery, sharing techniques with national leaders.",
      milestone: "National collaboration"
    },
    {
      year: "2019",
      title: "UK Partnership & Joint Missions",
      description: "Partnered with Dr. Am Rai (Spine AID, UK); joint deformity surgeries at PGI Chandigarh and SGL Jalandhar.",
      milestone: "International co-ops"
    },
    {
      year: "2020 - 2022",
      title: "Pandemic Pause",
      description: "Mission trips were paused due to COVID-19; planning and safety protocols strengthened during downtime.",
      milestone: "Programs on hold"
    },
    {
      year: "Nov 2022",
      title: "Missions Resume",
      description: "Returned to the field, restarting surgical missions and patient follow-ups.",
      milestone: "Fieldwork reactivated"
    },
    {
      year: "Mar 2025",
      title: "Second Site Added",
      description: "Launched a second site at Krishna Vishal Vidyapeeth University, Karad, Maharashtra to expand reach.",
      milestone: "New center opened"
    }
  ];

  const coreValues = [
    {
      title: "Compassion",
      description: "Every Child Deserves to Stand Straight and be able to lead a normal and productive live.",
      icon: Heart
    },
    {
      title: "Excellence", 
      description: "We maintain the highest standards of medical care, using advanced techniques and rigorous safety protocols.",
      icon: Award
    },
    {
      title: "Equity",
      description: "Healthcare should not be limited by geography or economic status. We ensure access for all children in need.",
      icon: Users
    },
    {
      title: "Collaboration",
      description: "We work closely with local healthcare systems, building partnerships that create lasting positive change.",
      icon: Users
    },
    {
      title: "Innovation",
      description: "We embrace new technologies and techniques to improve outcomes and expand our reach globally.",
      icon: ArrowRight
    },
    {
      title: "Transparency",
      description: "We maintain open communication with donors, partners, and communities about our impact and operations.",
      icon: MapPin
    }
  ];

  const heroImageUrl = useMemo(() => {
    const slide = heroData?.slides?.[5] || heroData?.slides?.[0];
    const sanityUrl = slide?.image?.asset?._ref ? urlFor(slide.image).width(1920).quality(80).url() : null;
    return sanityUrl || "/Homepage/T-7.jpg";
  }, [heroData]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[90vh] flex items-center py-24 md:py-32 bg-[#0c1420]">
          {/* Left color fill matched to image tones */}
          <div className="absolute inset-0 bg-[#0c1420]" aria-hidden />

          {/* Right image fill */}
          <div
            className="absolute inset-0 w-full"
            style={{
              backgroundImage: `url(${heroImageUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover",
              backgroundColor: "rgba(12,20,32,0.5)"
            }}
            aria-hidden
          />

          {/* Gradient overlays for blending and readability */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, rgba(12,20,32,0.92) 0%, rgba(12,20,32,0.88) 32%, rgba(12,20,32,0.72) 52%, rgba(12,20,32,0.35) 70%, rgba(12,20,32,0.0) 85%)"
            }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-[#0c1420]/65" aria-hidden />

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="text-center lg:text-left">
                <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                  <span className="text-white/90 font-medium">Transforming Lives Since 2010</span>
                </div>
                <div className="inline-block text-left">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                    <span className="block text-white">
                      Every Child
                    </span>
                    <span className="block bg-gradient-hero bg-clip-text text-transparent">
                      Deserves to Stand Straight
                    </span>
                  </h1>
                  {/* Subheading intentionally hidden as requested */}
                </div>
              </div>
              <div className="relative flex justify-center lg:justify-end">
                <div className={`flex gap-3 lg:fixed lg:top-24 lg:z-30 transition-all duration-500 ease-in-out ${
                  isScrolled 
                    ? "opacity-0 pointer-events-none scale-95" 
                    : "opacity-100 pointer-events-auto scale-100"
                } flex-col sm:flex-row lg:flex-col items-stretch lg:items-end lg:right-6`}>
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
            </div>
          </div>
        </section>

        {/* Mission Pillars */}
        <section className="py-20 bg-gradient-subtle">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Our Three Pillars
              </h2>
              <p className="text-xl text-text-gray leading-relaxed max-w-4xl mx-auto">
                A unified approach across surgery, education, and sustainability ensures that every StandingStraight mission delivers immediate relief and long-term resilience for the communities we serve.
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {missionPillars.map((pillar, index) => {
                const IconComponent = pillar.icon;
                return (
                  <Card key={index} className="p-8 bg-card shadow-soft hover:shadow-card transition-bounce h-full">
                    <div className="text-center mb-6">
                      <div className="flex justify-center mb-4">
                        <IconComponent className="w-16 h-16 text-trust-blue" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">{pillar.title}</h3>
                      <p className="text-warm-orange font-medium text-sm mb-4">{pillar.stats}</p>
                    </div>
                    
                    <p className="text-text-gray leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                    
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Key Areas:</h4>
                      <ul className="space-y-2">
                        {pillar.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-sm text-text-gray">
                            <span className="w-2 h-2 bg-trust-blue rounded-full mr-3 flex-shrink-0"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
              <p className="text-xl text-text-gray">Measurable results that show the difference we're making</p>
            </div>
            
            <div className="bg-gradient-hero rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {impactStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                      <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                    </div>
                    <p className="text-white/80 font-medium text-sm md:text-base">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="p-6 bg-card shadow-soft text-center">
                    <div className="flex justify-center mb-4">
                      <IconComponent className="w-12 h-12 text-trust-blue" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                    <p className="text-text-gray leading-relaxed">{value.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-soft-gray">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16">Our Journey</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-trust-blue hidden md:block"></div>
              
              <div className="space-y-12">
                {timeline.map((event, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                      <Card className="p-6 bg-card shadow-soft">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="bg-trust-blue text-white px-3 py-1 rounded-full text-sm font-bold">
                            {event.year}
                          </div>
                          <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
                        </div>
                        <p className="text-text-gray mb-3">{event.description}</p>
                        <p className="text-medical-teal font-medium text-sm">{event.milestone}</p>
                      </Card>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="hidden md:flex w-6 h-6 bg-trust-blue rounded-full border-4 border-background relative z-10"></div>
                    
                    <div className="w-full md:w-5/12"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-action">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Join Our Mission</h2>
            <p className="text-white/90 text-lg mb-8">
              Whether you're a medical professional, passionate volunteer, or someone who believes 
              every child deserves quality healthcare—there's a place for you in our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
                href="/volunteers" 
                className="inline-flex items-center justify-center bg-white text-trust-blue font-semibold px-8 py-3 rounded-xl hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg"
            >
                Volunteer With Us
              </a>
              <a 
                href="/donate" 
                className="inline-flex items-center justify-center bg-warm-orange text-white border-2 border-white font-semibold px-8 py-3 rounded-xl hover:bg-warm-orange/90 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Support Our Work
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OurMissionPage;
