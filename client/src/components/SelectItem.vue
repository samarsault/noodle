<template>
  <Modal :title="title" :size="480" @close="$emit('close')">
    <template slot="body">
      <div id="items-list">
        <div
          v-bind:key="index"
          v-for="(item, index) in items"
          class="item-to-add"
          @click="select(index)"
        >
          <div class="icon"></div>
          <div>
            <p class="item-name">{{ item.name }}</p>
            <p class="item-desc">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "./Dialogs/Modal.vue";

export default {
  name: "SelectItem",
  props: {
    items: Array,
    title: String,
  },
  components: {
    Modal,
  },
  methods: {
    select(index) {
      this.$emit("select", this.items[index], index);
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
.item-to-add {
  padding: 10px;
  display: flex;
  border-bottom: 0.5px solid rgba($black, 0.05);
  .icon {
    width: 60px;
    height: 60px;
    margin-right: 10px;
    border: 2px dotted #ccc;
    border-radius: 4px;
    background-color: #eee;
  }
  transition: background-color 0.3s ease-out;
  &:hover {
    background-color: $gray;
    .item-name {
      color: $tealBlue;
    }
    //border: 1px solid #eee;
  }
  cursor: pointer;
}
p {
  margin: 5px 0;
}
.item-name {
  font-weight: bold;
  transition: color 0.3s ease-out;
}
.item-desc {
  color: #888;
}
</style>
