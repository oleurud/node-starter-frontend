<template>
    <div class="row">
        <div class="col-lg-2">
            <AccountMenu active="user"></AccountMenu>
            <br>
        </div>
        <div class="col-lg-10">
            <h4>Profile</h4>
            <hr>
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
                <!-- <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="name" v-model="user.profile.name">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Last name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="lastname" v-model="user.profile.lastname">
                    </div>
                </div> -->

                <Alert type="danger" :message="errorMessage" v-if="error"></Alert>
                <Alert type="success" :message="successMessage" v-if="success"></Alert>

                <button type="submit" class="btn btn-primary" v-on:click="changeProfile">Update profile</button>
            </form>
        </div>
    </div>
</template>

<script>
import ws from '@/services/webservice'
import Alert from '@/components/globals/Alert'
import AccountMenu from './AccountMenu'

export default {
    name: 'userdata',
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
        changeProfile(event) {
            event.preventDefault()

            const params = {
                "name": $('#name').val(),
                "lastname": $('#lastname').val()
            }

            ws.request('put', '/user', params, this.token)
                .then((response) => {
                    this.error = false
                    this.errorMessage = ''

                    this.$store.commit('setUser', response)

                    this.success = true
                    this.successMessage = 'Profile updated'
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
        Alert,
        AccountMenu
    }
}
</script>
