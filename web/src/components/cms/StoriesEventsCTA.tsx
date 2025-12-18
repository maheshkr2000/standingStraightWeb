import { Card } from "@/components/ui/card";
import { ArrowRight, HeartHandshake, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const StoriesEventsCTA = () => {
  const cards = [
    {
      title: (
        <>
          Real Stories of <span className="text-warm-orange">Transformation</span>
        </>
      ),
      description:
        "Behind every surgery is a child with dreams, a family with hope, and a future full of possibilities.",
      cta: "View All Success Stories",
      icon: HeartHandshake,
      href: "/success-stories",
      gradient: "from-sky-50 via-white to-warm-orange/10",
      accent: "text-warm-orange",
    },
    {
      title: (
        <>
          Upcoming <span className="text-warm-orange">Missions & Events</span>
        </>
      ),
      description:
        "Join us in our mission to provide life-changing spinal surgery to children worldwide.",
      cta: "View All Events",
      icon: Calendar,
      href: "/upcoming-events",
      gradient: "from-emerald-50 via-white to-sky-50",
      accent: "text-medical-teal",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, idx) => (
            <Link to={card.href} key={idx} className="group block h-full">
              <Card className="relative h-full overflow-hidden border border-slate-200 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-80`} />
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative p-8 flex flex-col gap-4 min-h-[260px]">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
                      {card.title}
                    </h3>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-inner text-warm-orange">
                      <card.icon className="w-6 h-6" />
                    </div>
                  </div>

                  <p className="text-slate-600 text-base md:text-lg leading-relaxed flex-grow">
                    {card.description}
                  </p>

                  <div className="flex items-center gap-2 text-medical-teal font-semibold">
                    <span>{card.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesEventsCTA;

