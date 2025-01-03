<template>
    <WebNavbar></WebNavbar>
    <div class="container">
        <h3>Settings</h3>
        <div class="row">
            <div class="col s12 m3">
                <AccountSettings></AccountSettings>
                <AddPanel></AddPanel>
            </div>
            <div class="col s12 m9">
                <DutiesList></DutiesList>
                <OfficerList></OfficerList>
            </div>
        </div>
    </div>
</template>
<script>
import WebNavbar from '@/components/WebNavbar.vue';
import AccountSettings from '@/components/AccountSettings.vue';
import AddPanel from '@/components/SettingsAddPanel.vue';
import DutiesList from '@/components/DutiesList.vue';
import OfficerList from '@/components/OfficerList.vue';
export default {
    name: 'SettingsView',
    components: {
        WebNavbar,
        AccountSettings,
        AddPanel,
        DutiesList,
        OfficerList
    }
}
</script>