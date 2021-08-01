import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles/index.scss';
import LibUses from './lib-uses';
createApp(App)
  .use(LibUses)
  .mount('#app');
