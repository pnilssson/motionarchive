import { CheckIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Callout } from '@radix-ui/themes';
import toast from 'react-hot-toast';

export function showSuccessToast(message: string) {
  toast.custom(
    <Callout.Root size="2" color="mint">
      <Callout.Icon>
        <CheckIcon />
      </Callout.Icon>
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>,
    {
      duration: 3000,
      position: 'bottom-right',
    }
  );
}

export function showErrorToast(message: string) {
  toast.custom(
    <Callout.Root size="2" color="red">
      <Callout.Icon>
        <ExclamationTriangleIcon />
      </Callout.Icon>
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>,
    {
      duration: 3000,
      position: 'bottom-right',
    }
  );
}
