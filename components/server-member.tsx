'use client';

import { cn } from '@/lib/utils';
import { Member, MemberRole, Profile, Server } from '@prisma/client';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import UserAvatar from './user-avatar';

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const ServerMember = ({ member, server }: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${server?.id}/conversations/${member.id}`);
  };

  const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.ADMIN]: <ShieldAlert className="w-5 h-5 mr-2 text-rose-500" />,
    [MemberRole.MODERATOR]: (
      <ShieldCheck className="w-5 h-5 mr-2 text-indigo-500" />
    ),
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-x-2 px-2 py-2 hover:bg-zinc-700/20 transition',
        params?.memberId === member.id && 'bg-zinc-700/50'
      )}
    >
      {roleIconMap[member.role]}
      <UserAvatar src={member.profile.imageUrl} />
      <p className="font-semibold text-md">{member.profile.name}</p>
    </button>
  );
};

export default ServerMember;
