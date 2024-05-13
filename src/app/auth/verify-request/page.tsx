import { Box, Flex, Heading, Text } from '@radix-ui/themes';

export default async function SignIn() {
  return (
    <Flex
      align="center"
      direction="column"
      px="4"
      className="text-center h-[calc(100vh-56px)]"
    >
      <Box className="h-1/4"></Box>
      <Heading size={{ initial: '6', sm: '8' }} weight="bold" mb="4" as="h3">
        Please check your email
      </Heading>
      <Text size="3" as="p">
        We have sent a sign-in link to your email address.
      </Text>
      <Text size="2" as="p" mt="2">
        No email? Please check your spam folder.
      </Text>
    </Flex>
  );
}
