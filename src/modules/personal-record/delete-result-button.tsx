'use client';

import ConfirmModal from '@/src/components/dialogs/confirm-dialog';
import { useToast } from '@/src/components/ui/use-toast';
import { deletePersonalRecordResult } from '@/src/db/actions';
import { TrashIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
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
      title="Delete Result"
      content="Are you sure you want to delete the result?"
      tooltipContent="Delete result"
      onConfirm={remove}
    >
      <IconButton size="1" variant="soft">
        <TrashIcon />
      </IconButton>
    </ConfirmModal>
  );
}
