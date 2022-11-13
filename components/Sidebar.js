import React from 'react';
import {CalendarIcon, ClockIcon,DesktopComputerIcon, UserIcon} from "@heroicons/react/solid"
import { ChevronDownIcon,ShoppingBagIcon, UserGroupIcon} from "@heroicons/react/outline"
import { useSession, signIn, signOut } from "next-auth/react"
import SidebarRow from './SidebarRow';
function Sidebar() {
    const { data: session, data:loading } = useSession();
  return (
    <div className='p-2 mt-5 max-w-[600px] xl:main-w-[300px]'>
      <SidebarRow src={session.user.image} title={session.user.name}/>
      <SidebarRow Icon={UserIcon} title="Amigos"/>
      <SidebarRow Icon={UserGroupIcon} title="Grupos"/>
      <SidebarRow Icon={ShoppingBagIcon} title="Marketplace"/>
      <SidebarRow Icon={DesktopComputerIcon} title="Vídeos"/>
      <SidebarRow Icon={CalendarIcon} title="Eventos"/>
      <SidebarRow Icon={ClockIcon} title="Memórias"/>
      <SidebarRow Icon={ChevronDownIcon} title="Ver Mais "/>

    </div>
  );
}

export default Sidebar;
