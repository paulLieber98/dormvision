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
      "stability-ai/stable-diffusion-img2img:15a3689ee13b0d2616e98820eca31d4c3abcd36672df6afce5cb6feb1d66087d",
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

    if (Array.isArray(output) && output.length > 0) {
      return NextResponse.json({ transformedImageUrl: output[0] });
    } else {
      throw new Error("Unexpected output format from Replicate API");
    }
  } catch (error) {
    console.error("Error transforming image:", error);
    return NextResponse.json({ error: "Failed to transform image" }, { status: 500 });
  }
}
