'use client';

import ConfirmModal from '@/src/components/dialogs/confirm-dialog';
import { useToast } from '@/src/components/ui/use-toast';
import { deletePersonalRecord } from '@/src/db/actions';
import { TrashIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

export default function Component({
  personalRecordId,
}: {
  personalRecordId: string;
}) {
  const router = useRouter();
  const { toast } = useToast();

  function remove() {
    deletePersonalRecord(personalRecordId).then(() => {
      router.refresh();
      toast({ description: 'Record deleted successfully.' });
    });
  }

  return (
    <ConfirmModal
      title="Delete Result"
      content="Are you sure you want to delete the record and all of its results?"
      tooltipContent="Delete record"
      onConfirm={remove}
    >
      <IconButton size="1" variant="soft">
        <TrashIcon />
      </IconButton>
    </ConfirmModal>
  );
}
