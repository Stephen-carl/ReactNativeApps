// Validates whether a string is a properly formatted email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validates Nigerian phone numbers in local or international format
export const isValidPhoneNumber = (phone: string): boolean => {
  const normalizedPhone = phone.replace(/\s+/g, '');

  // Local Nigerian format (e.g., 08012345678)
  const localRegex = /^0[789][01]\d{8}$/;

  const internationalRegex = /^(\+?234)[789][01]\d{8}$/;

  return localRegex.test(normalizedPhone) || internationalRegex.test(normalizedPhone);
};