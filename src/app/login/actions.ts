"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb/mongoose";
import User from "@/lib/models/User";
import { signToken } from "@/lib/auth/jwt";

export async function login(formData: FormData) {
  try {
    const email = (formData.get("email") as string || "").trim().toLowerCase();
    const password = (formData.get("password") as string || "").trim();

    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    await connectToDatabase();

    let user = await User.findOne({ email });
    // Removed hardcoded admin auto-creation block for security.

    if (!user) {
      return { error: "Invalid credentials." };
    }

    let isPasswordValid = await bcrypt.compare(password, user.password_hash);
    // Removed hardcoded admin auto-heal block for security.

    if (!isPasswordValid) {
      return { error: "Invalid credentials." };
    }

    // Generate JWT token
    const token = await signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Set HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set("techtweak_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

  } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
    console.error("Login error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("techtweak_session");
  redirect("/login");
}
