import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { deleteSnippet } from "@/actions";
import { db } from "@/db";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 flex flex-col gap-6">
      <div className="bg-zinc-800/50 p-6 rounded-lg backdrop-blur-sm border border-zinc-700/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              View Snippet
            </h1>
            <h3 className="text-zinc-400 mt-2 font-medium">{snippet.title}</h3>
          </div>
          <div className="flex gap-4">
            <Button
              asChild
              variant="outline"
              className="border-zinc-700 hover:bg-zinc-700/50"
            >
              <Link href={`/snippets/${snippet.id}/edit`}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Link>
            </Button>
            <form action={deleteSnippetAction}>
              <Button
                variant="destructive"
                className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-zinc-800/50 rounded-lg backdrop-blur-sm border border-zinc-700/50 overflow-hidden">
        <SyntaxHighlighter language="javascript" style={dracula}>
          {snippet.code}
        </SyntaxHighlighter>
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
