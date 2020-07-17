//
// Course API abstraction
//
import axios from "axios";

export default (course_id) => ({
  async get() {
    const { data } = await axios.get(`/api/courses/${course_id}`);
    return data;
  },
  async getPages() {
    const { data } = await axios.get(`/api/courses/${course_id}/pages`);
    return data;
  },
  async register() {
    const { data } = await axios.post(`/api/courses/${course_id}/register`);
    return data.success;
  },
  async getPage(page_id, parent) {
    const { data } = await axios.get(
      `/api/courses/${course_id}/pages/${page_id}`,
      parent
        ? {
            params: {
              parent: page_id,
            },
          }
        : null
    );
    return data;
  },
  async createPage(body) {
    if (!body.name || !body.course || !body.type)
      throw new Error("One of required parameters is missing");
    const { data } = await axios.post(`/admin/courses/${course_id}/page`, body);
    return data;
  },
  questions: {
    get() {},
    async getGroups() {
      const { data } = await axios.get(
        `/api/courses/${course_id}/questions/groups`
      );
      return data;
    },
  },
});
