import { createSnippet } from "@/actions";
import React from "react";

function SnippetCreatePage() {
  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a new snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12">Title</label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>
        <div className="flex gap-4">
          <label className="w-12">Code</label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>

        <button type="submit" className="rounded p-2 bg-slate-300">
          Create
        </button>
      </div>
    </form>
  );
}

export default SnippetCreatePage;
