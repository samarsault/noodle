import axios from "axios";

export default {
  async getAll() {
    const { data } = await axios.get("/public/courses");
    return data;
  },
};
