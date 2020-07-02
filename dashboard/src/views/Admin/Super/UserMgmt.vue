<template>
  <div
    style="
      padding-top: 40px;
      padding-bottom: 40px;
      padding-left: 200px;
      padding-right: 200px;
    "
  >
    <Students />
  </div>
</template>

<script>
import axios from "axios";
import Students from "../../../components/Students";

export default {
  components: {
    Students,
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
