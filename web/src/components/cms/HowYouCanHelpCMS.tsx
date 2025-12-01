import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useHowYouCanHelp } from "@/hooks/useSanityData";
import { Heart, HandHeart, Megaphone, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  heart: Heart,
  'hand-heart': HandHeart,
  megaphone: Megaphone,
};

const HowYouCanHelpCMS = () => {
  const { data, isLoading, error } = useHowYouCanHelp();

  const cards = data?.cards || [
    {
      title: 'Give',
      icon: 'heart',
      description: 'Your donation directly funds life-changing surgeries. Every $5,000 can transform a child\'s life.',
      bullets: ['$50 - Medical supplies', '$500 - Pre-surgery care', '$5,000 - Complete surgery'],
      ctaText: 'Donate Now',
      ctaLink: '/donate',
      ctaVariant: 'donate',
    },
    {
      title: 'Volunteer',
      icon: 'hand-heart',
      description: "Join our team of dedicated volunteers. There's a place for everyone.",
      bullets: ['Medical professionals', 'Mission coordinators', 'Community outreach', 'Story sharing'],
      ctaText: 'Volunteer With Us',
      ctaLink: '/volunteers',
      ctaVariant: 'mission',
    },
    {
      title: 'Engage',
      icon: 'megaphone',
      description: 'Spread awareness about our mission. Follow our journey and help us reach more families.',
      bullets: ['Subscribe to updates', 'Share on social media', 'Tell your network', 'Corporate partnerships'],
      ctaText: 'Stay Connected',
      ctaLink: '/success-stories',
      ctaVariant: 'story',
    },
  ];

  return (
    <section id="help" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {data?.title || 'How You Can '}<span className="bg-gradient-action bg-clip-text text-transparent">{data?.title ? '' : 'Make a Difference'}</span>
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto">
            {data?.subtitle || 'Every contribution, big or small, helps us reach more children and transform more lives.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="p-8 bg-card shadow-soft h-full">
                  <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-6 animate-pulse" />
                  <div className="h-6 w-32 bg-muted rounded mx-auto mb-4 animate-pulse" />
                  <div className="h-4 w-64 bg-muted rounded mx-auto mb-2 animate-pulse" />
                  <div className="h-4 w-56 bg-muted rounded mx-auto mb-6 animate-pulse" />
                  <div className="h-10 w-full bg-muted/60 rounded animate-pulse" />
                </Card>
              ))
            : cards.map((card, idx) => {
                const Icon = iconMap[card.icon?.toLowerCase?.()] || Heart;
                return (
                  <Card key={idx} className="p-8 bg-card shadow-soft group h-full">
                    <div className="text-center flex flex-col h-full">
                      <div className="w-20 h-20 bg-gradient-action rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                      <p className="text-text-gray mb-6 leading-relaxed">{card.description}</p>

                      <div className="space-y-3 mb-6 flex-grow text-left">
                        {card.bullets?.map((b: string, i: number) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-trust-blue rounded-full" />
                            <span className="text-sm text-text-gray">{b}</span>
                          </div>
                        ))}
                      </div>

                      {card.ctaText && card.ctaLink && (
                        <Button variant={(card.ctaVariant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "donate" | "mission" | "story" | "hero") || 'story'} className="w-full mt-auto" asChild>
                          <a href={card.ctaLink}>{card.ctaText}</a>
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
        </div>

        <div className="mt-16 bg-gradient-hero rounded-2xl p-8 text-center text-primary-foreground">
          <h3 className="text-3xl font-bold mb-4">{data?.ctaBannerTitle || 'Ready to Change a Life Today?'}</h3>
          <p className="text-primary-foreground/90 text-lg mb-8">{data?.ctaBannerSubtitle || 'Join thousands of supporters who believe every child deserves to stand tall.'}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {data?.ctaPrimary?.text && data?.ctaPrimary?.link && (
              <Button variant={(data?.ctaPrimary?.variant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "donate" | "mission" | "story" | "hero") || 'outline'} size="lg" className="px-8 py-4 text-lg" asChild>
                <a href={data.ctaPrimary.link}>{data.ctaPrimary.text}</a>
              </Button>
            )}
            {data?.ctaSecondary?.text && data?.ctaSecondary?.link && (
              <Button variant={(data?.ctaSecondary?.variant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "donate" | "mission" | "story" | "hero") || 'ghost'} size="lg" className="px-8 py-4 text-lg" asChild>
                <a href={data.ctaSecondary.link}>{data.ctaSecondary.text}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowYouCanHelpCMS;
