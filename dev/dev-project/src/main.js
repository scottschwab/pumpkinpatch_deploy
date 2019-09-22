import Vue from "vue";
import VueMaterial from "vue-material";

import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import VueNumericInput from "vue-numeric-input";

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(VueMaterial);
Vue.use(VueNumericInput);
Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(VueNumericInput);
Vue.config.productionTip = false;

export const EventBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
