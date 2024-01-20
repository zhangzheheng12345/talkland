import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

import './global.css'
import 'uno.css'

import Welcome from '@/components/Welcome.vue'
import Home from '@/components/Home.vue'
import NoticeBoard from '@/components/NoticeBoard.vue'

const routes = [
  { path: '/', component: Welcome },
  { path: '/home', component: Home },
  { path: '/notice-board', component: NoticeBoard }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)

app.use(router)

app.mount('#app')
