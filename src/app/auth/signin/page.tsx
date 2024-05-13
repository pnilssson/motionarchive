'use client';

import { EnvelopeClosedIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  TextField,
} from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  return (
    <Flex
      align="center"
      direction="column"
      px="4"
      className="text-center h-[calc(100vh-56px)]"
    >
      <div className="h-1/4"></div>
      <Heading size={{ initial: '6', sm: '8' }} weight="bold" mb="4" as="h3">
        Sign in
      </Heading>
      <Text size="3" mb={'4'} as="p">
        We will send a sign-in link to your email address.
      </Text>
      <Box className="w-80">
        <TextField.Root
          size="3"
          mb="4"
          type="email"
          className="grow"
          name="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        >
          <TextField.Slot>
            <EnvelopeClosedIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </Box>
      <Button
        className="w-80"
        size="3"
        onClick={() => {
          setLoading(true);
          signIn('resend', {
            email: email,
            callbackUrl: '/archive/calendar',
          });
        }}
      >
        <Spinner loading={loading}>
          <PaperPlaneIcon />
        </Spinner>
        Sign in
      </Button>
    </Flex>
  );
}
