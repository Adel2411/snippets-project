import { db } from "@/db";
import { notFound } from "next/navigation";
import React from "react";

interface SnippetShowPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function SnippetShowPage({ params }: SnippetShowPageProps) {
  const id = parseInt((await params).id);

  const snippet = await db.snippet.findUnique({
    where: { id },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <h1 className="font-bold text-2xl m-4">Snippet View !</h1>
      <div
        key={snippet.id}
        className="flex flex-col gap-8 border rounded-md p-2 m-4 bg-gradient-to-br from-violet-100 to-slate-200 shadow-xl"
      >
        <h3 className="font-bold">{snippet.title}</h3>
        <pre>{snippet.code}</pre>
      </div>
      <p>
        Snippet <span>{id}</span> found
      </p>
    </div>
  );
}

export default SnippetShowPage;
