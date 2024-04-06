'use server'

import { WorkoutRequest } from "@/app/types/workout";
import { authOptions } from "@/auth";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'

export default async function addWorkout(formData: FormData) {
    const session = await getServerSession(authOptions);

    const request = {
        userId: session?.user?.userId,
        type: formData.get('type') as string,
        time: formData.get('time') as unknown as number,
        description: formData.get('description') as string,
        date: formData.get('date') as unknown as Date,
    } as WorkoutRequest;

    const client = await clientPromise;
    const db = client.db("motionarchive");
    await db.collection("workout").insertOne(request);
    
    redirect('/archive/calendar');
}