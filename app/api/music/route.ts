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
      'riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05',
      {
        input: {
          prompt_a: prompt,
        },
      },
    );
    await incrementApiLimit();
    return NextResponse.json(response);
  } catch (error) {
    console.log(['ERROR_IN_MUSIC'], error);
    return new NextResponse('Internal server error!', { status: 500 });
  }
}
