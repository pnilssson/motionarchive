'use client';

import { useEffect, useState } from 'react';
import ErrorMessages from '../error-messages';
import SubmitButton from '../buttons/submit-button';
import { useFormState } from 'react-dom';
import { addPersonalRecordResult } from '../../db/actions';
import { ActionResponse, PersonalRecordResponse } from '../../types/types';
import { cn } from '@/src/lib/utils';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { CalendarIcon, PlusIcon } from '@radix-ui/react-icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';

export default function Component({
  personalRecord,
}: {
  personalRecord: PersonalRecordResponse;
}) {
  const [date, setDate] = useState<Date>();
  const [formState, action] = useFormState(
    (formState: ActionResponse, formData: any) => {
      return addPersonalRecordResult(formState, formData, date);
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
      toast({ description: 'Result added successfully.' });
    }
  }, [formState, toast]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="h-6 w-6 bg-violet-100 hover:bg-violet-200"
          >
            <PlusIcon className="text-violet-950" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{personalRecord.name}</DialogTitle>
            <DialogDescription>
              Congratulations on your new result!
            </DialogDescription>
          </DialogHeader>
          <form action={action}>
            <div className="flex flex-col">
              <div>
                <div className="hidden">
                  <Input
                    required
                    type="text"
                    name="id"
                    defaultValue={personalRecord._id.toString()}
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <ErrorMessages
                  name="date"
                  errors={formState && formState.errors}
                />
              </div>

              <div className="mb-4">
                <Label>Result</Label>
                <Input type="text" name="result" placeholder="Result" />
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
    </>
  );
}
