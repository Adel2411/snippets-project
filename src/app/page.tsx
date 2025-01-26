import { db } from "@/db";

export default async function Home() {
  const snippets = await db.snippet.findMany();
  console.log(snippets);

  return (
    <div>
      {snippets.map((snippet) => (
        <div
          key={snippet.id}
          className="flex flex-col gap-8 border rounded-md p-2 m-4 bg-gradient-to-br from-violet-100 to-slate-200 shadow-xl"
        >
          <h3 className="font-bold">{snippet.title}</h3>
          <pre>{snippet.code}</pre>
        </div>
      ))}
    </div>
  );
}
