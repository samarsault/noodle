<template>
  <div class="card">
    <img
      :src="course.coverImage"
      alt="Course"
      style="width: 100%; height: 160px;"
    />
    <div class="card-container">
      <h4>
        <b>{{ course.name }}</b>
      </h4>
      <p class="course-sem">{{ course.offerYear }}-{{ course.offerSem }}</p>
      <router-link
        :to="`/admin/cmgt/${course._id}`"
        tag="button"
        class="secondary"
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
  width: 270px;
  max-height: 340px;
  margin: 20px;
  border-radius: 4px;
  overflow: hidden;
  background-color: white;
  h4 {
    margin: 12px 0;
  }
  .course-sem {
    margin-top: -4px;
    margin-bottom: 10px;
    color: #aaa;
  }
  button {
    width: fit-content;
    margin: 7px auto;
  }
}

.card:hover {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
}

.card-container {
  background-color: white;
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 16px;
  overflow: hidden;
}
</style>
