"use server";

import { db } from "@/lib/db";
import { contactUs, type ContactUs, type NewContactUs } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export interface ContactMessageInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/**
 * Submit a direct message into the contact_us table.
 */
export async function submitContactMessage(input: ContactMessageInput): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  try {
    const name = input.name?.trim();
    const email = input.email?.trim();
    const phone = input.phone?.trim() || null;
    const message = input.message?.trim();

    if (!name) return { success: false, error: "Please provide your name." };
    if (!email) return { success: false, error: "Please provide your email." };
    if (!message) return { success: false, error: "Please provide a message or inquiry." };

    await db.insert(contactUs).values({
      name,
      email,
      phone,
      message,
    });

    return {
      success: true,
      message: "Your message has been received by our atelier concierge. We will reach out shortly.",
    };
  } catch (error) {
    console.error("Error submitting contact message:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit message.",
    };
  }
}

/**
 * Fetch all contact_us messages (for admin panel).
 */
export async function getContactMessages(): Promise<ContactUs[]> {
  try {
    return await db.select().from(contactUs).orderBy(desc(contactUs.createdAt));
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return [];
  }
}

