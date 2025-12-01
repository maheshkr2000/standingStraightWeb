import { Card } from "@/components/ui/card";
import partner1Image from "@/assets/partner1.png";
import partner2Image from "@/assets/partner 2.png";
import partner3Image from "@/assets/partner3.png";

const Partners = () => {
  const partners = [
    {
      name: "DePuy Synthes",
      image: partner1Image
    },
    // {
    //   name: "Sandhu Bros. Farms",
    //   image: partner2Image
    // },
    {
      name: "NuVasive Spine Foundation",
      image: partner2Image
    },
    {
      name: "LifeNet Health",
      image: partner3Image
    },
    // {
    //   name: "GLASSFAB",
    //   image: partner2Image
    // }
  ];

  return (
    <section className="py-20 bg-soft-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our{" "}
            <span className="bg-gradient-action bg-clip-text text-transparent">
              Partners
            </span>
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto">
            Together with our trusted partners, we're building a global network 
            of support to transform children's lives through accessible spinal care.
          </p>
        </div>

        {/* Partners Logos - Clean Grid Layout */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16 mb-20">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center hover:scale-105 transition-transform duration-300">
              <img 
                src={partner.image} 
                alt={`${partner.name} logo`}
                className="h-20 md:h-24 lg:h-28 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>

        {/* Become a Partner CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-6">Interested in Partnering?</h3>
          <p className="text-text-gray mb-8 max-w-3xl mx-auto text-lg">
            Join our network of partners and help us reach more children in need. 
            Whether you're a medical device company, foundation, or community organization, 
            there are many ways to make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-trust-blue text-white px-10 py-4 rounded-lg font-medium hover:bg-trust-blue/90 transition-colors text-lg">
              Become a Partner
            </button>
            <button className="border-2 border-trust-blue text-trust-blue px-10 py-4 rounded-lg font-medium hover:bg-trust-blue hover:text-white transition-colors text-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners; 