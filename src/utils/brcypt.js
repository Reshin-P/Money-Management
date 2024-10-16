// Import bcrypt using ES6 syntax
import bcrypt from "bcryptjs";

// Utility function to hash a password
export const hashPassword = (password, saltRounds = 10) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

// Utility function to compare password with a stored hash
export const comparePassword = (password, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) reject(err);
      resolve(isMatch);
    });
  });
};
