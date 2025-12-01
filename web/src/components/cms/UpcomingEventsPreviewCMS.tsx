import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { useUpcomingEvents } from "@/hooks/useSanityData";
import type { Event } from "@/lib/sanity";

function formatDateRange(startIso?: string, endIso?: string): string {
  if (!startIso) return "";
  const start = new Date(startIso);
  const end = endIso ? new Date(endIso) : undefined;
  const fmt = (d: Date) =>
    d.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
  if (!end) return fmt(start);
  // Same month/year → compact
  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    return `${start.toLocaleString(undefined, { month: "long" })} ${start.getDate()}–${end.getDate()}, ${end.getFullYear()}`;
  }
  return `${fmt(start)} – ${fmt(end)}`;
}

const UpcomingEventsPreviewCMS = () => {
  const { data, isLoading, error } = useUpcomingEvents();
  const events: Event[] = Array.isArray(data) ? data.slice(0, 3) : [];

  const getUrgencyBadge = (urgency?: string) => {
    switch (urgency) {
      case "high":
      case "immediate":
        return "bg-warm-orange/15 text-warm-orange";
      case "medium":
        return "bg-medical-teal/15 text-medical-teal";
      default:
        return "bg-trust-blue/10 text-trust-blue";
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
            Join us in our mission to provide life‑changing spinal surgery to children worldwide.
          </p>
        </div>

        {isLoading ? (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-6 bg-card shadow-soft h-full">
                <div className="h-6 w-48 bg-muted rounded mb-4 animate-pulse" />
                <div className="h-4 w-40 bg-muted rounded mb-2 animate-pulse" />
                <div className="h-4 w-32 bg-muted rounded mb-6 animate-pulse" />
                <div className="h-16 w-full bg-muted/60 rounded animate-pulse" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {events.map((evt, index) => (
              <Card key={index} className="p-6 bg-card shadow-soft hover:shadow-card hover:scale-105 transition-bounce border-l-4 border-l-trust-blue h-full">
                <div className="flex flex-col h-full">
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {evt.eventType && (
                      <Badge className="bg-trust-blue/10 text-trust-blue">{evt.eventType}</Badge>
                    )}
                    {evt.status && <Badge className={getUrgencyBadge(evt.urgency)}>{evt.status}</Badge>}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3">{evt.title}</h3>

                  {/* Meta */}
                  <div className="space-y-2 mb-4 text-text-gray">
                    {evt.startDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDateRange(evt.startDate, evt.endDate)}</span>
                      </div>
                    )}
                    {evt.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {evt.location.city ? `${evt.location.city}, ${evt.location.country}` : evt.location.country}
                        </span>
                      </div>
                    )}
                    {evt.capacity && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{evt.capacity}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {evt.description && (
                    <p className="text-text-gray leading-relaxed flex-grow line-clamp-3">{evt.description}</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {!error && (
          <div className="text-center">
            <Button variant="mission" size="lg" asChild>
              <Link to="/upcoming-events" className="flex items-center gap-2">
                View All Events <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEventsPreviewCMS;
