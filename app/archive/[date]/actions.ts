'use server'

import { authOptions } from "@/auth";
import collections from "@/lib/utils/db";
import { WorkoutRequest } from "@/lib/types/workout";
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

    const workouts = await collections.workout();
    await workouts.insertOne(request);
    
    redirect('/archive/calendar');
}