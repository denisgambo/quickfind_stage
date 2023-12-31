import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

import { IonicVue } from '@ionic/vue';

import BaseLayout from './components/Base/BaseLayout.vue'
import AnnonceLayout from './components/Base/AnnonceLayout.vue'
import MenuHorizontal from './components/MenuHorizontal.vue'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/style.css'

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store);
  app.component('base-layout', BaseLayout)
  app.component('annonce-layout', AnnonceLayout)
  app.component('menu-horizontal', MenuHorizontal)
  
router.isReady().then(() => {
  app.mount('#app');
});
import "bootstrap/dist/js/bootstrap.js"