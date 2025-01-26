"use client";

import { Snippet } from "@prisma/client";

interface SnippetEditFormProps {
  snippet: Snippet;
}

function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  return (
    <div>
      <h1 className="font-bold text-2xl m-4">Snippet Edit Form !</h1>
      <h3 className="font-bold">{snippet.title}</h3>
      <pre className="flex flex-col gap-8 border rounded-md p-2 m-4 bg-gradient-to-br from-slate-100 to-gray-200 shadow-md">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

export default SnippetEditForm;
