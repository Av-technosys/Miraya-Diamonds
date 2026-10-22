"use server";

import { db } from "@/lib/db";
import { users, type User } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { validateAndFormatPhone } from "@/lib/account-profile";

export interface AdminUserView {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string | null;
  gender: string | null;
  birthday: string | null;
  anniversary: string | null;
  emailVerified: boolean;
  joinedDate: string;
  createdAt: string | null;
}

/**
 * Format a Date into a clean readable string (e.g., "22 Oct 2026")
 */
function formatDate(date: Date | null | undefined): string {
  if (!date) return "Recently";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Fetch all users from the database for the Admin Panel.
 * Enriches each user with email verification status from Clerk.
 */
export async function getAdminUsers(): Promise<AdminUserView[]> {
  try {
    const dbUsers = await db.select().from(users).orderBy(desc(users.createdAt));

    // Safely query Clerk for verification statuses
    let clerkEmailStatusMap = new Map<string, boolean>();
    try {
      const client = await clerkClient();
      const clerkList = await client.users.getUserList({ limit: 100 });
      for (const cu of clerkList.data) {
        for (const ea of cu.emailAddresses) {
          clerkEmailStatusMap.set(
            ea.emailAddress.toLowerCase(),
            ea.verification?.status === "verified"
          );
        }
      }
    } catch (clerkErr) {
      console.warn("Could not query Clerk verification statuses:", clerkErr);
    }

    return dbUsers.map((u) => {
      const fullName = `${u.firstName || ""} ${u.lastName || ""}`.trim() || "Valued Collector";
      const isVerified = clerkEmailStatusMap.get(u.email.toLowerCase()) ?? true;

      return {
        id: u.id,
        name: fullName,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        phone: u.mobileNumber || "—",
        address: u.address || null,
        gender: u.gender || null,
        birthday: u.birthday || null,
        anniversary: u.anniversary || null,
        emailVerified: isVerified,
        joinedDate: formatDate(u.createdAt),
        createdAt: u.createdAt ? u.createdAt.toISOString() : null,
      };
    });
  } catch (error) {
    console.error("Error fetching admin users from database:", error);
    return [];
  }
}

/**
 * Synchronize the currently authenticated Clerk user with the database `users` table.
 * If user does not exist in DB, creates a new record.
 */
export async function syncCurrentUser(): Promise<User | null> {
  try {
    const user = await currentUser();
    if (!user) return null;

    const primaryEmail =
      user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
        ?.emailAddress || user.emailAddresses[0]?.emailAddress;

    if (!primaryEmail) return null;

    const existingUsers = await db
      .select()
      .from(users)
      .where(sql`LOWER(${users.email}) = LOWER(${primaryEmail.trim()})`);

    if (existingUsers.length > 0) {
      return existingUsers[0];
    }

    const phone =
      user.phoneNumbers[0]?.phoneNumber ||
      (typeof user.unsafeMetadata?.phoneNumber === "string"
        ? user.unsafeMetadata.phoneNumber
        : "") ||
      "";

    const address =
      typeof user.unsafeMetadata?.address === "string"
        ? user.unsafeMetadata.address
        : null;

    const gender =
      typeof user.unsafeMetadata?.gender === "string"
        ? user.unsafeMetadata.gender
        : null;

    const birthday =
      typeof user.unsafeMetadata?.birthday === "string"
        ? user.unsafeMetadata.birthday
        : null;

    const anniversary =
      typeof user.unsafeMetadata?.anniversary === "string"
        ? user.unsafeMetadata.anniversary
        : null;

    const [inserted] = await db
      .insert(users)
      .values({
        firstName: user.firstName || "Valued",
        lastName: user.lastName || "Collector",
        email: primaryEmail,
        mobileNumber: phone,
        address: address,
        gender: gender,
        birthday: birthday,
        anniversary: anniversary,
      })
      .returning();

    revalidatePath("/admin");
    return inserted;
  } catch (error) {
    console.error("Error syncing current user with database:", error);
    return null;
  }
}

/**
 * Retrieve the current logged-in user's database record.
 */
export async function getCurrentUserProfile(): Promise<User | null> {
  try {
    const user = await currentUser();
    if (!user) return null;

    const primaryEmail =
      user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
        ?.emailAddress || user.emailAddresses[0]?.emailAddress;

    if (!primaryEmail) return null;

    const existingUsers = await db
      .select()
      .from(users)
      .where(sql`LOWER(${users.email}) = LOWER(${primaryEmail.trim()})`);

    if (existingUsers.length > 0) {
      return existingUsers[0];
    }

    return await syncCurrentUser();
  } catch (error) {
    console.error("Error retrieving user profile from database:", error);
    return null;
  }
}

/**
 * Update the user's profile from the user-facing Dashboard (/dashboard/profile).
 */
export async function updateUserProfile(data: {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  address?: string | null;
  gender?: string | null;
  birthday?: string | null;
  anniversary?: string | null;
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be logged in to update your profile.");
  }

  const user = await currentUser();
  if (!user) {
    throw new Error("User record not found.");
  }

  const primaryEmail =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress || user.emailAddresses[0]?.emailAddress;

  if (!primaryEmail) {
    throw new Error("User primary email not found.");
  }

  const cleanFirstName = data.firstName.trim();
  const cleanLastName = data.lastName.trim();

  // Validate 10-digit mobile number
  const phoneValidation = validateAndFormatPhone(data.mobileNumber);
  if (!phoneValidation.isValid) {
    throw new Error(phoneValidation.error || "Please enter a valid 10-digit mobile number.");
  }
  const cleanMobile = phoneValidation.formatted;
  const cleanAddress = data.address ? data.address.trim() : null;
  const cleanGender = data.gender ? data.gender.trim() : null;
  const cleanBirthday = data.birthday ? data.birthday.trim() : null;
  const cleanAnniversary = data.anniversary ? data.anniversary.trim() : null;

  // 1. Update in Postgres Database (with upsert resilience)
  const existingUsers = await db
    .select()
    .from(users)
    .where(sql`LOWER(${users.email}) = LOWER(${primaryEmail.trim()})`);

  let updatedDbUser;
  if (existingUsers.length === 0) {
    const [inserted] = await db
      .insert(users)
      .values({
        firstName: cleanFirstName || "Valued",
        lastName: cleanLastName || "Collector",
        email: primaryEmail.trim().toLowerCase(),
        mobileNumber: cleanMobile,
        address: cleanAddress,
        gender: cleanGender,
        birthday: cleanBirthday,
        anniversary: cleanAnniversary,
      })
      .returning();
    updatedDbUser = inserted;
  } else {
    const [updated] = await db
      .update(users)
      .set({
        firstName: cleanFirstName,
        lastName: cleanLastName,
        mobileNumber: cleanMobile,
        address: cleanAddress,
        gender: cleanGender,
        birthday: cleanBirthday !== undefined ? cleanBirthday : undefined,
        anniversary: cleanAnniversary !== undefined ? cleanAnniversary : undefined,
        updatedAt: new Date(),
      })
      .where(sql`LOWER(${users.email}) = LOWER(${primaryEmail.trim()})`)
      .returning();
    updatedDbUser = updated;
  }

  // 2. Also keep Clerk metadata and profile in sync
  try {
    const client = await clerkClient();
    await client.users.updateUser(userId, {
      firstName: cleanFirstName,
      lastName: cleanLastName,
      unsafeMetadata: {
        ...user.unsafeMetadata,
        phoneNumber: cleanMobile,
        address: cleanAddress,
        gender: cleanGender,
        ...(cleanBirthday !== null ? { birthday: cleanBirthday } : {}),
        ...(cleanAnniversary !== null ? { anniversary: cleanAnniversary } : {}),
      },
    });
  } catch (clerkUpdateError) {
    console.warn("Could not sync profile changes to Clerk:", clerkUpdateError);
  }

  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return { success: true, user: updatedDbUser };
}

/**
 * Save special dates (birthday & anniversary) to both PostgreSQL database and Clerk.
 */
export async function updateUserSpecialDates(data: {
  birthday?: string | null;
  anniversary?: string | null;
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be logged in to save special dates.");
  }

  const user = await currentUser();
  if (!user) {
    throw new Error("User record not found.");
  }

  const primaryEmail =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress || user.emailAddresses[0]?.emailAddress;

  if (!primaryEmail) {
    throw new Error("User primary email not found.");
  }

  const cleanBirthday = data.birthday ? data.birthday.trim() : null;
  const cleanAnniversary = data.anniversary ? data.anniversary.trim() : null;

  // 1. Update in Postgres Database
  const existingUsers = await db
    .select()
    .from(users)
    .where(sql`LOWER(${users.email}) = LOWER(${primaryEmail.trim()})`);

  let updatedDbUser;
  if (existingUsers.length === 0) {
    const [inserted] = await db
      .insert(users)
      .values({
        firstName: user.firstName || "Valued",
        lastName: user.lastName || "Collector",
        email: primaryEmail.trim().toLowerCase(),
        mobileNumber:
          user.phoneNumbers[0]?.phoneNumber ||
          (typeof user.unsafeMetadata?.phoneNumber === "string"
            ? user.unsafeMetadata.phoneNumber
            : "") ||
          "",
        birthday: cleanBirthday,
        anniversary: cleanAnniversary,
      })
      .returning();
    updatedDbUser = inserted;
  } else {
    const [updated] = await db
      .update(users)
      .set({
        birthday: cleanBirthday,
        anniversary: cleanAnniversary,
        updatedAt: new Date(),
      })
      .where(sql`LOWER(${users.email}) = LOWER(${primaryEmail.trim()})`)
      .returning();
    updatedDbUser = updated;
  }

  // 2. Also keep Clerk metadata in sync
  try {
    const client = await clerkClient();
    await client.users.updateUser(userId, {
      unsafeMetadata: {
        ...user.unsafeMetadata,
        birthday: cleanBirthday,
        anniversary: cleanAnniversary,
      },
    });
  } catch (clerkErr) {
    console.warn("Could not sync special dates to Clerk:", clerkErr);
  }

  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return { success: true, user: updatedDbUser };
}

/**
 * Admin action: Update a user's details directly from the Admin Panel.
 */
export async function adminUpdateUser(
  userId: string,
  data: {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    address?: string | null;
    gender?: string | null;
    birthday?: string | null;
    anniversary?: string | null;
  }
) {
  try {
    let cleanMobile = data.mobileNumber.trim();
    if (cleanMobile) {
      const phoneValidation = validateAndFormatPhone(cleanMobile);
      if (!phoneValidation.isValid) {
        return { success: false, error: phoneValidation.error || "Please enter a valid 10-digit mobile number." };
      }
      cleanMobile = phoneValidation.formatted;
    }

    const [updatedUser] = await db
      .update(users)
      .set({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        mobileNumber: cleanMobile,
        address: data.address ? data.address.trim() : null,
        gender: data.gender !== undefined ? (data.gender ? data.gender.trim() : null) : undefined,
        birthday: data.birthday !== undefined ? (data.birthday ? data.birthday.trim() : null) : undefined,
        anniversary: data.anniversary !== undefined ? (data.anniversary ? data.anniversary.trim() : null) : undefined,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    revalidatePath("/admin");
    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard");

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error in adminUpdateUser:", error);
    return { success: false, error: "Failed to update user." };
  }
}

/**
 * Admin action: Delete a user record from the database.
 */
export async function adminDeleteUser(userId: string) {
  try {
    await db.delete(users).where(eq(users.id, userId));
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error in adminDeleteUser:", error);
    return { success: false, error: "Failed to delete user." };
  }
}

