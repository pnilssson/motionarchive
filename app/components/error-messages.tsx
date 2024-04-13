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

  return (
    <div className="text-red-600 mt-2 ml-1">
      {issues.map((error, index) => (
        <div key={index}>{error}</div>
      ))}
    </div>
  );
}
