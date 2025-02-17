"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }
    return {
      message: "An error occurred while creating the snippet",
    };
  }

  revalidatePath("/");
  redirect("/");
}

export async function editSnippet(id: number, code: string) {
  try {
    if (!code) {
      return {
        message: "Code is required",
      };
    }

    await db.snippet.update({
      where: { id },
      data: {
        code,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }
    return {
      message: "An error occurred while editing the snippet",
    };
  }

  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  try {
    await db.snippet.delete({
      where: { id },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }
    return {
      message: "An error occurred while deleting the snippet",
    };
  }

  revalidatePath("/");
  redirect("/");
}
