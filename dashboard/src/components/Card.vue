<template>
  <div class="card">
    <img src="@/../public/logo.png" alt="CTE Course" style="width: 100%;" />
    <div class="container">
      <h4>
        <b>{{ name }}</b>
      </h4>
      <p>
        {{ info }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["name", "info"],
};
</script>

<style lang="scss" scoped>
.card {
  padding: 0px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 20%;
  height: 10%;
  margin: 20px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 2px 16px;
}
</style>
