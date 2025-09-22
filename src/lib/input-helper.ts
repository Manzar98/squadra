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
    // Remove spaces and dashes for normalization
    const normalized = phone.replace(/[\s-]/g, '')
  
    // Accepts:
    // - +923419055442
    // - 923419055442
    // - 03419055442
    const regex = /^(?:\+92|92|0)?3\d{9}$/
  
    return regex.test(normalized)
  }
  
  