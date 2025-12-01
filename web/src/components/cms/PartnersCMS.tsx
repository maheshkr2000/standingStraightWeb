import { usePartners } from "@/hooks/useSanityData";
import { urlFor } from "@/lib/sanity";

const PartnersCMS = () => {
  const { data, isLoading, error } = usePartners();
  const partners = Array.isArray(data) ? data : [];

  return (
    <section className="py-20 bg-soft-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="bg-gradient-action bg-clip-text text-transparent">Partners</span>
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto">
            Together with our trusted partners, we're building a global network of support to transform children's lives
            through accessible spinal care.
          </p>
        </div>

        {/* Logos Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-10">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-24 md:h-32 xl:h-40 2xl:h-48 bg-white/50 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-10">
            {partners.map((p, idx) => (
              <div key={idx} className="flex items-center justify-center">
                {p.logo?.asset?._ref ? (
                  <img
                    src={urlFor(p.logo).width(600).quality(80).url()}
                    alt={p.name || "Partner logo"}
                    className="h-24 md:h-32 xl:h-40 2xl:h-48 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-24 md:h-32 xl:h-40 2xl:h-48 w-48 bg-white/70 rounded" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* No CTA banner here as requested */}
      </div>
    </section>
  );
};

export default PartnersCMS;
