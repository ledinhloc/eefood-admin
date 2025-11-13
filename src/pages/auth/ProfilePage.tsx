import React from 'react';
import ProfileForm from '@/features/auth/components/ProfileForm';

const ProfilePage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;
