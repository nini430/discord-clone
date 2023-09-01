import NavigationSidebar from '@/components/navigation-sidebar';
import React from 'react';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return <div className='h-full'>
    <div className='hidden fixed md:flex w-[72px] h-full'>
    <NavigationSidebar/>
    </div>
    <main className='h-full md:pl-[72px]'>
    {children}
    </main>
   
  </div>;
};

export default MainLayout;
