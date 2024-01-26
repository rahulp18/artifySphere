import { checkApiLimit, incrementApiLimit } from '@/lib/api-limit';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { prompt } = await req.json();
    if (!userId) {
      return new NextResponse('Unauthorized!', { status: 401 });
    }
    if (!prompt) {
      return new NextResponse('Prompts Required!', { status: 401 });
    }
    const freeTrial = await checkApiLimit();
    if (!freeTrial) {
      return new NextResponse(
        'Free trial has expired. Please upgrade to pro.',
        { status: 403 },
      );
    }
    const response = await replicate.run(
      'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
      {
        input: {
          fps: 24,
          model: 'xl',
          width: 1024,
          height: 576,
          prompt,
          batch_size: 1,
          num_frames: 24,
          init_weight: 0.5,
          guidance_scale: 17.5,
          negative_prompt:
            'very blue, dust, noisy, washed out, ugly, distorted, broken',
          remove_watermark: false,
          num_inference_steps: 50,
        },
      },
    );
    await incrementApiLimit();
    return NextResponse.json(response);
  } catch (error) {
    console.log(['ERROR_IN_VIDEO'], error);
    return new NextResponse('Internal server error!', { status: 500 });
  }
}
