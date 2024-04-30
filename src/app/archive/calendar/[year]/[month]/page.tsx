import Calendar from '@/src/modules/calendar/calendar';
import { Box, Text } from '@radix-ui/themes';

export default async function Page({
  params,
}: {
  params: {
    year: string;
    month: string;
  };
}) {
  return (
    <Box>
      <Text size={{ initial: '6', md: '8' }} weight="bold" mb="4" as="div">
        Calendar
      </Text>
      <Calendar month={parseInt(params.month)} year={parseInt(params.year)} />
    </Box>
  );
}
