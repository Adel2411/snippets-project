"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function createSnippet(
  previousState: { message: string },
  formData: FormData,
) {
  try {
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be longer!",
      };
    } else if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code must be longer!",
      };
    }

    await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    // This Error with this message will be displayed in error.tsx file
    // throw new Error("Oops, something went wrong!");
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "An error occurred",
      };
    }
  }

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
