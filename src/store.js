'use strict'

let store

function createDefaultStore(Vuex) {
    let defaultUser
    try {
        if(localStorage) {
            defaultUser = JSON.parse(localStorage.getItem('user'))
        }
    } catch (error) {
        localStorage.clear()
    }

    store = new Vuex.Store({
        state: {
            user: defaultUser,
            token: localStorage.getItem('token'),
            nextRoute: '/logged'
        },
        mutations: {
            setUser(state, user) {
                state.user = user
                localStorage.setItem('user', JSON.stringify(user))
            },
            setToken(state, token) {
                state.token = token
                localStorage.setItem('token', token)
            },
            logout(state) {
                state.user = null
                state.token = null
                localStorage.clear()
            },
            setNextRoute(state, nextRoute) {
                state.nextRoute = nextRoute
            }
        }
    })

    return store
}

function getStore() {
    return store
}

export { createDefaultStore, getStore }

