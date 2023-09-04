'use client';

import axios from 'axios';
import qs from 'query-string';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import useModalStore from '@/hooks/use-modal-store';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const DeleteChannelModal = () => {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { type, isOpen, onClose, data } = useModalStore();
  const isModalOpen = isOpen && type === 'delete-channel';

  const { channel, server } = data;

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });

      await axios.delete(url);
      onClose();
      router.refresh();
      router.push(`/servers/${server?.id}`);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black pt-8 px-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-center font-bold text-2xl">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-indigo-500">
              #{channel?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center w-full justify-between">
            <Button onClick={onClose} variant="ghost" disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onClick} disabled={isLoading}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannelModal;
