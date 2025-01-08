<template>
    <div class="navbar-fixed">
        <nav class="black">
            <div class="nav-wrapper center">
                <ul id="nav-mobile" class="navbar-items hide-on-med-and-down">
                    <li><router-link to="/dashboard" class="nav-link">Dashboard</router-link></li>
                    <li><router-link to="/assign-duties" class="nav-link">Assign Duties</router-link></li>
                    <li><router-link to="/settings">Settings</router-link></li>
                    <li><router-link to="/">Logout</router-link></li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'WebNavbar',
}
</script>

<style>
.navbar-items {
    display: flex;
    align-items: center;
    justify-content: center;
}

.router-link-active {
    color: #00c853 ;
    font-weight: bold; 
}
</style>