import {
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Inset,
  Text,
} from '@radix-ui/themes';
import Image from 'next/image';
import Footer from '../components/footer';

export default function Home() {
  return (
    <>
      <Container size="1" p="4">
        <Flex className="mt-16 md:mt-24" justify="center" align="center">
          <Flex className="max-w-[560px]" direction="column" gap="6">
            <Heading as="h1" className="text-4xl md:text-5xl" align="center">
              Time to say goodbye to coffee-stained notes.
            </Heading>
            <Text align="center">
              Motion archive is a simple yet powerful online tool for keeping
              all training related notes in one place.
            </Text>
          </Flex>
        </Flex>
        <Flex justify="center" mt="8">
          <Card className="shadow-md max-w-[960px]">
            <Inset>
              <Image
                src={'/calendar_example.jpg'}
                alt="calendar"
                width={1177}
                height={718}
              />
            </Inset>
          </Card>
        </Flex>
        <Flex className="mt-16 md:mt-24" justify="center" direction="column">
          <Flex direction="column" gap="4" mb="6">
            <Heading as="h2" className="text-4xl" align="center">
              Our tools
            </Heading>
            <Text align="center">
              We are not trying to impress you with unncessary features. We
              believe in keeping it simple.
            </Text>
          </Flex>
          <Grid columns={{ initial: '1', sm: '3' }} gap="4" width="auto">
            <Card className="shadow-md py-8 px-4">
              <Text as="div" size="4" weight="bold" mb="2">
                Calendar
              </Text>
              <Text as="div" color="gray" size="2">
                Use the calendar to get an overlook of your latest training
                sessions.
              </Text>
            </Card>
            <Card className="shadow-md py-8 px-4">
              <Text as="div" size="4" weight="bold" mb="2">
                Benchmarks
              </Text>
              <Text as="div" color="gray" size="2" mb="2">
                Keep track of your personal bests and the progression of them.
              </Text>
              <Badge color="ruby">Coming soon</Badge>
            </Card>
            <Card className="shadow-md py-8 px-4">
              <Text as="div" size="4" weight="bold" mb="2">
                Dashboard
              </Text>
              <Text as="div" color="gray" size="2" mb="2">
                See trends in your training using the dashboard.
              </Text>
              <Badge color="ruby">Coming soon</Badge>
            </Card>
          </Grid>
        </Flex>
      </Container>
      <Footer />
    </>
  );
}
