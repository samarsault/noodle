<template>
  <div class="course-items">
    <div class="topics">
      <h4>Topics</h4>
      <ul>
        <li
          v-for="(tab, index) in tabs"
          :class="{ 'is-active': tab.isActive }"
          v-bind:key="index"
        >
          <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
        </li>
      </ul>
    </div>

    <div class="resources">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  data() {
    return { tabs: [] };
  },

  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name == selectedTab.name;
      });
    }
  }
};
</script>

<style lang="scss">
.course-items {
  display: flex;
}
.topics {
	width: 300px;
	box-shadow: 0 0 1px 0 rgba(0,0,0,0.35);
	min-height: 480px;
	h4 {
		background-color: #f7f7f7;
		color: #020202 !important;
		padding: 15px 20px;
		margin: 0;
	}
	background-color: #fff;
	color: #020202;
	ul {
		padding: 0;
		margin: 0;
		list-style-type: none;
		li {
			padding: 25px 30px;
			border-bottom: 1px solid #f7f7f7;
		}
	}
}

.resources{
	flex: 1;
}
</style>
