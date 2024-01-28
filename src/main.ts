import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PiniaPluginPersist from 'pinia-plugin-persist'
import { createRouter, createWebHashHistory } from 'vue-router'

import './global.css'
import 'uno.css'

import App from '@/App.vue'
import Welcome from '@/components/Welcome.vue'
import Home from '@/components/Home.vue'
import NoticeBoard from '@/components/NoticeBoard.vue'
import Setting from '@/components/Setting.vue'

const routes = [
  { path: '/', component: Welcome },
  { path: '/home', component: Home },
  { path: '/notice-board', component: NoticeBoard },
  { path: '/setting', component: Setting }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)

const pinia = createPinia()
pinia.use(PiniaPluginPersist)

app.use(router)
app.use(pinia)

app.mount('#app')
