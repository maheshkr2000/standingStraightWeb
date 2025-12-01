import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Building, 
  Users, 
  Globe, 
  Briefcase, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Check
} from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Newsletter Signup */}
        <div className="py-16 border-b border-background/20">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Stay Connected</h3>
            <p className="text-background/80 max-w-2xl mx-auto">
              Get updates on our missions, patient stories, and ways to help. 
              Join our community of supporters making a difference.
            </p>
          </div>
          
          <div className="max-w-md mx-auto flex gap-4">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-background/10 border-background/30 text-background placeholder:text-background/60"
            />
            <Button variant="outline" className="bg-warm-orange border-warm-orange text-background hover:bg-warm-orange/90">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="md:col-span-2">
            <h4 className="text-2xl font-bold mb-4">StandingStraight.org</h4>
            <p className="text-background/80 mb-6 leading-relaxed">
              Transforming lives through free pediatric spinal surgeries. 
              Every Child Deserves to Stand Straight and be able to lead a normal and productive live
            </p>
            
            {/* Trust Signals */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-warm-orange" />
                <span className="text-sm text-background/80">501(c)(3) Tax-Exempt Organization</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-warm-orange" />
                <span className="text-sm text-background/80">Indian NGO - 80G Tax Exemption</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-warm-orange" />
                <span className="text-sm text-background/80">Certified Medical Partners</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><a href="/our-mission" className="text-background/80 hover:text-background transition-smooth">Our Mission</a></li>
              <li><a href="/success-stories" className="text-background/80 hover:text-background transition-smooth">Success Stories</a></li>
              <li><a href="/volunteers" className="text-background/80 hover:text-background transition-smooth">Volunteer</a></li>
              <li><a href="/our-team" className="text-background/80 hover:text-background transition-smooth">Our Team</a></li>
              <li><a href="/contact" className="text-background/80 hover:text-background transition-smooth">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Support</h5>
            <ul className="space-y-2">
              <li><a href="/donate" className="text-background/80 hover:text-background transition-smooth">Donate</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-smooth">Corporate Partnerships</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-smooth">Grant Opportunities</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-smooth">Financial Reports</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-smooth">Privacy Policy</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-smooth">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Partner Organizations */}
        <div className="py-12 border-t border-background/20">
          <h5 className="text-lg font-semibold text-center mb-8">Trusted Partners</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <Card className="p-4 bg-background/10 text-center">
              <Building className="w-6 h-6 mx-auto mb-2 text-background/90" />
              <div className="text-sm text-background/80">Partner Hospitals</div>
            </Card>
            <Card className="p-4 bg-background/10 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-background/90" />
              <div className="text-sm text-background/80">Medical Boards</div>
            </Card>
            <Card className="p-4 bg-background/10 text-center">
              <Globe className="w-6 h-6 mx-auto mb-2 text-background/90" />
              <div className="text-sm text-background/80">Global Health Orgs</div>
            </Card>
            <Card className="p-4 bg-background/10 text-center">
              <Briefcase className="w-6 h-6 mx-auto mb-2 text-background/90" />
              <div className="text-sm text-background/80">Corporate Sponsors</div>
            </Card>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="py-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center">
          <div className="text-background/80 text-sm mb-4 md:mb-0">
            © 2024 StandingStraight.org. All rights reserved.
          </div>
          
          <div className="flex gap-4">
            <a href="https://www.facebook.com/standingstraight" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-smooth">
              <Facebook className="w-5 h-5 text-background" />
            </a>
            <a href="https://instagram.com/standingstraightInc" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-smooth">
              <Instagram className="w-5 h-5 text-background" />
            </a>
            <a href="http://www.twitter.com/StandingStrt" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-smooth">
              <Twitter className="w-5 h-5 text-background" />
            </a>
            <a href="https://www.youtube.com/channel/UC61i2cfeI4HxWJl67Hjutfw" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-smooth">
              <Youtube className="w-5 h-5 text-background" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;