import { createApp } from 'vue'
import App from './App.vue'
//import router from './router'
import '@/style.css'
import { createRouter, createWebHistory } from 'vue-router'



import HomeView from './views/HomeView.vue'
import DisplayContentView from './views/DisplayContentView.vue'
import ListByCategoryView from './views/ListByCategoryView.vue'
import ContactView from './views/ContactView.vue'
import PageNotFoundView from './views/PageNotFoundView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/categories/:category',
        name: 'category',
        component: ListByCategoryView
    },
    {
        path: '/:article',
        name: 'article',
        component: DisplayContentView
    },
    {
        path: '/contato',
        name: 'contact',
        component: ContactView
    },
    {
        path: '/404',
        name: '404',
        component: PageNotFoundView
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


createApp(App).use(router).mount('#app')
