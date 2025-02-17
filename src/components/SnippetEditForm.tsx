"use client";

import { editSnippet } from "@/actions";
import { Editor } from "@monaco-editor/react";
import { Snippet } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface SnippetEditFormProps {
  snippet: Snippet;
}

function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  function handleEditorChange(value: string = "") {
    setCode(value);
  }

  const editSnippetAction = editSnippet.bind(null, snippet.id, code);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 flex flex-col gap-6">
      <div className="bg-zinc-800/50 p-6 rounded-lg backdrop-blur-sm border border-zinc-700/50">
        <h1 className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Edit Snippet
        </h1>
        <h3 className="text-zinc-400 mt-2 font-medium">{snippet.title}</h3>
      </div>

      <div className="bg-zinc-800/50 rounded-lg backdrop-blur-sm border border-zinc-700/50 overflow-hidden">
        <Editor
          height="60vh"
          theme="vs-dark"
          defaultLanguage="typescript"
          defaultValue={snippet.code}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            wordWrap: "on",
            wrappingIndent: "same",
            wrappingStrategy: "advanced",
            padding: { top: 20 },
            scrollBeyondLastLine: false,
          }}
          className="border-b border-zinc-700/50"
        />

        <form action={editSnippetAction} className="p-4 flex justify-end">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SnippetEditForm;
