<template>
  <div class="card">
    <img src="@/../public/logo.png" alt="CTE Course" style="width: 100%;" />
    <div class="container">
      <h4>
        <b>{{ course.name }}</b>
        ({{ course.offerYear }}-{{ course.offerSem }})
      </h4>
      <router-link :to="`/admin/cmgt/${course._id}`" tag="button"
        >View</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["course"],
  methods: {
    editCourse(next) {
      next();
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 0px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 15%;
  height: 290px;
  margin: 20px;
  overflow: hidden;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  padding: 2px 16px;
  overflow: hidden;
}
</style>
