"use client";

import { FormEvent, startTransition, useActionState } from "react";
import { createSnippet } from "@/actions";
import { Button } from "@/components/ui/button";
import { Save, AlertCircle } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 flex flex-col gap-6">
      <div className="bg-zinc-800/50 p-6 rounded-lg backdrop-blur-sm border border-zinc-700/50">
        <h1 className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Create Snippet
        </h1>
      </div>

      <form onSubmit={handleCreateSnippet}>
        <div className="bg-zinc-800/50 rounded-lg backdrop-blur-sm border border-zinc-700/50 overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-zinc-300 text-sm font-medium"
              >
                Title
              </label>
              <input
                name="title"
                id="title"
                className="w-full bg-zinc-900/50 border border-zinc-700/50 rounded-md p-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Enter snippet title..."
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="code"
                className="text-zinc-300 text-sm font-medium"
              >
                Code
              </label>
              <textarea
                name="code"
                id="code"
                rows={8}
                className="w-full bg-zinc-900/50 border border-zinc-700/50 rounded-md p-3 text-blue-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Paste your code here..."
              />
            </div>

            {state.message && (
              <div className="flex items-center gap-2 text-red-400 bg-red-500/10 p-3 rounded-md">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm">{state.message}</p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-zinc-700/50 flex justify-end">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Create Snippet
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SnippetCreatePage;
