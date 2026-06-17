"use server";

import { requireAdmin } from "@/lib/auth/requireAdmin";
import connectToDatabase from "@/lib/mongodb/mongoose";
import Category from "@/lib/models/Category";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export async function addCategory(formData: FormData) {
  await requireAdmin();
  await connectToDatabase();

  const name = formData.get("name") as string;
  let slug = formData.get("slug") as string;
  
  if (!slug) {
    slug = slugify(name, { lower: true, strict: true });
  }

  try {
    await Category.create({ name, slug });
  } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
    console.error("Error inserting category:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/categories");
}
