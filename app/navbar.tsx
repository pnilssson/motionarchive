import { authOptions } from "@/auth";
import LoginBtn from "@/components/loginButton";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Component() {
  const session = await getServerSession(authOptions);
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        {session ? (
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link href="/archive/dashboard">Dashboard</Link>
                <Link href="/archive/calendar">Calendar</Link>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
      <div className="navbar-center">
        <Link href="/" className="">
          Motion Archive
        </Link>
      </div>
      <div className="navbar-end">
        <LoginBtn session={session}></LoginBtn>
      </div>
    </div>
  );
}
