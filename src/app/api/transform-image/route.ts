import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get("image") as File;
  const prompt = formData.get("prompt") as string;

  if (!image || !prompt) {
    return NextResponse.json({ error: "Image and prompt are required" }, { status: 400 });
  }

  try {
    const imageBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    const imageUrl = `data:${image.type};base64,${base64Image}`;

    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      {
        input: {
          image: imageUrl,
          prompt: prompt,
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 50,
          scheduler: "K_EULER_ANCESTRAL",
          strength: 0.8,
        },
      }
    );

    if (typeof output === 'string') {
      return NextResponse.json({ transformedImageUrl: output });
    } else if (Array.isArray(output) && output.length > 0) {
      return NextResponse.json({ transformedImageUrl: output[0] });
    } else {
      console.error("Unexpected output format from Replicate API:", output);
      return NextResponse.json({ error: "Unexpected output format from Replicate API" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error transforming image:", error);
    return NextResponse.json({ error: "Failed to transform image" }, { status: 500 });
  }
}
