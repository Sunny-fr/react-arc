import {type Icon} from "@tabler/icons-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/layout/ui/sidebar"
import {NavLink, useLocation} from "react-router-dom";

export function NavMain({
                          items,
                        }: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">

        <SidebarMenu>
          {items.map((item) => {
            const isActive = location.pathname === item.url;
            return (

              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={isActive}
                  tooltip={item.title}
                  className="data-[slot=sidebar-menu-button]:!p-1.5"
                  asChild
                >
                  <NavLink
                    exact
                    to={item.url}
                  >
                    {item.icon && <item.icon/>}
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
