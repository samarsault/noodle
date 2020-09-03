<template>
  <Modal title="Confirm">
    <template slot="body">
      <p>{{ message }}</p>
    </template>
    <template slot="footer">
      <button class="primary">Yes</button>
      <button class="secondary">No</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "./Modal";

export default {
  name: "Confirm",
  components: {
    Modal,
  },
  props: {
    message: String,
    onMessage: Function,
  },
};
</script>

<style lang="scss"></style>
