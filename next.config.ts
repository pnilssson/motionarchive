/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        EMAIL_SERVER: process.env.EMAIL_SERVER,
        EMAIL_FROM: process.env.EMAIL_FROM,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
  };
  
  module.exports = nextConfig;
  