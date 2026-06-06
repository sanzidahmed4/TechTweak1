"use server";

import connectToDatabase from "@/lib/mongodb/mongoose";
import Brand from "@/lib/models/Brand";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";

export async function addBrand(formData: FormData) {
  await connectToDatabase();

  const name = formData.get("name") as string;
  let slug = formData.get("slug") as string;
  
  if (!slug) {
    slug = slugify(name, { lower: true, strict: true });
  }

  const brandData = {
    name,
    slug,
    description: formData.get("description") as string,
    logo_url: formData.get("logo_url") as string,
    order: parseInt(formData.get("order") as string) || 0,
  };

  try {
    await Brand.create(brandData);
  } catch (error: unknown) {
    console.error("Error inserting brand:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/brands");
  revalidatePath("/phones"); // Revalidate phones index to show new brand
}

export async function editBrand(id: string, formData: FormData) {
  await connectToDatabase();

  const name = formData.get("name") as string;
  let slug = formData.get("slug") as string;
  
  if (!slug) {
    slug = slugify(name, { lower: true, strict: true });
  }

  const brandData = {
    name,
    slug,
    description: formData.get("description") as string,
    logo_url: formData.get("logo_url") as string,
    order: parseInt(formData.get("order") as string) || 0,
  };

  try {
    await Brand.findByIdAndUpdate(id, brandData);
  } catch (error: unknown) {
    console.error("Error updating brand:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/brands");
  revalidatePath("/phones");
  redirect("/admin/brands");
}

export async function deleteBrand(id: string) {
  await connectToDatabase();

  try {
    await Brand.findByIdAndDelete(id);
  } catch (error: unknown) {
    console.error("Error deleting brand:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/brands");
  revalidatePath("/phones");
}

export async function updateBrandsOrder(orderedIds: string[]) {
  try {
    await connectToDatabase();
    
    const updatePromises = orderedIds.map((id, index) => 
      Brand.findByIdAndUpdate(id, { order: index }).exec()
    );
    
    if (updatePromises.length > 0) {
      await Promise.all(updatePromises);
    }
    
    revalidatePath("/admin/brands");
    revalidatePath("/phones");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error updating brands order:", error);
    return { success: false, error: error.message || "Unknown error occurred" };
  }
}
