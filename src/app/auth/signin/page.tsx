'use client';

import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { LoaderCircleIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const today = new Date();

export default function Page() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      <div className="h-1/4"></div>
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            We will send a sign-in link to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            autoComplete="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mail@example.com"
            required
            type="email"
            value={email}
          />
        </CardContent>
        <CardFooter>
          <Button
            size="sm"
            className="w-full"
            onClick={() => {
              setLoading(true);
              // TODO: Validate email
              signIn('resend', {
                email: email,
                callbackUrl: `/archive/calendar/${today.getFullYear()}/${
                  today.getMonth() + 1
                }`,
              });
            }}
          >
            {loading ? (
              <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <EnvelopeClosedIcon className="mr-2" />
            )}
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
