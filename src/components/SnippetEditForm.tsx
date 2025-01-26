"use client";

import { editSnippet } from "@/actions";
import { Editor } from "@monaco-editor/react";
import { Snippet } from "@prisma/client";
import { useState } from "react";

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
    <div>
      <h1 className="font-bold text-2xl m-4">Snippet Edit Form !</h1>
      <h3 className="font-bold">{snippet.title}</h3>
      <Editor
        height="40vh"
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
        }}
      />
      <form action={editSnippetAction}>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default SnippetEditForm;
