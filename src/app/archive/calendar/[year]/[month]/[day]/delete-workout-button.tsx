'use client';

import ConfirmModal from '@/src/components/dialogs/confirm-dialog';
import { showSuccessToast } from '@/src/components/toast';
import { deleteWorkout } from '@/src/db/actions';
import { IconButton } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Component({ id }: { id: string }) {
  const router = useRouter();

  function remove() {
    deleteWorkout(id).then(() => {
      router.refresh();
      showSuccessToast('Workout deleted successfully.');
    });
  }

  return (
    <ConfirmModal
      title="Delete Workout"
      content="Are you sure you want to delete the workout?"
      tooltipContent="Delete workout"
      onConfirm={remove}
    >
      <Button variant="outline" size="icon" className="h-6 w-6 bg-violet-50">
        <TrashIcon className="h-3 w-3 text-violet-950" />
      </Button>
    </ConfirmModal>
  );
}
