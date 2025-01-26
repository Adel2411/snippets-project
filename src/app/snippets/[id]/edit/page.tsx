import SnippetEditForm from "@/components/SnippetEditForm";
import { db } from "@/db";
import { notFound } from "next/navigation";

interface SnippetEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function SnippetEditPage({ params }: SnippetEditPageProps) {
  const id = parseInt((await params).id);
  const snippet = await db.snippet.findUnique({
    where: { id },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}

export default SnippetEditPage;
