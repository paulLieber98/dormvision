import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const mySecret = process.env['REPLICATE_API_TOKEN'];
  if (!mySecret) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
    );
  }

  const { prompt, image } = await request.json();

  const body = {
    version: "76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
    input: {
      image,
      prompt,
      guidance_scale: 15,
      negative_prompt: "lowres, watermark, banner, logo, watermark, contactinfo, text, deformed, blurry, blur, out of focus, out of frame, surreal, extra, ugly, upholstered walls, fabric walls, plush walls, mirror, mirrored, functional, realistic",
      prompt_strength: 0.8,
      num_inference_steps: 50
    },
  };

  try {
    const response = await fetch(
      "https://api.replicate.com/v1/predictions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${mySecret}`,
          "Content-Type": "application/json",
          "Prefer": "wait"
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const prediction = await response.json();
    return NextResponse.json(prediction);
  } catch (error) {
    console.error("Error from Replicate API:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
