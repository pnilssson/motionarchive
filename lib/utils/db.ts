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

export default collections;
