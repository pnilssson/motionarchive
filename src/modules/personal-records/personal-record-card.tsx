import AddPersonalRecordResultDialog from '@/src/components/dialogs/add-personal-record-result-dialog';
import {
  PersonalRecordResponse,
  PersonalRecordResult,
} from '@/src/types/types';
import { Card, Flex, Table, Text } from '@radix-ui/themes';

export default async function Component({
  personalRecord,
}: {
  personalRecord: PersonalRecordResponse;
}) {
  return (
    <Card className="p-4 h-fit">
      <Flex justify="between" align="center">
        <Text as="div" size="3" weight="bold">
          {personalRecord.name}
        </Text>
        <AddPersonalRecordResultDialog personalRecord={personalRecord} />
      </Flex>

      {personalRecord.results.length > 0 ? (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell pl="0">Result</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {personalRecord.results.length > 0
              ? personalRecord.results.map(
                  (result: PersonalRecordResult, i: number) => (
                    <Table.Row key={i} className="shadow-none">
                      <Table.RowHeaderCell pl="0">
                        {result.result}
                      </Table.RowHeaderCell>
                      <Table.Cell>{result.date.toDateString()}</Table.Cell>
                    </Table.Row>
                  ),
                )
              : null}
          </Table.Body>
        </Table.Root>
      ) : (
        <Text as="div" size="2" mt="4">
          {personalRecord.results.length > 0
            ? `Last result on ${personalRecord.results[0].date.toDateString()}`
            : 'No results has been added.'}
        </Text>
      )}
    </Card>
  );
}
