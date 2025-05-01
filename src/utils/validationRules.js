export const validationRules = {
    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? "" : "Invalid email format";
    },
    "password-strength": (value) => {
      return value.length >= 6 ? "" : "Password must be at least 6 characters";
    },
  };
  