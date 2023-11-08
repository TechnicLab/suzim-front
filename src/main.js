import { createApp } from "vue"
import App from './App.vue'
import router from './router'
import axios from "axios"
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_HOST

createApp(App).use(BootstrapVue).use(IconsPlugin).use(router, axios).mount('#app')
