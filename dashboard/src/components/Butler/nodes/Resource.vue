<template>
  <div class="resource">
    <div style="display: flex">
      <div class="resource-icon">
	<FallbackIcon :size="72"/>
      </div>
      <h3 class="resource-text">{{ title }}</h3>
    </div>
    <a :href="src">
      <button style="margin-right:30px" class="secondary">Download</button>
    </a>
    </div>
</template>

<script>
import FallbackIcon from 'vue-material-design-icons/FileDocumentOutline';

export default {
  components: {
    FallbackIcon
  },
  props: {
    node: {
      type: Object
    },

    updateAttrs: {
      type: Function
    },

    editable: {
      type: Boolean
    }
  },

  computed: {
    src: function() {
      return this.node && this.node.attrs.src
    },

    title: function() {
      return this.node && this.node.attrs.title
    }
  }
}
</script>
<style lang="scss">

.resource{
  background-color: #fff;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .resource-icon {
    padding: 25px;
    background-color: #eee;
  }
  .resource-text {
    margin-left: 20px;
    h3 {
      margin: .4em 0;
    }
    p {
      margin-top: 0;
    }
  }
}
</style>
