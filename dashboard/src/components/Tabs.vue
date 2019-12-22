<template>
  <div class="tabs-container">
    <div class="tabs">
			<h4 style="margin-left:20px">{{ title }}</h4>
      <ul>
        <li
          v-for="(tab, index) in tabs"
          :class="{ 'is-active': tab.isActive }"
          v-bind:key="index"
					@click="selectTab(tab)"
        >
          <a :href="tab.href ">{{ tab.name }}</a>
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
	props: [ 'title' ],
  created() {
	this.tabs = this.$children;
  },
  mounted() {
	if (this.tabs.length > 0)
		this.tabs[0].isActive = true
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
	@media screen and (max-width: 960px){
		display: block;
	}
}
.tabs {
	@media screen and (min-width: 960px) {
		min-width: 300px;
	}
	height: 100%;
	box-shadow: 0 0 1px 0 rgba(0,0,0,0.35);

	background-color: #fff;
	color: $black;
	ul {
		padding: 0;
		margin: 0;
		list-style-type: none;
		@media screen and (max-width: 960px) {
			display: flex;	
			background-color: #fff;
			overflow-x: scroll;
		}
		li {
			padding: 25px 30px;
			border-bottom: 1px solid $gray;
			cursor: pointer;
			&.is-active {
				border-left: .5em solid $green;
				@media screen and (max-width: 960px) {
					border-left: 0;
					border-bottom: .3em solid $green;
				}
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
	padding: 20px;
	@media screen and (max-width: 960px) {
		margin-top: 20px;
		padding: 0;
	}
}
</style>
