<template>
    <div class="card">
        <div class="card-content">
            <h6>Account Settings</h6>
            <ul class="account-settings">
                <li><button class="btn-small waves-effect waves-light green darken-4 btn-block">Username</button></li>
                <li><button class="btn-small waves-effect waves-light green darken-4 btn-block">Password</button></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AccountSettings',
}
</script>

<style scoped>
.account-settings {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>