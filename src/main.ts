import { createApp } from "vue";
import App from "./App.vue";
import router from "./route";
import { setupStore } from "./store";

const app = createApp(App);

// 引入vuex store
setupStore(app);

app.use(router);

app.mount("#app");
