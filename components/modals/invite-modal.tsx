'use client';

import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import useModalStore from '@/hooks/use-modal-store';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import useOrigin from '@/hooks/use-origin';
import { useState } from 'react';

const InviteModal = () => {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { type, isOpen, onClose, data,onOpen } = useModalStore();
  const isModalOpen = isOpen && type === 'invite';
  const origin = useOrigin();

  const { server } = data;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  const onNew=async()=>{
    try{
    setIsLoading(true);
    const response=await axios.patch(`/api/servers/${server?.id}/invite-code`);
    onOpen('invite',{server:response.data});
    }catch(err) {
        console.log(err);
    }finally {
        setIsLoading(false);
    }
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black pt-8 px-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-center font-bold text-2xl">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 flex flex-col gap-y-4">
          <Label className="uppercase text-zinc-500 dark:text-zinc-500/90 font-bold">
            server invitation link
          </Label>
          <div className="flex items-center gap-x-5">
            <Input disabled={isLoading} className="bg-zinc-300/40" value={inviteUrl} />
            <Button disabled={isLoading} onClick={onCopy} size="icon">
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            disabled={isLoading}
          onClick={onNew}
            variant="link"
            className="mt-4 flex items-center text-gray-500"
          >
            Generate A new Link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
