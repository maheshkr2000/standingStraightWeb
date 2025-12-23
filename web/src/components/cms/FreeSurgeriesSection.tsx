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
} from "lucide-react";

const FreeSurgeriesSection = () => {
  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-[0.2em] text-medical-teal uppercase">
            What We Do
          </p>
          <h3 className="text-3xl md:text-4xl font-bold mt-3">Free Life-Changing Surgeries</h3>
          <p className="mt-4 text-text-gray max-w-3xl mx-auto leading-relaxed">
            A single surgery can change everything. For children living with spinal deformities, pain becomes part of everyday life.
            In many developing countries, the surgery that could change everything is simply unaffordable. Standing Straight removes that barrier.
          </p>
        </div>

        <div className="grid md:grid-cols-[1.05fr_1fr] gap-6">
          <Card className="p-6 md:p-7 shadow-soft border border-border/60 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-warm-orange/10 text-warm-orange">
                <ShieldCheck className="w-5 h-5" />
              </span>
              100% Free Spinal Surgeries
            </h4>
            <p className="text-text-gray leading-relaxed mb-5">
              We provide completely free spinal surgeries to underprivileged children who would otherwise go without care.
              Standing Straight removes the barrier of cost entirely.
            </p>
            <div className="space-y-3">
              <p className="font-semibold text-sm text-foreground">Our support includes:</p>
              <ul className="space-y-2 text-text-gray text-sm leading-relaxed">
                <li className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-medical-teal" />
                  Medical evaluations and surgical planning
                </li>
                <li className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-medical-teal" />
                  Complex spinal corrective surgeries
                </li>
                <li className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-medical-teal" />
                  Post-operative care and recovery
                </li>
              </ul>
            </div>
            <p className="mt-5 text-xs text-text-gray italic">
              Every child is treated with skill, compassion, and dignity.
            </p>
          </Card>

          <div className="flex flex-col gap-4">
            <Card className="p-6 md:p-7 shadow-soft border border-border/60 flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Heart className="w-5 h-5 text-medical-teal" />
                More Than Medical Care
              </h4>
              <p className="text-text-gray text-sm leading-relaxed">
                These surgeries don’t just correct spines—they restore lives. After surgery, children can:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-foreground">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white">
                  <Activity className="w-4 h-4 text-medical-teal" />
                  Move without constant pain
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white">
                  <GraduationCap className="w-4 h-4 text-medical-teal" />
                  Return to school
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white">
                  <Heart className="w-4 h-4 text-medical-teal" />
                  Play, grow, and dream freely
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white">
                  <Crosshair className="w-4 h-4 text-medical-teal" />
                  Stand with confidence and pride
                </div>
              </div>
            </Card>

            <div className="rounded-2xl bg-gradient-action text-white p-5 shadow-soft text-sm flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <Heart className="w-4 h-4" />
              </span>
              <div>
                <p className="font-semibold">“This surgery gave me my life back.”</p>
                <p className="text-white/85">— Standing Straight patient</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <Card className="flex items-start gap-3 p-4 bg-white border border-border/50 shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-medical-teal/10 text-medical-teal flex-shrink-0">
              <Heart className="w-5 h-5" />
            </span>
            <div className="text-sm leading-relaxed text-foreground">
              <p className="font-semibold text-foreground mb-1">
                "Before surgery, my child could not sit or walk without pain. Now, they stand tall and smile again."
              </p>
              <p className="text-text-gray">— A grateful parent</p>
            </div>
          </Card>

          <Card className="flex items-start gap-3 p-4 bg-white border border-border/50 shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-medical-teal/10 text-medical-teal flex-shrink-0">
              <Users className="w-5 h-5" />
            </span>
            <div className="text-sm leading-relaxed text-foreground">
              <p className="font-semibold text-foreground mb-1">
                "Straighten the spine of one suffering child, and you brighten the world for an entire family."
              </p>
              <p className="text-text-gray">— Standing Straight Team</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FreeSurgeriesSection;

