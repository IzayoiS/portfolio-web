export default function NewProject() {
  return (
    <form className="bg-slate-800 text-slate-200 p-5 rounded shadow flex flex-col gap-4">
      <label className="text-md">Project Name *</label>
      <input type="text" className="border p-1 rounded" />

      <label className="text-md">Description</label>
      <textarea className="border p-1 rounded resize-none" rows={5}></textarea>

      <label className="text-md">Tech Stack</label>
      <input type="text" className="border p-1 rounded" />

      <label className="text-md">Github</label>
      <input type="text" className="border p-1 rounded" />

      <label className="text-md">Website URL</label>
      <input type="text" className="border p-1 rounded" />

      <label className="text-md">Logo</label>
      <input
        type="file"
        className="bg-slate-800 h-10 w-100 p-2 cursor-pointer rounded-xs"
      />

      <button
        type="submit"
        className="cursor-pointer bg-blue-500 text-white py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
