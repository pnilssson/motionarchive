'use client';

import { useToggle } from '@/src/hooks/useToggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Button } from '../ui/button';
import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';

export default function Page({ toggleEdit }: { toggleEdit: () => void }) {
  const [value, toggle] = useToggle();

  function onEdit() {
    toggle();
    toggleEdit();
  }

  function onSave() {
    toggle();
    toggleEdit();
  }

  return (
    <TooltipProvider>
      {value ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="h-6 w-6 bg-violet-100 hover:bg-violet-200"
              onClick={onSave}
            >
              <CheckIcon className="h-3 w-3 text-violet-950" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Done</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="h-6 w-6 bg-violet-100 hover:bg-violet-200"
              onClick={onEdit}
            >
              <Pencil1Icon className="h-3 w-3 text-violet-950" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      )}
    </TooltipProvider>
  );
}
