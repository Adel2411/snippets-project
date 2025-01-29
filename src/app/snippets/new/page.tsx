"use client";

import { useActionState } from "react";
import { createSnippet } from "@/actions";

const initialState = {
  title: {
    error: "",
  },
  code: {
    error: "",
  },
};

function SnippetCreatePage() {
  const [state, createSnippetAction] = useActionState(
    createSnippet,
    initialState,
  );

  return (
    <form action={createSnippetAction}>
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
        {state.title.error && (
          <div className="text-red-500">{state.title.error}</div>
        )}
        <div className="flex gap-4">
          <label className="w-12">Code</label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>
        {state.code.error && (
          <div className="text-red-500">{state.code.error}</div>
        )}

        <button type="submit" className="rounded p-2 bg-slate-300">
          Create
        </button>
      </div>
    </form>
  );
}

export default SnippetCreatePage;
