'use client';

import AddPersonalRecordResultDialog from '@/src/components/dialogs/add-personal-record-result-dialog';
import {
  PersonalRecordResponse,
  PersonalRecordResult,
} from '@/src/types/types';
import DeleteResultButton from './delete-result-button';
import DeleteRecordButton from './delete-record-button';
import EditSaveButton from '@/src/components/buttons/edit-save-button';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';

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
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle>{personalRecord.name}</CardTitle>
          <div className="flex flex-row gap-1">
            {editing ? (
              <>
                <DeleteRecordButton personalRecordId={personalRecord._id} />
                <AddPersonalRecordResultDialog
                  personalRecord={personalRecord}
                />
              </>
            ) : null}
            <EditSaveButton toggleEdit={toggleEdit} />
          </div>
        </div>
        <CardDescription>
          {personalRecord.results.length > 0
            ? `Latest record ${personalRecord.results[0].date.toDateString()}`
            : null}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {personalRecord.results.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="p-2 h-8">Result</TableHead>
                <TableHead className="p-2 h-8">Date</TableHead>
                <TableHead className="text-right h-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {personalRecord.results.length > 0
                ? personalRecord.results.map(
                    (result: PersonalRecordResult, i: number) => (
                      <TableRow key={i}>
                        <TableCell className="p-2 font-semibold">
                          {result.result}
                        </TableCell>
                        <TableCell className="p-2">
                          {result.date.toDateString()}
                        </TableCell>
                        <TableCell className="p-0 pr-2 text-right">
                          {editing ? (
                            <DeleteResultButton
                              personalRecordId={personalRecord._id}
                              resultId={result.id}
                            />
                          ) : null}
                        </TableCell>
                      </TableRow>
                    ),
                  )
                : null}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm">
            {personalRecord.results.length > 0
              ? `Last result on ${personalRecord.results[0].date.toDateString()}`
              : 'No results'}
          </p>
        )}
      </CardContent>
      <div className="flex min-h-1 bg-violet-400 rounded-b-lg"></div>
    </Card>
  );
}
