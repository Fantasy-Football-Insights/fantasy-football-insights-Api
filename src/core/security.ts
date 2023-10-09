import * as bcrypt from "bcrypt";

// Encrypts password to be stored in db
export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

// Compares password with stored hashed password to check if password is correct
export const comparePassword = (
  password: string,
  hashedPassword: string
): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};
