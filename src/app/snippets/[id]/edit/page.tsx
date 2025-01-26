interface SnippetEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function SnippetEditPage({ params }: SnippetEditPageProps) {
  const id = parseInt((await params).id);

  return (
    <div>
      SnippetEditPage <span>{id}</span>
    </div>
  );
}

export default SnippetEditPage;
