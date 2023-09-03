'use client';

import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from './ui/command';
import { CommandGroup } from 'cmdk';
import { useParams, useRouter } from 'next/navigation';

interface ServerSearchProps {
  data: {
    label: string;
    type: 'channel' | 'member';
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

const ServerSearch = ({ data }: ServerSearchProps) => {
  const [open, setOpen] = useState(false);
  const router=useRouter();
  const params=useParams();

    
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        setOpen(!open);
      };
    };

    document.addEventListener('keydown',down);

    return()=>{
        document.removeEventListener('keydown',down);
    }
  }, [open]);

  const onClick=(id:string,type:'channel'|'member')=>{
    setOpen(false);
    if(type==='channel') {
        return router.push(`/servers/${params?.serverId}/channels/${id}`)
    }else if(type==='member') {
        return router.push(`/servers/${params?.serverId}/conversations/${id}`)
    }
  }
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex px-2 py-2 w-full rounded-md  items-center gap-x-2 hover:bg-zinc-700 transition group"
      >
        <Search />
        <p>Search...</p>
        <kbd className="ml-auto border-[1px] border-zinc-500 p-1">Ctrl+K</kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members" />
        <CommandList className="p-2">
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data.map(({ icon, id, name }) => {
                  return (
                    <CommandItem onSelect={()=>onClick(id,type)} key={id}>
                      {icon}
                      <p>{name}</p>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default ServerSearch;
