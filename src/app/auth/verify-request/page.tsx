import { Box, Flex, Text } from '@radix-ui/themes';

export default async function SignIn() {
  return (
    <Flex
      align="center"
      height="100%"
      direction="column"
      px="4"
      className="text-center"
    >
      <Box className="h-1/4"></Box>
      <Text size={{ initial: '6', sm: '8' }} weight="bold" mb="4" as="div">
        Please check your email
      </Text>
      <Text size="3" as="div">
        We have sent a sign-in link to your email address.
      </Text>
    </Flex>
  );
}
