import { createApp } from 'vue';
import App from './App.vue';
import { MTree } from './components';
import './assets/styles/index.scss';

createApp(App)
  .use(MTree)
  .mount('#app');
