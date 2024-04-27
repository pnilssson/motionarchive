import { Box, Text } from '@radix-ui/themes';
import Calendar from './calendar';

export default async function Page({
  params,
}: {
  params: {
    year: string;
    month: string;
  };
}) {
  const date = new Date(parseInt(params.year), parseInt(params.month) - 1, 1);

  return (
    <Box>
      <Text size={{ initial: '6', md: '8' }} weight="bold" mb="4" as="div">
        Calendar
      </Text>
      <Calendar date={date} />
    </Box>
  );
}
