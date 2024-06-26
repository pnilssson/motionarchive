import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';

export default function Page() {
  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      <div className="h-1/4"></div>
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Please check your email</CardTitle>
          <CardDescription>
            We have sent a sign-in link to your email address. <br /> No email?
            Please check your spam folder.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
