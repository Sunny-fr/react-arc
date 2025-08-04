import React, {type PropsWithChildren} from 'react'
import './common.css'
import {SidebarInset, SidebarProvider,} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app-sidebar.tsx";

//import {Link} from 'react-router'
const ApplicationLayout:React.FC<PropsWithChildren> = ({children}) => {

    return (<SidebarProvider
      style={
          {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
      }
    >
        <AppSidebar variant="inset" />
        <SidebarInset>
            {children}
        </SidebarInset>
    </SidebarProvider>)
}
export  default  ApplicationLayout
