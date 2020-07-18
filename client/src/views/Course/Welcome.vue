<template>
  <div>
    <h1>Welcome to your Course</h1>
    <p>The left panel allows you to add curriculum to your course</p>
    <p>You can see admin related actions in the place below</p>
  </div>
</template>

<script>
export default {
  props: ["onLoad"],
  created() {
    this.onLoad(null);
  },
};
</script>
