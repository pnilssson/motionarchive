'use server'

import { z } from 'zod'
import { authOptions } from "@/app/auth";
import collections from "@/app/db/queries";
import { getServerSession } from "next-auth";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const schema = z.object({
    userId: z.string(),
    type: z.string({ required_error: "Type is required." }),
    time: z.coerce.number({ required_error: "Time is required." })
        .min(1, { message: "Minimum workout length is 1 minute." }),
    description: z.string({ required_error: "Description is required." })
        .max(4000, { message: "Description must be less than 4000 characters." }),
    date: z.coerce.date({ required_error: "Date is required." }),
  })

async function addWorkout(_: any, formData: FormData) {
    const session = await getServerSession(authOptions);

    const request = {
        userId: session?.user?.userId,
        type: formData.get('type'),
        time: formData.get('time'),
        description: formData.get('description'),
        date: formData.get('date'),
    };

    const validatedRequest = schema.safeParse(request)
    console.log(validatedRequest)
    if (!validatedRequest.success) {
        return {
                errors: validatedRequest.error.issues,
            }
    }

    const workouts = await collections.workout();
    await workouts.insertOne(validatedRequest.data);
    revalidatePath('/');
    redirect(`/archive/calendar/${validatedRequest.data.date.getFullYear()}/${validatedRequest.data.date.getMonth()}/${validatedRequest.data.date.getDate()}`)
}

export { addWorkout }