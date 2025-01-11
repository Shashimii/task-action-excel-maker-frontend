<template>
    <WebNavbar></WebNavbar>
    <div class="container">
        <h3>Dashboard</h3>
        <DashboardCards></DashboardCards>
        <h3>IPCR Tracker</h3>
        <div>
            <DashboardMap></DashboardMap>
        </div>
    </div>
</template>

<script>
import WebNavbar from '@/components/WebNavbar.vue';
import DashboardCards from '@/components/DashboardCards.vue';
import DashboardMap from '@/components/DashboardMap.vue';

export default {
    name: 'DashboardView',
    components: {
        WebNavbar,
        DashboardCards,
        DashboardMap
    },

    computed: {
        apiTestData() {
            return this.$store.getters.apiTestData;
        }
    },

    mounted() {
        this.$store.dispatch('apiTest')
        console.log(this.apiTestData)
    }
    
}
</script>

<style scoped>
.excel-map {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20rem;
}
</style>