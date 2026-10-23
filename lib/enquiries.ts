import type { ProductEnquiry } from "@/lib/db/schema";

export const enquiryStatuses = {
  under_review: "Under review",
  response_received: "Response received",
  consultation_scheduled: "Consultation scheduled",
  closed: "Closed",
} as const;

export type EnquiryStatus = keyof typeof enquiryStatuses;
export type AdminEnquiry = Omit<ProductEnquiry, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};
export type EnquirySummary = Record<EnquiryStatus, number>;
export type EnquiryQuery = { search?: string; status?: EnquiryStatus | "all"; page?: number };
export type EnquiryListResult = {
  success: true;
  enquiries: AdminEnquiry[];
  total: number;
  page: number;
  pageSize: number;
  summary: EnquirySummary;
} | { success: false; error: string };

export type ProductSelection = {
  metalColour: string;
  diamondGrade: string;
  metalPurity: string;
  size: string;
  engravingRequested: boolean;
  engravingText: string;
};

export type ProductEnquiryInput = ProductSelection & {
  name: string;
  phone: string;
  email: string;
  message: string;
  sku: string;
};
