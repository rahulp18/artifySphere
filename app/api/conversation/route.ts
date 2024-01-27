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
    const { messages } = await req.json();
    const isPro = await checkoutSubscription();
    if (!userId) {
      return new NextResponse('Unauthorized!', { status: 401 });
    }
    if (!messages) {
      return new NextResponse('Message Required!', { status: 401 });
    }
    if (!openAi) {
      return new NextResponse('OpenAi API key not configured', { status: 401 });
    }

    const freeTrial = await checkApiLimit();
    if (!freeTrial && !isPro) {
      return new NextResponse(
        'Free trial has expired. Please upgrade to pro.',
        { status: 403 },
      );
    }
    const chatCompletion = await openAi.chat.completions.create({
      messages,
      model: 'gpt-3.5-turbo',
    });
    if (!isPro) {
      await incrementApiLimit();
    }
    return NextResponse.json(chatCompletion.choices[0].message);
  } catch (error) {
    console.log(['ERROR_IN_CONVERSATION'], error);
    return new NextResponse('Internal server error!', { status: 500 });
  }
}
