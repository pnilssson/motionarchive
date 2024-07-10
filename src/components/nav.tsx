'use client';

import Link from 'next/link';
import { FileTextIcon, RocketIcon } from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

export default function Component({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const today = new Date();

  const items = [
    {
      label: 'Calendar',
      url: `/archive/calendar/${today.getFullYear()}/${today.getMonth() + 1}`,
      startsWith: '/archive/calendar',
    },
    {
      label: 'Personal Records',
      url: '/archive/personal-records',
      startsWith: '/archive/personal-records',
    },
  ];

  return (
    <nav className="flex h-full min-w-[200px] flex-col gap-6 text-lg">
      <div className='md:hidden'></div>
      {items.map((item) => (
        <Button
          variant="link"
          asChild
          className={cn(
            pathname.startsWith(item.startsWith) ? 'text-primary' : 'text-black',
            'text-lg px-0 font-medium',
          )}
        >
          <Link
            href={item.url}
            className="flex items-center gap-4 !justify-start"
          >
            <FileTextIcon className="h-5 w-5" />
            {item.label}
          </Link>
        </Button>
      ))}
      <div className="mt-auto">{children}</div>
    </nav>
  );
}
