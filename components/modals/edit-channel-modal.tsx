'use client';

import qs from 'query-string';
import axios from 'axios';
import * as z from 'zod';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogContent,
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import useModalStore from '@/hooks/use-modal-store';
import { ChannelType } from '@prisma/client';
import { useEffect } from 'react';

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Channel name is required' })
    .refine((name) => name !== 'general', {
      message: "Channal name cannot be 'general'",
    }),
  type: z.nativeEnum(ChannelType),
});
const EditChannelModal = () => {
  const { type, isOpen, onClose, data } = useModalStore();
  const { channel, server } = data;
  const router = useRouter();
  const params = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
      type: ChannelType.TEXT,
    },
    resolver: zodResolver(formSchema),
  });
  const isModalOpen = isOpen && type === 'edit-channel';
  const isLoading = form.formState.isSubmitting;

  

  useEffect(()=>{
    if(channel) {
      form.setValue('name',channel.name);
      form.setValue('type',channel.type);
    }
  },[channel,form])

  const handleClose = () => {
    form.reset();
    onClose();
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try{
        const url=qs.stringifyUrl({
          url:`/api/channels/${channel?.id}`,
          query:{
            serverId:server?.id
          }
        })
        await axios.patch(url,values);

        onClose();
        router.refresh();
      }catch(err) {
        console.log(err);
      }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black pt-8 px-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl text-center">
            Edit Channel
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-8">
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
                    <FormLabel className="text-xs font-bold uppercase text-zinc-500">
                      Channel Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter Channel Name"
                        {...field}
                        className="border-0 bg-zinc-300/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs text-zinc-500 font-bold">
                      Channel Type
                    </FormLabel>

                    <Select
                      disabled={isLoading}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-zinc-300/50 focus:outline-none">
                          <SelectValue placeholder="Select channel type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem
                            value={type}
                            className="capitalize"
                            key={type}
                          >
                            {type.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <DialogFooter className="bg-gray-100 p-3">
                <Button disabled={isLoading} variant="primary">
                  Edit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditChannelModal;
