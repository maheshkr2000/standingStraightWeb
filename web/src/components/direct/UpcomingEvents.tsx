import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock, Stethoscope, GraduationCap, Users2, PartyPopper } from "lucide-react";

const UpcomingEvents = () => {
  const upcomingEvents = [
    {
      title: "Medical Mission to Mumbai",
      date: "March 15-22, 2025",
      location: "Mumbai, India",
      type: "Surgical Mission",
      description: "Week-long surgical mission treating pediatric spinal deformities. Seeking orthopedic surgeons, anesthesiologists, and OR nurses.",
      capacity: "15 surgeries planned",
      status: "Applications Open",
      urgency: "high"
    },
    {
      title: "Training Workshop: Advanced Spine Techniques",
      date: "April 8-10, 2025", 
      location: "Delhi, India",
      type: "Medical Education",
      description: "Three-day intensive training for local surgeons on latest minimally invasive spine surgery techniques.",
      capacity: "25 local surgeons",
      status: "Registration Open",
      urgency: "medium"
    },
    {
      title: "Volunteer Orientation & Training",
      date: "May 20, 2025",
      location: "Virtual Event",
      type: "Volunteer Training",
      description: "Comprehensive orientation for new volunteers covering mission protocols, cultural sensitivity, and safety procedures.",
      capacity: "50 volunteers",
      status: "Sign-up Open", 
      urgency: "low"
    },
    {
      title: "Medical Mission to Punjab",
      date: "June 12-19, 2025",
      location: "Chandigarh, India",
      type: "Surgical Mission", 
      description: "Focus on rural outreach and complex spinal deformity cases. Partnership with local government hospital.",
      capacity: "20 surgeries planned",
      status: "Planning Phase",
      urgency: "medium"
    },
    {
      title: "Annual Fundraising Gala",
      date: "September 14, 2025",
      location: "Boston, USA",
      type: "Fundraising Event",
      description: "Join us for an evening celebrating our impact and raising funds for upcoming missions. Features patient stories and live auction.",
      capacity: "300 attendees",
      status: "Save the Date",
      urgency: "low"
    }
  ];

  const getStatusColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-warm-orange text-white";
      case "medium": return "bg-medical-teal text-white";
      default: return "bg-trust-blue text-white";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Surgical Mission": return Stethoscope;
      case "Medical Education": return GraduationCap;
      case "Volunteer Training": return Users2;
      case "Fundraising Event": return PartyPopper;
      default: return Calendar;
    }
  };

  return (
    <section id="events" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Upcoming{" "}
            <span className="bg-gradient-action bg-clip-text text-transparent">
              Events & Missions
            </span>
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto">
            Join us in our upcoming surgical missions, training programs, and events. 
            Every mission brings us closer to our goal of accessible spinal care for all children.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {upcomingEvents.map((event, index) => {
            const IconComponent = getTypeIcon(event.type);
            return (
              <Card key={index} className="p-6 bg-card shadow-soft hover:shadow-card hover:scale-105 transition-bounce border-l-4 border-l-trust-blue h-full">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-8 h-8 text-trust-blue" />
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
                        <span className="text-sm text-medical-teal font-medium">{event.type}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.urgency)}`}>
                      {event.status}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-text-gray">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-gray">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-gray">
                      <Users className="w-4 h-4" />
                      <span>{event.capacity}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-text-gray leading-relaxed mb-6 flex-grow">
                    {event.description}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    <Button 
                      variant={event.urgency === "high" ? "donate" : "story"} 
                      size="sm" 
                      className="flex-1"
                    >
                      {event.type === "Surgical Mission" ? "Apply to Join" : 
                       event.type === "Medical Education" ? "Register" :
                       event.type === "Volunteer Training" ? "Sign Up" : "Learn More"}
                    </Button>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Newsletter Signup for Updates */}
        <div className="bg-gradient-hero rounded-2xl p-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Stay Updated on Our Missions</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Be the first to know about new missions, volunteer opportunities, and training programs. 
            Join our community of global changemakers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <Button variant="hero" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;