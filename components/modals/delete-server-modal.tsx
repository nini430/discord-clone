'use client';

import axios from 'axios';
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
import { useRouter } from 'next/navigation';

const DeleteServerModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { type, isOpen, onClose, data } = useModalStore();
  const isModalOpen = isOpen && type === 'delete-server';

  const { server } = data;

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/servers/${server?.id}`);

      router.refresh();
      onClose();
      router.push('/');
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
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-indigo-500">
              {server?.name}
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

export default DeleteServerModal;
