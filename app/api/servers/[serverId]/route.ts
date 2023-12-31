import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(req:Request,{params}:{params:{serverId:string}}) {
  try{
    const profile=await currentProfile();

    if(!profile) {
      return new NextResponse('unauthorized',{status:401});
    }

    if(!params.serverId) {
      return new NextResponse('server id is missing',{status:400});
    }

    const server=await db.server.deleteMany({
      where:{
        id:params.serverId,
        profileId:profile.id
      }
    })
    return NextResponse.json(server);
  }catch(err) {
    console.log('[SERVER_DELETE]',err);
    return new NextResponse('internal error',{status:500});
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const { imageUrl, name } = await req.json();
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse('Missing serverId', { status: 400 });
    }
    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });
    return NextResponse.json(server);
  } catch (err) {
    console.log('[SERVER_PATCH]', err);
    return new NextResponse('internal error', { status: 500 });
  }
}
