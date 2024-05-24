import { ZodIssue } from 'zod';

export default function Component({
  name,
  errors,
}: {
  name: string;
  errors: ZodIssue[] | undefined;
}) {
  if (!errors) return null;
  if (errors?.length === 0) return null;

  const issues = errors
    .filter((item) => {
      return item.path.includes(name);
    })
    .map((item) => item.message);

  if (issues.length === 0) return null;

  return (
    <div>
      {issues.map((error, index) => (
        <p className="mt-2 ml-2 text-sm text-bold text-red-500" key={index}>
          {error}
        </p>
      ))}
    </div>
  );
}
