import { Navigation, Footer } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, AlertTriangle, CheckCircle, XCircle, Clock3 } from "lucide-react";
import { useUpcomingEvents } from "@/hooks/useSanityData";
import { urlFor } from "@/lib/sanity";
import type { Event } from "@/lib/sanity";

const UpcomingEventsPage = () => {
  const upcomingEvents = [
    {
      title: "Surgical Mission to Mumbai",
      date: "March 15-22, 2025",
      location: "King Edward Memorial Hospital, Mumbai, India",
      type: "Surgical Mission",
      description: "Comprehensive spinal surgery mission focusing on pediatric cases. We'll be providing surgeries for 25+ children with various spinal conditions.",
      team: "8 surgeons, 12 nurses, 4 anesthesiologists",
      status: "Accepting Applications",
      requirements: ["Medical license", "Pediatric experience", "International mission experience preferred"]
    },
    {
      title: "Training Workshop - Advanced Spine Techniques",
      date: "April 10-12, 2025",
      location: "All India Institute of Medical Sciences, Delhi",
      type: "Training Program",
      description: "Intensive 3-day workshop for local surgeons on advanced pediatric spine surgery techniques and post-operative care.",
      team: "4 lead surgeons, 6 local participants",
      status: "Registration Open",
      requirements: ["Orthopedic surgery specialization", "Minimum 2 years experience", "Hospital affiliation"]
    },
    {
      title: "Medical Outreach - Rural Kerala",
      date: "May 8-15, 2025",
      location: "Government Medical College, Thiruvananthapuram",
      type: "Outreach Program",
      description: "Community outreach program providing free screenings and consultations for spinal conditions in rural areas.",
      team: "6 medical professionals, 8 volunteers",
      status: "Volunteers Needed",
      requirements: ["Medical background preferred", "Willingness to travel", "Basic Malayalam helpful"]
    },
    {
      title: "International Conference Participation",
      date: "June 5-7, 2025",
      location: "Global Spine Health Summit, Bangkok, Thailand",
      type: "Conference",
      description: "Presenting our latest research and outcomes at the annual Global Spine Health Summit.",
      team: "Research team and senior surgeons",
      status: "Internal Team",
      requirements: ["Invitation only"]
    },
    {
      title: "Surgical Mission to Mexico City",
      date: "July 20-27, 2025",
      location: "Hospital Infantil de México, Mexico City",
      type: "Surgical Mission",
      description: "First mission to Latin America, focusing on complex spinal deformities in pediatric patients.",
      team: "10 surgeons, 15 nurses, 5 anesthesiologists",
      status: "Team Selection",
      requirements: ["Spanish proficiency preferred", "Pediatric surgery experience", "Complex case experience"]
    },
    {
      title: "Telemedicine Training Program",
      date: "August 15-16, 2025",
      location: "Virtual Training Sessions",
      type: "Virtual Training",
      description: "Training local healthcare providers on telemedicine consultations and remote patient monitoring.",
      team: "Technology team and medical advisors",
      status: "Registration Open",
      requirements: ["Basic computer skills", "Internet access", "Healthcare background"]
    },
    {
      title: "Fundraising Gala - Boston",
      date: "September 12, 2025",
      location: "Boston Convention Center, Boston, USA",
      type: "Fundraising Event",
      description: "Annual fundraising gala featuring patient stories, mission updates, and community celebration.",
      team: "Board members and volunteers",
      status: "Tickets Available",
      requirements: ["Open to all supporters"]
    },
    {
      title: "Surgical Mission to Bangladesh",
      date: "October 5-12, 2025",
      location: "Dhaka Medical College Hospital, Dhaka",
      type: "Surgical Mission",
      description: "Expanding our reach to Southeast Asia with focus on cleft spine and spina bifida cases.",
      team: "12 surgeons, 18 support staff",
      status: "Planning Phase",
      requirements: ["Spina bifida experience", "International mission experience", "Adaptability to challenging conditions"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepting Applications":
        return "bg-green-100 text-green-800";
      case "Registration Open":
        return "bg-blue-100 text-blue-800";
      case "Volunteers Needed":
        return "bg-orange-100 text-orange-800";
      case "Team Selection":
        return "bg-purple-100 text-purple-800";
      case "Planning Phase":
        return "bg-gray-100 text-gray-800";
      case "Internal Team":
        return "bg-gray-100 text-gray-600";
      case "Tickets Available":
        return "bg-medical-teal/10 text-medical-teal";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Surgical Mission":
        return "bg-trust-blue/10 text-trust-blue";
      case "Training Program":
        return "bg-medical-teal/10 text-medical-teal";
      case "Outreach Program":
        return "bg-warm-orange/10 text-warm-orange";
      case "Conference":
        return "bg-soft-gray text-text-gray";
      case "Virtual Training":
        return "bg-purple-100 text-purple-800";
      case "Fundraising Event":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Upcoming{" "}
                <span className="bg-gradient-action bg-clip-text text-transparent">
                  Missions & Events
                </span>
              </h1>
              <p className="text-xl text-text-gray max-w-3xl mx-auto">
                Join us in our mission to provide life-changing spinal surgery to children worldwide. 
                From surgical missions to training programs, there are many ways to get involved.
              </p>
            </div>

            {/* Event Cards */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="p-6 bg-card shadow-soft hover:shadow-card transition-bounce h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getTypeColor(event.type)}>
                            {event.type}
                          </Badge>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                        <p className="text-warm-orange font-medium mb-1">{event.date}</p>
                        <p className="text-sm text-text-gray mb-4">{event.location}</p>
                      </div>
                    </div>
                    
                    <p className="text-text-gray leading-relaxed mb-4">
                      {event.description}
                    </p>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-foreground mb-2">Team Size:</p>
                      <p className="text-sm text-text-gray">{event.team}</p>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-sm font-medium text-foreground mb-2">Requirements:</p>
                      <ul className="text-sm text-text-gray space-y-1">
                        {event.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-trust-blue rounded-full mr-2 flex-shrink-0"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-auto">
                      {event.status === "Accepting Applications" || event.status === "Registration Open" || event.status === "Volunteers Needed" ? (
                        <Button variant="mission" className="w-full">
                          Apply Now
                        </Button>
                      ) : event.status === "Tickets Available" ? (
                        <Button variant="story" className="w-full">
                          Get Tickets
                        </Button>
                      ) : (
                        <Button variant="outline" disabled className="w-full">
                          {event.status}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Join Our Mission CTA */}
            <div className="bg-gradient-action rounded-2xl p-8 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">Ready to Make a Difference?</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Whether you're a medical professional or passionate volunteer, 
                there's a place for you in our global mission to transform lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  Volunteer Application
                </Button>
                <Button variant="hero" size="lg">
                  Medical Professional Application
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UpcomingEventsPage;