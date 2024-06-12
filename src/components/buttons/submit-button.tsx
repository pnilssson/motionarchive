'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { LoaderCircleIcon } from 'lucide-react';

export default function Page() {
  const { pending } = useFormStatus();
  return (
    <Button size="sm" type="submit" aria-disabled={pending}>
      Save{' '}
      {pending ? (
        <LoaderCircleIcon className="h-4 w-4 animate-spin ml-2" />
      ) : null}
    </Button>
  );
}
