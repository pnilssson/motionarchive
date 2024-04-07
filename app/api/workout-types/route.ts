import collections from "@/lib/utils/db";

export async function GET() {
    const workoutTypes = await collections.workoutTypes();
    const data = await workoutTypes.find({}).toArray();
   
    return Response.json({ data })
}