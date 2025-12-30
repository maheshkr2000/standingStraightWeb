import { useMemo, useState } from "react";
import { Navigation, Footer } from "@/components/shared";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, Mail } from "lucide-react";
import { useTeamMembers } from "@/hooks/useSanityData";
import { urlFor } from "@/lib/sanity";
import type { TeamMember as SanityTeamMember } from "@/lib/sanity";

type TeamMember = {
  name: string;
  title: string;
  email?: string;
  photo: string;
  photoAlt?: string;
  location: string;
  specialty: string;
  summary: string;
  bio: string;
  focusAreas?: string[];
};

// Public/static fallback data when CMS is unavailable
const fallbackMembers: TeamMember[] = [
  {
    name: "Ravi S. Bains, MD",
    title: "Chairman & CEO",
    email: "drbains@standingstraight.org",
    photo: "/team/1.png",
    summary:
      "Orthopedic spine surgeon leading global missions and mentoring future surgeons.",
    bio: "Dr. Ravi S. Bains is an Orthopedic Spine Surgeon who specializes in adult and pediatric spine deformities, degenerative conditions, tumors, infections, and trauma. He was born in London, England and then attended St Georges College in Mussoorie, India for 5 years. After completing his orthopedic residency at the University of Southern California and his spine surgery fellowship at University of California, Davis, he joined Kaiser Permanente's Spine Surgery Department in 2001. Currently, he serves as the Chief of Spine Surgery, where he has helped build a world class spine surgery program which involves training the next generation of spine surgeons. He has led several orthopedic medical missions in Central and South America to enable children to live normal and productive lives.",
    location: "California, USA",
    specialty: "Orthopedic Spine Surgery",
    focusAreas: ["Spine deformity", "Mission leadership", "Training"],
  },
  {
    name: "Gina S. Kedia",
    title: "Secretary",
    email: "gina@standingstraight.org",
    photo: "/team/2.png",
    summary:
      "Strategic planner and executive leader with 35+ years across healthcare and tech.",
    bio: "A founding member of Standing Straight, Gina brings more than 35 years of experience in strategic planning and executive leadership across major healthcare, human services, finance, and technology initiatives. Her career includes senior leadership roles with organizations such as NASA, Booz Allen, and MAXIMUS, where she served as Vice President, Managing Director, Chief Information Officer (CIO), and Chief Operating Officer (COO) for both domestic and international clients. Throughout her career, Gina has presided over national and international conferences and meetings, working closely with senior executives from private organizations as well as elected officials at the federal, state, and county levels.",
    location: "California, USA",
    specialty: "Strategic Planning & Executive Leadership",
    focusAreas: ["Governance", "Operations", "Partnerships"],
  },
  {
    name: "Kanwaljit S. Gill, MD",
    title: "Director",
    email: "",
    photo: "/team/3.png",
    summary:
      "Orthopaedic surgeon expanding global access to complex pediatric care.",
    bio: "Dr. Kanwaljit Singh Gill is an orthopaedic surgeon who was born in Punjab, India. He returned to Punjab for the first time after 53 years with Standing Straight. He was compelled to go back to India to perform free orthopaedic surgeries on children with a great need for specialized surgery. Dr. Gill grew up in the UK and obtained his medical degree from University of Nottingham, England. After graduation, he worked at the Nottingham University Hospital and has also taught medical students at Stanford Medical School and University of California San Francisco, USA. He graduated from his Orthopaedic residency at University of California San Francisco and has been practicing with The Permanente Medical Group since 1991. Dr. Gill continues to practice orthopaedic surgery and hold many educational and leadership positions at Kaiser Permanente.",
    location: "California, USA",
    specialty: "Orthopaedic Surgery",
    focusAreas: ["Pediatric care", "Surgical training", "Mission work"],
  },
  {
    name: "Sukhraj Bains",
    title: "President",
    email: "raj@standingstraight.org",
    photo: "/team/7.png",
    summary:
      "Founding member with 5+ years of database and project management experience; leads organizational operations.",
    bio: "A founding member of Standing Straight, Sukhraj Bains has over five years of database and project management experience. Currently a medical student at the Keck School of Medicine of USC, he has organized various community service and social networking projects for multiple non-profit companies and local city government. Bains has also volunteered in several pediatric orthopedic medical missions in Central America, serving as a Spanish Translator and physician assistant in pre-op and post-op care of patients.",
    location: "California, USA",
    specialty: "Operations & Mission Support",
    focusAreas: ["Project management", "Community outreach", "Mission logistics"],
  },
  {
    name: "Nirmal Singh, MSc, D.ABNM",
    title: "Mission Coordinator",
    email: "",
    photo: "/team/8.avif",
    summary:
      "Leads neurophysiology teams improving outcomes in complex spine and pediatric neurosurgery.",
    bio: "Nirmal Singh moved to the US in 2003 after completing his graduation from India and post graduation from Canada. With 10 years of experience in spinal cord and brain function monitoring he joined Kaiser Permanente in 2012. Currently he leads a team of neurophysiologists who helps improve surgical outcome of complex spine and pediatric Neurosurgery.",
    location: "California, USA",
    specialty: "Neurophysiology & Surgical Monitoring",
    focusAreas: ["Intraoperative monitoring", "Team leadership", "Surgical outcomes"],
  },
  {
    name: "Vikas Verma",
    title: "Advisor",
    email: "",
    photo: "/team/5.png",
    summary:
      "Entrepreneur and IT leader guiding outreach, infrastructure, and partnerships.",
    bio: "Vikas Verma migrated to US in 2004, following completion of the bachelor's in engineering and subsequently the post-graduation (MBA) from India. Vikas is not only an entrepreneur but also a successful IT professional, establishing a diverse career that spanned nearly two decades. Over the years, he took on various roles, from starting his own ventures to working with top-tier IT companies, demonstrating adaptability and leadership skills.",
    location: "California, USA",
    specialty: "IT Professional & Entrepreneur",
    focusAreas: ["Strategy", "Technology enablement"],
  },
];

const OurTeamPage = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const { data, isLoading, error } = useTeamMembers();

  const members: TeamMember[] = useMemo(() => {
    const cmsMembers = Array.isArray(data) ? data : [];

    if (!cmsMembers.length || error) {
      return fallbackMembers;
    }

    const toDisplayMember = (member: SanityTeamMember): TeamMember => {
      const location = [member.location?.city, member.location?.country]
        .filter(Boolean)
        .join(", ");
      const photoUrl =
        member.photo?.asset?._ref
          ? urlFor(member.photo).width(800).height(800).quality(80).url()
          : "/placeholder.svg";

      return {
        name: member.name,
        title: member.title,
        email: member.email || "",
        photo: photoUrl,
        photoAlt: member.photo?.alt || member.name,
        location: location || "Global",
        specialty: member.specialization || member.role || "Team Member",
        summary: member.bio || "",
        bio: member.bio || "",
        focusAreas: member.languages,
      };
    };

    return cmsMembers.map(toDisplayMember);
  }, [data, error]);

  const MemberCard = ({
    member,
    orientation = "grid",
  }: {
    member: TeamMember;
    orientation?: "grid" | "horizontal";
  }) => {
    const isHorizontal = orientation === "horizontal";

    return (
      <Card
        onClick={() => setSelectedMember(member)}
        className={`group relative overflow-hidden border border-slate-200 bg-white shadow-md cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-2xl ${
          isHorizontal
            ? "flex items-center gap-5 p-4 sm:p-5 text-left"
            : "p-5 sm:p-6 text-center"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-emerald-50 opacity-60" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-2 ring-sky-100" />

        <div
          className={`relative z-10 ${isHorizontal ? "flex items-center gap-5" : "flex flex-col items-center gap-4"}`}
        >
          <div
          className={`relative ${isHorizontal ? "" : "mx-auto"} w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-white shadow-lg`}
          >
            <img
              src={member.photo}
              alt={member.photoAlt || member.name}
              className="w-full h-full object-cover scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 ring-2 ring-sky-200/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className={`${isHorizontal ? "flex-1" : "space-y-1"}`}>
            <div className={`${isHorizontal ? "flex items-center gap-2" : ""}`}>
              <h3 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h3>
            </div>
            <p className="text-sm text-medical-teal font-medium">
              {member.title}
            </p>

            <div
              className={`flex items-center gap-1 text-sm text-gray-500 ${
                isHorizontal ? "" : "justify-center"
              }`}
            >
              <MapPin className="w-4 h-4" />
              {member.location}
            </div>

            <p className="hidden sm:block text-sm text-gray-600 mt-3 line-clamp-2">
              {member.summary}
            </p>

            <div
              className={`mt-3 flex flex-wrap gap-2 ${
                isHorizontal ? "" : "justify-center"
              }`}
            >
              <Badge className="bg-blue-50 text-blue-700 border border-blue-100">
                {member.specialty}
              </Badge>
             
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 bg-gradient-to-br from-[#0A1A2F] via-[#0F2644] to-[#143659]">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute w-56 h-56 bg-blue-500/20 rounded-full blur-[90px] top-6 left-8" />
            <div className="absolute w-64 h-64 bg-cyan-400/20 rounded-full blur-[120px] bottom-6 right-8" />
          </div>

          <div className="relative max-w-5xl mx-auto px-6 text-center">
            
            <h1 className="mt-3 text-3xl md:text-5xl font-bold text-white">
              Meet Our Team
            </h1>

            <p className="mt-4 text-white/85 text-base md:text-lg max-w-2xl mx-auto">
              Experts and mission-driven leaders creating lasting global impact.
            </p>

          </div>
        </section>

        {/* Board Members */}
        <section className="py-14 md:py-16">
          <div className="max-w-6xl lg:max-w-7xl mx-auto px-6">
            <div className="text-center mb-10 space-y-2">
              
              <h2 className="text-3xl font-bold">
                Board{" "}
                <span className="bg-gradient-action bg-clip-text text-transparent">
                  Members
                </span>
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Experienced leaders committed to transforming global orthopedic
                care through strategy, training, and hands-on missions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
              {isLoading && members === fallbackMembers ? (
                Array.from({ length: 6 }).map((_, idx) => (
                  <Card
                    key={idx}
                    className="w-full max-w-xs p-6 bg-white shadow-md border border-slate-200 rounded-2xl animate-pulse"
                  >
                    <div className="w-24 h-24 mx-auto rounded-full bg-slate-200 mb-4" />
                    <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto mb-2" />
                    <div className="h-3 bg-slate-200 rounded w-1/2 mx-auto mb-4" />
                    <div className="h-3 bg-slate-200 rounded w-full mb-2" />
                    <div className="h-3 bg-slate-200 rounded w-5/6 mx-auto" />
                  </Card>
                ))
              ) : (
                members.map((member) => <MemberCard key={member.name} member={member} />)
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-lg">
          {selectedMember && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMember.name}</DialogTitle>
              </DialogHeader>

              <div className="flex flex-col items-center text-center gap-3">
                <img
                  src={selectedMember.photo}
                  className="w-28 h-28 rounded-full object-cover border shadow"
                  alt={selectedMember.name}
                />

                <p className="text-medical-teal font-medium">{selectedMember.title}</p>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" /> {selectedMember.location}
                </div>

                {selectedMember.email && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Mail className="w-4 h-4" /> {selectedMember.email}
                  </div>
                )}

                <Badge className="bg-blue-50 text-blue-600 mt-2">
                  {selectedMember.specialty}
                </Badge>

                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedMember.focusAreas?.map((area) => (
                    <Badge
                      key={area}
                      variant="secondary"
                      className="bg-slate-50 text-slate-700 border border-slate-100"
                    >
                      {area}
                    </Badge>
                  ))}
                </div>

                <p className="text-gray-700 mt-4 text-sm leading-relaxed">
                  {selectedMember.bio}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default OurTeamPage;
