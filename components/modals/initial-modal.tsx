'use client';

import axios from 'axios'
import * as z from 'zod';
import {useRouter} from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod';

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
  FormItem,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import FileUpload from '../file-upload';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Server name is required' }),
  imageUrl: z.string().min(1, { message: 'server image is required' }),
});
const InitialModal = () => {
  const router=useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
      imageUrl: '',
    },
    resolver: zodResolver(formSchema),
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      await axios.post('/api/servers',values);
      form.reset();
      router.refresh();
      window.location.reload();
    }catch(err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Dialog open>
      <DialogContent className="bg-white text-black pt-8 px-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl text-center">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-center">
            Give your server a personality by setting name and image. you can
            always update them later
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8">
          <Form {...form}>
            <form
              className="space-y-8"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <div className="flex items-center justify-center">
                <FormField
                  control={form.control}
                  name='imageUrl'
                  render={({field})=>(
                    <FormItem>
                      <FormControl>
                        <FileUpload
                        endpoint='serverImage'
                        onChange={field.onChange}
                        value={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-zinc-500">
                      Server Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter Server Name"
                        {...field}
                        className="border-0 bg-zinc-300/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="bg-gray-100 p-3">
                <Button disabled={isLoading} variant="primary">
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InitialModal;
