import Calendar from '@/src/modules/calendar/calendar';
import { Box, Flex, Heading } from '@radix-ui/themes';

export default async function Page({
  params,
}: {
  params: {
    year: string;
    month: string;
  };
}) {
  return (
    <Flex direction="column" gap="6" mb="6">
      <Heading as="h3" size={{ initial: '6', sm: '8' }} weight="bold">
        Calendar
      </Heading>
      <Calendar month={parseInt(params.month)} year={parseInt(params.year)} />
    </Flex>
  );
}
