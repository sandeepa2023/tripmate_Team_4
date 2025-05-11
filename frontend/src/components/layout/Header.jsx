
import { Link } from "react-router-dom"; // Changed from next/link
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MountainIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { label: "Features", href: "/#features" }, // Adjusted for potential hash linking
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Blog", href: "/#blog" }, // Placeholder, adjust if it's a separate page
];

export default function Header() {
  const isMobile = useIsMobile();

  const DesktopNav = () => (
    <nav className="hidden md:flex gap-6 items-center">
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.href} // Changed from href
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          {item.label}
        </Link>
      ))}
      <Link to="/auth/signin"> {/* Changed from href, passHref removed */}
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
      </Link>
      <Link to="/auth/signup"> {/* Changed from href, passHref removed */}
        <Button variant="default" size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          Sign Up
        </Button>
      </Link>
    </nav>
  );

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="grid gap-4 p-4">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg text-primary"> {/* Changed from href */}
            <MountainIcon className="h-6 w-6 text-primary" />
            <span>TripMate</span>
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href} // Changed from href
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link to="/auth/signin"> {/* Changed from href, passHref removed */}
            <Button variant="outline" className="w-full">Sign In</Button>
          </Link>
          <Link to="/auth/signup"> {/* Changed from href, passHref removed */}
            <Button variant="default" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Sign Up</Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2"> {/* Changed from href */}
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg text-primary">TripMate</span>
        </Link>
        {isMobile === undefined ? null : isMobile ? <MobileNav /> : <DesktopNav />}
      </div>
    </header>
  );
}
