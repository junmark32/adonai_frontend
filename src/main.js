import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import axios from 'axios'
axios.defaults.baseURL="http://adonback.test/"

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
