import ChatHeader from '@/components/chat-header';
import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import ChatInput from '@/components/chat-input';
import ChatMessages from '@/components/chat-messages';

interface ChannelIdProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }
  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      profileId: profile.id,
      serverId: params.serverId,
    },
  });

  if (!channel || !member) {
    return redirect('/');
  }

  return (
    <div className="bg-white dark:bg-[#313338] max-h-h-full h-full  flex flex-col">
      <ChatHeader
        serverId={channel.serverId}
        name={channel.name}
        type="channel"
      />
      <ChatMessages
        name={channel.name}
        member={member}
        type="channel"
        paramKey="channelId"
        paramValue={channel.id}
        apiUrl='/api/messages'
        chatId={channel.id}
        socketQuery={{channelId:channel.id,serverId:channel.serverId}}
        socketUrl='/api/socket/messages'
      />
      <ChatInput
        name={channel.name}
        apiUrl="/api/socket/messages"
        query={{ serverId: channel.serverId, channelId: channel.id }}
        type="channel"
      />
    </div>
  );
};

export default ChannelIdPage;
