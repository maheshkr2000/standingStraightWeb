import { Navigation, Footer } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, Users, Award, Languages, Mail } from "lucide-react";
import { useTeamMembers } from "@/hooks/useSanityData";
import { urlFor } from "@/lib/sanity";
import type { TeamMember } from "@/lib/sanity";

const OurTeamPage = () => {
  const boardMembers = [
    {
      name: "Ravi S. Bains, MD",
      title: "Chairman & CEO",
      email: "drbains@standingstraight.org",
      description: "Dr. Ravi S. Bains is an Orthopedic Spine Surgeon who specializes in adult and pediatric spine deformities, degenerative conditions, tumors, infections, and trauma. He was born in London, England and then attended St Georges College in Mussoorie, India for 5 years. After completing his orthopedic residency at the University of Southern California and his spine surgery fellowship at University of California, Davis, he joined Kaiser Permanente's Spine Surgery Department in 2001. Currently, he serves as the Chief of Spine Surgery, where he has helped build a world class spine surgery program which involves training the next generation of spine surgeons. He has led several orthopedic medical missions in Central and South America to enable children to live normal and productive lives.",
      location: "California, USA",
      specialty: "Orthopedic Spine Surgery"
    },
    {
      name: "Gina S. Kedia",
      title: "Secretary",
      email: "gina@standingstraight.org",
      description: "A founding member of Standing Straight, Gina has over 25 years of experience in the strategic planning and executive roles for major healthcare, human services, finance, and technology projects at companies such as NASA, Booz-Allen, and MAXMUS. During these years, she served in many lead roles including chief information officer (CIO), chief operating officer (COO), & program director for domestics and international clients. She has also presided over national & international conferences/meetings with senior executives of private organizations as well as elected officials from the Federal, State and County government.",
      location: "California, USA",
      specialty: "Strategic Planning & Executive Leadership"
    },
    {
      name: "Kanwaljit S. Gill, MD",
      title: "Director",
      email: "",
      description: "Dr. Kanwaljit Singh Gill is an orthopaedic surgeon who was born in Punjab, India. He returned to Punjab for the first time after 53 years with Standing Straight. He was compelled to go back to India to perform free orthopaedic surgeries on children with a great need for specialized surgery. Dr. Gill grew up in the UK and obtained his medical degree from University of Nottingham, England. After graduation, he worked at the Nottingham University Hospital and has also taught medical students at Stanford Medical School and University of California San Francisco, USA. He graduated from his Orthopaedic residency at University of California San Francisco and has been practicing with The Permanente Medical Group since 1991. Dr. Gill continues to practice orthopaedic surgery and hold many educational and leadership positions at Kaiser Permanente.",
      location: "California, USA",
      specialty: "Orthopaedic Surgery"
    },
    {
      name: "Todd Lincoln, MD",
      title: "Director",
      email: "",
      description: "Dr. Lincoln specializes in scoliosis, pediatric orthopedics, and complex hip deformity. He has experience in treating the full range of musculoskeletal problems that can arise during infancy, childhood, and adolescence. He developed the hip preservation services specializing in complex hip reconstructions such as periacetabular osteotomy (PAO) surgery and surgical hip dislocation surgery for both adolescents and adults. Dr. Lincoln has volunteered his time each year to help children in Central and South America who lack adequate resources for their care.",
      location: "California, USA",
      specialty: "Pediatric Orthopedics & Scoliosis"
    },
    {
      name: "Doug Yim, MD",
      title: "Executive Advisor",
      email: "",
      description: "Dr. Yim is currently the director of Interventional Radiology Residency at John Hopkins. He was past chief Associate Clinical Professor of Interventional Radiology and Surgery at University of California, Irvine Medical Center. Along with active duty and other retired members services, he has served as the Chief of Interventional Radiologists at the National Naval Medical Center in Bethesda, Maryland, where he provided minimally invasive treatments to wounded warriors in Iraq and Afghanistan. He has also served as the Director of Interventional Radiology at Emory University where he taught and developed minimally invasive image guiding techniques to treat spine tumors in particular.",
      location: "Maryland, USA",
      specialty: "Interventional Radiology"
    },
    {
      name: "Sukhraj Bains",
      title: "President",
      email: "raj@standingstraight.org",
      description: "A founding member of Standing Straight, Sukhraj Bains has over five years of database and project management experience. Currently a medical student at the Keck School of Medicine of USC, he has organized various community service and social networking projects for multiple non-profit companies and local city government. Bains has also volunteered in several pediatric orthopedic medical missions in Central America, serving as a Spanish Translator and physician assistant in pre-op and post-op care of patients.",
      location: "California, USA",
      specialty: "Medical Student & Project Management"
    }
  ];

  const advisors = [
    {
      name: "Vikas Verma",
      title: "Advisor",
      email: "",
      description: "Vikas Verma migrated to US in 2004, following completion of the bachelor's in engineering and subsequently the post-graduation (MBA) from India. Vikas is not only an entrepreneur but also a successful IT professional, establishing a diverse career that spanned nearly two decades. Over the years, he took on various roles, from starting his own ventures to working with top-tier IT companies, demonstrating adaptability and leadership skills.",
      location: "California, USA",
      specialty: "IT Professional & Entrepreneur"
    },
    {
      name: "Nirmal Singh, MSc, D.ABNM",
      title: "Mission Coordinator",
      email: "",
      description: "Nirmal Singh moved to US in 2003 after completing his graduation from India and post graduation from Canada. With 10 years of experience in spinal cord and brain function monitoring he joined Kaiser Permanente in 2012. Currently he leads a team of neurophysiologists who helps improve surgical outcome of complex spine and pediatric Neurosurgery.",
      location: "California, USA",
      specialty: "Neurophysiology & Mission Coordination"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Team
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We provide world-class orthopedic care to children from impoverished families in developing countries.
            </p>
          </div>
        </section>

        {/* Board Members */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Board{" "}
                <span className="bg-gradient-action bg-clip-text text-transparent">
                  Members
                </span>
              </h2>
              <p className="text-lg text-text-gray max-w-3xl mx-auto">
                Our leadership team brings together decades of medical expertise, 
                strategic planning, and humanitarian experience to drive our mission forward.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {boardMembers.map((member, index) => (
                <Card key={index} className="p-8 bg-card shadow-soft hover:shadow-card transition-smooth">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-primary-foreground">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-2">{member.name}</h3>
                      <p className="text-medical-teal font-medium mb-2">{member.title}</p>
                      <div className="flex items-center gap-4 text-sm text-text-gray">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{member.location}</span>
                        </div>
                        {member.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            <span>{member.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Badge className="bg-trust-blue/10 text-trust-blue mb-4">
                    {member.specialty}
                  </Badge>
                  
                  <p className="text-text-gray leading-relaxed">
                    {member.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Advisors */}
        <section className="py-20 bg-soft-gray">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our{" "}
                <span className="bg-gradient-action bg-clip-text text-transparent">
                  Advisors
                </span>
              </h2>
              <p className="text-lg text-text-gray max-w-3xl mx-auto">
                Supporting our mission with specialized expertise and guidance.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {advisors.map((advisor, index) => (
                <Card key={index} className="p-8 bg-card shadow-soft hover:shadow-card transition-smooth">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-20 h-20 bg-gradient-action rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-primary-foreground">
                        {advisor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-2">{advisor.name}</h3>
                      <p className="text-medical-teal font-medium mb-2">{advisor.title}</p>
                      <div className="flex items-center gap-4 text-sm text-text-gray">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{advisor.location}</span>
                        </div>
                        {advisor.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            <span>{advisor.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Badge className="bg-warm-orange/10 text-warm-orange mb-4">
                    {advisor.specialty}
                  </Badge>
                  
                  <p className="text-text-gray leading-relaxed">
                    {advisor.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-action">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Join Our Team</h2>
            <p className="text-white/90 text-lg mb-8">
              Whether you're a medical professional, passionate volunteer, or someone who believes 
              every child deserves quality healthcare—there's a place for you in our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/volunteers" className="bg-white text-trust-blue px-8 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors">
                Volunteer With Us
              </a>
              <a href="/donate" className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-trust-blue transition-colors">
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

export default OurTeamPage;