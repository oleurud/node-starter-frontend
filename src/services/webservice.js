'use strict'

import axios from 'axios'
import router from '@/router/index'
import { getStore } from '@/store'

const config = {
    baseURL: 'http://localhost:8000',
    timeout: 10000,
    headers: {
        'X-device': 'chrome1'
    }
}

export default {
    request(method, endpoint, params = null, token = null) {
        if (token) {
            config.headers['Authorization'] = token
        }

        const instance = axios.create(config)
        
        return new Promise( (resolve, reject) => {
            instance[method.toLowerCase()](endpoint, params)
                .then((response) => {
                    resolve(response.data.data)
                })
                .catch((error) => {
                    // Token expired
                    if(error.response.data.error.code === 1004) {
                        this.handleTokenExpired()
                        resolve()
                    } else {
                        if (error.response.data.error.data && error.response.data.error.data.error)
                            reject(error.response.data.error.data.error)
                        else
                            reject(error.response.data.error.message)
                    }
                })
        })
    },

    handleTokenExpired() {
        const store = getStore()
        // save the next route
        store.commit('setNextRoute', router.currentRoute.fullPath)

        // send user to login
        store.commit('logout')
        router.push('/')
        $('#login').modal('show')
    }
}