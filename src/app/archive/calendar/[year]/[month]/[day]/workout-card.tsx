import DeleteWorkoutButton from './delete-workout-button';
import { WorkoutResponse } from '@/src/types/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';

export default async function Component({
  workout,
}: {
  workout: WorkoutResponse;
}) {
  return (
    <>
      <Card key={workout._id} className="h-fit">
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <CardTitle>{workout.type}</CardTitle>
            <DeleteWorkoutButton id={workout._id} />
          </div>
          <CardDescription>{workout.time} min</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-sm text-muted-foreground">
            {workout.description ? workout.description : 'No description.'}
          </p>
        </CardContent>
      </Card>
    </>
  );
}
