'use client';

import ConfirmModal from '@/src/components/confirm-modal';
import { deleteWorkout } from '@/src/db/actions';
import { TrashIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

export default function Component({ id }: { id: string }) {
  const router = useRouter();

  async function onDeleteWorkout() {
    await deleteWorkout(id);
    router.refresh();
  }
  return (
    <ConfirmModal
      title="Delete Workout"
      content="Are you sure you want to delete the workout?"
      onConfirm={onDeleteWorkout}
    >
      <IconButton size="1">
        <TrashIcon />
      </IconButton>
    </ConfirmModal>
  );
}
