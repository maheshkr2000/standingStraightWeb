import { Navigation, Footer } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Building, Users } from "lucide-react";

const ContactPage = () => {
  const offices = [
    {
      country: "United States",
      city: "San Francisco, California",
      address: "123 Medical Center Drive, Suite 456",
      zipCode: "CA 94102",
      email: "usa@standingstraight.org",
      phone: "+1 (555) 123-4567",
      hours: "Mon-Fri 9AM-5PM PST",
      icon: Building
    },
    {
      country: "India",
      city: "Mumbai, Maharashtra",
      address: "456 Healthcare Avenue, Medical District",
      zipCode: "Mumbai 400001",
      email: "india@standingstraight.org",
      phone: "+91 22 1234 5678",
      hours: "Mon-Fri 9AM-6PM IST",
      icon: Users
    }
  ];

  const contactMethods = [
    {
      title: "General Inquiries",
      email: "info@standingstraight.org",
      description: "For general questions about our organization and mission"
    },
    {
      title: "Donations & Support",
      email: "donations@standingstraight.org",
      description: "Questions about donations, fundraising, and financial support"
    },
    {
      title: "Volunteer Opportunities",
      email: "volunteer@standingstraight.org",
      description: "Information about volunteering and joining our medical missions"
    },
    {
      title: "Media & Press",
      email: "media@standingstraight.org",
      description: "Press inquiries, media coverage, and public relations"
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
              Get in{" "}
              <span className="bg-gradient-action bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Have questions about our mission? Want to volunteer? Interested in donating? 
              We're here to help and would love to hear from you.
            </p>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our{" "}
                <span className="bg-gradient-action bg-clip-text text-transparent">
                  Offices
                </span>
              </h2>
              <p className="text-xl text-text-gray max-w-3xl mx-auto">
                With offices in both the United States and India, we maintain a global presence 
                to serve children and families worldwide.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {offices.map((office, index) => {
                const IconComponent = office.icon;
                return (
                  <Card key={index} className="p-8 bg-card shadow-soft hover:shadow-card transition-smooth">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="w-16 h-16 bg-gradient-hero rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground mb-2">{office.country}</h3>
                        <p className="text-medical-teal font-medium">{office.city}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-trust-blue mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-text-gray">{office.address}</p>
                          <p className="text-text-gray">{office.zipCode}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-trust-blue" />
                        <a href={`mailto:${office.email}`} className="text-text-gray hover:text-trust-blue transition-colors">
                          {office.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-trust-blue" />
                        <a href={`tel:${office.phone}`} className="text-text-gray hover:text-trust-blue transition-colors">
                          {office.phone}
                        </a>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-trust-blue" />
                        <span className="text-text-gray">{office.hours}</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-soft-gray">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Send Us a{" "}
                <span className="bg-gradient-action bg-clip-text text-transparent">
                  Message
                </span>
              </h2>
              <p className="text-xl text-text-gray max-w-2xl mx-auto">
                Have a specific question or want to get involved? Fill out the form below 
                and we'll get back to you within 24 hours.
              </p>
            </div>

            <Card className="p-8 bg-card shadow-soft">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                    <Input 
                      type="text" 
                      placeholder="Enter your first name"
                      className="w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                    <Input 
                      type="text" 
                      placeholder="Enter your last name"
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <Input 
                      type="email" 
                      placeholder="Enter your email address"
                      className="w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <Input 
                      type="tel" 
                      placeholder="Enter your phone number"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subject *</label>
                  <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-trust-blue">
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="donation">Donation Question</option>
                    <option value="volunteer">Volunteer Opportunity</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="media">Media & Press</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                  <Textarea 
                    placeholder="Tell us how we can help you..."
                    className="w-full min-h-32"
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="newsletter" className="rounded border-border" />
                  <label htmlFor="newsletter" className="text-sm text-text-gray">
                    Subscribe to our newsletter for updates on missions and patient stories
                  </label>
                </div>

                <div className="text-center">
                  <Button type="submit" variant="donate" size="lg" className="px-8 py-4 text-lg">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Other Ways to Reach Us</h2>
              <p className="text-xl text-text-gray max-w-3xl mx-auto">
                Different departments handle different types of inquiries. 
                Choose the right contact method for your question.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <Card key={index} className="p-6 bg-card shadow-soft hover:shadow-card transition-smooth text-center">
                  <MessageCircle className="w-12 h-12 text-trust-blue mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">{method.title}</h3>
                  <p className="text-sm text-text-gray mb-4">{method.description}</p>
                  <a 
                    href={`mailto:${method.email}`}
                    className="text-trust-blue hover:text-trust-blue/80 transition-colors font-medium"
                  >
                    {method.email}
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-subtle">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-text-gray">
                Quick answers to common questions about our organization and how to get involved.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-card shadow-soft">
                <h3 className="text-lg font-bold text-foreground mb-2">How can I volunteer for a medical mission?</h3>
                <p className="text-text-gray">
                  We welcome medical professionals and support volunteers. Please email volunteer@standingstraight.org 
                  with your qualifications and availability. We'll guide you through the application process.
                </p>
              </Card>

              <Card className="p-6 bg-card shadow-soft">
                <h3 className="text-lg font-bold text-foreground mb-2">How do I know my donation is being used effectively?</h3>
                <p className="text-text-gray">
                  We maintain complete transparency in our financial reporting. 100% of your donation goes directly 
                  to funding surgeries and medical care. We provide detailed impact reports and patient stories.
                </p>
              </Card>

              <Card className="p-6 bg-card shadow-soft">
                <h3 className="text-lg font-bold text-foreground mb-2">Can I sponsor a specific child's surgery?</h3>
                <p className="text-text-gray">
                  Yes! We offer child sponsorship programs where you can follow a child's journey from screening 
                  through recovery. Contact donations@standingstraight.org for more information.
                </p>
              </Card>

              <Card className="p-6 bg-card shadow-soft">
                <h3 className="text-lg font-bold text-foreground mb-2">How can my organization partner with StandingStraight?</h3>
                <p className="text-text-gray">
                  We welcome partnerships with hospitals, medical device companies, and other organizations. 
                  Please email partnerships@standingstraight.org to discuss collaboration opportunities.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage; 