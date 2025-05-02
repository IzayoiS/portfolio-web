export default function AddTechStack() {
  return (
    <form className="bg-slate-800 p-5 rounded shadow flex flex-col gap-4">
      <label className="text-md text-slate-200">Tech</label>
      <input type="text" className="border p-1 rounded text-slate-200" />

      <button
        type="submit"
        className="cursor-pointer bg-blue-500 text-white py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
