import { Navigation, Footer } from "@/components/shared";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const VolunteersPage = () => {
  const volunteerOpportunities = [
    {
      title: "Surgical Mission Volunteer",
      commitment: "7-14 days",
      location: "India, Mexico, Bangladesh",
      description: "Join our surgical missions as a medical professional or support staff. Assist with surgeries, patient care, and post-operative support.",
      requirements: ["Medical license (for medical roles)", "Physical fitness", "Flexibility", "Cultural sensitivity"],
      roles: ["Surgeons", "Anesthesiologists", "Nurses", "Physical Therapists", "Medical Students"],
      impact: "Directly transform lives through surgery",
      type: "Medical"
    },
    {
      title: "Training Program Facilitator",
      commitment: "3-5 days",
      location: "Major medical centers globally",
      description: "Help facilitate training workshops for local medical professionals, sharing expertise and building local capacity.",
      requirements: ["Medical expertise", "Teaching experience", "Presentation skills", "Cultural adaptability"],
      roles: ["Senior Surgeons", "Medical Educators", "Curriculum Developers", "Clinical Coordinators"],
      impact: "Build sustainable local healthcare capacity",
      type: "Education"
    },
    {
      title: "Community Outreach Coordinator",
      commitment: "5-10 days",
      location: "Rural areas in partner countries",
      description: "Organize and lead community health screenings, identify patients needing surgery, and coordinate referrals.",
      requirements: ["Public health background", "Community engagement skills", "Local language helpful", "Travel flexibility"],
      roles: ["Public Health Specialists", "Social Workers", "Community Health Workers", "Medical Students"],
      impact: "Identify and reach children who need help",
      type: "Outreach"
    },
    {
      title: "Technology & Innovation Support",
      commitment: "Remote + periodic travel",
      location: "Remote with occasional missions",
      description: "Support our telemedicine initiatives, develop healthcare technology solutions, and maintain medical equipment.",
      requirements: ["Technical expertise", "Healthcare technology experience", "Problem-solving skills", "Remote work capability"],
      roles: ["Software Developers", "Biomedical Engineers", "IT Specialists", "Telemedicine Coordinators"],
      impact: "Scale our reach through technology",
      type: "Technology"
    },
    {
      title: "Fundraising & Development",
      commitment: "Ongoing - flexible",
      location: "Home country + events",
      description: "Help raise funds for our missions, organize events, and build partnerships with donors and sponsors.",
      requirements: ["Sales/marketing experience", "Event planning skills", "Strong communication", "Passion for the cause"],
      roles: ["Event Coordinators", "Grant Writers", "Corporate Partnership Managers", "Social Media Managers"],
      impact: "Secure funding for life-changing surgeries",
      type: "Development"
    },
    {
      title: "Administrative & Logistics Support",
      commitment: "Ongoing - part time",
      location: "Remote or local offices",
      description: "Support mission planning, coordinate logistics, manage volunteer applications, and assist with administrative tasks.",
      requirements: ["Organizational skills", "Attention to detail", "Project management experience", "Multi-tasking ability"],
      roles: ["Project Coordinators", "Administrative Assistants", "Logistics Specialists", "Volunteer Coordinators"],
      impact: "Ensure smooth operations for all missions",
      type: "Operations"
    },
    {
      title: "Translation & Interpretation",
      commitment: "Flexible - as needed",
      location: "Mission sites or remote",
      description: "Provide translation services during missions and help translate medical materials and educational content.",
      requirements: ["Fluency in mission languages", "Medical terminology knowledge preferred", "Cultural competency", "Professional translation experience"],
      roles: ["Medical Interpreters", "Document Translators", "Cultural Liaisons", "Communication Facilitators"],
      impact: "Bridge language barriers for patient care",
      type: "Language"
    },
    {
      title: "Youth Ambassador Program",
      commitment: "Ongoing - flexible",
      location: "Schools and communities",
      description: "Young leaders who help raise awareness, organize fundraisers, and engage their communities in our mission.",
      requirements: ["Age 16-25", "Leadership experience", "Social media savvy", "Public speaking skills", "Passion for global health"],
      roles: ["Student Leaders", "Social Media Ambassadors", "Peer Educators", "Community Organizers"],
      impact: "Inspire the next generation of global health advocates",
      type: "Advocacy"
    }
  ];

  const volunteerTestimonials = [
    {
      name: "Dr. Emily Chen",
      role: "Orthopedic Surgeon",
      missions: "5 missions to India",
      quote: "Working with StandingStraight has been the most rewarding experience of my career. Seeing a child stand straight for the first time is indescribable.",
      location: "San Francisco, USA"
    },
    {
      name: "Maria Santos",
      role: "Pediatric Nurse",
      missions: "3 missions to Mexico and India", 
      quote: "The teamwork and dedication here is incredible. We're not just treating patients - we're transforming entire families and communities.",
      location: "Austin, USA"
    },
    {
      name: "Ahmed Hassan",
      role: "Physical Therapist",
      missions: "4 missions across 3 countries",
      quote: "Every mission teaches me something new. The resilience of these children and their families is truly inspiring.",
      location: "Toronto, Canada"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Medical":
        return "bg-trust-blue/10 text-trust-blue";
      case "Education":
        return "bg-medical-teal/10 text-medical-teal";
      case "Outreach":
        return "bg-warm-orange/10 text-warm-orange";
      case "Technology":
        return "bg-purple-100 text-purple-800";
      case "Development":
        return "bg-green-100 text-green-800";
      case "Operations":
        return "bg-blue-100 text-blue-800";
      case "Language":
        return "bg-pink-100 text-pink-800";
      case "Advocacy":
        return "bg-yellow-100 text-yellow-800";
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
                Volunteer{" "}
                <span className="bg-gradient-action bg-clip-text text-transparent">
                  Opportunities
                </span>
              </h1>
              <p className="text-xl text-text-gray max-w-3xl mx-auto">
                Join our global community of volunteers making a real difference in children's lives. 
                Whether you're a medical professional or passionate advocate, we have a place for you.
              </p>
            </div>

            {/* Volunteer Opportunity Cards */}
            <div className="grid lg:grid-cols-2 gap-8 mb-20">
              {volunteerOpportunities.map((opportunity, index) => (
                <Card key={index} className="p-6 bg-card shadow-soft hover:shadow-card transition-bounce h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={getTypeColor(opportunity.type)}>
                          {opportunity.type}
                        </Badge>
                        <span className="text-sm text-text-gray">{opportunity.commitment}</span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{opportunity.title}</h3>
                      <p className="text-sm text-warm-orange font-medium mb-3">{opportunity.location}</p>
                    </div>
                    
                    <p className="text-text-gray leading-relaxed mb-4">
                      {opportunity.description}
                    </p>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-foreground mb-2">Roles Available:</p>
                      <div className="flex flex-wrap gap-1">
                        {opportunity.roles.map((role, roleIndex) => (
                          <span key={roleIndex} className="text-xs bg-soft-gray text-text-gray px-2 py-1 rounded">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-foreground mb-2">Requirements:</p>
                      <ul className="text-sm text-text-gray space-y-1">
                        {opportunity.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-trust-blue rounded-full mr-2 flex-shrink-0"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-sm font-medium text-medical-teal">Impact: {opportunity.impact}</p>
                    </div>
                    
                    <div className="mt-auto">
                      <Button variant="mission" className="w-full">
                        Apply for This Role
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Volunteer Testimonials */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12">Hear from Our Volunteers</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {volunteerTestimonials.map((testimonial, index) => (
                  <Card key={index} className="p-6 bg-soft-gray border-l-4 border-l-trust-blue">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-lg font-bold text-primary-foreground">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <h4 className="font-bold text-foreground text-center">{testimonial.name}</h4>
                      <p className="text-sm text-medical-teal text-center">{testimonial.role}</p>
                      <p className="text-xs text-text-gray text-center">{testimonial.location}</p>
                      <p className="text-xs text-warm-orange text-center font-medium">{testimonial.missions}</p>
                    </div>
                    <blockquote className="text-text-gray italic text-center">
                      "{testimonial.quote}"
                    </blockquote>
                  </Card>
                ))}
              </div>
            </div>

            {/* Application Process */}
            <div className="bg-card rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">Application Process</h2>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-trust-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Apply</h3>
                  <p className="text-sm text-text-gray">Submit your application with relevant experience and availability</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-medical-teal rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Interview</h3>
                  <p className="text-sm text-text-gray">Virtual interview to discuss your skills and mission alignment</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-warm-orange rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Training</h3>
                  <p className="text-sm text-text-gray">Complete orientation and role-specific training programs</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-action rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Deploy</h3>
                  <p className="text-sm text-text-gray">Join your first mission and start making a difference</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-action rounded-2xl p-8 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">Ready to Change Lives?</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Join thousands of volunteers who have already made a difference. 
                Your skills and passion can help transform a child's future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  Start Your Application
                </Button>
                <Button variant="hero" size="lg">
                  Learn More About Volunteering
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

export default VolunteersPage;