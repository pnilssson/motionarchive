import { Button } from '@radix-ui/themes';
import { importWorkouts } from '../db/actions';

export default async function Page() {
  return (
    <form action={importWorkouts}>
      <Button type="submit">Import</Button>
    </form>
  );
}
