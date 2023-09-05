'use client';

import axios from 'axios'
import qs from 'query-string'
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
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';

import { useForm } from 'react-hook-form';
import FileUpload from '../file-upload';
import useModalStore from '@/hooks/use-modal-store';

const formSchema = z.object({
  fileUrl: z.string().min(1, { message: 'attachment is required' }),
});
const MessageFileModal = () => {
    const {isOpen,onClose,data,type}=useModalStore();
  const router=useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      fileUrl: '',
    },
    resolver: zodResolver(formSchema),
  });
  const isLoading = form.formState.isSubmitting;
  const isModalOpen= isOpen && type==='message-file';
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      const url=qs.stringifyUrl({
        url:data.apiUrl as string,
        query:data.query
      });
      await axios.post(url,{...values,content:values.fileUrl});
      form.reset();
      router.refresh();
      handleClose();
    }catch(err) {
      console.log(err);
    }
  };

  const handleClose=()=>{
    form.reset();
    onClose();
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black pt-8 px-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl text-center">
            Add an Attachment
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-center">
            Send a file as a message
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
                  name='fileUrl'
                  render={({field})=>(
                    <FormItem>
                      <FormControl>
                        <FileUpload
                        endpoint='messageFile'
                        onChange={field.onChange}
                        value={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="bg-gray-100 p-3">
                <Button disabled={isLoading} variant="primary">
                  Send
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageFileModal;
