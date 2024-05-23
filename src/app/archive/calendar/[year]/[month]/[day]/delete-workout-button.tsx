'use client';

import ConfirmModal from '@/src/components/dialogs/confirm-dialog';
import { deleteWorkout } from '@/src/db/actions';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/button';
import { useToast } from '@/src/components/ui/use-toast';
import { TrashIcon } from '@radix-ui/react-icons';

export default function Component({ id }: { id: string }) {
  const router = useRouter();
  const { toast } = useToast();

  function remove() {
    deleteWorkout(id).then(() => {
      router.refresh();
      toast({ description: 'Workout deleted successfully.' });
    });
  }

  return (
    <ConfirmModal
      title="Delete Workout"
      content="Are you sure you want to delete the workout?"
      tooltipContent="Delete workout"
      onConfirm={remove}
    >
      <Button size="icon" className="h-6 w-6 bg-violet-100 hover:bg-violet-200">
        <TrashIcon className="text-violet-950" />
      </Button>
    </ConfirmModal>
  );
}
