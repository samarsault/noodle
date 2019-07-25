<template>
  <div class="course-items">
    <div class="topics">
      <h4>Topics</h4>
      <ul>
        <li
          v-for="(tab, index) in tabs"
          :class="{ 'is-active': tab.isActive }"
          v-bind:key="index"
					@click="selectTab(tab)"
        >
          <a :href="tab.href">{{ tab.name }}</a>
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
	@media screen and (max-width: 960px){
		display: block;
	}
}
.topics {
	box-shadow: 0 0 1px 0 rgba(0,0,0,0.35);
	@media screen and (min-width: 960px) {
		min-height: 480px;
		width: 300px;
	}
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
		overflow: hidden;
		@media screen and (max-width: 960px) {
			display: flex;	
			background-color: #fff;
		}
		li {
			cursor: pointer;
			padding: 25px 30px;
			border-bottom: 1px solid #f7f7f7;
		}
	}
}

.resources{
	flex: 1;
	@media screen and (max-width: 960px) {
		margin-top: 20px;
		ul {
			padding: 0;
		}
	}
}
</style>
