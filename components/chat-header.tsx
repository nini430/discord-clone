import { Hash, Menu } from "lucide-react";
import MobileToggle from "./mobile-toggle";
import UserAvatar from "./user-avatar";
import SocketIndicator from "./socket-indicator";

interface ChatHeaderProps {
    serverId:string;
    imageUrl?:string;
    type:'channel'|'conversation';
    name:string;
}

const ChatHeader = ({serverId,imageUrl,type,name}:ChatHeaderProps) => {
  return (
    <div className="h-12 flex gap-x-2 items-center w-full font-semibold border-b border-b-neutral-500 px-3">
        <MobileToggle serverId={serverId}/>
        {type==='channel' && (
            <Hash className="mr-2 w-5 h-5 text-zinc-500"/>
        )}
        {type==='conversation' && (
          <UserAvatar src={imageUrl}/>
        )}
        <p className="font-semibold">{name}</p>
        <div className="flex items-center ml-auto">
            <SocketIndicator/>
        </div>
    </div>
  )
}

export default ChatHeader;