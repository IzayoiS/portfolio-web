export default function NewProject() {
  return (
    <div>
      <form className="bg-white p-6 rounded shadow flex flex-col gap-4">
        <input
          type="text"
          placeholder="Project Name"
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Project Link"
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          className="border p-2 rounded"
          rows={5}
        ></textarea>
        <button
          type="submit"
          className="cursor-pointer bg-blue-500 text-white py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}
