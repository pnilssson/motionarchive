'use client';

import Link from 'next/link';
import { Session } from 'next-auth';
import { Button, DropdownMenu, Flex, TabNav } from '@radix-ui/themes';
import { usePathname } from 'next/navigation';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import dynamic from 'next/dynamic';
const MobileDesktopSwitch = dynamic(
  () => import('@/src/components/mobile-desktop-switch'),
  {
    ssr: false,
  }
);

export function Navbar({ session }: { session: Session | null }) {
  const today = new Date();
  const pathname = usePathname();

  return (
    <>
      <Flex direction="column" gap="4">
        <TabNav.Root className="shadow-none">
          <Flex p="2" width="100%">
            {session ? (
              <MobileDesktopSwitch
                desktop={
                  <>
                    <TabNav.Link
                      asChild
                      active={pathname === '/archive/dashboard'}
                    >
                      <Link href="/archive/dashboard">Dashboard</Link>
                    </TabNav.Link>
                    <TabNav.Link
                      asChild
                      active={pathname.startsWith('/archive/calendar')}
                    >
                      <Link
                        href={`/archive/calendar/${today.getFullYear()}/${
                          today.getMonth() + 1
                        }`}
                      >
                        Calendar
                      </Link>
                    </TabNav.Link>
                    <Flex align="center" ml="auto">
                      <LoginButton session={session}></LoginButton>
                    </Flex>
                  </>
                }
                mobile={
                  <Flex ml="auto">
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger>
                        <Button variant="soft">
                          <HamburgerMenuIcon />
                        </Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content>
                        <DropdownMenu.Item>
                          <Link href="/archive/dashboard">Dashboard</Link>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                          <Link
                            href={`/archive/calendar/${today.getFullYear()}/${
                              today.getMonth() + 1
                            }`}
                          >
                            Calendar
                          </Link>
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </Flex>
                }
              ></MobileDesktopSwitch>
            ) : (
              <>
                <TabNav.Link asChild active={pathname === '/'}>
                  <Link href="/">Motion Archive</Link>
                </TabNav.Link>
                <Flex align="center" ml="auto">
                  <LoginButton session={session}></LoginButton>
                </Flex>
              </>
            )}
          </Flex>
        </TabNav.Root>
      </Flex>
      {session ? (
        <Flex className="md:hidden" position="absolute" bottom="2" right="2">
          <LoginButton session={session}></LoginButton>
        </Flex>
      ) : null}
    </>
  );
}
