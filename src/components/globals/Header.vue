<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <router-link class="navbar-brand" to="/">Node Starter</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">

                </ul>
                <ul class="navbar-nav" v-if="user">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/profile">{{user.username}}</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" v-on:click="logout">Logout</a>
                    </li>
                </ul>
                <ul class="navbar-nav" v-else>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="modal" data-target="#login">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="modal" data-target="#signUp">Sign up</a>
                    </li>
                </ul>
            </div>
        </nav>

        <Login></Login>
        <SignUp></SignUp>
    </div>
</template>

<script>
import Login from './Login'
import SignUp from './SignUp'
import router from '@/router/index'

export default {
    name: 'header',
    components: {
        Login,
        SignUp
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    },
    methods: {
        logout() {
            this.$store.commit('logout')
            router.push('/')
        }
    }
}
</script>