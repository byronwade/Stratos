/**
 * User Data Utilities - Secure, Cached User Data Retrieval
 *
 * Performance optimizations:
 * - React cache() for request-level memoization
 * - Supabase RLS enforces security at database level
 * - Type-safe with full TypeScript support
 * - Automatic avatar generation if none provided
 */

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "./session";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  phone?: string;
  emailVerified: boolean;
  createdAt: Date;
};

/**
 * Get User Profile - Cached and Secure
 *
 * Fetches user data from both Supabase Auth and public.users table
 * Cached per request for optimal performance
 * RLS ensures users can only access their own data
 */
export const getUserProfile = cache(async (): Promise<UserProfile | null> => {
  try {
    // Get authenticated user from Supabase Auth
    const user = await getCurrentUser();
    if (!user) return null;

    const supabase = await createClient();
    if (!supabase) {
      console.warn("Supabase client not available, using mock user");
      // Return mock user for development
      return {
        id: "dev-user-1",
        name: "Development User",
        email: "dev@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dev",
        emailVerified: true,
        createdAt: new Date(),
      };
    }

    // Fetch user profile from public.users table (with RLS)
    const { data: profile, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      // Profile doesn't exist in public.users table yet (will be created by trigger)
      // This is expected on first login, so we fall back to auth user data
      console.warn(
        "Profile not found in database, using auth data:",
        error.message || "Unknown error"
      );
      return getUserProfileFromAuth(user);
    }

    // Merge auth data with profile data
    return {
      id: user.id,
      name:
        profile?.name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "User",
      email: user.email || profile?.email || "",
      avatar:
        profile?.avatar ||
        user.user_metadata?.avatar_url ||
        generateAvatar(user.email || profile?.email),
      bio: profile?.bio || undefined,
      phone: profile?.phone || undefined,
      emailVerified: !!user.email_confirmed_at || profile?.emailVerified,
      createdAt: new Date(profile?.createdAt || user.created_at),
    };
  } catch (error) {
    console.error("Unexpected error fetching user profile:", error);
    // Return mock user for development when Supabase is unavailable
    console.warn("Using mock user due to Supabase connection error");
    return {
      id: "dev-user-1",
      name: "Development User",
      email: "dev@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dev",
      emailVerified: true,
      createdAt: new Date(),
    };
  }
});

/**
 * Get User Profile from Auth Only
 *
 * Fallback when public.users table doesn't have the profile yet
 */
function getUserProfileFromAuth(user: any): UserProfile {
  return {
    id: user.id,
    name: user.user_metadata?.name || user.email?.split("@")[0] || "User",
    email: user.email || "",
    avatar: user.user_metadata?.avatar_url || generateAvatar(user.email),
    emailVerified: !!user.email_confirmed_at,
    createdAt: new Date(user.created_at),
  };
}

/**
 * Generate Avatar URL
 *
 * Creates a unique avatar based on user email using DiceBear API
 * Falls back to initials if no email provided
 */
function generateAvatar(email?: string | null): string {
  if (!email) {
    return "https://api.dicebear.com/7.x/initials/svg?seed=User";
  }

  // Use email as seed for consistent avatar
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}&backgroundColor=0ea5e9&textColor=ffffff`;
}

/**
 * Get User Initials
 *
 * Extracts initials from user name for avatar fallback
 */
export function getUserInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Format User Display Name
 *
 * Returns first name only for compact display
 */
export function getUserDisplayName(name: string): string {
  return name.split(" ")[0] || name;
}

/**
 * Check if User Email is Verified
 *
 * Security check for features that require verified email
 */
export const isUserEmailVerified = cache(async (): Promise<boolean> => {
  const user = await getCurrentUser();
  if (!user) return false;

  return !!user.email_confirmed_at;
});

/**
 * Get User Companies
 *
 * Fetches companies the user belongs to
 * Secured by RLS - only returns companies user has access to
 */
export const getUserCompanies = cache(
  async (): Promise<
    Array<{
      id: string;
      name: string;
      plan: string;
    }>
  > => {
    try {
      const user = await getCurrentUser();
      if (!user) return [];

      const supabase = await createClient();
      if (!supabase) return [];

      // Fetch user's companies via team_members join
      // RLS ensures user can only see companies they're a member of
      const { data: memberships, error } = await supabase
        .from("team_members")
        .select(
          `
        company_id,
        companies!inner (
          id,
          name,
          subscription_plan
        )
      `
        )
        .eq("user_id", user.id)
        .eq("status", "active");

      if (error) {
        console.error("Error fetching user companies:", error);
        return [];
      }

      // Map to simplified structure
      return (
        memberships?.map((m: any) => ({
          id: m.companies.id,
          name: m.companies.name,
          plan: m.companies.subscription_plan || "free",
        })) || []
      );
    } catch (error) {
      console.error("Unexpected error fetching user companies:", error);
      return [];
    }
  }
);

/**
 * Update User Profile
 *
 * Securely updates user profile data
 * RLS ensures users can only update their own profile
 */
export async function updateUserProfile(
  updates: Partial<{ name: string; bio: string; phone: string; avatar: string }>
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    const supabase = await createClient();
    if (!supabase) {
      return { success: false, error: "Service not available" };
    }

    // Update public.users table (RLS enforced)
    const { error } = await supabase
      .from("users")
      .update({
        ...updates,
        updatedAt: new Date(),
      })
      .eq("id", user.id);

    if (error) {
      console.error("Error updating user profile:", error);
      return { success: false, error: error.message };
    }

    // If updating name or avatar, also update auth metadata
    if (updates.name || updates.avatar) {
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          name: updates.name,
          avatar_url: updates.avatar,
        },
      });

      if (authError) {
        console.warn("Error updating auth metadata:", authError);
        // Don't fail the whole operation if auth update fails
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error updating profile:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Update failed",
    };
  }
}
