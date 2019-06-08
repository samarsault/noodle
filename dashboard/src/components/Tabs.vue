<template>
  <div class="tabs-container">
    <div class="tabs">
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

    <div class="tabs-details">
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

<style lang="scss" scoped>
@import "../../../styles/include/vars";

.tabs-container {
	display: flex;
	margin:20px 0;
}
.tabs {
	min-width: 300px;
	height: 100%;
	box-shadow: 0 0 1px 0 rgba(0,0,0,0.35);
	background-color: #fff;
	color: $black;
	ul {
		padding: 0;
		margin: 0;
		list-style-type: none;
		li {
			padding: 25px 30px;
			border-bottom: 1px solid $gray;
			&.is-active {
				border-left: .5em solid $green;
			}
		}
		a {
			color: inherit;
			&:hover {
				text-decoration: none !important;
			}
			&:focus {
				outline: none;
			}
     	}
	}
}
.tabs-details {
	flex: 1;
	padding: 0 20px;
}
</style>
