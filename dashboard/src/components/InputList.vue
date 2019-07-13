<template>
  <div id="component">
    <Modal v-if="showModal" title="Add Item" v-on:ok="addItem" v-on:close="showModal = false">
      <input type="text" placeholder="Name" v-model="inputValue" ref="addInput"> 
    </Modal>

    <div class="header">
      <span>{{ heading || 'Input List' }}</span>
      <a href="#" @click="showModalWindow">Add</a>
    </div>

    <ul class="body">
      <li v-for="item in list">
        <span>{{ item }}</span>
        <a href="#">Remove</a>
      </li>
    </ul>

  </div>
</template>

<script>
import Modal from './Dialogs/Modal.vue';

export default {
  props: [ 'heading', 'list' ],
  data() {
    return {
      inputValue: '',
      showModal: false
    }
  },
  methods: {
    showModalWindow() {
      this.showModal = true;
      this.$refs.addInput.focus();
    },
    addItem() {
      const item = this.inputValue;
      this.list.push(item);
      this.showModal = false;
    }
  },
  components: {
    Modal
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}
#component {
  border: 1px solid #ddd;
  padding: 10px;
}
ul {
  background-color: white;
  list-style-type: none;
  padding: 0;
  li {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
  }
}
</style>

