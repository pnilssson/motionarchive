import { Box, Text } from '@radix-ui/themes';

export default async function Page() {
  return (
    <Box>
      <Text size={{ initial: '6', md: '8' }} weight={'bold'} mb={'4'} as="div">
        Dashboard
      </Text>
    </Box>
  );
}
