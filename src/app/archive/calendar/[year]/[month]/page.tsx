import { Box, Text } from '@radix-ui/themes';
import Calendar from '../../../../modules/calendar/calendar';

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
