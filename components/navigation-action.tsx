'use client'

import { Plus } from "lucide-react"
import ActionTooltip from "./action-tooltip"

const NavigationAction = () => {
  return (
    <ActionTooltip align="center" label="Create a server" side="right">
       <div className="flex justify-center">
        <button className="group flex items-center justify-center">
            <div className="flex justify-center text-white items-center w-[48px] h-[48px] rounded-[24px] bg-neutral-500 group-hover:bg-emerald-500 transition-all  group-hover:rounded-[16px]">
                <Plus size={25}/> 
                </div>
                  
        </button>
    </div>
    </ActionTooltip>
   
  )
}

export default NavigationAction