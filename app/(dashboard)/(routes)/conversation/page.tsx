'use client';
import Heading from '@/components/heading';
import { MessageSquare } from 'lucide-react';
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
import { useRouter } from 'next/navigation';
import { useProModal } from '@/hooks/use-pro-modal';
const Conversation = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });
  const [messages, setMessages] = useState<any[]>([]);
  const isLoading = form.formState.isSubmitting;
  const router = useRouter();
  const proModal = useProModal();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: any = {
        content: values.prompt,
        role: 'user',
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post('/api/conversation', {
        messages: newMessages,
      });
      setMessages(current => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      // OPEN PRO MODEL
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  };
  return (
    <div className="pb-12">
      <Heading
        title="Conversation"
        description="Our most advanced conversation model"
        icon={MessageSquare}
        bgColor="bg-blue-500/10"
        iconColor="text-blue-500"
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
                        placeholder="How do i calculate area of a circle ?"
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
        <div className="space-y-4  mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length == 0 && !isLoading && (
            <Empty label="No Conversation Found" />
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
                <p className="text-sm">{message?.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
