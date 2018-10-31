import Vue from "vue";
import Index from "./Index.vue";

import "./stylesheets/index.css";

if (module.hot) {
  module.hot.accept();
}

new Vue({
  el: "#app",
  render: h => h(App)
});
