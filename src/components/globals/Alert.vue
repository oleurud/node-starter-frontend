<template>
    <div :class="alertClass" role="alert">
        {{message}}
    </div>
</template>

<script>

export default {
    name: 'alert',
    props: {
        type: {
            type: String,
            required: true,
            validator: function(value) {
                return value == 'primary' || value == 'success' ||
                    value == 'danger' || value == 'warning' || value == 'info'
            }
        },
        message: {
            type: String,
            required: true
        }
    },
    computed: {
        alertClass() {
            return 'alert alert-' + this.type
        }
    }
}
</script>