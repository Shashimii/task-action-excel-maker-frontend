<template>
    <WebNavbar></WebNavbar>
    <div class="container">
        <h3>Settings</h3>
        <div class="row">
            <div class="col s12 m3">
                <AccountSettings></AccountSettings>
            </div>
            <div class="col s12 m9">
                <DutiesSettings></DutiesSettings>
                <OfficerSettings></OfficerSettings>
            </div>
        </div>
    </div>
</template>
<script>
import WebNavbar from '@/components/WebNavbar.vue';
import AccountSettings from '@/components/AccountSettings.vue';
import DutiesSettings from '@/components/DutiesSettings.vue';
import OfficerSettings from '@/components/OfficerSettings.vue';
export default {
    name: 'SettingsView',
    components: {
        WebNavbar,
        AccountSettings,
        DutiesSettings,
        OfficerSettings
    }
}
</script>