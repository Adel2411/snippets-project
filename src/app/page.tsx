import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 flex flex-col gap-10">
      <div className="flex justify-between items-center bg-zinc-800/50 p-6 rounded-lg backdrop-blur-sm">
        <h1 className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Code Snippets
        </h1>
        <Button
          className="bg-blue-500 hover:bg-blue-600 transition-colors"
          asChild
        >
          <Link href="snippets/new">
            <span className="flex items-center gap-2">
              <span>New Snippet</span>
              <SquareArrowOutUpRight className="w-4 h-4" />
            </span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {snippets.map((snippet) => (
          <div
            key={snippet.id}
            className="h-72 group transition-all duration-300 overflow-hidden flex flex-col justify-between rounded-lg bg-zinc-800/50 shadow-xl border border-zinc-700/50"
          >
            <div className="p-4 border-b border-zinc-700/50">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-zinc-100">
                  {snippet.title}
                </h3>
                <Button
                  asChild
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Link href={`/snippets/${snippet.id}`}>
                    <SquareArrowOutUpRight className="w-5 h-5 text-blue-400" />
                  </Link>
                </Button>
              </div>
            </div>
            <SyntaxHighlighter
              language="javascript"
              style={dracula}
              className="h-full"
            >
              {snippet.code}
            </SyntaxHighlighter>
          </div>
        ))}
      </div>
    </div>
  );
}
