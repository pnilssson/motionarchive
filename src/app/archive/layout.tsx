import { auth } from '@/src/app/auth';
import LoginButton from '@/src/components/buttons/login-button';
import Sidebar from '@/src/components/sidebar';
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
  return (
    <div className="flex">
      <Sidebar>
        <LoginButton session={session} />
      </Sidebar>
      <div className="md:mt-4 py-4 px-4 container">{children}</div>
    </div>
  );
}
