"use client";

import { FormEvent, startTransition, useActionState } from "react";
import { createSnippet } from "@/actions";

function SnippetCreatePage() {
  const [state, createSnippetAction] = useActionState(createSnippet, {
    message: "",
  });

  const handleCreateSnippet = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => createSnippetAction(formData));
  };

  return (
    <form onSubmit={handleCreateSnippet}>
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
        {state.message ? (
          <div className="text-red-500 p-2 bg-red-100 rounded-md">
            {state.message}
          </div>
        ) : null}

        <button type="submit" className="rounded p-2 bg-slate-300">
          Create
        </button>
      </div>
    </form>
  );
}

export default SnippetCreatePage;
