"use client";

import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

interface ComponentProps {
  session: Session | null;
}

export default function Component({ session }: ComponentProps) {
  if (session) {
    return (
      <button className="btn btn-sm" onClick={() => signOut()}>
        sign out
      </button>
    );
  }
  return (
    <button className="btn btn-sm" onClick={() => signIn()}>
      sign in
    </button>
  );
}
