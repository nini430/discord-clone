'use client';

import * as z from 'zod';
import qs from 'query-string';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Plus, Smile } from 'lucide-react';
import { Input } from './ui/input';

interface ChatInputProps {
  name: string;
  type: 'channel' | 'conversation';
  apiUrl: string;
  query: Record<string, any>;
}

const formSchema = z.object({
  content: z.string().min(1),
});

const ChatInput = ({ name, type, apiUrl, query }: ChatInputProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });
      await axios.post(url, values);
    } catch (err) {
      console.log(err);
    }
  };
  const isLoading = form.formState.isSubmitting;
  return (
    <div className="pb-6">
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <button
                      disabled={isLoading}
                      className="flex items-center h-[24px] w-[24px] justify-center rounded-full  absolute top-4 left-5 bg-zinc-500"
                    >
                      <Plus />
                    </button>
                    <Input
                      {...field}
                      placeholder={`Message ${
                        type === 'conversation' ? name : `#${name}`
                      }`}
                      disabled={isLoading}
                      className="px-14 py-9"
                    />
                    <button
                      disabled={isLoading}
                      className="flex items-center justify-center bg-zinc-500 rounded-full absolute right-5 top-4"
                    >
                      <Smile />
                    </button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;
