<template>
  <div>
    <h1>Welcome to your Course</h1>
    <p>You can find topics & material in the left panel</p>
    <p>Content shows up on right</p>
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
