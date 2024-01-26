import OpenAi from 'openai';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { checkApiLimit, incrementApiLimit } from '@/lib/api-limit';
const openAi = new OpenAi({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const instructionMessage: any = {
  role: 'system',
  content:
    'You are a code generator. You must answer only markdown code snippets. Use code comment for explanations.',
};
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { messages } = await req.json();
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
    if (!freeTrial) {
      return new NextResponse(
        'Free trial has expired. Please upgrade to pro.',
        { status: 403 },
      );
    }
    const chatCompletion = await openAi.chat.completions.create({
      messages: [instructionMessage, ...messages],
      model: 'gpt-3.5-turbo',
    });
    await incrementApiLimit();
    return NextResponse.json(chatCompletion.choices[0].message);
  } catch (error) {
    console.log(['ERROR_IN_CODE'], error);
    return new NextResponse('Internal server error!', { status: 500 });
  }
}
