import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/db';
import { Message } from '@prisma/client';
import { NextResponse } from 'next/server';

const MESSAGE_BATCH = 10;

export async function GET(req: Request) {
  try {
    const profile=await currentProfile();
    const {searchParams}=new URL(req.url);
    const cursor=searchParams.get('cursor');
    const channelId=searchParams.get('channelId');

    if(!profile) {
        return new NextResponse('unauthorized',{status:401});
    }

    if(!channelId) {
        return new NextResponse('channelid is missing',{status:400});
    }

    let messages:Message[]=[];

    if(cursor) {
        messages=await db.message.findMany({
            where:{
                channelId
            },
            take:MESSAGE_BATCH,
            skip:1,
            cursor:{
                id:cursor
            },
            orderBy:{
                createdAt:'desc'
            },
            include:{
                member:{
                    include:{
                        profile:true
                    }
                }
            }
        })
    }else{
        messages=await db.message.findMany({
            where:{
                channelId
            },
            take:MESSAGE_BATCH,
            orderBy:{
                createdAt:'desc'
            },
            include:{
                member:{
                    include:{
                        profile:true
                    }
                }
            }
        })
    }

    let nextCursor=null;
    if(messages.length===MESSAGE_BATCH) {
        nextCursor=messages[MESSAGE_BATCH-1].id;
    }

    return NextResponse.json({items:messages,nextCursor});
  } catch (err) {
    console.log('[MESSAGES_GET]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
}
