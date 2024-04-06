import collections from "@/lib/db";

export async function GET() {
    const workoutTypes = await collections.workoutTypes();
    
    const data = await workoutTypes
        .find({})
        .toArray();
   
    return Response.json({ data })
  }