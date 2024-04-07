import { cache } from "react";
import clientPromise from "./mongoclient";

async function getDb() {
    const client = await clientPromise;
    return client.db("motionarchive");
}

const collections = {
    workout: async function() {
        const db = await getDb();
        return db.collection("workout");
    },
    workoutTypes: async function() {
        const db = await getDb();
        return db.collection("workout_types");
    }
};

const getTypes = cache(async () => {
    const workoutTypes = await collections.workoutTypes();
    const data = await workoutTypes.find({}).toArray();
    return JSON.parse(JSON.stringify(data));
  });

export default collections;
export { getTypes };
