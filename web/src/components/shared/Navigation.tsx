import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import standingStraightLogo from "@/assets/Standing Straight Logo v2.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-smooth">
            <img 
              src={standingStraightLogo} 
              alt="Standing Straight Logo" 
              className="h-10 w-auto object-contain"
            />
            <div className="flex flex-col items-start gap-0.5 lg:flex-row lg:items-baseline lg:gap-2">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl md:text-3xl font-extrabold text-gray-800">Standing</span>
                <span className="text-2xl md:text-3xl font-extrabold text-teal-600">Straight</span>
              </div>
              <span className="text-sm md:text-base lg:text-sm text-gray-700 mt-0.5 lg:mt-0">Together We Stand</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link 
              to="/our-mission" 
              className={`relative transition-smooth after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                isActive("/our-mission") 
                  ? "text-foreground after:scale-x-100" 
                  : "text-text-gray hover:text-foreground"
              }`}
            >
              Our Mission
            </Link>
            <Link 
              to="/success-stories" 
              className={`relative transition-smooth after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                isActive("/success-stories") 
                  ? "text-foreground after:scale-x-100" 
                  : "text-text-gray hover:text-foreground"
              }`}
            >
              Success Stories
            </Link>
            <Link 
              to="/our-team" 
              className={`relative transition-smooth after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                isActive("/our-team") 
                  ? "text-foreground after:scale-x-100" 
                  : "text-text-gray hover:text-foreground"
              }`}
            >
              Our Team
            </Link>
            <Link 
              to="/upcoming-events" 
              className={`relative transition-smooth after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                isActive("/upcoming-events") 
                  ? "text-foreground after:scale-x-100" 
                  : "text-text-gray hover:text-foreground"
              }`}
            >
              Events
            </Link>
            <Link 
              to="/contact" 
              className={`relative transition-smooth after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                isActive("/contact") 
                  ? "text-foreground after:scale-x-100" 
                  : "text-text-gray hover:text-foreground"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
              <Button variant="story" size="sm" asChild className="relative">
                <Link to="/volunteers">Volunteer</Link>
              </Button>
            </div>
            <Button variant="donate" size="sm" asChild>
              <Link to="/donate">Donate Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              <Link 
                to="/our-mission" 
                className={`transition-smooth py-2 ${
                  isActive("/our-mission") 
                    ? "text-foreground font-medium" 
                    : "text-text-gray hover:text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Our Mission
              </Link>
              <Link 
                to="/success-stories" 
                className={`transition-smooth py-2 ${
                  isActive("/success-stories") 
                    ? "text-foreground font-medium" 
                    : "text-text-gray hover:text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Success Stories
              </Link>
              <Link 
                to="/our-team" 
                className={`transition-smooth py-2 ${
                  isActive("/our-team") 
                    ? "text-foreground font-medium" 
                    : "text-text-gray hover:text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Our Team
              </Link>
              <Link 
                to="/upcoming-events" 
                className={`transition-smooth py-2 ${
                  isActive("/upcoming-events") 
                    ? "text-foreground font-medium" 
                    : "text-text-gray hover:text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                to="/contact" 
                className={`transition-smooth py-2 ${
                  isActive("/contact") 
                    ? "text-foreground font-medium" 
                    : "text-text-gray hover:text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
                <Button variant="story" size="sm" asChild>
                  <Link to="/volunteers" onClick={() => setIsMenuOpen(false)}>Volunteer</Link>
                </Button>
                <Button variant="donate" size="sm" asChild>
                  <Link to="/donate" onClick={() => setIsMenuOpen(false)}>Donate Now</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;