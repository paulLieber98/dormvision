'use client';

import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-4">DormVision</h3>
            <p className="text-gray-400 text-sm">
              Transform your dorm room into your dream space with AI-powered design solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Contact</h3>
            <p className="text-gray-400 text-sm mb-2">
              Questions or concerns? Email me at:
            </p>
            <a 
              href="mailto:paullieber07@gmail.com" 
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              paullieber07@gmail.com
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} DormVision. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
