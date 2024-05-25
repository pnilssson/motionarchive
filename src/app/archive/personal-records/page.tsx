import AddPersonalRecordTypeDialog from '@/src/components/dialogs/add-personal-record-type-dialog';
import { getPersonalRecords } from '@/src/db/queries';
import RecordCard from '@/src/modules/personal-record/record-card';
import { PersonalRecordResponse } from '@/src/types/types';

export default async function Page() {
  const personalBests = await getPersonalRecords();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row sm:justify-between mb-8">
        <h1 className="text-4xl font-bold mb-4 sm:mb-0">Personal records</h1>
        <AddPersonalRecordTypeDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-auto">
        {personalBests && personalBests.length > 0
          ? personalBests.map((personalRecord: PersonalRecordResponse) => (
              <RecordCard
                key={personalRecord._id}
                personalRecord={personalRecord}
              />
            ))
          : null}
      </div>
    </div>
  );
}
