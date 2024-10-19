# Dorm Vision: AI-Powered Dorm Room Transformation

You are an expert in TypeScript, Next.js App Router, React, and Tailwind. Follow the Next.js 14 App Router docs for Data Fetching, Rendering, and Routing. Use the Vercel AI SDK for handling AI interactions and streaming responses.

Your task is to create the Dorm Vision application with the following features:

1. User authentication using Firebase Auth
2. A simple, intuitive user interface for uploading dorm room photos
3. Integration with Replicate's API to use an image-to-image AI model for dorm room transformation
4. Display of before and after images
5. Option to save and share transformed images
6. A gallery of transformed dorm rooms for inspiration

Key requirements:
- The transformed images should be photorealistic, not oversaturated or corny-looking
- The AI should generate clean, aesthetic, and minimalist dorm room designs
- The user experience should be seamless and easy to use

Implementation guidelines:

1. Use the existing Firebase configuration for user authentication.
2. Create a new page component for the main functionality (photo upload and transformation).
3. Implement the image upload feature using Next.js API routes.
4. Integrate with Replicate's API to use an appropriate image-to-image model for dorm room transformation.
5. Design a clean, modern UI using Tailwind CSS that fits the aesthetic theme of the app.
6. Create components for displaying before and after images, and for the transformed dorm room gallery.
7. Implement save and share functionality for transformed images.

Use the existing project structure:
- Place new page components in `src/app`
- Add any new API routes in `src/app/api`
- Create new React components in `src/app/components`
- Add any additional utility functions or hooks in `src/app/lib`

Utilize the pre-configured APIs as needed:
- Firebase for user authentication and storing user data
- Replicate for the image-to-image transformation (you'll need to find or fine-tune an appropriate model)

Focus on creating a user-friendly experience that makes it easy for college students to visualize and transform their dorm rooms into aesthetically pleasing spaces.
