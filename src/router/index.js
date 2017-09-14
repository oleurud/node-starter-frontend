import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Logged from '@/components/Logged'
import Profile from '@/components/Profile'

Vue.use(Router)

function requireAuth(to, from, next) {
    if(localStorage.getItem('user') && localStorage.getItem('token')) {
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
