import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
import { initializePokemonStore } from "kuinox-pokedex-backend";
initializePokemonStore("").then(() => {
  new Vue({
    router,
    render: (h) => h(App),
  }).$mount("#app");
});
