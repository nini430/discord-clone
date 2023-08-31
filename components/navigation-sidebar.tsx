import currentProfile from '@/lib/current-profile';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import NavigationAction from './navigation-action';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import NavigationItem from './navigation-item';
import { ModeToggle } from './mode-toggle';
import { UserButton } from '@clerk/nextjs';

const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className="relative flex flex-col space-y-4  py-3 w-full h-full dark:bg-[#1e1f22]">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md mx-auto " />
      <ScrollArea className='flex-1'>
        {servers.map((server) => (
          <div className="mb-4" key={server.id}>
            <NavigationItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))}
      </ScrollArea>
      <div className='pb-4 flex flex-col items-center gap-y-4'>
          <ModeToggle/>
          <UserButton afterSignOutUrl='/' appearance={{elements:{avatarBox:'w-[48px] h-[48px]'}}}/>
      </div>
    </div>
  );
};

export default NavigationSidebar;
