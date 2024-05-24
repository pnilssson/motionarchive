'use client';

import { useEffect, useState } from 'react';
import ErrorMessages from '../error-messages';
import SubmitButton from '../buttons/submit-button';
import { useFormState } from 'react-dom';
import { addPersonalRecordType } from '../../db/actions';
import { ActionResponse } from '../../types/types';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Divide } from 'lucide-react';

export default function Component() {
  const [formState, action] = useFormState(
    (formState: ActionResponse, formData: any) => {
      return addPersonalRecordType(formState, formData);
    },
    {
      success: false,
      errors: [],
    },
  );
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (formState.success) {
      setOpen(false);
      toast({ description: 'Personal record type added successfully.' });
    }
  }, [formState, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add record</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New personal record</DialogTitle>
          <DialogDescription>
            New type of personal record, results can be added once the personal
            record type has been created.
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <div className="flex flex-col">
            <div className="mb-2">
              <Label>Name</Label>
              <Input required type="text" name="name" placeholder="Name" />
              <ErrorMessages
                name="name"
                errors={formState && formState.errors}
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4 justify-end">
            <DialogClose asChild>
              <Button size="sm" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <div>
              <SubmitButton />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
