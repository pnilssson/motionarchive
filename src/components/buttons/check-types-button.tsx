import { checkTypes } from '../../db/import';
import { Button } from '../ui/button';

export default async function Page() {
  return (
    <form action={checkTypes}>
      <Button type="submit">Check types</Button>
    </form>
  );
}
