import { useMemo, useRef, useState } from "react";
import { Navigation, Footer } from "@/components/shared";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Heart, 
  Gift, 
  Users, 
  CheckCircle, 
  Shield,
  DollarSign,
  Calendar,
  MapPin
} from "lucide-react";

const DonatePage = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const customSectionRef = useRef<HTMLDivElement | null>(null);

  const donationTiers = [
    {
      amount: 50,
      title: "Medical Supplies",
      description: "Provides essential medical supplies for one surgery",
      impact: "Supports pre-surgery care",
      icon: Gift,
      popular: false
    },
    {
      amount: 250,
      title: "Pre-Surgery Care",
      description: "Covers comprehensive pre-operative care and evaluation",
      impact: "Ensures safe surgery preparation",
      icon: Heart,
      popular: true
    },
    {
      amount: 1000,
      title: "Partial Surgery",
      description: "Contributes to surgical costs and medical team",
      impact: "Covers 20% of complete surgery",
      icon: Users,
      popular: false
    },
    {
      amount: 5000,
      title: "Complete Surgery",
      description: "Fully funds one life-changing spinal surgery",
      impact: "Transforms a child's life forever",
      icon: CheckCircle,
      popular: false
    }
  ];

  const paymentMethods = [
    {
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Secure payment via Stripe",
      popular: true
    },
    {
      name: "PayPal",
      icon: DollarSign,
      description: "Quick and easy payment",
      popular: false
    },
    {
      name: "Bank Transfer",
      icon: Shield,
      description: "Direct bank transfer",
      popular: false
    },
    {
      name: "Check",
      icon: Calendar,
      description: "Mail-in donation",
      popular: false
    }
  ];

  const impactStats = [
    { number: 500, label: "Lives Transformed", suffix: "+" },
    { number: 98, label: "Success Rate", suffix: "%" },
    { number: 15, label: "Countries Served", suffix: "" },
    { number: 50, label: "Medical Missions", suffix: "+" }
  ];

  const activeAmount = useMemo(() => {
    if (selectedAmount !== null) return selectedAmount;
    const numeric = Number(customAmount);
    return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
  }, [selectedAmount, customAmount]);

  const handleTierSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(String(amount));
    requestAnimationFrame(() => {
      customSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleCustomPreset = (amount: number) => {
    setSelectedAmount(null);
    setCustomAmount(String(amount));
  };

  const proceedToPayment = () => {
    if (!activeAmount) {
      alert("Please choose or enter a donation amount.");
      return;
    }
    // Replace with payment gateway integration
    console.log(`Processing donation of $${activeAmount} with comment: ${comment || "(no comment)"}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Make a{" "}
              <span className="bg-gradient-action bg-clip-text text-transparent">
                Life-Changing
              </span>{" "}
              Donation
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Every donation directly funds pediatric spinal surgeries for children who cannot afford treatment. 
              Your generosity transforms lives and gives hope to families in need.
            </p>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="py-16 bg-soft-gray">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-trust-blue mb-2">
                    {stat.number}{stat.suffix}
                  </div>
                  <p className="text-text-gray font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Donation Tiers */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Choose Your{" "}
                <span className="bg-gradient-action bg-clip-text text-transparent">
                  Impact Level
                </span>
              </h2>
              <p className="text-xl text-text-gray max-w-3xl mx-auto">
                Every amount makes a difference. Select a donation tier that matches your capacity to give.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {donationTiers.map((tier, index) => {
                const IconComponent = tier.icon;
                const isSelected = selectedAmount === tier.amount;
                return (
                  <Card
                    key={index}
                    onClick={() => handleTierSelect(tier.amount)}
                    className={`p-6 bg-card shadow-soft hover:shadow-card transition-bounce h-full relative cursor-pointer ${
                      tier.popular ? "border-2 border-trust-blue" : ""
                    } ${isSelected ? "ring-2 ring-trust-blue border-trust-blue" : ""}`}
                  >
                    {tier.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-trust-blue text-white">
                        Most Popular
                      </Badge>
                    )}
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        <IconComponent className="w-12 h-12 text-trust-blue" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{tier.title}</h3>
                      <div className="text-3xl font-bold text-trust-blue mb-3">${tier.amount}</div>
                      <p className="text-text-gray mb-4 leading-relaxed">{tier.description}</p>
                      <div className="bg-soft-gray rounded-lg p-3 mb-6">
                        <p className="text-sm text-medical-teal font-medium">{tier.impact}</p>
                      </div>
                      <Button
                        variant="donate"
                        className="w-full"
                        onClick={() => handleTierSelect(tier.amount)}
                      >
                        Donate ${tier.amount}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Custom Amount Section */}
        <section className="py-20 bg-soft-gray" ref={customSectionRef}>
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Custom Donation Amount</h2>
              <p className="text-xl text-text-gray">
                Choose your own amount to support our mission
              </p>
            </div>

            <Card className="p-8 bg-card shadow-soft">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Enter Amount</h3>
                  <div className="space-y-4">
                    <div className="flex items-center border rounded-lg p-3">
                      <DollarSign className="w-5 h-5 text-text-gray mr-2" />
                      <input 
                        type="number" 
                        placeholder="Enter amount"
                        className="flex-1 outline-none text-lg font-medium"
                        min="1"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(null);
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleCustomPreset(25)}>$25</Button>
                      <Button variant="outline" size="sm" onClick={() => handleCustomPreset(100)}>$100</Button>
                      <Button variant="outline" size="sm" onClick={() => handleCustomPreset(500)}>$500</Button>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Comments (optional)</label>
                      <textarea
                        className="w-full border rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-trust-blue"
                        rows={3}
                        placeholder="Add a note with your donation"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Payment Methods</h3>
                  <div className="space-y-3">
                    {paymentMethods.map((method, index) => {
                      const IconComponent = method.icon;
                      return (
                        <div key={index} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${method.popular ? 'border-trust-blue bg-trust-blue/5' : 'border-border hover:border-trust-blue'}`}>
                          <IconComponent className="w-5 h-5 mr-3 text-trust-blue" />
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-text-gray">{method.description}</div>
                          </div>
                          {method.popular && (
                            <Badge className="ml-auto bg-trust-blue text-white text-xs">Recommended</Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button
                  variant="donate"
                  size="lg"
                  className="px-8 py-4 text-lg"
                  onClick={proceedToPayment}
                >
                  Proceed to Payment
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Trust & Security */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Secure & Transparent</h2>
              <p className="text-xl text-text-gray max-w-3xl mx-auto">
                Your donation is secure and your privacy is protected. We're committed to transparency in how your funds are used.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 bg-card shadow-soft text-center">
                <Shield className="w-12 h-12 text-trust-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
                <p className="text-text-gray">All transactions are encrypted and secure. We use industry-standard security protocols.</p>
              </Card>
              <Card className="p-6 bg-card shadow-soft text-center">
                <CheckCircle className="w-12 h-12 text-trust-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Tax Deductible</h3>
                <p className="text-text-gray">Your donation is tax-deductible. We'll provide a receipt for your records.</p>
              </Card>
              <Card className="p-6 bg-card shadow-soft text-center">
                <Heart className="w-12 h-12 text-trust-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Direct Impact</h3>
                <p className="text-text-gray">100% of your donation goes directly to funding surgeries and medical care.</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 bg-gradient-subtle">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Questions About Donating?</h2>
            <p className="text-xl text-text-gray mb-8">
              Our team is here to help you make the most impactful donation possible.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 bg-card shadow-soft">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-trust-blue" />
                  Contact Us
                </h3>
                <div className="space-y-2 text-text-gray">
                  <p>Email: donations@standingstraight.org</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Hours: Mon-Fri 9AM-5PM PST</p>
                </div>
              </Card>
              <Card className="p-6 bg-card shadow-soft">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-warm-orange" />
                  Recurring Donations
                </h3>
                <div className="space-y-2 text-text-gray">
                  <p>Set up monthly donations</p>
                  <p>Choose your preferred amount</p>
                  <p>Cancel or modify anytime</p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Helper function to handle donation
const handleDonation = (amount: number) => {
  // This would integrate with your payment gateway
  console.log(`Processing donation of $${amount}`);
  // Redirect to payment gateway or open payment modal
};

// Helper function to set custom amount
const setCustomAmount = (amount: number) => {
  // This would update the custom amount input
  console.log(`Setting custom amount to $${amount}`);
};

export default DonatePage; 