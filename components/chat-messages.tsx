'use client';

import { Member } from '@prisma/client';
import ChatWelcome from './chat-welcome';
import useChatQuery from '@/hooks/use-chat-query';
import { Loader2, ServerCrash } from 'lucide-react';
import { Fragment } from 'react';
import { MessageWithMemberWithProfile } from '@/types';

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: 'channelId' | 'conversationId';
  paramValue: string;
  type: 'channel' | 'conversation';
}

const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketQuery,
  socketUrl,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey=`chat:${chatId}`;
  const {data,fetchNextPage,hasNextPage,isFetchingNextPage,status}=useChatQuery({
    apiUrl,
    paramKey,
    paramValue,
    queryKey
  });

  console.log(data)

  if(status==='loading') {
    return (
      <div className='flex flex-col flex-1 justify-center items-center'>
          <Loader2 className='w-7 h-7 animate-spin text-zinc-500 my-4'/>
          <p>Loading Messages...</p>
      </div>
    )
  }

  if(status==='error') {
    return (
      <div className='flex flex-col items-center justify-center flex-1'>
        <ServerCrash className='w-7 h-7 my-4'/>
        <p>Something went wrong</p>
      </div>
    )
  }
  return (
    <div className='flex flex-col py-4 gap-y-2 flex-1'>
    <div className='flex-1'/>
    <ChatWelcome type={type} name={name} />
    <div className='flex flex-col-reverse gap-y-2 overflow-y-auto'>
        {data?.pages.map((group,i)=>(
          <Fragment key={i}>
            {group.items.map((message: MessageWithMemberWithProfile)=>(
              <div key={message.id}>{message.content}</div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
};

export default ChatMessages;
