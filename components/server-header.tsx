'use client';
import { MemberRole } from '@prisma/client'

import { ServerWithMembersWithProfiles } from '@/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from 'lucide-react';
import useModalStore from '@/hooks/use-modal-store';


interface ServerHeaderProps {
    role?:MemberRole;
    server:ServerWithMembersWithProfiles;

}

const ServerHeader = ({role,server}:ServerHeaderProps) => {
    const isAdmin=role===MemberRole.ADMIN;
    const isModerator=isAdmin || role===MemberRole.MODERATOR;
    const {onOpen}=useModalStore();
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className='flex font-semibold text-white items-center  h-12 w-full transition hover:bg-zinc-700/30 px-3'>
                {server.name}
                <ChevronDown className='h-5 w-5 ml-auto'/>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent style={{width:'100%'}} className='text-background font-semibold w-full'>
            {isModerator && (
                <DropdownMenuItem onClick={()=>onOpen('invite',{server})} className='text-indigo-600 w-full cursor-pointer dark:text-indigo-400 px-3 py-2'>
                        Invite People
                        <UserPlus className='w-5 h-5 ml-auto'/>
                </DropdownMenuItem>
            )}
            {isAdmin && (
                <DropdownMenuItem onClick={()=>onOpen('edit-server',{server})} className=' w-full text-white  cursor-pointer px-3 py-2'>
                        Server Settings 
                        <Settings className='w-5 h-5 ml-3'/>
                </DropdownMenuItem>
            )}
            {isAdmin && (
                <DropdownMenuItem onClick={()=>onOpen('members',{server})} className=' w-full text-white  cursor-pointer px-3 py-2'>
                        Manage Members 
                        <Users className='w-5 h-5 ml-3'/>
                </DropdownMenuItem>
            )}
            {isModerator && (
                <DropdownMenuItem className=' w-full text-white  cursor-pointer px-3 py-2'>
                        Create Channel
                        <PlusCircle className='w-5 h-5 ml-3'/>
                </DropdownMenuItem>
            )}
            {isModerator && <DropdownMenuSeparator/>}
            {isAdmin && (
                <DropdownMenuItem className=' w-full  text-rose-500  cursor-pointer px-3 py-2'>
                        Delete Server
                        <Trash className='w-5 h-5 ml-3'/>
                </DropdownMenuItem>
            )}
            {
                !isAdmin && (
                    <DropdownMenuItem className=' w-full  text-rose-500  cursor-pointer px-3 py-2'>
                    Leave Server
                    <LogOut className='w-5 h-5 ml-3'/>
            </DropdownMenuItem>   
                )
            }
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ServerHeader