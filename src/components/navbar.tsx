'use client';

import { Session } from 'next-auth';
import dynamic from 'next/dynamic';
import LoginButton from './buttons/login-button';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@radix-ui/react-navigation-menu';
import { navigationMenuTriggerStyle } from './ui/navigation-menu';
import { Separator } from './ui/separator';
const MobileDesktopSwitch = dynamic(
  () => import('@/src/components/mobile-desktop-switch'),
  {
    ssr: false,
  },
);

export function Navbar({ session }: { session: Session | null }) {
  const today = new Date();

  const items = [
    {
      label: 'Calendar',
      url: `/archive/calendar/${today.getFullYear()}/${today.getMonth() + 1}`,
    },
    { label: 'Personal Records', url: '/archive/personal-records' },
  ];

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className="py-2 px-0 flex">
          {session ? (
            <>
              {items.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()}`}
                    href={item.url}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </>
          ) : null}
          <NavigationMenuItem className="ml-auto">
            <LoginButton session={session} />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Separator />
    </>
  );
}
