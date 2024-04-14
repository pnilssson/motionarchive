import LoginButton from '@/app/components/login-button';
import Link from 'next/link';
import { auth } from './auth';

export default async function Component({
  children,
}: {
  children: React.ReactNode;
}) {
  const today = new Date();
  const session = await auth();
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar pr-6">
          {session ? (
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
          ) : (
            <ul className="menu menu-horizontal text-base p-0 lg:hidden">
              <li>
                <Link href="/">motion archive</Link>
              </li>
            </ul>
          )}
          <div className="flex-1 hidden lg:block">
            <ul className="menu menu-horizontal text-base">
              {session ? (
                <>
                  <li>
                    <Link href="/archive/dashboard">dashboard</Link>
                  </li>
                  <li>
                    <Link
                      href={`/archive/calendar/${today.getFullYear()}/${
                        today.getMonth() + 1
                      }`}
                    >
                      calendar
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/" className="">
                    motion archive
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="ms-auto">
            <LoginButton session={session}></LoginButton>
          </div>
        </div>
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base">
          <li>
            <Link href="/archive/dashboard">dashboard</Link>
          </li>
          <li>
            <Link
              href={`/archive/calendar/${today.getFullYear()}/${
                today.getMonth() + 1
              }`}
            >
              calendar
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
