const validate = (data) => {
  if (!data.email || !data.password) {
    throw new Error("Email and password are required");
  }
  if (data.password && data.password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
};

module.exports = validate;
