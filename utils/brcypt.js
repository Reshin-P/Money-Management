const bcrypt = require("bcryptjs");

// Utility function to hash a password
const hashPassword = (password, saltRounds = 10) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

// Utility function to compare password with a stored hash
const comparePassword = (password, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) reject(err);
      resolve(isMatch);
    });
  });
};

module.exports = { hashPassword, comparePassword };
