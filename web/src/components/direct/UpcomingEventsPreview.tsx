import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const UpcomingEventsPreview = () => {
  const featuredEvents = [
    {
      title: "Surgical Mission to Mumbai",
      date: "March 15-22, 2025",
      location: "Mumbai, India",
      type: "Surgical Mission",
      status: "Accepting Applications"
    },
    {
      title: "Training Workshop - Advanced Spine Techniques",
      date: "April 10-12, 2025",
      location: "Delhi, India",
      type: "Training Program",
      status: "Registration Open"
    },
    {
      title: "Medical Outreach - Rural Kerala",
      date: "May 8-15, 2025",
      location: "Kerala, India",
      type: "Outreach Program",
      status: "Volunteers Needed"
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
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="events" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Upcoming{" "}
            <span className="bg-gradient-action bg-clip-text text-transparent">
              Missions & Events
            </span>
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto">
            Join us in our mission to provide life-changing spinal surgery to children worldwide.
          </p>
        </div>

        {/* Featured Events Preview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featuredEvents.map((event, index) => (
            <Card key={index} className="p-6 bg-card shadow-soft hover:shadow-card hover:scale-105 transition-bounce h-full">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{event.title}</h3>
                  <p className="text-warm-orange font-medium text-sm mb-1">{event.date}</p>
                  <p className="text-sm text-text-gray">{event.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="mission" size="lg" asChild>
            <Link to="/upcoming-events" className="flex items-center gap-2">
              View All Events <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsPreview;