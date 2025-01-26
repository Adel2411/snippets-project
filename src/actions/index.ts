"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function createSnippet(formData: FormData) {
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  if (!title || !code) {
    return;
  }

  await db.snippet.create({
    data: {
      title,
      code,
    },
  });

  redirect("/");
}

export async function editSnippet(id: number, code: string) {
  if (!code) {
    return;
  }

  await db.snippet.update({
    where: { id },
    data: {
      code,
    },
  });

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  redirect("/");
}
