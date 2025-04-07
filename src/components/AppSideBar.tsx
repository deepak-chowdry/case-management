import {
  BriefcaseBusiness,
  HelpCircle,
  IndianRupee,
  LayoutDashboard,
  Settings,
  Users2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SelectedTeamSwitcher, UserButton } from "@stackframe/stack";
import Link from "next/link";

// Menu items.
const main = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Timeline",
    url: "/dashboard/timeline",
    icon: BriefcaseBusiness,
  },
  {
    title: "Teams",
    url: "/dashboard/teams",
    icon: Users2,
  },
  {
    title: "Billing",
    url: "/dashboard/billing",
    icon: IndianRupee,
  },
];

const general = [
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Help",
    url: "#",
    icon: HelpCircle,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        {/* <Image src={"/AJ_logo.svg"} alt="" width={100} height={100} /> */}
        <SelectedTeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="space-x-2 h-9">
                      <item.icon strokeWidth={1.5} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {general.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="space-x-2 h-9">
                      <item.icon strokeWidth={1.5} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserButton showUserInfo />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
