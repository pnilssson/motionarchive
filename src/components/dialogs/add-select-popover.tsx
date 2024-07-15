'use client';

import { useEffect, useState } from 'react';
import ErrorMessages from '../error-messages';
import SubmitButton from '../buttons/submit-button';
import { useFormState } from 'react-dom';
import { addPersonalRecordType } from '../../db/actions';
import { ActionResponse, WorkoutTypeResponse } from '../../types/types';
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
import { PlusIcon } from '@radix-ui/react-icons';
import AddWorkoutDialog from './add-workout-dialog';
import AddIllnessDialog from './add-illness-dialog';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';

export default function Component({
  day,
  month,
  year,
  workoutTypes,
  triggerType = 'button',
}: {
  day: number;
  month: number;
  year: number;
  workoutTypes: WorkoutTypeResponse[];
  triggerType?: 'button' | 'plus';
}) {
  return (
    <Popover>
      <PopoverTrigger>
      {triggerType === 'button' ? (
          <Button size="sm">Add</Button>
        ) : (
          <div
            className="flex items-center rounded-md h-6 w-6 bg-violet-100 hover:bg-violet-200"
          >
            <PlusIcon className="text-violet-950 m-auto" />
          </div>
        )}
        
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className='flex flex-col gap-2'>
          <h4 className='text-lg font-semibold tracking-tight leading-none'>Select option</h4>
          <p className='text-sm text-muted-foreground'>What would you like to add?</p>
          <Separator />
        </div>
        <div className='mt-2 flex gap-2'>
          <AddWorkoutDialog day={day} month={month} year={year} workoutTypes={workoutTypes} />
          <AddIllnessDialog day={day} month={month} year={year} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
