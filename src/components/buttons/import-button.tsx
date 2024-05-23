import { importWorkouts } from '../../db/import';
import { Button } from '../ui/button';

export default async function Page() {
  return (
    <form action={importWorkouts}>
      <Button type="submit">Import</Button>
    </form>
  );
}
