<template>
    <div class="container">
        <div class="excel-splash hide-on-small-only">
            <img class="responsive-img" src="@/assets/excel_icon.png" alt="splash">
        </div>
        <LoginForm></LoginForm>
    </div>
    <div class="page-footer white black-text">
        <p>v0.8 - beta <i class="fa-brands fa-github"></i> <a href="https://github.com/Shashimii" class="green-text accent-4">Shashimii</a></p>
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
export default {
    name: 'LoginView',
    components: {
        LoginForm,
    }
}
</script>

<style scoped>
.main {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
</style>