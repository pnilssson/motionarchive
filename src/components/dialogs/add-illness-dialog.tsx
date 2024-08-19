'use client';

import { useEffect, useState } from 'react';
import ErrorMessages from '../error-messages';
import { useFormState } from 'react-dom';
import { addIllness } from '../../db/actions';
import { HeartIcon } from '@radix-ui/react-icons';
import { ActionResponse } from '../../types/types';
import SubmitButton from '../buttons/submit-button';
import { useToast } from '../ui/use-toast';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Textarea } from '../ui/textarea';

export default function Component({
  day,
  month,
  year,
}: {
  day: number;
  month: number;
  year: number;
}) {
  const [formState, action] = useFormState(
    (formState: ActionResponse, formData: any) => {
      return addIllness(formState, formData);
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
      toast({ description: 'Sickness added successfully.' });
    }
  }, [formState, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-200 hover:bg-red-300 text-violet-950">
          <HeartIcon className="h-5 w-5 mr-2" /> Illness
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add sickness</DialogTitle>
          <DialogDescription>
            {new Date(year, month - 1, day).toLocaleDateString(undefined, {
              weekday: 'short',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <div className="flex flex-col">
            <div className="hidden">
              <Input required type="number" name="year" defaultValue={year} />
              <Input required type="number" name="month" defaultValue={month} />
              <Input required type="number" name="day" defaultValue={day} />
            </div>

            <div className="mb-4">
              <Label htmlFor="days">Days</Label>
              <Input
                type="number"
                name="days"
                placeholder="Days"
                id="days"
                defaultValue={1}
              />
              <ErrorMessages
                name="days"
                errors={formState && formState.errors}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                placeholder="Description"
                name="description"
                id="description"
              />
              <ErrorMessages
                name="description"
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
