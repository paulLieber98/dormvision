'use client';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-8">Terms of Service</h1>
        
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-400">
              By accessing and using DormVision, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">2. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>You must provide accurate information when creating an account</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You agree not to upload inappropriate or illegal content</li>
              <li>You will not attempt to circumvent any security features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">3. Service Usage</h2>
            <p className="text-gray-400">
              DormVision provides AI-powered room transformation services. While we strive for high-quality results, we cannot guarantee specific outcomes. The service is provided "as is" without warranties of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">4. Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>You retain rights to your original images</li>
              <li>Generated images are provided for personal use only</li>
              <li>Our AI models and platform remain our intellectual property</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">5. Termination</h2>
            <p className="text-gray-400">
              We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">6. Changes to Terms</h2>
            <p className="text-gray-400">
              We may modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
