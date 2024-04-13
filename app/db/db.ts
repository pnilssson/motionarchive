import clientPromise from "./client";

async function getDb() {
    const mognoClient = await clientPromise;
    return mognoClient.db("motionarchive");
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