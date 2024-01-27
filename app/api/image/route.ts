import OpenAi from 'openai';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { checkApiLimit, incrementApiLimit } from '@/lib/api-limit';
import { checkoutSubscription } from '@/lib/subscription';
const openAi = new OpenAi({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { prompt, amount = 1, resolution = '512x512' } = await req.json();
    if (!userId) {
      return new NextResponse('Unauthorized!', { status: 401 });
    }
    if (!prompt) {
      return new NextResponse('Prompt Required!', { status: 401 });
    }
    if (!resolution) {
      return new NextResponse('Resolution Required!', { status: 401 });
    }
    if (!amount) {
      return new NextResponse('Amount Required!', { status: 401 });
    }
    if (!openAi) {
      return new NextResponse('OpenAi API key not configured', { status: 401 });
    }
    const freeTrial = await checkApiLimit();
    const isPro = await checkoutSubscription();
    if (!freeTrial && !isPro) {
      return new NextResponse(
        'Free trial has expired. Please upgrade to pro.',
        { status: 403 },
      );
    }
    const response = await openAi.images.generate({
      //   model: 'dall-e-3',
      prompt: prompt,
      size: resolution,
      quality: 'standard',
      n: parseInt(amount, 10),
    });
    if (!isPro) {
      await incrementApiLimit();
    }
    return NextResponse.json(response.data);
  } catch (error) {
    console.log(['ERROR_IN_CONVERSATION'], error);
    return new NextResponse('Internal server error!', { status: 500 });
  }
}
