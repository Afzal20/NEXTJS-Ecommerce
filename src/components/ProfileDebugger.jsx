// Test component to check user profile data structure
import React from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function ProfileDebugger() {
  const { userProfile, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Not authenticated</div>;

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold mb-2">Profile Data Debug:</h3>
      <pre className="text-xs bg-white p-2 rounded overflow-auto">
        {JSON.stringify(userProfile, null, 2)}
      </pre>
      
      <div className="mt-4 space-y-2">
        <p><strong>Email:</strong> {userProfile?.email || 'N/A'}</p>
        <p><strong>First Name:</strong> {userProfile?.first_name || 'N/A'}</p>
        <p><strong>Last Name:</strong> {userProfile?.last_name || 'N/A'}</p>
        <p><strong>Profile Image:</strong> {userProfile?.profile_image || 'N/A'}</p>
        <p><strong>User ID:</strong> {userProfile?.user || 'N/A'}</p>
        
        <div className="mt-4">
          <h4 className="font-semibold">Avatar Preview:</h4>
          <div className="flex items-center gap-2 mt-2">
            {userProfile?.profile_image ? (
              <img 
                src={userProfile.profile_image} 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium border-2 border-blue-200">
                {userProfile?.email ? userProfile.email.substring(0, 2).toUpperCase() : 'U'}
              </div>
            )}
            <span>
              {userProfile?.first_name && userProfile?.last_name 
                ? `${userProfile.first_name} ${userProfile.last_name}`
                : userProfile?.first_name || userProfile?.email || 'User'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
