//
// Abstractions on top
// of User API
//
import axios from "axios";

export default {
  async get() {
    const { data } = await axios.get("/api/user");
    return data;
  },
  async getCourses() {
    const { data } = await axios.get("/api/user/courses");
    return data;
  },
  async login(payload) {
    const { email, password } = payload;
    if (!email || !password) throw new Error("email or password not passed");

    const { data } = await axios.post("/auth/login", {
      email,
      password,
    });

    return data;
  },
  async signUp(payload) {
    const { name, email, password } = payload;
    if (!name || !email || !password)
      throw new Error("one of required fields are missing");

    const { data } = await axios.post("/auth/signup", {
      name,
      email,
      password,
    });

    return data;
  },
};
