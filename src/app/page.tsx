import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippet.findMany();
  console.log(snippets);

  return (
    <div className="min-h-screen p-8 flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">Snippets</h1>
        <Link
          href="snippets/new"
          className="border border-slate-500 rounded-md px-4 py-1 hover:bg-slate-500 hover:text-white"
        >
          New
        </Link>
      </div>
      <ul className="flex flex-col gap-4">
        {snippets.map((snippet) => (
          <li
            key={snippet.id}
            className=" overflow-auto flex items-center justify-between border rounded-md p-4 bg-gradient-to-br from-violet-100 to-slate-200 shadow-xl"
          >
            <h3 className="font-semibold">{snippet.title}</h3>
            <Link href={`/snippets/${snippet.id}`}>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
