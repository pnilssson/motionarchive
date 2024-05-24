'use client';

import ConfirmModal from '@/src/components/dialogs/confirm-dialog';
import { Button } from '@/src/components/ui/button';
import { useToast } from '@/src/components/ui/use-toast';
import { deletePersonalRecordResult } from '@/src/db/actions';
import { TrashIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

export default function Component({
  personalRecordId,
  resultId,
}: {
  personalRecordId: string;
  resultId: string;
}) {
  const router = useRouter();
  const { toast } = useToast();

  function remove() {
    deletePersonalRecordResult(personalRecordId, resultId).then(() => {
      router.refresh();
      toast({ description: 'Result added successfully.' });
    });
  }

  return (
    <ConfirmModal
      title="Delete result"
      content="Are you sure you want to delete the result?"
      onConfirm={remove}
    >
      <Button size="icon" className="h-6 w-6 bg-violet-100 hover:bg-violet-200">
        <TrashIcon className="text-violet-950" />
      </Button>
    </ConfirmModal>
  );
}
