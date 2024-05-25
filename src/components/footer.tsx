import Link from 'next/link';
import { Separator } from './ui/separator';

export default async function Component() {
  return (
    <div className="">
      <Separator />
      <div className="py-6 px-6">
        <div className="flex text-sm font-semibold">
          <p className="pr-1">Built by</p>
          <Link
            href="https://pnilssson.dev"
            target="_blank"
            className="text-violet-600"
          >
            pnilssson
          </Link>
        </div>
      </div>
    </div>
  );
}
