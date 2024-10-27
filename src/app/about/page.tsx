'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-8">About DormVision</h1>
        
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Our Mission</h2>
            <p className="text-gray-400">
              DormVision was created to help college students transform their living spaces into comfortable, 
              productive, and inspiring environments. We believe that your surroundings significantly impact 
              your college experience, and we're here to help you make the most of your space.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">How It Works</h2>
            <div className="space-y-4 text-gray-400">
              <p>
                Using cutting-edge AI technology, DormVision transforms photos of your dorm room into 
                redesigned spaces that maximize both functionality and style. Our AI has been trained on 
                thousands of interior designs specifically optimized for small spaces.
              </p>
              <p>
                Simply upload a photo of your room, and our AI will generate multiple design options 
                that work within your existing space constraints while maintaining a realistic and 
                achievable look.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Our Technology</h2>
            <p className="text-gray-400">
              DormVision leverages advanced AI models and image processing techniques to create 
              realistic room transformations. We use state-of-the-art machine learning algorithms 
              to understand spatial relationships and design principles, ensuring that each 
              transformation is both practical and aesthetically pleasing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Contact</h2>
            <p className="text-gray-400">
              Have questions or suggestions? I'd love to hear from you! Reach out to me at{' '}
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
