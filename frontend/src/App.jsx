import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import HomePage from '@/pages/HomePage';
import SignInPage from '@/pages/auth/SignInPage';
import SignUpPage from '@/pages/auth/SignUpPage';
import AuthLayout from '@/pages/auth/AuthLayout';

export default function App() {
  return (
    <>
      <Helmet>
        <title>TripMate - Your AI Guide to Sri Lanka</title>
        <meta name="description" content="Plan your perfect Sri Lankan adventure with TripMate, your personal AI travel assistant." />
        <link rel="icon" href="/favicon.ico" /> {/* Example, assuming favicon.ico is in public */}
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<AuthLayout />}>
              <Route path="/auth/signin" element={<SignInPage />} />
              <Route path="/auth/signup" element={<SignUpPage />} />
            </Route>
            {/* Add other routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
}
