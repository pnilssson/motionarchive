import { cache } from "react";
import collections from "./db";

export const getTypes = cache(async () => {
    const workoutTypes = await collections.workoutTypes();
    const data = await workoutTypes.find({}).toArray();
    return JSON.parse(JSON.stringify(data));
});

