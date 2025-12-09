import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Navigation, Footer } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

const UpcomingEventsPage = () => {
  const upcomingEvents = [
    {
      title: "Surgical Mission to Mumbai",
      date: "March 15-22, 2026",
      location: "King Edward Memorial Hospital, Mumbai, India",
      type: "Surgical Mission",
      description: "Comprehensive spinal surgery mission focusing on pediatric cases. We'll be providing surgeries for 25+ children with various spinal conditions.",
      team: "8 surgeons, 12 nurses, 4 anesthesiologists",
      status: "Accepting Applications",
      requirements: ["Medical license", "Pediatric experience", "International mission experience preferred"]
    },
    {
      title: "Training Workshop - Advanced Spine Techniques",
      date: "April 10-12, 2026",
      location: "All India Institute of Medical Sciences, Delhi",
      type: "Training Program",
      description: "Intensive 3-day workshop for local surgeons on advanced pediatric spine surgery techniques and post-operative care.",
      team: "4 lead surgeons, 6 local participants",
      status: "Registration Open",
      requirements: ["Orthopedic surgery specialization", "Minimum 2 years experience", "Hospital affiliation"]
    },
    {
      title: "Medical Outreach - Rural Kerala",
      date: "May 8-15, 2026",
      location: "Government Medical College, Thiruvananthapuram",
      type: "Outreach Program",
      description: "Community outreach program providing free screenings and consultations for spinal conditions in rural areas.",
      team: "6 medical professionals, 8 volunteers",
      status: "Volunteers Needed",
      requirements: ["Medical background preferred", "Willingness to travel", "Basic Malayalam helpful"]
    },
    {
      title: "International Conference Participation",
      date: "June 5-7, 2026",
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

  const pastEvents = [
    {
      title: "Mission to Kathmandu",
      date: "December 2-8, 2024",
      location: "Bir Hospital, Kathmandu, Nepal",
      type: "Surgical Mission",
      highlights: "28 pediatric spinal surgeries, 12 local surgeons trained"
    },
    {
      title: "Spine Care Workshop - Nairobi",
      date: "October 14-16, 2024",
      location: "Kenyatta National Hospital, Nairobi",
      type: "Training Program",
      highlights: "40+ clinicians trained on advanced scoliosis management"
    },
    {
      title: "Community Outreach - Guatemala",
      date: "August 5-9, 2024",
      location: "Hospital Nacional De Antigua, Guatemala",
      type: "Outreach Program",
      highlights: "350 screenings, 90 patients enrolled for follow-up care"
    }
  ];

  const roleOptions = ["Orthopedic Spine Surgeons", "Operating Room Spine Techs", "Operating Room Spine Nurses", "Neuro Physiologist"];

  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: roleOptions[0],
    location: ""
  });
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllPast, setShowAllPast] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const parseStartDate = (dateStr: string) => {
    const parts = dateStr.split(",");
    if (parts.length < 2) return null;
    const yearPart = parts[1].trim();
    const rangePart = parts[0].trim();
    const startSegment = rangePart.includes("-") ? rangePart.split("-")[0].trim() : rangePart;
    const normalized = `${startSegment}, ${yearPart}`;
    const date = new Date(normalized);
    return isNaN(date.getTime()) ? null : date;
  };

  const filteredUpcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return upcomingEvents.filter((event) => {
      const startDate = parseStartDate(event.date);
      if (!startDate) return false;
      return startDate >= today;
    });
  }, [upcomingEvents]);

  const renderedUpcomingEvents = useMemo(() => {
    if (filteredUpcomingEvents.length <= 1) {
      return filteredUpcomingEvents;
    }
    const first = filteredUpcomingEvents[0];
    const last = filteredUpcomingEvents[filteredUpcomingEvents.length - 1];
    return [last, ...filteredUpcomingEvents, first];
  }, [filteredUpcomingEvents]);

  const goToSlide = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const container = scrollRef.current;
      if (!container || filteredUpcomingEvents.length === 0) return;

      const total = filteredUpcomingEvents.length;
      const normalizedIndex = (index + total) % total;
      setCurrentSlide(normalizedIndex);

      let slide: HTMLElement | null = null;
      if (total > 1) {
        const renderIndex = normalizedIndex + 1;
        slide = container.querySelector<HTMLElement>(
          `[data-render-index="${renderIndex}"]`
        );
      } else {
        slide = container.querySelector<HTMLElement>(
          `[data-render-index="0"]`
        );
      }
      if (!slide) return;

      const containerWidth = container.clientWidth;
      const slideWidth = slide.clientWidth;
      const scrollLeft = slide.offsetLeft - (containerWidth - slideWidth) / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior
      });
    },
    [filteredUpcomingEvents.length]
  );

  useEffect(() => {
    if (filteredUpcomingEvents.length === 0) return;

    const interval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSlide, goToSlide, filteredUpcomingEvents.length]);

  const openApplication = (eventTitle: string) => {
    setSelectedEvent(eventTitle);
    setIsApplyOpen(true);
  };

  const closeApplication = () => {
    setIsApplyOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: roleOptions[0],
      location: ""
    });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = [
      `Event: ${selectedEvent ?? "StandingStraight Event"}`,
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Role: ${formData.role}`,
      `Location: ${formData.location}`
    ].join("\n");

    window.location.href = `mailto:missions@standingstraight.org?subject=${encodeURIComponent(
      `Application - ${selectedEvent ?? "StandingStraight"}`
    )}&body=${encodeURIComponent(body)}`;

    closeApplication();
  };

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
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-5xl font-bold">
                Upcoming{" "}
                <span className="bg-gradient-action bg-clip-text text-transparent">
                  Missions & Events
                </span>
              </h1>
            </div>

            {filteredUpcomingEvents.length > 0 ? (
              <div className="relative">
                <div ref={scrollRef} className="overflow-hidden rounded-3xl">
                  <div className="flex gap-6 px-4 md:px-10 py-4">
                    {renderedUpcomingEvents.map((event, index) => {
                      const hasLoop = filteredUpcomingEvents.length > 1;
                      const logicalIndex = hasLoop
                        ? (index - 1 + filteredUpcomingEvents.length) %
                          filteredUpcomingEvents.length
                        : index;
                      const renderIndex = hasLoop ? index : logicalIndex;
                      return (
                      <div
                        key={`${event.title}-slide-${index}-${logicalIndex}`}
                        data-render-index={renderIndex}
                        className={`shrink-0 w-[88%] md:w-[68%] transition-transform duration-500 ${
                          logicalIndex === currentSlide
                            ? "scale-100 opacity-100"
                            : "scale-90 opacity-50"
                        }`}
                      >
                        <Card className="relative w-full min-h-full p-0 bg-white border border-border/60 border-l-4 border-warm-orange rounded-3xl shadow-[0_16px_48px_rgba(15,23,42,0.05)] overflow-hidden flex flex-col">
                          <div className="flex flex-col md:flex-row flex-1">
                            {/* Left column - title, date, location, CTA */}
                            <div className="md:w-[36%] border-b md:border-b-0 md:border-r border-border/40 px-4 py-3 md:px-6 md:py-4 flex flex-col gap-3">
                              <div className="space-y-1.5">
                                <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-snug">
                                  {event.title}
                                </h3>
                              </div>

                              <div className="space-y-2.5">
                                <div className="rounded-2xl border border-border/30 bg-gradient-to-r from-warm-orange/5 via-white to-warm-orange/10 px-4 py-2.5 flex items-center gap-3">
                                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-warm-orange/10 text-warm-orange">
                                    <Calendar className="w-4 h-4" />
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-warm-orange">
                                      Date
                                    </p>
                                    <p className="text-sm font-medium text-foreground">{event.date}</p>
                                  </div>
                                </div>

                                <div className="rounded-2xl border border-border/30 bg-gradient-to-r from-trust-blue/5 via-white to-trust-blue/10 px-4 py-2.5 flex items-center gap-3">
                                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-trust-blue/10 text-trust-blue">
                                    <MapPin className="w-4 h-4" />
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-trust-blue">
                                      Location
                                    </p>
                                    <p className="text-sm font-medium text-foreground">
                                      {event.location}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {(event.status === "Accepting Applications" ||
                                event.status === "Registration Open" ||
                                event.status === "Volunteers Needed") && (
                                <div className="pt-0.5">
                                  <Button
                                    variant="outline"
                                    className="w-full md:w-auto md:px-10 rounded-full tracking-[0.2em] uppercase text-[11px] border-0 bg-warm-orange text-white shadow-[0_12px_30px_rgba(249,115,22,0.45)] hover:bg-warm-orange/90 hover:translate-y-[1px] transition-all"
                                    onClick={() => openApplication(event.title)}
                                  >
                                    Apply Now
                                  </Button>
                                </div>
                              )}
                            </div>

                            {/* Right column - overview, team, requirements */}
                            <div className="md:w-[62%] bg-soft-gray/40 px-5 pt-11 pb-4 md:px-7 md:pt-14 md:pb-6 flex flex-col gap-4 relative">
                              <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end">
                                <Badge className="rounded-full bg-purple-100 text-purple-700 px-4 py-1 text-[11px] font-semibold tracking-[0.2em] uppercase">
                                  {event.type}
                                </Badge>
                                <Badge
                                  className={`rounded-full px-4 py-1 text-[11px] font-semibold tracking-[0.2em] uppercase ${
                                    event.status === "Accepting Applications"
                                      ? "bg-green-100 text-green-700"
                                      : event.status === "Registration Open"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-soft-gray text-text-gray"
                                  }`}
                                >
                                  {event.status}
                                </Badge>
                              </div>
                              <div className="rounded-2xl bg-white border border-border/40 px-5 py-3.5 md:px-6 md:py-4">
                                <div className="flex items-center gap-3 mb-1.5">
                                  <span className="h-6 w-1 rounded-full bg-warm-orange" />
                                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-warm-orange">
                                    Mission Overview
                                  </p>
                                </div>
                                <p className="text-sm text-text-gray leading-snug">
                                  {event.description}
                                </p>
                              </div>

                              <div className="mt-4 ml-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div className="space-y-2 md:w-1/2">
                                  <div className="flex items-center gap-2">
                                    <span className="h-5 w-[3px] rounded-full bg-warm-orange" />
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-warm-orange">
                                      Team Composition
                                    </p>
                                  </div>
                                  <ul className="list-disc list-outside pl-5 text-sm text-foreground space-y-1">
                                    {event.team.split(",").map((part, idx) => (
                                      <li key={idx}>{part.trim()}</li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="space-y-2 md:w-1/2">
                                  <div className="flex items-center gap-2">
                                    <span className="h-5 w-[3px] rounded-full bg-warm-orange" />
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-warm-orange">
                                      Requirements
                                    </p>
                                  </div>
                                  <ul className="list-disc list-outside pl-5 text-sm text-text-gray space-y-1">
                                    {event.requirements.map((req, reqIndex) => (
                                      <li key={reqIndex}>{req}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <button
                    className="flex items-center gap-1 text-sm font-medium text-text-gray hover:text-foreground transition-colors"
                    onClick={() => goToSlide(currentSlide - 1)}
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <div className="flex items-center justify-center gap-2">
                    {filteredUpcomingEvents.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          index === currentSlide ? "bg-trust-blue" : "bg-border"
                        }`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    className="flex items-center gap-1 text-sm font-medium text-text-gray hover:text-foreground transition-colors"
                    onClick={() => goToSlide(currentSlide + 1)}
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-dashed border-border rounded-3xl py-12 px-6 text-center text-text-gray">
                No upcoming events at the moment. Please check back soon.
              </div>
            )}

            {filteredUpcomingEvents.length > 0 && (
            <div className="text-center mb-12 mt-10">
              <Button variant="outline" onClick={() => setShowAllUpcoming((prev) => !prev)}>
                {showAllUpcoming ? "Hide Full Event List" : "Show All Upcoming Events"}
              </Button>
            </div>
            )}

            {showAllUpcoming && filteredUpcomingEvents.length > 0 && (
              <div className="grid lg:grid-cols-2 gap-8 mb-16">
                {filteredUpcomingEvents.map((event, index) => (
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
                          <Button variant="mission" className="w-full" onClick={() => openApplication(event.title)}>
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
            )}

            {/* Past Events */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Past Events</h2>
                  <p className="text-text-gray">Highlights from recent missions and programs.</p>
                </div>
                <Badge className="bg-soft-gray text-text-gray">
                  {pastEvents.length} Completed
                </Badge>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {(showAllPast ? pastEvents : pastEvents.slice(0, 3)).map((event, index) => (
                  <Card key={index} className="p-6 bg-gradient-subtle border border-border/60">
                    <div className="flex flex-col gap-3">
                      <div>
                        <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{event.title}</h3>
                      <p className="text-sm text-text-gray">{event.date}</p>
                      <p className="text-sm text-text-gray flex items-center gap-2">
                        {event.location}
                      </p>
                      <div className="p-4 rounded-xl bg-white shadow-inner border border-white/60">
                        <p className="text-sm text-text-gray">{event.highlights}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {pastEvents.length > 3 && (
                <div className="text-center mt-8">
                  <Button variant="outline" onClick={() => setShowAllPast((prev) => !prev)}>
                    {showAllPast ? "Hide Past Events" : "Show All Past Events"}
                  </Button>
                </div>
              )}
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

      <Dialog open={isApplyOpen} onOpenChange={(open) => (open ? setIsApplyOpen(true) : closeApplication())}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Apply for {selectedEvent}</DialogTitle>
            <DialogDescription>
              Submit your interest and our coordination team will get back to refine details.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 555 123 4567"
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                required
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, Country"
              />
            </div>

            <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={closeApplication}>
                Cancel
              </Button>
              <Button type="submit" variant="mission">
                Submit Application
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpcomingEventsPage;
