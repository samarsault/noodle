const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../user/user.model");

const HASH_SALT_ROUNDS = 12;

exports.createUser = async function (user) {
  const { email, name, password } = user;

  const userDoc = await User.findOne({
    email,
  });
  if (userDoc) {
    throw new Error("Email ID already exists.");
  }
  const hashedPassword = await bcrypt.hash(password, HASH_SALT_ROUNDS);

  const count = await User.countDocuments({});
  const newUser = {
    name,
    email,
    password: hashedPassword,
    // first user is admin
    role: count === 0 ? "admin" : "student",
  };
  const result = await User.create(newUser);

  const token = this.createToken(result._id);
  return token;
};

exports.createToken = function (user_id) {
  return jwt.sign(
    {
      user_id,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "20d",
    }
  );
};

exports.login = async function ({ email, password }) {
  if (!email || !password) {
    throw new Error("One or more required fields are empty.");
  }
  const emailRegex = new RegExp(`\\b${email}\\b`, "i");
  const userDoc = await User.findOne({
    email: {
      $regex: emailRegex,
    },
  });

  if (!userDoc) {
    throw new Error("The email or password are incorrect");
  }

  const passwordsMatch = await bcrypt.compare(password, userDoc.password);

  if (!passwordsMatch) {
    throw new Error("The email or password are incorrect");
  }

  const token = this.createToken(userDoc._id);
  return token;
};
