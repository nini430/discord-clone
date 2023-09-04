'use client';

import ActionTooltip from '@/components/action-tooltip';
import useModalStore from '@/hooks/use-modal-store';
import { cn } from '@/lib/utils';
import { Channel, ChannelType, MemberRole, Server } from '@prisma/client';
import { Edit, Hash, Mic, Trash, Video, Lock } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}
const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
  const {onOpen}=useModalStore();
  const params = useParams();
  const router = useRouter();
  const iconMap = {
    [ChannelType.TEXT]: <Hash className="w-4 h-4 mr-2" />,
    [ChannelType.AUDIO]: <Mic className="w-4 h-4 mr-2" />,
    [ChannelType.VIDEO]: <Video className="w-4 h-4 mr-2" />,
  };

  const Icon = iconMap[channel.type];
  const onClick=()=>{
    router.push(`/servers/${params?.serverId}/channels/${channel?.id}`);
  }
  return (
    <button
      onClick={onClick}
      className={cn(
        'group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700 transition',
        params?.channelId === channel.id ? 'bg-zinc-700' : ''
      )}
    >
      {Icon}
      {channel.name}
      {channel.name !== 'general' && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit" side="top">
            <Edit onClick={(e)=>{e.stopPropagation();onOpen('edit-channel',{channel,server})}} className="w-4 h-4 mr-2" />
          </ActionTooltip>
          <ActionTooltip label="Delete" side="top">
            <Trash onClick={(e)=>{e.stopPropagation();onOpen('delete-channel',{channel,server})}}  className="w-4 h-4 mr-2" />
          </ActionTooltip>
        </div>
      )}
      {channel.name==='general' && <Lock className='ml-auto w-4 h-4'/>}
    </button>
  );
};

export default ServerChannel;
