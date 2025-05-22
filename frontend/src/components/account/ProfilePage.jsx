import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProfileInformation from './ProfileInformation';
import PasswordSection from './PasswordSection';
import ProfileSidebar from './ProfileSidebar';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    avatar: user?.avatar || '',
    preferences: {
      currency: 'USD',
      language: 'English',
      notifications: {
        email: true,
        push: true,
      },
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <ProfileInformation 
              formData={formData}
              setFormData={setFormData}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
            <PasswordSection />
          </div>
          <div className="relative z-10">
            <ProfileSidebar 
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}