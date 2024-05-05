import AddPersonalRecordResultDialog from '@/src/components/dialogs/add-personal-record-result-dialog';
import {
  PersonalRecordResponse,
  PersonalRecordResult,
} from '@/src/types/types';
import {
  Box,
  Card,
  Flex,
  Inset,
  ScrollArea,
  Table,
  Text,
} from '@radix-ui/themes';
import DeleteResultButton from './delete-result-button';
import DeleteRecordButton from './delete-record-button';

export default async function Component({
  personalRecord,
}: {
  personalRecord: PersonalRecordResponse;
}) {
  return (
    <Card className="p-4 h-fit">
      <Flex justify="between" align="center" pb="4">
        <Text as="div" size="3" weight="bold">
          {personalRecord.name}
        </Text>
        <Flex direction="row" gap="2">
          <DeleteRecordButton personalRecordId={personalRecord._id} />
          <AddPersonalRecordResultDialog personalRecord={personalRecord} />
        </Flex>
      </Flex>

      {personalRecord.results.length > 0 ? (
        <Inset side="bottom">
          <Table.Root size="1" layout="auto">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell className="shadow-none">
                  Result
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="shadow-none">
                  Date
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="shadow-none"></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {personalRecord.results.length > 0
                ? personalRecord.results.map(
                    (result: PersonalRecordResult, i: number) => (
                      <Table.Row key={i} align="center">
                        <Table.RowHeaderCell className="shadow-none">
                          {result.result}
                        </Table.RowHeaderCell>
                        <Table.Cell className="shadow-none">
                          {result.date.toDateString()}
                        </Table.Cell>
                        <Table.Cell
                          align="right"
                          className="shadow-none"
                          pr="4"
                        >
                          <DeleteResultButton
                            personalRecordId={personalRecord._id}
                            resultId={result.id}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ),
                  )
                : null}
            </Table.Body>
          </Table.Root>
        </Inset>
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
