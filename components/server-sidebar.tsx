import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/db';
import { ChannelType, MemberRole } from '@prisma/client';
import { redirect } from 'next/navigation';
import ServerHeader from './server-header';
import { ScrollArea } from './ui/scroll-area';
import ServerSearch from './server-search';
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react';
import { Separator } from './ui/separator';
import ServerSection from './server-section';
import ServerChannel from '@/prisma/server-channel';
import ServerMember from './server-member';

interface ServerSidebarProps {
  serverId: string;
}

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect('/');
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  });

  if (!server) {
    return redirect('/');
  }

  const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 w-4 h-4" />,
    [ChannelType.AUDIO]: <Mic className="mr-2 w-4 h-4" />,
    [ChannelType.VIDEO]: <Video className="mr-2 w-4 h-4" />,
  };

  const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: (
      <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
    ),
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />,
  };

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  const role = server?.members.find(
    (member) => member.profileId === profile.id
  )?.role;
  return (
    <div className="w-full h-full bg-[#f2f3f5] dark:bg-[#2b2d31] flex flex-col">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: 'Text channels',
                type: 'channel',
                data: textChannels.map((channel) => ({
                  id: channel.id,
                  icon: iconMap[channel.type],
                  name: channel.name,
                })),
              },
              {
                label: 'Audio Channels',
                type: 'channel',
                data: audioChannels.map((channel) => ({
                  id: channel.id,
                  icon: iconMap[channel.type],
                  name: channel.name,
                })),
              },
              {
                label: 'Video Channels',
                type: 'channel',
                data: videoChannels.map((channel) => ({
                  id: channel.id,
                  icon: iconMap[channel.type],
                  name: channel.name,
                })),
              },
              {
                label: 'Members',
                type: 'member',
                data: members.map((member) => ({
                  id: member.id,
                  icon: roleIconMap[member.role],
                  name: member.profile.name,
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-700" />
        {!!textChannels.length && (
          <ServerSection
            label="Text Channels"
            channeltype={ChannelType.TEXT}
            sectionType="channels"
            server={server}
            role={role}
          />
        )}
        {textChannels.map((channel) => {
          return (
            <ServerChannel
              key={channel.id}
              channel={channel}
              role={role}
              server={server}
            />
          );
        })}
        {!!audioChannels.length && (
          <ServerSection
            label="Audio Channels"
            channeltype={ChannelType.AUDIO}
            sectionType="channels"
            role={role}
            server={server}
          />
        )}
        {audioChannels?.map((channel) => {
          return (
            <ServerChannel
              key={channel.id}
              channel={channel}
              role={role}
              server={server}
            />
          );
        })}

        {!!videoChannels.length && (
          <ServerSection
            label="Video channels"
            channeltype={ChannelType.VIDEO}
            role={role}
            sectionType="channels"
            server={server}
          />
        )}

        {videoChannels.map((channel) => (
          <ServerChannel
            channel={channel}
            server={server}
            key={channel.id}
            role={role}
          />
        ))}
        {!!members.length && (
          <ServerSection
            label="Members"
            role={role}
            sectionType="members"
            server={server}
          />
        )}
        {members.map(member=>{
            return (
                <ServerMember member={member} server={server} key={member.id} />
            )
        })}
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
