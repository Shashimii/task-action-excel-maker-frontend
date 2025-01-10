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
                <div class="card">
                    <div v-if="this.duties != 0">
                        <DutiesList></DutiesList>
                    </div>
                    <div v-else class="no-prompt">
                        <p class="no-prompt-primary-text">Duties List will be shown here.</p>
                        <p class="no-prompt-secondary-text">Add Duties on Add New panel on left side of the screen</p>
                    </div>
                </div>
                <div class="card">
                    <div v-if="this.officers != 0">
                        <OfficerList></OfficerList>
                    </div>
                    <div v-else class="no-prompt">
                        <p class="no-prompt-primary-text">Officers List will be shown here.</p>
                        <p class="no-prompt-secondary-text">Add Officer on Add New panel on left side of the screen</p>
                    </div>
                </div>
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
    },

    methods: {
        initalizeMaterializeCSS() {
            const FabElems = document.querySelectorAll('.fixed-action-btn');
            M.FloatingActionButton.init(FabElems, {});

            const ModalElems = document.querySelectorAll('.modal');
            M.Modal.init(ModalElems, {}); 
        }
    },

    computed: {
        duties() {
            return this.$store.getters.duties;
        },

        officers() {
            return this.$store.getters.officers;
        }
    },

    mounted() {
        this.initalizeMaterializeCSS();
    },

    updated() {
        this.initalizeMaterializeCSS();
    }
}
</script>