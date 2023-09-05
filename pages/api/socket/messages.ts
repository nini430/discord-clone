import currentProfile from '@/lib/current-profile-pages';
import { db } from '@/lib/db';
import { NextApiResponseServerIo } from '@/types';
import { NextApiRequest } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  try {
    const { fileUrl, content } = req.body;
    const { serverId, channelId } = req.query;
    const profile = await currentProfile(req);

    if (!profile) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    if (!serverId) {
      return res.status(400).json({ message: 'serverId is missing' });
    }

    if (!channelId) {
      return res.status(400).json({ message: 'channel Id is missing' });
    }

    if (!content) {
      return res.status(400).json({ message: 'content is missing' });
    }

    const server = await db.server.findUnique({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    });
    if (!server) {
      return res.status(404).json({ message: 'Server not found' });
    }

    const channel = await db.channel.findUnique({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });

    if (!channel) {
      return res.status(404).json({ message: 'channel not found' });
    }

    const member = server.members.find((item) => item.profileId === profile.id);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });
    const channelKey = `chat:${channelId}:messages`;
    res?.socket?.server?.io?.emit(channelKey, message);
    return res.status(201).json(message);
  } catch (err) {
    console.log('[MESSAGES_POST]', err);
    return res.status(500).json({ message: 'Internal error' });
  }
}
