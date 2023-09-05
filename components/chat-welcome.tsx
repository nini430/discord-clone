import { Hash } from 'lucide-react';
import React from 'react';

interface ChatWelcomeProps {
  name: string;
  type: 'channel' | 'conversation';
}

const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return (
    <div className="mb-4 px-4 space-y-2">
      {type === 'channel' && (
        <div className="w-[75px] h-[75px] flex justify-center items-center rounded-full bg-zinc-500 text-white">
          <Hash className="w-12 h-12" />
        </div>
      )}
      <p>
        {type === 'channel' ? 'Welcome To #' : ''} {name}
      </p>
      <p className="font-semibold text-zinc-400">
        {type === 'channel'
          ? `This is the start of the channel  #${name}`
          : `This is the start of the conversation with ${name}`}
      </p>
    </div>
  );
};

export default ChatWelcome;
