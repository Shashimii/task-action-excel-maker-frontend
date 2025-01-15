<template>
    <WebNavbar></WebNavbar>
    <div class="container">
        <h3>Dashboard</h3>
        <DashboardCards></DashboardCards>
        <div class="hide-on-small-only">
            <h3>IPCR Tracker</h3>
            <div>
                <DashboardMap></DashboardMap>
            </div>
        </div>
    </div>
    <!-- footer space -->
    <div style="height: 10rem;"></div>
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