'use client';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import ActionTooltip from './action-tooltip';

interface NavigationItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

const NavigationItem = ({ id, name, imageUrl }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();
  const onClick=()=>{
    router.push(`/servers/${id}`)
  }
  return (
    <ActionTooltip align="center" side="right" label={name}>
      <div onClick={onClick} className="mx-3 group">
        <button className="flex items-center group">
          <div
            className={cn(
              'absolute w-[4px] bg-primary left-0',
              params.serverId !== id && 'group-hover:h-[20px]',
              params.serverId === id ? 'h-[36px]' : 'h-[8px]'
            )}
          />
          <div
            className={cn(
              'w-[48px] h-[48px] relative rounded-[24px] group-hover:rounded-[16px] transition-all group-hover:bg-neutral-500',
              params.serverId === id && 'rounded-[16px]'
            )}
          >
            <Image src={imageUrl} fill className="rounded-full" alt="server" />
          </div>
        </button>
      </div>
    </ActionTooltip>
  );
};

export default NavigationItem;
