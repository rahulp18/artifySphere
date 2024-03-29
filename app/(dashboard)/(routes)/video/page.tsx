'use client';
import Heading from '@/components/heading';
import { Video } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { formSchema } from './constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import axios from 'axios';
import Empty from '@/components/empty';
import Loader from '@/components/loader';
import { useRouter } from 'next/navigation';
import { useProModal } from '@/hooks/use-pro-modal';
import toast from 'react-hot-toast';

const VideoPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });
  const proModal = useProModal();
  const [video, setVideo] = useState<string>();
  const isLoading = form.formState.isSubmitting;
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('/api/video', values);
      setVideo(response.data[0]);
      form.reset();
    } catch (error: any) {
      // OPEN PRO MODEL
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error('Your Free plan is expired');
      }
      console.log(error);
    } finally {
      router.refresh();
    }
  };
  return (
    <div className="pb-12">
      <Heading
        title="Video Generation"
        description="Turn your prompt into video"
        icon={Video}
        bgColor="bg-pink-500/10"
        iconColor="text-pink-500"
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
                        placeholder="Clown fish swimming around a coral reef"
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
          {!video && !isLoading && <Empty label="No Video generated" />}
          {video && (
            <video
              controls
              className="w-full aspect-video mt-8 rounded-lg border bg-black"
            >
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
