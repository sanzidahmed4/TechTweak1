import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth/jwt";

/**
 * Validates the current user session.
 * Used to protect Server Actions from unauthorized access.
 * Throws an error if the user is not authenticated or not an admin.
 */
export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("techtweak_session")?.value;

  if (!token) {
    throw new Error("Unauthorized: Missing authentication token.");
  }

  const payload = await verifyToken(token);

  if (!payload || payload.role !== "admin") {
    throw new Error("Unauthorized: Invalid token or insufficient permissions.");
  }

  return payload;
}
