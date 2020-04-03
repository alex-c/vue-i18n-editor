import Vue from "vue";
if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.config.productionTip = false;

// Get router & store
import router from "./router";
import store from "./store";

// Load i18n messages
const messages = {
  en: require("./i18n/en.json"),
  de: require("./i18n/de.json")
};

// Load & configure i18n
import VueI18n from "vue-i18n";
Vue.use(VueI18n);
let language = localStorage.getItem("language") || "en";
const i18n = new VueI18n({
  locale: language,
  // TODO: uncomment the next line!
  //fallbackLocale: 'en',
  messages
});

// Material design icons
import "@mdi/font/css/materialdesignicons.min.css";

// Bulma
import "bulma/css/bulma.css";

// Mount app
import App from "./App";
new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: "<App/>"
}).$mount("#app");
