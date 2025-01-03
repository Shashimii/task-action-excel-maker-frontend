<template>
    <WebNavbar></WebNavbar>
    <div class="container">
        <h3>Dashboard</h3>
        <DashboardCards></DashboardCards>
        <h3>Task Map</h3>
        <div class="container excel-map">
            <h6>A Task Map on Excel Format will be Shown Here</h6>
        </div>
        
        <!--Excel Map Should be Here-->
    </div>
</template>

<script>
import WebNavbar from '@/components/WebNavbar.vue';
import DashboardCards from '@/components/DashboardCards.vue';
export default {
    name: 'DashboardView',
    components: {
        WebNavbar,
        DashboardCards
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