import { Channel, Member, Message, Profile, Server } from "@prisma/client";

import {Socket,Server as NetServer} from 'net'
import {NextApiResponse} from 'next'
import {Server as SocketIoServer} from 'socket.io'


export type ServerWithMembersWithProfiles=Server & {
    members: (Member & {profile:Profile})[];
    channels: Channel[]
}


export type NextApiResponseServerIo= NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
        io: SocketIoServer
    }
  }
}

export type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile:Profile
  }
}


