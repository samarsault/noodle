<template>
  <div class="card">
    <img :src="course.coverImage" alt="CTE Course" style="width: 100%; height: 150px;" />
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
	display: flex;
	flex-direction: column;
  padding: 0px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 15%;
  height: 290px;
  margin: 20px;
  border-radius: 10px;
  overflow: hidden;
	background-color: white;
}

.card:hover {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
}

.container {
	background-color: white;
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  padding: 2px 16px;
  overflow: hidden;
}
</style>
