
import { Link } from "react-router-dom"; // Changed from next/link
import { MountainIcon, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted py-12 text-muted-foreground">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4"> {/* Changed from href */}
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
            {/* Assuming these are hash links for the homepage */}
            <li><Link to="/#features" className="hover:text-primary">Features</Link></li>
            <li><Link to="/#how-it-works" className="hover:text-primary">How It Works</Link></li>
            <li><Link to="/auth/signup" className="hover:text-primary">Sign Up</Link></li>
            <li><Link to="/auth/signin" className="hover:text-primary">Sign In</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold text-foreground mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-primary"><Facebook className="h-5 w-5" /></a> {/* Changed to <a> for external/placeholder links */}
            <a href="#" aria-label="Twitter" className="hover:text-primary"><Twitter className="h-5 w-5" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-primary"><Instagram className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-8 pt-8 border-t border-border text-center text-sm">
        <p>&copy; {new Date().getFullYear()} TripMate. All rights reserved.</p>
      </div>
    </footer>
  );
}
