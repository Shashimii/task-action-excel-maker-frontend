<template>
    <WebNavbar></WebNavbar>
    <div class="container">
        <h3 class="center">IPCR Tracker</h3>
        <DashboardMap></DashboardMap>
        <h3>Duties Assigned</h3>
        <AssignedDutiesList></AssignedDutiesList>
    </div>
    <AssignDutiesModal></AssignDutiesModal>
    <div class="fixed-action-btn">
        <a class="btn-floating btn-large waves-effect waves-light green accent-4 modal-trigger" href="#AssignDutiesModal">
            <i class="large material-icons">mode_edit</i>
        </a>
    </div>
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

    mounted() {
        this.initalizeMaterializeCSS();
    },

    updated() {
        this.initalizeMaterializeCSS();
    }
}
</script>