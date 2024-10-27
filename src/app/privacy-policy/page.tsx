'use client';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">1. Information We Collect</h2>
            <p className="mb-4">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Account information (email address, name)</li>
              <li>Images you upload for transformation</li>
              <li>Generated images and associated metadata</li>
              <li>Usage data and interaction with our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>To provide and maintain our services</li>
              <li>To process your image transformations</li>
              <li>To improve our AI models and services</li>
              <li>To communicate with you about your account</li>
              <li>To ensure the security of our platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">3. Data Storage and Security</h2>
            <p className="text-gray-400">
              We use industry-standard security measures to protect your data. Your images and personal information are stored securely on Firebase servers. We retain your data only for as long as necessary to provide our services and comply with legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">4. Your Rights</h2>
            <p className="mb-4 text-gray-400">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Access your personal data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Export your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">5. Contact</h2>
            <p className="text-gray-400">
              If you have any questions about this Privacy Policy, please contact me at{' '}
              <a href="mailto:paullieber07@gmail.com" className="text-blue-400 hover:text-blue-300">
                paullieber07@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
