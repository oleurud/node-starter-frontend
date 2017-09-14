<template>
    <div class="profile">
        <div class="card">
            <div class="card-header">
                User data
            </div>
            <div class="card-body">
                <form>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Username</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control-plaintext" v-model="user.username" readonly>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control-plaintext" v-model="user.email" readonly>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <br>

        <div class="card">
            <div class="card-header">
                Change password
            </div>
            <div class="card-body">
                <p>All your sessions (except the current one) will be closed after changing your password.</p>
                <form>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Current password</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="currentPassword" value="">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">New password</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="newPassword" value="">
                        </div>
                    </div>

                    <Alert type="danger" :message="errorMessage" v-if="error"></Alert>
                    <Alert type="success" :message="successMessage" v-if="success"></Alert>

                    <button type="submit" class="btn btn-primary" v-on:click="changePassword">Change password</button>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
import ws from '@/services/webservice'
import Alert from '@/components/globals/Alert'

export default {
    name: 'profile',
    data() {
        return {
            error: false,
            errorMessage: '',
            success: false,
            successMessage: ''
        }
    },
    created() {
        ws.request('get', '/user', null, this.token)
            .then((response) => {
                this.$store.commit('setUser', response)
            })
            .catch((error) => {
                console.log('error')
            })
    },
    computed: {
        user() {
            return this.$store.state.user
        }, 
        token() {
            return this.$store.state.token
        }
    },
    methods: {
        changePassword(event) {
            event.preventDefault()

            const params = {
                "email": this.user.email,
                "password": $('#currentPassword').val(),
                "newPassword": $('#newPassword').val()
            }

            ws.request('post', '/auth/change-password', params, this.token)
            .then((response) => {
                this.error = false
                this.errorMessage = ''

                this.$store.commit('setToken', response.token)

                this.success = true
                this.successMessage = 'Password changed'
            })
            .catch((error) => {
                this.success = false
                this.successMessage = ''

                this.error = true
                this.errorMessage = error
            })
        }
    },
    components: {
        Alert
    }
}
</script>