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
      <Inset clip="padding-box" side="all" pb="current">
        <Flex
          justify="between"
          align="center"
          p="4"
          className="text-radix-white bg-gradient-to-tr from-violet-600 to-purple-400"
        >
          <Heading as="h3" size="3" weight="medium">
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
      </Inset>

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
        </Inset>
      ) : (
        <Text as="div" size="2" mt="4">
          {personalRecord.results.length > 0
            ? `Last result on ${personalRecord.results[0].date.toDateString()}`
            : 'No results.'}
        </Text>
      )}
    </Card>
  );
}
