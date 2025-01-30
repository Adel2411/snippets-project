import { deleteSnippet } from "@/actions";
import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

  return (
    <div className="flex flex-col gap-10">
      <h1 className="font-bold text-2xl m-4">Snippet View !</h1>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-bold">{snippet.title}</h3>
          <div className="flex items-center justify-center gap-4">
            <Link
              href={`/snippets/${snippet.id}/edit`}
              className="border rounded-md px-4 py-1"
            >
              Edit
            </Link>
            <form action={deleteSnippetAction}>
              <button className="border rounded-md px-4 py-1">Delete</button>
            </form>
          </div>
        </div>
        <pre className="flex flex-col gap-8 border rounded-md p-2 m-4 bg-gradient-to-br from-slate-100 to-gray-200 shadow-md">
          <code>{snippet.code}</code>
        </pre>
      </div>
    </div>
  );
}

export default SnippetShowPage;

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => ({
    id: snippet.id.toString(),
  }));
}
