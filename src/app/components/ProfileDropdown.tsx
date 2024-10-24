import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';

const ProfileDropdown: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const { user, signOut } = useAuth();

  if (!isOpen || !user) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
      <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        Settings
      </Link>
      <button
        onClick={signOut}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Sign out
      </button>
    </div>
  );
};

export default ProfileDropdown;
