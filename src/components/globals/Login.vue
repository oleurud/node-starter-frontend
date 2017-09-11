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

                        <div class="alert alert-danger" role="alert" v-if="error">
                            {{errorMessage}}
                        </div>

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

            ws.axios.post('/auth/login', user)
            .then((response) => {
                this.error = false
                this.errorMessage = ''

                const data = ws.getResponse(response)
                this.$store.commit('setUser', data.user)
                this.$store.commit('setToken', data.token)

                $('#login').modal('hide')
                router.push('/logged')
            })
            .catch((error) => {
                this.error = true
                this.errorMessage = ws.getErrorMessage(error)
            })
        }
    }
}
</script>