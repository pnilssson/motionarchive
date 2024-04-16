import { cache } from "react";
import collections from "./db";
import { getSession } from "../lib/server-utils";

export const getTypes = cache(async () => {
    const workoutTypes = await collections.workoutTypes();
    const data = await workoutTypes.find({}).toArray();
    return JSON.parse(JSON.stringify(data));
});

export const getWorkouts = cache(async (date: Date) => {
    const session = await getSession();
    const workouts = await collections.workout();
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const data = await workouts.find({ date: { $gte: startDate, $lte: endDate }, userId: session.user.userId }).toArray();
    return JSON.parse(JSON.stringify(data));
});
