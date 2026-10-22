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

/**
 * Validate and format an Indian 10-digit mobile number.
 */
export function validateAndFormatPhone(rawPhone: string): {
  isValid: boolean;
  formatted: string;
  clean10Digits: string;
  error?: string;
} {
  const trimmed = rawPhone.trim();
  if (!trimmed) {
    return {
      isValid: false,
      formatted: "",
      clean10Digits: "",
      error: "Please enter your 10-digit mobile number.",
    };
  }

  // Remove all non-digit characters
  const digitsOnly = trimmed.replace(/\D/g, "");

  // Handle +91 (12 digits) or leading 0 (11 digits)
  let clean10 = digitsOnly;
  if (digitsOnly.length === 12 && digitsOnly.startsWith("91")) {
    clean10 = digitsOnly.slice(2);
  } else if (digitsOnly.length === 11 && digitsOnly.startsWith("0")) {
    clean10 = digitsOnly.slice(1);
  }

  if (clean10.length !== 10) {
    return {
      isValid: false,
      formatted: trimmed,
      clean10Digits: clean10,
      error: "Mobile number must be exactly 10 digits.",
    };
  }

  if (!/^[6-9]\d{9}$/.test(clean10)) {
    return {
      isValid: false,
      formatted: trimmed,
      clean10Digits: clean10,
      error: "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.",
    };
  }

  return {
    isValid: true,
    formatted: `+91 ${clean10.slice(0, 5)} ${clean10.slice(5)}`,
    clean10Digits: clean10,
  };
}

