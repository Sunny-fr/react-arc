import * as React from "react"
import {IconLibraryPhoto, IconAt, IconTopologyRing2,} from "@tabler/icons-react"


import {NavMain} from "@/components/nav-main"

import {NavUser} from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/layout/ui/sidebar"
import {Link} from "react-router-dom";

const data = {
  user: {
    name: "John Smith",
    email: "john@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Portfolio",
      url: '/',
      icon: IconLibraryPhoto,
    },
    {
      title: "Contact",
      url: "/contact",
      icon: IconAt,
    },

  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/">
                <IconTopologyRing2 className="!size-5 animated rotateIn" />
                <span className="text-base font-semibold">React ARC</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
