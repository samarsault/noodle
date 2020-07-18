import axios from "axios";

export default {
  async getAll() {
    const { data } = await axios.get("/public/courses");
    return data;
  },
  // Get publically
  async getCourse(id) {
    const { data } = await axios.get(`/public/course/${id}`);
    return data;
  },
};
