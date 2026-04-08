'use client';

import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { mainNav, aiToolsNav, secondaryNav } from '@/lib/data';
import { UserNav } from '@/components/user-nav';
import { Separator } from '@/components/ui/separator';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { items: mainNav },
    { label: 'AI Tools', items: aiToolsNav },
    { label: 'More', items: secondaryNav },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            {navItems.map((group, groupIndex) => (
              <div key={groupIndex}>
                {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
                <SidebarMenu>
                  {group.items.map((item, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={{ children: item.title, side: 'right' }}
                      >
                        <a href={item.href}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
                {groupIndex < navItems.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </SidebarContent>
          <SidebarFooter>
            <UserNav />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
             <SidebarTrigger className="md:hidden" />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
