<template>
    <div class="navbar-fixed">
        <nav class="black">
            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <div class="nav-wrapper center">
                <ul id="nav-mobile" class="navbar-items hide-on-med-and-down">
                    <li><router-link to="/dashboard" class="nav-link">Dashboard</router-link></li>
                    <li><router-link to="/assign-duties" class="nav-link">Assign Duties</router-link></li>
                    <li><router-link to="/settings" class="nav-link">Settings</router-link></li>
                    <li><a @click="logout">Logout</a></li>
                </ul>
            </div>
        </nav>
    </div>

    <ul class="sidenav" id="mobile-demo">
        <li><router-link to="/dashboard" class="nav-link" @click="clearScreenOnMobile('/dashboard')">Dashboard</router-link></li>
        <li><router-link to="/assign-duties" class="nav-link" @click="clearScreenOnMobile('/assign-duties')">Assign Duties</router-link></li>
        <li><router-link to="/settings" class="nav-link" @click="clearScreenOnMobile('/settings')">Settings</router-link></li>
        <li><a @click="logout">Logout</a></li>
    </ul>
</template>

<script>
import axios from 'axios';
export default {
    name: 'WebNavbar',

    methods: {
        async logout() {
            try {

                const token = localStorage.getItem('authToken')

                await axios.post(`http://127.0.0.1:8000/api/logout`,
                    {},
                    {
                        headers: {
                            'Authorization' : `Bearer ${token}`,
                        },
                        withCredentials: true,
                    }
                )

                localStorage.removeItem('authToken');
                this.$router.push('/')

                M.toast({
                    html:'<p class="toast-text">Logged Out</p>',
                    displayLength: 4000
                })

                this.clearScreenOnMobile();

            } catch (error) {
                console.error('Fail to logout', error.message);
            }
        },

        // materializeCSS
        initalizeMaterializeCSS() {
            // sidenav
            const sideElems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(sideElems, {});
        },

        clearScreenOnMobile(targetRoute) {
            const overlays = document.querySelectorAll('.sidenav-overlay');
            const body = document.querySelector('body');

            if (this.$route.path === targetRoute) {
                // Do nothing if the target route is the same as the current route
                return;
            }

            if (overlays) {
                overlays.forEach(overlay => {
                    overlay.style.display = 'none';
                    overlay.style.opacity = '0';
                })
            }

            if (body) {
                body.removeAttribute('style');
            }
        }
    },

    watch: {
        $route() {
            this.clearScreenOnMobile();
        }
    },

    mounted() {
        this.initalizeMaterializeCSS();
    },

    updated() {
        this.initalizeMaterializeCSS();
        this.clearScreenOnMobile();
    },
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