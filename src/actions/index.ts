"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

type stateType = {
  title: {
    error: string;
  };
  code: {
    error: string;
  };
};

export async function createSnippet(
  previousState: stateType,
  formData: FormData,
) {
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  if (!title) {
    return {
      title: {
        error: "Title must be longer!",
      },
      code: {
        error: "",
      },
    };
  } else if (!code) {
    return {
      code: {
        error: "Code must be longer!",
      },
      title: {
        error: "",
      },
    };
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
