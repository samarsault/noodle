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
  background-color: #f6f6f6;
  padding: 15px;
  display: flex;
  .icon {
    width: 80px;
    height: 80px;
    margin-right: 10px;
    border: 3px dotted #ccc;
    border-radius: 4px;
    background-color: #ddd;
  }
  transition: background-color 0.3s ease-out;
  &:hover {
    background-color: #f0f0f0;
    //border: 1px solid #eee;
  }
  cursor: pointer;
}
p {
  margin: 5px 0;
}
.item-name {
  font-weight: bold;
}
.item-desc {
  color: #888;
}
</style>
