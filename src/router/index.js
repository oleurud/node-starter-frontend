import Vue from 'vue'
import Router from 'vue-router'
import { getStore } from '@/store'
import Home from '@/components/Home'
import Logged from '@/components/Logged'
import Profile from '@/components/Profile'

Vue.use(Router)

function requireAuth(to, from, next) {
    const store = getStore()
    if(store.state.user && store.state.token) {
        next()
    } else {
        next('/')
    }
}

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/logged',
            name: 'Logged',
            component: Logged,
            beforeEnter: requireAuth
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            beforeEnter: requireAuth
        }
    ]
})

export default router
