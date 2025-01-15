<template>
    <WebNavbar></WebNavbar>
    
    <div class="container">
        
        <h3 class="center">IPCR Tracker</h3>
        <DashboardMap></DashboardMap>

        <h3>Duties Assigned</h3>
        <div v-if="this.assigned.length != 0">
            <AssignedDutiesList></AssignedDutiesList>
        </div>
        <div v-else class="no-prompt">
            <p class="no-prompt-primary-text">Duties Assigned to Officers will be shown here.</p>
            <p class="no-prompt-secondary-text">Assign duty to officers using the Floating Button on the bottom right of the screen.</p>
        </div>

    </div>

    <AssignDutiesModal></AssignDutiesModal>
    <div class="fixed-action-btn">
        <a class="btn-floating btn-large waves-effect waves-light green accent-4 modal-trigger" href="#AssignDutiesModal">
            <i class="large material-icons">mode_edit</i>
        </a>
    </div>
    <!-- footer space -->
    <div style="height: 10rem;"></div>
</template>

<script>
import WebNavbar from '@/components/WebNavbar.vue';
import DashboardMap from '@/components/DashboardMap.vue';
import AssignedDutiesList from '@/components/AssignedDutiesList.vue';
import AssignDutiesModal from '@/components/AssignDutiesModal.vue';

export default {
    name: 'AssignDuties',
    components: {
        WebNavbar,
        DashboardMap,
        AssignedDutiesList,
        AssignDutiesModal
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
        assigned() {
            return this.$store.getters.assigned;
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