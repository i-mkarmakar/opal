"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CrownIcon, CreditCardIcon } from "@/components/global/inline-icons";
import { LogOut } from "@/components/animate-ui/icons/log-out";
import { LayoutDashboard } from "@/components/animate-ui/icons/layout-dashboard";
import { MessageCircle } from "@/components/animate-ui/icons/message-circle";
import { List } from "@/components/animate-ui/icons/list";
import { Layers } from "@/components/animate-ui/icons/layers";
import { Settings } from "@/components/animate-ui/icons/settings";
import { EllipsisVertical } from "@/components/animate-ui/icons/ellipsis-vertical";
import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsage } from "@/components/providers/usage-provider";
import { SITE_NAME } from "@/lib/constants";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  SidebarMenuSkeleton,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Chat", url: "/chat", icon: MessageCircle },
  { title: "Logs", url: "/logs", icon: List },
  { title: "Rules", url: "/rules", icon: Layers },
  { title: "Settings", url: "/settings", icon: Settings },
];

const activeDashboardStyles =
  "bg-gradient-to-b from-primary to-[color-mix(in_srgb,var(--primary)_55%,black)] text-white hover:text-white active:text-white hover:opacity-95 active:opacity-90";

export function AppSidebar() {
  const pathname = usePathname();
  const { user, isLoaded: isUserLoaded } = useUser();
  const { signOut } = useClerk();
  const { usage, loading: usageLoading } = useUsage();
  const { isMobile } = useSidebar();

  const isPro = usage?.plan === "PRO";
  const isSidebarLoading = !isUserLoaded || usageLoading;

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {isSidebarLoading ? (
              <div className="flex items-center gap-2 p-1.5">
                <Skeleton className="h-8 w-24 rounded-md" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-3.5 w-20" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
            ) : (
              <SidebarMenuButton
                asChild
                size="lg"
                className="data-[slot=sidebar-menu-button]:p-1.5!"
              >
                <Link href="/dashboard">
                  <Image
                    src="/logo.png"
                    alt={SITE_NAME}
                    width={160}
                    height={40}
                    className="h-8 w-auto shrink-0 object-contain object-left"
                    priority
                  />
                  <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{SITE_NAME}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      AI code reviews
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {isSidebarLoading ? (
              <Skeleton className="h-3.5 w-20" />
            ) : (
              "Navigation"
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {isSidebarLoading ? (
              <SidebarMenu>
                {Array.from({ length: menuItems.length }).map((_, i) => (
                  <SidebarMenuItem key={`nav-skeleton-${i}`}>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            ) : (
              <SidebarMenu>
                {menuItems.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        className={isActive ? activeDashboardStyles : ""}
                      >
                        <Link href={item.url}>
                          <item.icon size={16} animateOnHover />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>
            {isSidebarLoading ? (
              <Skeleton className="h-3.5 w-16" />
            ) : (
              "Usage"
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {isSidebarLoading ? (
              <div className="px-2 space-y-3">
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            ) : usage ? (
              <div className="px-2 space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Chat Messages</span>
                    <span className="font-medium tabular-nums">
                      {usage.chatMessagesUsed}/{usage.limits[usage.plan].chat}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full">
                    <div
                      className="h-1.5 rounded-full bg-primary transition-all"
                      style={{
                        width: `${Math.min((usage.chatMessagesUsed / usage.limits[usage.plan].chat) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CrownIcon className="size-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium">
                    {isPro ? "Pro Plan" : "Free Plan"}
                  </span>
                </div>
                <Link href="/settings" className="block">
                  <Button
                    size="sm"
                    className={`w-full ${
                      isPro
                        ? ""
                        : `${activeDashboardStyles} shadow-[0_8px_20px_-10px_hsl(var(--primary)/0.9)]`
                    }`}
                  >
                    {isPro ? "Manage Subscription" : "Upgrade to Pro"}
                  </Button>
                </Link>
              </div>
            ) : null}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {isSidebarLoading || !user ? (
          <div className="flex items-center gap-2 px-1 py-1.5">
            <Skeleton className="size-8 rounded-lg" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="size-8 rounded-lg">
                      <AvatarImage
                        src={user.imageUrl}
                        alt={user.fullName || "User"}
                      />
                      <AvatarFallback className="rounded-lg">
                        {user.primaryEmailAddress?.emailAddress
                          ?.charAt(0)
                          .toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {user.fullName ||
                          user.primaryEmailAddress?.emailAddress}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {user.primaryEmailAddress?.emailAddress}
                      </span>
                    </div>
                    <EllipsisVertical size={16} className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="size-8 rounded-lg">
                        <AvatarImage
                          src={user.imageUrl}
                          alt={user.fullName || "User"}
                        />
                        <AvatarFallback className="rounded-lg">
                          {user.primaryEmailAddress?.emailAddress
                            ?.charAt(0)
                            .toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                          {user.fullName ||
                            user.primaryEmailAddress?.emailAddress}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {user.primaryEmailAddress?.emailAddress}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">
                        <CreditCardIcon className="size-4" />
                        Billing & Plan
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">
                        <Settings size={16} />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut({ redirectUrl: "/" })}
                  >
                    <LogOut size={16} />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
