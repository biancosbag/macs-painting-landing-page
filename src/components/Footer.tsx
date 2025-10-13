import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Mac's Painting</h3>
            <p className="text-primary-foreground/80 mb-4">
              Professional residential painting for Philadelphia and nearby areas. Clean inside. Proud outside.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <a href="tel:+12675163306" className="hover:text-accent transition-colors">
                  (267) 516-3306
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:byron@macspp.co" className="hover:text-accent transition-colors">
                  byron@macspp.co
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1" />
                <span>Serving PA Suburbs</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Interior Painting</li>
              <li>Exterior Painting</li>
              <li>Cabinet Refinishing</li>
              <li>Deck & Fence Staining</li>
              <li>Color Consultation</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Mac's Painting. All rights reserved.</p>
          <p className="mt-2">Licensed & Insured | EPA Lead-Safe Certified</p>
          <p className="mt-3 space-x-4">
            <Link to="/terms" className="hover:text-accent transition-colors underline">
              Terms & Conditions
            </Link>
            <span>|</span>
            <Link to="/facebook-ads-privacy" className="hover:text-accent transition-colors underline">
              Facebook Ads Privacy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
