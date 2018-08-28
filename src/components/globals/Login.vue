<template>
    <div id="login" class="modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="loginUsername">Username or Email</label>
                            <input type="text" class="form-control" id="loginUsername" v-model="username" placeholder="Username or Email">
                        </div>
                        <div class="form-group">
                            <label for="loginPassword">Password</label>
                            <input type="password" class="form-control" id="loginPassword" v-model="password" placeholder="Password">
                        </div>

                        <Alert type="danger" :message="errorMessage" v-if="error"></Alert>
                        
                        <button type="submit" class="btn btn-primary" v-on:click="login">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ws from '@/services/webservice'
import router from '@/router/index'
import Alert from '@/components/globals/Alert'

export default {
    name: 'login',
    data: function() {
        return {
            username: '',
            password: '',

            error: false,
            errorMessage: ''
        }
    },
    computed: {
        nextRoute() {
            return this.$store.state.nextRoute
        }
    },
    methods: {
        login(event) {
            event.preventDefault()

            let user = {
                password: this.password
            }
            if(this.username.indexOf('@') > -1) {
                user.email = this.username
            } else {
                user.username = this.username
            }

            ws.request('post', '/auth/login', user)
            .then((response) => {
                this.error = false
                this.errorMessage = ''

                this.$store.commit('setUser', response.user)
                this.$store.commit('setToken', response.token)

                this.getPayments(response.token)

                this.clean()

                if(this.nextRoute) {
                    router.push(this.nextRoute)
                }
            })
            .catch((error) => {
                this.error = true
                this.errorMessage = error
            })
        },

        getPayments(token) {
            ws.request('get', '/user/payments', null, token)
            .then((response) => {
                this.$store.commit('setPayments', response)
            })
            .catch((error) => {
                console.log(error)
            })
        },

        clean() {
            $('#login').modal('hide')
            $('#loginUsername').val('')
            $('#loginPassword').val('')
            this.username = ''
            this.password = ''
        }
    },
    components: {
        Alert
    }
}
</script>