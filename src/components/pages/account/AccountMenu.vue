<template>
    <div class="card">
        <div class="card-header">
            Account
        </div>
        <ul class="list-group list-group-flush">
            <router-link to="/account/user" :class="userClass">Profile</router-link>
            <router-link to="/account/password" :class="passwordClass">Password</router-link>
        </ul>
    </div>
</template>

<script>
function getListGroupClass(active) {
    let classes = 'list-group-item list-group-item-action'
    if (active)
        classes += ' active'

    return classes
}

export default {
    name: 'accountMenu',
    props: {
        active: {
            type: String,
            required: true,
            default: 'user',
            validator: function(value) {
                return value == 'user' || value == 'password'
            }
        },
    },
    computed: {
        userClass() {
            return getListGroupClass(this.active == 'user')
        },

        passwordClass() {
            return getListGroupClass(this.active == 'password')
        }
    }
}
</script>
