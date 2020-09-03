<template>
  <div class="resource">
    <div style="display: flex;">
      <div class="resource-icon">
        <FallbackIcon :size="48" />
      </div>
      <div class="resource-text">
        <h4>{{ title }}</h4>
        <a :href="src">Download</a>
      </div>
    </div>
  </div>
</template>

<script>
import FallbackIcon from "vue-material-design-icons/FileDocumentOutline";

export default {
  components: {
    FallbackIcon,
  },
  props: {
    node: {
      type: Object,
    },
  },

  computed: {
    src: function () {
      return this.node && this.node.attrs.src;
    },

    title: function () {
      return this.node && this.node.attrs.title;
    },
  },
};
</script>
<style lang="scss">
.resource {
  background-color: #fff;
  padding-right: 40px;
  border: 1px solid rgba($black, 0.05);
  box-shadow: 0 1px 2px 0 rgba($black, 0.03);
  border-radius: 4px;
  display: flex;
  align-items: center;
  width: fit-content;
  justify-content: space-between;

  .resource-icon {
    padding: 16px;
    background-color: #eee;
    display: flex;
    align-items: center;
  }
  .resource-text {
    padding: 20px;
    h4 {
      margin-top: 0;
      margin-bottom: 0.4em;
    }
    p {
      margin-top: 0;
    }
  }
}
</style>
