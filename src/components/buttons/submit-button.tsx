'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { LoaderCircleIcon } from 'lucide-react';

export default function Page() {
  const { pending } = useFormStatus();
  return (
    <Button size="sm" type="submit" aria-disabled={pending}>
      {pending ? (
        <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        'Save'
      )}
    </Button>
  );
}
