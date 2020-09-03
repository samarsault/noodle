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
  async updatePage(page_id, body) {
    if (!page_id || !body) throw new Error("Missing data");

    const { status } = await axios.put(
      `/admin/courses/${course_id}/page/${page_id}`,
      body
    );
    return status === 200;
  },
  async deletePage(page_id) {
    if (page_id) {
      const { status } = await axios.delete(
        `/admin/courses/${course_id}/page/${page_id}`
      );
      return status === 200;
    }
    return false;
  },
  async reorderPages(items) {
    const { status } = await axios.put(
      `/admin/courses/${course_id}/page/reorder`,
      items
    );
    return status === 200;
  },
  async deleteModule(module_id) {
    const { status } = await axios.delete(
      `/admin/courses/${course_id}/module/${module_id}`
    );
    return status === 200;
  },
  questions: {
    get() {},
    async getGroups() {
      const { data } = await axios.get(
        `/api/courses/${course_id}/questions/groups`
      );
      return data;
    },
    async deleteGroup(group) {
      const { status } = await axios.delete(
        `/admin/courses/${course_id}/questions/groups/${group}`
      );
      return status === 200;
    },
    // group1->group2
    async renameGroup(group1, group2) {
      const { status } = await axios.put(
        `/admin/courses/${course_id}/questions/groups`,
        {
          group1,
          group2,
        }
      );
      return status === 200;
    },
  },
});
