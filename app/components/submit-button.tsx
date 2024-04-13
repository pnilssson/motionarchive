"use client";

import { useFormStatus } from "react-dom";

export default function Page() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary w-full mt-4 float-right"
      aria-disabled={pending}>
      {pending ? <span className="loading loading-spinner"></span> : "Save"}
    </button>
  );
}
