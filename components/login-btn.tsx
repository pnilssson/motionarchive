"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
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
