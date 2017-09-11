'use strict'

import axios from 'axios'

const webservice = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
    headers: {
        'X-device': 'chrome1'
    }
})

export default {
    axios: webservice,
    getErrorMessage(error) {
        if(error.response.data.error.data && error.response.data.error.data.error)
            return error.response.data.error.data.error
        else
            return error.response.data.error.message
    },
    getResponse(response) {
        if(response.data.status)
            return response.data.data
    }
}