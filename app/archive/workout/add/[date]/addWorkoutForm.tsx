import addWorkout from "./actions";

interface AddWorkoutFormProps {
  date: Date;
}

export default function AddWorkoutForm({ date }: AddWorkoutFormProps) {
  function formatDateLocal(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      <form action={addWorkout}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">Date</span>
          </div>
          <input
            type="date"
            name="date"
            defaultValue={formatDateLocal(date)}
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">Time</span>
          </div>
          <input
            type="number"
            name="time"
            placeholder="Time"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">Type</span>
          </div>
          <select className="select select-bordered" name="type">
            <option>Star Wars</option>
            <option>Harry Potter</option>
            <option>Lord of the Rings</option>
            <option>Planet of the Apes</option>
            <option>Star Trek</option>
          </select>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold">Description</span>
          </div>
          <textarea
            placeholder="Description"
            name="description"
            className="textarea textarea-bordered w-full"></textarea>
        </label>
        <button
          type="submit"
          className="btn btn-primary w-full mt-4 float-right">
          Save
        </button>
      </form>
    </div>
  );
}
