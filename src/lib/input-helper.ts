// src/lib/input-helpers.ts

/**
 * ✅ Input validation + formatting helpers
 */

export const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
  };
  
  export const isValidPassword = (password: string): boolean => {
    // 5+ characters, at least 1 number, 1 special char, no spaces
    const regex = /^(?=.*\d)(?=.*[^\w\s])[^\s]{5,}$/;
    return regex.test(password);
  };
  
  export const isValidNumber = (value: string | number): boolean => {
    return /^\d+$/.test(String(value).trim());
  };
  
  export const isValidPhone = (phone: string): boolean => {
    // Accepts international numbers (+countrycode) or local (digits only)
    const regex = /^\+?[1-9]\d{7,14}$/;
    return regex.test(phone.trim());
  };
  