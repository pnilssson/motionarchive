import { Button } from '@radix-ui/themes';
import { checkTypes } from '../db/actions';

export default async function Page() {
  return (
    <form action={checkTypes}>
      <Button type="submit">Check types</Button>
    </form>
  );
}
