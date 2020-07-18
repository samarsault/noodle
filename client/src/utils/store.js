/*
 * Basic Global State Management
 */
import Vue from "vue";

const store = Vue.observable({
  user: null,
  isAdmin: false,
  isLoading: false,
  alert: {
    status: "",
    message: "",
    show: false,
  },
  uploadBox: {
    show: false,
    onSuccess: null,
  },
  activePage: null,
});

export const getters = {
  user: () => store.user,
  isLoading: () => store.isLoading,
  alert: () => store.alert,
  uploadBox: () => store.uploadBox,
  activePage: () => store.activePage,
};

export const mutations = {
  setUser(user) {
    store.user = user;
  },
  setActivePage(page) {
    store.activePage = page;
  },
  setLoading(value) {
    store.isLoading = value;
  },
  showAlert(status, message) {
    store.alert = {
      status,
      message,
      show: true,
    };
  },
  hideAlert() {
    store.alert.show = false;
  },
  toggleUploadBox(value, cb) {
    store.uploadBox.show = value;
    store.uploadBox.onSuccess = cb;
  },
};
