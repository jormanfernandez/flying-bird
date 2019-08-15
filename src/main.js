import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
	data: () => {
		return {
			scores: {
				lasts: [],
				highest: [],
				actual: 0
			},
			player: {
				name: 'Bird'
			},
			bird: null
		}
	},
	methods: {
		sortHighestsScores (value) {

			this.scores.highest.unshift(value);
			this.scores.highest.sort((a, b) => b - a);

			let length = this.scores.highest.length;
			this.scores.highest.length = length > 10 ? 10 : length;
		}
	},
	watch: {
		"scores.lasts" (value) {
			let length = this.scores.lasts.length;
			this.scores.lasts.length = length > 10 ? 10 : length;
			this.sortHighestsScores(value[0])
		}
	},
  render: h => h(App)
}).$mount("#app");
