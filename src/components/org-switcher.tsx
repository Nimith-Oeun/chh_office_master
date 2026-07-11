'use client';

import { Icons } from '@/components/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';

const organizations = [
  {
    id: '1',
    name: 'My Workspace',
    role: 'Owner',
    imageUrl: null
  },
  {
    id: '2',
    name: 'Development',
    role: 'Admin',
    imageUrl: null
  }
];

export function OrgSwitcher() {
  const { isMobile, state } = useSidebar();
  const router = useRouter();

  const [activeOrgId, setActiveOrgId] = useState('1');

  const activeOrganization =
    organizations.find((org) => org.id === activeOrgId) ?? organizations[0];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg'>
                {activeOrganization.imageUrl ? (
                  <Image
                    src={activeOrganization.imageUrl}
                    alt={activeOrganization.name}
                    width={32}
                    height={32}
                    className='size-full object-cover'
                  />
                ) : (
                  <Icons.galleryVerticalEnd className='size-4' />
                )}
              </div>

              <div
                className={`grid flex-1 text-left text-sm leading-tight transition-all duration-200 ease-in-out ${
                  state === 'collapsed'
                    ? 'invisible max-w-0 overflow-hidden opacity-0'
                    : 'visible max-w-full opacity-100'
                }`}
              >
                <span className='truncate font-medium'>
                  {activeOrganization.name}
                </span>
                <span className='text-muted-foreground truncate text-xs'>
                  {activeOrganization.role}
                </span>
              </div>

              <Icons.chevronsUpDown
                className={`ml-auto transition-all duration-200 ease-in-out ${
                  state === 'collapsed'
                    ? 'invisible max-w-0 opacity-0'
                    : 'visible max-w-full opacity-100'
                }`}
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-muted-foreground text-xs'>
              Organizations
            </DropdownMenuLabel>

            {organizations.map((org, index) => (
              <DropdownMenuItem
                key={org.id}
                onClick={() => setActiveOrgId(org.id)}
                className='gap-2 p-2'
              >
                <div className='flex size-6 items-center justify-center rounded-md border'>
                  <Icons.galleryVerticalEnd className='size-3.5' />
                </div>

                {org.name}

                {activeOrgId === org.id ? (
                  <Icons.check className='ml-auto size-4' />
                ) : (
                  <DropdownMenuShortcut>
                    ⌘{index + 1}
                  </DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className='gap-2 p-2'
              onClick={() => router.push('/dashboard/overview')}
            >
              <div className='flex size-6 items-center justify-center rounded-md border'>
                <Icons.add className='size-4' />
              </div>

              <div className='text-muted-foreground font-medium'>
                Add organization
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}