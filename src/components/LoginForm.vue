<template>
    <div class="card">
        <form @submit.prevent="login" class="form">
            <div class="card-content">
                <span class="card-title center">Login</span>
                <div class="input-field">
                    <i class="material-icons prefix">account_circle</i>
                    <input type="text" id="user_name" class="validate" v-model="username" required>
                    <label for="user_name">Username</label>
                </div>
                <div class="input-field">
                    <i class="material-icons prefix">lock</i>
                    <input type="password" id="user_password" class="validate" v-model="password" required>
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
import axios from 'axios';
export default {
    name: 'LoginForm',

    data() {
        return {
            username: '',
            password: '',
            errorMessage: ''
        }
    },

    methods: {
        async login() {
            try {
                // fetch csrf cookie
                await axios.get('http://127.0.0.1:8000/api/sanctum/csrf-cookie', {
                    withCredentials: true, // Include cookies
                });

                // login request
                const response = await axios.post('http://127.0.0.1:8000/api/login', {
                    username: this.username,
                    password: this.password,
                },
                {
                    withCredentials: true
                })

                if (response.status === 200) {

                    const token = response.data.token;
                    localStorage.setItem('authToken', token);
                    this.$router.push('/dashboard');

                    M.toast({
                        html:'<p class="toast-text">Login Success</p>',
                        displayLength: 4000
                    })

                }
            } catch (error) {

                if (error.response) {
                    this.errorMessage = error.response.data.error;
                } else {
                    this.errorMessage = 'Something went wrong Please try again Later.';
                }

                M.toast({
                    html:'<p class="toast-text">' + this.errorMessage + '</p>',
                    displayLength: 4000
                })
            }   
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

