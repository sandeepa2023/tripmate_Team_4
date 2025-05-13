import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';

import HomePage from '@/pages/HomePage';
import AuthLayout from '@/pages/auth/AuthLayout';
import SignInPage from '@/pages/auth/SignInPage';
import SignUpPage from '@/pages/auth/SignUpPage';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardPage from '@/pages/DashboardPage';
import FeaturesPage from '@/pages/FeaturesPage';
import AccountPage from '@/pages/AccountPage';

export default function App() {
  return (
    <>
      <Helmet>
        <title>TripMate - Your AI Guide to Sri Lanka</title>
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
            <Route
              path="/dashboard"
              element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
            />
            <Route
              path="/features"
              element={<ProtectedRoute><FeaturesPage /></ProtectedRoute>}
            />
            <Route
              path="/account"
              element={<ProtectedRoute><AccountPage /></ProtectedRoute>}
            />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
}
