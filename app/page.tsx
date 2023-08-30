import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  const state=true;
  return (
    <div>
      <p className="text-3xl font-bold text-indigo-500">
      Hello Discord Clone
    </p>
    <Button className={cn('text-primary bg-indigo-500',state && 'bg-red-500')}>Click Me</Button>
    </div>
    
  )
}
