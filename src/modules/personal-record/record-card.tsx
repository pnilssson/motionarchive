'use client';

import AddPersonalRecordResultDialog from '@/src/components/dialogs/add-personal-record-result-dialog';
import {
  PersonalRecordResponse,
  PersonalRecordResult,
} from '@/src/types/types';
import { Card, Flex, Heading, Inset, Table, Text } from '@radix-ui/themes';
import DeleteResultButton from './delete-result-button';
import DeleteRecordButton from './delete-record-button';
import EditSaveButton from '@/src/components/buttons/edit-save-button';
import { useState } from 'react';

export default function Component({
  personalRecord,
}: {
  personalRecord: PersonalRecordResponse;
}) {
  const [editing, setEditing] = useState(false);

  function toggleEdit() {
    setEditing(!editing);
  }

  return (
    <Card className="h-fit">
      <Flex justify="between" align="center" p="2">
        <Heading as="h3" size="3" weight="bold">
          {personalRecord.name}
        </Heading>
        <Flex direction="row" gap="2">
          {editing ? (
            <DeleteRecordButton personalRecordId={personalRecord._id} />
          ) : null}
          <AddPersonalRecordResultDialog personalRecord={personalRecord} />
          <EditSaveButton toggleEdit={toggleEdit} />
        </Flex>
      </Flex>

      {personalRecord.results.length > 0 ? (
        <Table.Root size="1" layout="auto" className="py-2">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="shadow-none">
                Result
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="shadow-none">
                Date
              </Table.ColumnHeaderCell>
              {editing ? (
                <Table.ColumnHeaderCell className="shadow-none"></Table.ColumnHeaderCell>
              ) : null}
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
                      {editing ? (
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
                      ) : null}
                    </Table.Row>
                  ),
                )
              : null}
          </Table.Body>
        </Table.Root>
      ) : (
        <Text as="div" size="2" my="4">
          {personalRecord.results.length > 0
            ? `Last result on ${personalRecord.results[0].date.toDateString()}`
            : 'No results.'}
        </Text>
      )}
      <Inset clip="padding-box" side="bottom">
        <Flex className="min-h-2 bg-violet-400"></Flex>
      </Inset>
    </Card>
  );
}
