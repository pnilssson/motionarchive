import { Container, Flex, Link, Separator, Text } from '@radix-ui/themes';

export default async function Component() {
  return (
    <Container className="mt-16 md:mt-24">
      <Separator size="4" />

      <Flex py="6" px={{ initial: '4', sm: '0' }}>
        <Text size="2">
          Created by{' '}
          <Link href="https://pnilssson.dev" weight="medium" target="_blank">
            Pär Nilsson
          </Link>
        </Text>
      </Flex>
    </Container>
  );
}
