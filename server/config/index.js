// Configure environment variables
require("dotenv").config();

module.exports = {
  mongo: {
    uri: process.env.MONGODB_URI || `mongodb+srv://adityach0603:kLWYxL1gQGfCs0Ux@cluster0.nngad6o.mongodb.net/comments`,
  },
};
