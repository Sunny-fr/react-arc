import {Avatar, AvatarFallback, AvatarImage,} from "@/layout/ui/avatar"
import {DropdownMenu, DropdownMenuTrigger,} from "@/layout/ui/dropdown-menu"
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem,} from "@/layout/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">LD</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>

            </SidebarMenuButton>
          </DropdownMenuTrigger>

        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
