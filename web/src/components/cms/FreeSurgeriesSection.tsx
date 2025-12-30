import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  ShieldCheck,
  Activity,
  Stethoscope,
  HeartHandshake,
  GraduationCap,
  Heart,
  Crosshair,
  Users,
  Plane,
  Sparkles,
  TrendingUp,
  HeartPulse,
} from "lucide-react";

const FreeSurgeriesSection = () => {
  const existRef = useRef<HTMLDivElement | null>(null);
  const whatWeDoRef = useRef<HTMLDivElement | null>(null);
  const whatItTakesRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<"exist" | "do" | "takes">("exist");

  const sections = useMemo(
    () => [
      {
        id: "exist",
        label: "Why We Exist",
        title: "Hope for Every Child",
        sub: "Turning pain into possibility for children who deserve a future without limits.",
        ref: existRef,
      },
      {
        id: "do",
        label: "What We Do",
        title: "Free Life-Changing Surgeries",
        sub: "Free life-changing spinal surgeries with full wraparound care.",
        ref: whatWeDoRef,
      },
      {
        id: "takes",
        label: "What It Takes",
        title: "Courage, Compassion, Commitment",
        sub: "The people, sacrifice, and preparation that make missions possible.",
        ref: whatItTakesRef,
      },
    ],
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "why-we-exist") setActive("exist");
            if (entry.target.id === "what-we-do") setActive("do");
            if (entry.target.id === "what-it-takes") setActive("takes");
          }
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -40% 0px" }
    );

    const nodes = [existRef.current, whatWeDoRef.current, whatItTakesRef.current].filter(Boolean) as HTMLElement[];
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-[320px_1fr] gap-12 lg:gap-16 items-start">

          {/* Divider line on large screens */}
          <div className="hidden lg:block absolute left-[340px] top-0 bottom-0 border-l border-slate-200/60 pointer-events-none" aria-hidden />

          {/* Sticky Navigation Sidebar (Desktop) */}
          <aside className="hidden lg:flex sticky top-24 self-start flex-col gap-5 w-[320px]">
            {sections.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => item.ref.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                  className={`group relative text-left rounded-2xl px-6 py-5 border transition-all duration-500 ease-out overflow-hidden ${isActive
                      ? "bg-white border-medical-teal/60 shadow-[0_8px_30px_rgba(0,128,128,0.12)] -translate-y-1"
                      : "bg-white/50 border-transparent hover:bg-white hover:border-slate-200 hover:shadow-lg hover:-translate-y-0.5"
                    }`}
                >
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="mt-1.5 flex flex-col items-center gap-1">
                      <span
                        className={`h-3 w-3 rounded-full transition-colors duration-500 ${isActive ? "bg-medical-teal shadow-[0_0_10px_rgba(0,128,128,0.4)]" : "bg-slate-300 group-hover:bg-slate-400"
                          }`}
                      />
                      {isActive && <div className="w-0.5 h-full min-h-[40px] bg-gradient-to-b from-medical-teal/50 to-transparent rounded-full" />}
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <p className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${isActive ? "text-medical-teal" : "text-slate-500 group-hover:text-medical-teal/70"
                        }`}>
                        {item.label}
                      </p>
                      <h3 className={`text-lg font-bold leading-tight transition-colors duration-300 ${isActive ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"
                        }`}>
                        {item.title}
                      </h3>
                      <p className={`text-sm leading-relaxed transition-colors duration-300 ${isActive ? "text-slate-600" : "text-slate-400 group-hover:text-slate-500"
                        }`}>
                        {item.sub}
                      </p>
                    </div>
                  </div>

                  {/* Subtle active background gradient */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-medical-teal/5 to-transparent opacity-100 transition-opacity duration-500" />
                  )}
                </button>
              );
            })}
          </aside>

          {/* Main Content Area (hidden on mobile to show only left stack) */}
          <div className="hidden lg:block space-y-20 md:space-y-24 w-full">

            {/* 1. Why We Exist */}
            <article id="why-we-exist" ref={existRef} className="scroll-mt-28 space-y-10">
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-[0.18em] text-medical-teal uppercase">Why We Exist</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                  For Many Children, Standing Up Straight Is Only a Dream
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl">
                  A child with a spinal deformity often grows up in pain, isolation, and with limited opportunities.
                  Families who can barely afford daily sustenance are unable to pay for specialized spinal surgery.
                  We believe no child's future should be limited by a treatable condition.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Sparkles,
                    title: "Turning Pain Into Possibility",
                    desc: "Without surgery, spinal deformities worsen leading to chronic pain and isolation. We provide free, life-changing care to underprivileged children—at no cost to their families.",
                    sub: "Just compassionate care, love and hope."
                  },
                  {
                    icon: TrendingUp,
                    title: "Real Impact. Real Lives.",
                    desc: "More than 150 children have received free spinal surgeries—standing tall, returning to school, and imagining futures filled with possibility.",
                    stats: true
                  }
                ].map((card, i) => (
                  <Card key={i} className="group relative bg-white border border-transparent rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-medical-teal/10 text-medical-teal transition-transform duration-500 group-hover:rotate-6">
                        <card.icon className="w-6 h-6" />
                      </span>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-medical-teal transition-colors">{card.title}</h4>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          {card.desc}
                        </p>
                        {card.sub && (
                          <p className="text-sm font-semibold text-medical-teal flex items-center gap-2">
                            <Heart className="w-4 h-4 fill-current" /> {card.sub}
                          </p>
                        )}
                        {card.stats && (
                          <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-slate-100">
                            {[
                              { val: "150+", label: "Helped" },
                              { val: "100%", label: "Free" },
                              { val: "Dreams", label: "Unlocked" }
                            ].map((s, idx) => (
                              <div key={idx} className="text-center">
                                <div className="text-xl font-bold text-slate-900">{s.val}</div>
                                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{s.label}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 p-8 md:p-12 shadow-2xl">
                <div className="relative z-10 flex flex-col items-center text-center">
                  <p className="text-2xl md:text-3xl font-serif italic text-white mb-4">
                    "Where deformed spines meet optimistic futures."
                  </p>
                  <div className="flex items-center gap-2 text-emerald-200 text-sm font-semibold tracking-widest uppercase">
                    <div className="h-px w-8 bg-emerald-200/50" />
                    Our Mission
                    <div className="h-px w-8 bg-emerald-200/50" />
                  </div>
                </div>
                <div className='absolute top-0 left-0 w-full h-full opacity-10 bg-[url("https://www.transparenttextures.com/patterns/cubes.png")] bg-repeat' />
              </div>
            </article>

            {/* 2. What We Do */}
            <article id="what-we-do" ref={whatWeDoRef} className="scroll-mt-28 space-y-8">
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-[0.18em] text-medical-teal uppercase">What We Do</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">Free Life-Changing Surgeries</h2>
                <p className="text-lg text-slate-600 max-w-3xl">
                  We provide completely free spinal surgeries to underprivileged children who would otherwise go without care.
                  Standing Straight removes the barrier of cost entirely.
                </p>
              </div>

              <div className="grid md:grid-cols-[1.1fr_1fr] gap-8">
                <Card className="h-full bg-white border-0 shadow-[0_20px_60px_rgba(0,0,0,0.04)] rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                      <ShieldCheck className="w-7 h-7" />
                    </span>
                    <h4 className="text-2xl font-bold text-slate-900">100% Free Surgeries</h4>
                  </div>

                  <ul className="space-y-4">
                    {[
                      { icon: Activity, text: "Medical evaluations & surgical planning" },
                      { icon: Stethoscope, text: "Complex spinal corrective surgeries" },
                      { icon: HeartHandshake, text: "Post-operative care & recovery" }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 transition-colors hover:bg-emerald-50/50 group">
                        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-slate-700">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <div className="flex flex-col gap-6">
                  <Card className="flex-1 bg-gradient-to-br from-white to-slate-50 border-0 shadow-[0_20px_60px_rgba(0,0,0,0.04)] rounded-3xl p-8">
                    <h4 className="text-xl font-bold flex items-center gap-3 mb-6">
                      <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
                      More Than Medical Care
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { icon: Activity, label: "Pain Free" },
                        { icon: GraduationCap, label: "Back to School" },
                        { icon: Heart, label: "Dream Freely" },
                        { icon: Crosshair, label: "Stand Tall" },
                      ].map((tag, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white shadow-sm border border-slate-100 transition-all hover:border-emerald-200 hover:shadow-md">
                          <tag.icon className="w-5 h-5 text-emerald-600" />
                          <span className="font-semibold text-slate-700 text-sm">{tag.label}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <div className="rounded-3xl bg-slate-900 text-white p-8 shadow-2xl flex items-center gap-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10" />
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm flex-shrink-0">
                      <Users className="w-6 h-6" />
                    </span>
                    <div className="relative z-10">
                      <p className="font-serif text-lg italic opacity-90 mb-2">“This surgery gave me my life back.”</p>
                      <p className="text-xs font-bold tracking-widest text-emerald-400 uppercase">— Standing Straight Patient</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* 3. What It Takes */}
            <article id="what-it-takes" ref={whatItTakesRef} className="scroll-mt-28 space-y-8">
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-[0.18em] text-medical-teal uppercase">What It Takes</p>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Courage, Compassion, Commitment</h3>
                <p className="text-lg text-slate-600 max-w-3xl">
                  Providing life-changing spinal surgery takes dedication, sacrifice, and a shared belief that every child deserves a healthy, upright future.
                </p>
              </div>

              <div className="bg-white border-0 rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Stethoscope,
                      title: "Skilled Teams",
                      text: "Spine surgeons, anesthesiologists, nurses, and techs volunteer expertise.",
                      color: "text-blue-600 bg-blue-50"
                    },
                    {
                      icon: Plane,
                      title: "Personal Sacrifice",
                      text: "Volunteers cover their own travel and step away from work to serve.",
                      color: "text-orange-600 bg-orange-50"
                    },
                    {
                      icon: HeartHandshake,
                      title: "Local Collaboration",
                      text: "Building trust and capacity with partner hospitals for long-term care.",
                      color: "text-purple-600 bg-purple-50"
                    },
                    {
                      icon: GraduationCap,
                      title: "Shared Knowledge",
                      text: "Hands-on training ensures sustainable care after the mission leaves.",
                      color: "text-emerald-600 bg-emerald-50"
                    },
                    {
                      icon: ShieldCheck,
                      title: "Preparation",
                      text: "Rigorous planning and protocols, leaving nothing to chance.",
                      color: "text-slate-600 bg-slate-100"
                    },
                    {
                      icon: Heart,
                      title: "One Goal",
                      text: "Helping every child stand straight and dream without limits.",
                      color: "text-rose-600 bg-rose-50"
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="group p-6 rounded-2xl bg-white border border-slate-100 hover:border-transparent hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1"
                    >
                      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                        <item.icon className="w-6 h-6" />
                      </span>
                      <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeSurgeriesSection;
