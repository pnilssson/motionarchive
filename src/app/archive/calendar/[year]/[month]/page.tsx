import { Box, Text } from '@radix-ui/themes';
import Calendar from './calendar';
import Import from '@/src/components/import';
import CheckTypes from '@/src/components/checkTypes';

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
      <Import />
      <CheckTypes />
      <Calendar date={date} />
    </Box>
  );
}
