'use client';

import { useToggle } from '@/src/hooks/useToggle';
import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { IconButton, Tooltip } from '@radix-ui/themes';

export default function Page({ toggleEdit }: { toggleEdit: () => void }) {
  const [value, toggle, setValue] = useToggle();

  function onEdit() {
    toggle();
    toggleEdit();
  }

  function onSave() {
    toggle();
    toggleEdit();
  }

  if (value) {
    return (
      <Tooltip content="Done">
        <IconButton
          type="button"
          variant="soft"
          highContrast
          color="gray"
          size="1"
          onClick={onSave}
        >
          <CheckIcon />
        </IconButton>
      </Tooltip>
    );
  }

  if (!value) {
    return (
      <Tooltip content="Edit">
        <IconButton
          type="button"
          variant="soft"
          highContrast
          color="gray"
          size="1"
          onClick={onEdit}
        >
          <Pencil1Icon />
        </IconButton>
      </Tooltip>
    );
  }
}
