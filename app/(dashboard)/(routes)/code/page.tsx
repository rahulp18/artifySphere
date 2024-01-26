'use client';
import Heading from '@/components/heading';
import { Code, MessageSquare } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { formSchema } from './constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import openAi from 'openai';
import axios from 'axios';
import Empty from '@/components/empty';
import Loader from '@/components/loader';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/user-avatar';
import { BotAvatar } from '@/components/bot-avatar';
import ReactMarkDown from 'react-markdown';
import { useRouter } from 'next/navigation';
import { useProModal } from '@/hooks/use-pro-modal';
const CodePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });
  const proModal = useProModal();
  const [messages, setMessages] = useState<any[]>([]);
  const isLoading = form.formState.isSubmitting;
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: any = {
        content: values.prompt,
        role: 'user',
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post('/api/code', {
        messages: newMessages,
      });
      setMessages(current => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      // OPEN PRO MODEL
      // OPEN PRO MODEL
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  };
  return (
    <div className="">
      <Heading
        title="Code Generation"
        description="Generate Code using descriptive text"
        icon={Code}
        bgColor="bg-green-500/10"
        iconColor="text-green-500"
      />
      <div className="px-4 lg:px-8">
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full py-3 px-3 md:px-4 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        {...field}
                        disabled={isLoading}
                        placeholder="Simple toggle button using react hooks."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 pb-12 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length == 0 && !isLoading && (
            <Empty label="No Code Search Found" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                className={cn(
                  'p-8 w-full flex items-start gap-x-8 rounded-lg',
                  message.role === 'user'
                    ? 'bg-white border border-black/10'
                    : 'bg-muted',
                )}
                key={index}
              >
                {message.role == 'user' ? <UserAvatar /> : <BotAvatar />}
                <ReactMarkDown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    ),
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {message.content || ''}
                </ReactMarkDown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
