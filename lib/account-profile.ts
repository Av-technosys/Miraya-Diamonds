type AccountPhone = {
  id: string;
  phoneNumber: string;
  verification: { status: string | null } | null;
};

type AccountDetails = {
  primaryPhoneNumberId: string | null;
  phoneNumbers: AccountPhone[];
  unsafeMetadata: Record<string, unknown>;
};

export function getVerifiedPhone(user: Pick<AccountDetails, "phoneNumbers" | "primaryPhoneNumberId">) {
  return user.phoneNumbers.find(phone => phone.id === user.primaryPhoneNumberId && phone.verification?.status === "verified")
    ?? user.phoneNumbers.find(phone => phone.verification?.status === "verified");
}

export function getContactPhone(user: Pick<AccountDetails, "phoneNumbers" | "primaryPhoneNumberId" | "unsafeMetadata">) {
  if (typeof user.unsafeMetadata.phoneNumber === "string") return user.unsafeMetadata.phoneNumber;
  return user.phoneNumbers.find(phone => phone.id === user.primaryPhoneNumberId)?.phoneNumber
    ?? user.phoneNumbers[0]?.phoneNumber
    ?? "";
}

