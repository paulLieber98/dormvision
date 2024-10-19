import Link from 'next/link';
import { useAuth } from '../../lib/hooks/useAuth';

export default function Navbar() {
  const { user, signInWithGoogle, signOut } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Dorm Vision
        </Link>
        <div>
          {user ? (
            <div className="flex items-center">
              <span className="text-white mr-4">Welcome, {user.displayName}</span>
              <button
                onClick={signOut}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Sign In with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
