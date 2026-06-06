"use server";

import connectToDatabase from "@/lib/mongodb/mongoose";
import Post from "@/lib/models/Post";
import ActivityLog from "@/lib/models/ActivityLog";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { redirect } from "next/navigation";

export async function addBlogPost(formData: FormData) {
  await connectToDatabase();

  const title = formData.get("title") as string;
  let slug = formData.get("slug") as string;
  
  if (!slug) {
    slug = slugify(title, { lower: true, strict: true });
  }

  const is_published = formData.get("is_published") === "on";

  let tags: string[] = [];
  const tagsJson = formData.get("tags") as string;
  if (tagsJson) {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
    try { tags = JSON.parse(tagsJson); } catch (e) {}
  }

  const postData = {
    title,
    slug,
    category_id: formData.get("category_id") ? formData.get("category_id") as string : undefined,
    content: formData.get("content") as string,
    excerpt: formData.get("excerpt") as string,
    tags,
    featured_image: formData.get("featured_image") as string,
    is_published,
    published_at: is_published ? new Date() : null,
    meta_title: formData.get("meta_title") as string,
    meta_description: formData.get("meta_description") as string,
  };

  try {
    await Post.create(postData);
    
    // Log activity
    await ActivityLog.create({
      title: `Published article: ${title}`,
      type: 'Post',
      action: is_published ? 'Publish' : 'Create',
      icon: 'FileText',
      color: 'text-amber-500 bg-amber-50',
    });
  } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
    console.error("Error inserting post:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/blogs");
  revalidatePath("/news");
  redirect("/admin/blogs");
}
export async function updateBlogPost(id: string, formData: FormData) {
  await connectToDatabase();

  const title = formData.get("title") as string;
  let slug = formData.get("slug") as string;
  
  if (!slug) {
    slug = slugify(title, { lower: true, strict: true });
  }

  const is_published = formData.get("is_published") === "on";
  
  // We don't want to reset published_at if it's already published
  const existingPost = await Post.findById(id);

  let tags: string[] = [];
  const tagsJson = formData.get("tags") as string;
  if (tagsJson) {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
    try { tags = JSON.parse(tagsJson); } catch (e) {}
  }

  const postData = {
    title,
    slug,
    category_id: formData.get("category_id") ? formData.get("category_id") as string : undefined,
    content: formData.get("content") as string,
    excerpt: formData.get("excerpt") as string,
    tags,
    featured_image: formData.get("featured_image") as string,
    is_published,
    published_at: is_published && (!existingPost || !existingPost.published_at) ? new Date() : (existingPost ? existingPost.published_at : null),
    meta_title: formData.get("meta_title") as string,
    meta_description: formData.get("meta_description") as string,
    updated_at: new Date()
  };

  try {
    await Post.findByIdAndUpdate(id, postData);
    
    // Log activity
    await ActivityLog.create({
      title: `Updated article: ${title}`,
      type: 'Post',
      action: 'Update',
      icon: 'FileText',
      color: 'text-amber-500 bg-amber-50',
    });
  } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
    console.error("Error updating post:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/blogs");
  revalidatePath("/news");
  redirect("/admin/blogs");
}

export async function deleteBlogPost(id: string) {
  await connectToDatabase();
  
  try {
    const post = await Post.findById(id);
    await Post.findByIdAndDelete(id);
    
    if (post) {
      await ActivityLog.create({
        title: `Deleted article: ${post.title}`,
        type: 'Post',
        action: 'Delete',
        icon: 'Trash2',
        color: 'text-red-500 bg-red-50',
      });
    }
  } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
    console.error("Error deleting post:", error);
    throw new Error(error.message);
  }
  
  revalidatePath("/admin/blogs");
  revalidatePath("/news");
}

export async function createInlineCategory(name: string) {
  await connectToDatabase();
  // We need to import Category. Let's make sure it's imported at the top.
  // Wait, I will just require it here to avoid import issues if not present.
  const Category = (await import("@/lib/models/Category")).default;
  
  const slug = slugify(name, { lower: true, strict: true });
  
  try {
    const newCat = await Category.create({ name, slug });
    return { id: newCat._id.toString(), name: newCat.name };
  } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
    console.error("Error creating inline category:", error);
    throw new Error(error.message);
  }
}
