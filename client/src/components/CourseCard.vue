<template>
  <div class="card-wrap">
    <div class="card">
      <img
        :src="course.coverImage"
        :alt="course.name"
        style="width: 100%; height: 160px;"
      />
      <div class="card-container">
        <div>
          <h4>
            <b>{{ course.name }}</b>
          </h4>
          <slot name="body"></slot>
        </div>
        <slot name="action">
          <router-link
            :to="`/admin/cmgt/${course._id}`"
            tag="button"
            class="secondary"
            >View</router-link
          >
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["course"],
};
</script>

<style lang="scss" scoped>
.card-wrap {
  padding: 15px;
  width: 33%;
  @media screen and (max-width: 960px) {
    width: 50%;
  }
  @media screen and (max-width: 640px) {
    width: 100%;
  }
}
.card {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 0px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s;
  max-height: 340px;
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
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 16px;
  overflow: hidden;
}
</style>
