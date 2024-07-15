import clientPromise from './client';

async function getDb() {
  const mognoClient = await clientPromise;
  return mognoClient.db('motionarchive');
}

const collections = {
  workout: async function () {
    const db = await getDb();
    return db.collection('workout');
  },
  illness: async function () {
    const db = await getDb();
    return db.collection('illness');
  },
  workoutType: async function () {
    const db = await getDb();
    return db.collection('workout_type');
  },
  personalRecord: async function () {
    const db = await getDb();
    return db.collection('personal_record');
  },
};

export default collections;
