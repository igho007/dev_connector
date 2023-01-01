interface RegisterError {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  message?: string;
}
export const validateRegister = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const errors: RegisterError = {};

  if (name === "") errors.name = "Enter your name";
  if (email === "") {
    errors.email = "Enter Email";
  } else {
    const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]/;
    if (!email.match(regEx)) {
      errors.email = "Enter a valid email";
    }
  }

  if (password.length < 5) errors.password = "password must be greater than 5";
  if (password !== confirmPassword)
    errors.confirmPassword = "confirm password must be the same as password";

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
