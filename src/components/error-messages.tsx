import { Box, Text } from '@radix-ui/themes';
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
    <Box mb="2">
      {issues.map((error, index) => (
        <Text color="red" key={index}>
          {error}
        </Text>
      ))}
    </Box>
  );
}
