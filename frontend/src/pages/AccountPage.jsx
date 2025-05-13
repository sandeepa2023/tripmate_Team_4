import React, { useState } from 'react';

export default function AccountPage() {
  const [profile, setProfile] = useState({ name: '', email: '' });

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Account Settings</h1>
      <form className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Name</label>
          <input
            className="w-full border px-2 py-1"
            value={profile.name}
            onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-2 py-1"
            value={profile.email}
            onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
