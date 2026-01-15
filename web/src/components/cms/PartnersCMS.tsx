import { usePartners } from "@/hooks/useSanityData";
import { urlFor } from "@/lib/sanity";
import { useMemo } from "react";

const PartnersCMS = () => {
  const { data, isLoading, error } = usePartners();
  const partners = Array.isArray(data) ? data : [];
  const hasMany = partners.length > 5;

  const marqueeDuration = useMemo(() => {
    // Scale duration with number of items so scroll feels gentle
    return Math.max(18, partners.length * 3);
  }, [partners.length]);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Our <span className="bg-gradient-action bg-clip-text text-transparent">Partners</span>
          </h2>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Together with our trusted partners, we're building a global network of support to transform children's lives
            through accessible spinal care.
          </p>
        </div>

        {/* Logos Grid / Marquee */}
        <div className="rounded-3xl bg-slate-800/50 border border-slate-700/70 shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-6 md:p-8">
          {isLoading ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] max-w-5xl mx-auto gap-8 md:gap-10 justify-items-center">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 md:h-32 xl:h-40 2xl:h-48 bg-slate-800 rounded-xl border border-slate-700 animate-pulse"
                />
              ))}
            </div>
          ) : hasMany ? (
            <div className="relative overflow-hidden">
              <style>{`
                @keyframes partner-marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
              `}</style>
              <div
                className="flex items-center gap-8 md:gap-12"
                style={{
                  width: "200%",
                  animation: `partner-marquee ${marqueeDuration}s linear infinite`
                }}
              >
                {[...partners, ...partners].map((p, idx) => {
                  const logoUrl = p.logo?.asset?._ref ? urlFor(p.logo).width(600).quality(85).url() : null;
                  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
                    p.website ? (
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noreferrer"
                        className="block focus:outline-none focus:ring-2 focus:ring-warm-orange focus:ring-offset-2 focus:ring-offset-slate-900 rounded-xl"
                      >
                        {children}
                      </a>
                    ) : (
                      <div>{children}</div>
                    );

                  return (
                    <Wrapper key={idx}>
                      <div className="flex items-center justify-center bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-4 h-20 md:h-28 xl:h-32 min-w-[160px] md:min-w-[200px] transition-transform duration-200 hover:-translate-y-1">
                        {logoUrl ? (
                          <img
                            src={logoUrl}
                            alt={p.name || "Partner logo"}
                            className="max-h-full max-w-full object-contain opacity-90 hover:opacity-100 transition-opacity"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-full w-full bg-slate-700/50 rounded-lg" />
                        )}
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] max-w-5xl mx-auto gap-8 md:gap-10 justify-items-center">
              {partners.map((p, idx) => {
                const logoUrl = p.logo?.asset?._ref ? urlFor(p.logo).width(600).quality(85).url() : null;
                const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
                  p.website ? (
                    <a
                      href={p.website}
                      target="_blank"
                      rel="noreferrer"
                      className="block focus:outline-none focus:ring-2 focus:ring-warm-orange focus:ring-offset-2 focus:ring-offset-slate-900 rounded-xl"
                    >
                      {children}
                    </a>
                  ) : (
                    <div>{children}</div>
                  );

                return (
                  <Wrapper key={idx}>
                    <div className="flex items-center justify-center bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-4 h-24 md:h-32 xl:h-40 2xl:h-48 transition-transform duration-200 hover:-translate-y-1">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={p.name || "Partner logo"}
                          className="max-h-full max-w-full object-contain opacity-90 hover:opacity-100 transition-opacity"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full bg-slate-700/50 rounded-lg" />
                      )}
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          )}
        </div>

        {/* No CTA banner here as requested */}
      </div>
    </section>
  );
};

export default PartnersCMS;
