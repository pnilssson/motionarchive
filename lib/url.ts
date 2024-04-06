const BASE_URL =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : `${process.env.NEXT_PUBLIC_URL}`;

export { BASE_URL }