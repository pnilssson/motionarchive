import { auth } from '@/src/app/auth';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    redirect('/api/auth/signin');
  }
  return <div className="p-4">{children}</div>;
}
