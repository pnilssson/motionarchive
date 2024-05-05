import AddPersonalRecordTypeDialog from '@/src/components/dialogs/add-personal-record-type-dialog';
import { getPersonalBests } from '@/src/db/queries';
import RecordCard from '@/src/modules/personal-record/record-card';
import { PersonalRecordResponse } from '@/src/types/types';
import { Flex, Grid, Heading } from '@radix-ui/themes';

export default async function Page() {
  const personalBests = await getPersonalBests();

  return (
    <Flex gap="6" mb="6" direction="column">
      <Flex justify="between" align="center" gap="6" mb="6">
        <Heading as="h3" size={{ initial: '6', sm: '8' }} weight="bold">
          Personal records
        </Heading>
        <AddPersonalRecordTypeDialog />
      </Flex>
      <Grid columns={{ initial: '1', sm: '3', xl: '4' }} gap="2" width="auto">
        {personalBests && personalBests.length > 0
          ? personalBests.map((personalRecord: PersonalRecordResponse) => (
              <RecordCard
                key={personalRecord._id}
                personalRecord={personalRecord}
              />
            ))
          : null}
      </Grid>
    </Flex>
  );
}
