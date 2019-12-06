<template>
    <div>
        <app-navbar></app-navbar>
        <app-formUser></app-formUser>
    </div>
</template>

<script>
import navbar from './views/navbar.vue'
import formUser from './views/form.vue'
export default {
    name : 'app',
    data() {
        return {
        }
    },
    methods: {
        
    },
    created() {
        
    },
    components: {
        'app-navbar' : navbar,
        'app-formUser' : formUser
    },
}
</script>

<style>

</style>