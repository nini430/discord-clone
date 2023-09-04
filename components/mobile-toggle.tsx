import { Menu } from "lucide-react"
import {Sheet,SheetTrigger,SheetContent} from '@/components/ui/sheet'
import { Button } from "@/components/ui/button"
import NavigationSidebar from "./navigation-sidebar"
import ServerSidebar from "./server-sidebar"

const MobileToggle = ({serverId}:{serverId:string}) => {
  return (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant='ghost' size='icon' className="md:hidden">
                <Menu/>
            </Button>
        </SheetTrigger>
        <SheetContent className="flex p-0 gap-0" side='left'>
            <div className="w-[72px]">
                <NavigationSidebar/>
            </div>
            <ServerSidebar serverId={serverId}/>
        </SheetContent>
    </Sheet>
  )
}

export default MobileToggle