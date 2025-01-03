<template>
    <div class="card">
        <form @submit.prevent="login" class="form">
            <div class="card-content">
                <span class="card-title center">Login</span>
                <div class="input-field">
                    <i class="material-icons prefix">account_circle</i>
                    <input type="text" id="user_name" class="validate">
                    <label for="user_name">Username</label>
                </div>
                <div class="input-field">
                    <i class="material-icons prefix">lock</i>
                    <input type="password" id="user_password" class="validate">
                    <label for="user_password">Password</label>
                </div>
            </div>
            <div class="card-action">
                <button class="btn btn-block waves-effect green accent-4">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'LoginForm',

    methods: {
        login() {
            this.$router.push('/dashboard')
        }
    }
}
</script>

<style scoped>
.card-title {
    padding-bottom: 1rem;
}

.card {
    width: 20rem;
}
</style>