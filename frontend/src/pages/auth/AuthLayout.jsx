import { Link, Outlet } from 'react-router-dom';
import { MountainIcon } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-muted/40 p-4">
       <div className="absolute top-8 left-8">
        <Link to="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <MountainIcon className="h-6 w-6" />
          <span className="font-semibold text-xl">TripMate</span>
        </Link>
      </div>
      <Outlet /> {/* Nested routes will render here */}
    </div>
  );
}
