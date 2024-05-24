'use client';

import { useEffect, useState } from 'react';
import ErrorMessages from '../error-messages';
import { useFormState } from 'react-dom';
import { addWorkout } from '../../db/actions';
import { PlusIcon } from '@radix-ui/react-icons';
import { ActionResponse, WorkoutTypeResponse } from '../../types/types';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

export default function Component({
  day,
  month,
  year,
  triggerType = 'button',
  workoutTypes,
}: {
  day: number;
  month: number;
  year: number;
  triggerType?: 'button' | 'plus';
  workoutTypes: WorkoutTypeResponse[];
}) {
  const [formState, action] = useFormState(
    (formState: ActionResponse, formData: any) => {
      return addWorkout(formState, formData);
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
      toast({ description: 'Workout added successfully.' });
    }
  }, [formState, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerType === 'button' ? (
          <Button size="sm">Add workout</Button>
        ) : (
          <Button
            size="icon"
            className="h-6 w-6 bg-violet-100 hover:bg-violet-200"
          >
            <PlusIcon className="text-violet-950" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add workout</DialogTitle>
          <DialogDescription>
            {new Date(year, month, day).toLocaleDateString(undefined, {
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
              <Label htmlFor="time">Time</Label>
              <Input type="number" name="time" placeholder="Time" id="time" />
              <ErrorMessages
                name="time"
                errors={formState && formState.errors}
              />
            </div>

            <div className="flex flex-col mb-4">
              <Label className="mb-2">Type</Label>
              <Select
                required
                defaultValue={workoutTypes[0]?.name ?? ''}
                name="type"
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {workoutTypes.map((type: WorkoutTypeResponse) => (
                      <SelectItem key={type._id} value={type.name}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <ErrorMessages
                name="type"
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
