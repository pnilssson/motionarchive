'use client';

import ConfirmModal from '@/src/components/dialogs/confirm-dialog';
import { showSuccessToast } from '@/src/components/toast';
import { deleteWorkout } from '@/src/db/actions';
import { TrashIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

export default function Component({ id }: { id: string }) {
  const router = useRouter();

  function deletWorkout() {
    deleteWorkout(id).then(() => {
      router.refresh();
      showSuccessToast('Workout deleted successfully.');
    });
  }

  return (
    <ConfirmModal
      title="Delete Workout"
      content="Are you sure you want to delete the workout?"
      onConfirm={deletWorkout}
    >
      <IconButton size="1" variant="soft">
        <TrashIcon />
      </IconButton>
    </ConfirmModal>
  );
}
