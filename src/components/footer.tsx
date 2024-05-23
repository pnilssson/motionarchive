import Link from 'next/link';
import { Separator } from './ui/separator';

export default async function Component() {
  return (
    <div className="mt-16 md:mt-24">
      <Separator />
      <div className="py-6 px-6">
        <div className="flex text-sm font-semibold">
          <p className="pr-1">Created by</p>
          <Link
            href="https://pnilssson.dev"
            target="_blank"
            className="text-violet-600"
          >
            Pär Nilsson
          </Link>
        </div>
      </div>
    </div>
  );
}
