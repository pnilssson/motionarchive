import { Flex, Heading } from '@radix-ui/themes';

export default async function Page() {
  return (
    <Flex gap="6" mb="6">
      <Heading as="h3" size={{ initial: '6', sm: '8' }} weight="bold">
        Dashboard
      </Heading>
    </Flex>
  );
}
