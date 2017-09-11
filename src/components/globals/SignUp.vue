<template>
    <div id="signUp" class="modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Sign up</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="signupEmail">Email</label>
                            <input type="text" class="form-control" id="signupEmail" v-model="email" placeholder="email@domain.com">
                        </div>
                        <div class="form-group">
                            <label for="signupUsername">Username</label>
                            <input type="text" class="form-control" id="signupUsername" v-model="username" placeholder="username">
                        </div>
                        <div class="form-group">
                            <label for="signupPassword">Password</label>
                            <input type="password" class="form-control" id="signupPassword" v-model="password" placeholder="Password">
                        </div>

                        <div class="alert alert-danger" role="alert" v-if="error">
                            {{errorMessage}}
                        </div>

                        <button type="submit" class="btn btn-primary" v-on:click="signUp">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script> 
import ws from '@/services/webservice'

export default {
    name: 'signUp',
    data: function() {
        return {
            username: '',
            email: '',
            password: '',

            error: false,
            errorMessage: ''
        }
    },
    methods: {
        signUp(event) {
            event.preventDefault()

            const user = {
                username: this.username,
                email: this.email,
                password: this.password
            }

            ws.axios.post('/auth/register', user)
            .then((response) => {
                this.error = false
                this.errorMessage = ''

                const data = ws.getResponse(response)
                this.$store.commit('setUser', data.user)
                this.$store.commit('setToken', data.token)

                $('#signUp').modal('hide')
            })
            .catch((error) => {
                this.error = true
                this.errorMessage = ws.getErrorMessage(error)
            })
        },

    }
}
</script>