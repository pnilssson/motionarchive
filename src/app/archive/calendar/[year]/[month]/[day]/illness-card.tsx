import { IllnessResponse } from '@/src/types/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import DeleteIllnessButton from './delete-illness-button';

export default async function Component({
  illness,
}: {
  illness: IllnessResponse;
}) {
  return (
    <>
      <Card key={illness._id} className="h-fit">
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <CardTitle>Illness</CardTitle>
            <DeleteIllnessButton id={illness._id} />
          </div>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
        <p className="whitespace-pre-wrap text-sm text-muted-foreground">
          {illness.description ? (
              illness.description
          ) : (
            "No description."
          )}
          </p>
        </CardContent>
      </Card>
    </>
  );
}
