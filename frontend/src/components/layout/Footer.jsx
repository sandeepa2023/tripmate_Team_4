import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { MountainIcon, Facebook, Twitter, Instagram } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="bg-muted py-12 text-muted-foreground">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <MountainIcon className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg text-primary">TripMate</span>
          </Link>
          <p className="text-sm">
            Your AI guide to discovering the wonders of Sri Lanka. Plan personalized trips with ease.
          </p>
        </div>
        <div>
          <h3 className="text-md font-semibold text-foreground mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {!isAuthenticated ? (
              <>
                <li><HashLink smooth to="/#features" className="hover:text-primary">Features</HashLink></li>
                <li><HashLink smooth to="/#how-it-works" className="hover:text-primary">How It Works</HashLink></li>
                <li><Link to="/auth/signup" className="hover:text-primary">Sign Up</Link></li>
                <li><Link to="/auth/signin" className="hover:text-primary">Sign In</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
                <li><Link to="/features" className="hover:text-primary">Premium Features</Link></li>
                <li><Link to="/account" className="hover:text-primary">Account Settings</Link></li>
                <li><HashLink smooth to="/#destinations" className="hover:text-primary">Destinations</HashLink></li>
              </>
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold text-foreground mb-4">
            {isAuthenticated ? "Support" : "Follow Us"}
          </h3>
          {isAuthenticated ? (
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="hover:text-primary">Help Center</Link></li>
              <li><a href="mailto:support@tripmate.com" className="hover:text-primary">Contact Support</a></li>
              <li><Link to="/feedback" className="hover:text-primary">Give Feedback</Link></li>
            </ul>
          ) : (
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-primary"><Facebook className="h-5 w-5" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-primary"><Twitter className="h-5 w-5" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-primary"><Instagram className="h-5 w-5" /></a>
            </div>
          )}
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-8 pt-8 border-t border-border text-center text-sm">
        <p>&copy; {new Date().getFullYear()} TripMate. All rights reserved.</p>
      </div>
    </footer>
  );
}
