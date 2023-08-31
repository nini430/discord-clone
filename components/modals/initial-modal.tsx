'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  name: z.string().min(1, { message: 'server name is required' }),
  imageUrl: z.string().min(1, { message: 'server image is required' }),
});
const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
      imageUrl: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Dialog open>
      <DialogContent className="bg-white text-black pt-8 px-6">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-zinc-500  text-center">
            Give your server a profile by setting name and image. you can always
            update them later.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8">
          <div className="flex space-y-2 items-ceter justify-center">
            TODO: Upload Server Image
          </div>
          <Form {...form}>
            <form
              className="space-y-8"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs text-zinc-500 font-bold">
                      Server Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        {...field}
                        placeholder="Enter Server name"
                        className="border-0 bg-zinc-300/20 focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="p-3 bg-gray-100">
                <Button variant="primary">Create</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InitialModal;
