<template>
    <ul class="collapsible">
        <li v-for="(assign, index) in this.assigned" :key="index">
            <div class="collapsible-header">
                <div class="header-item">
                    <i class="material-icons">person</i>
                    {{ assign.officer }}
                </div>
                <div class="header-item">
                    <i class="material-icons">event</i>
                    {{ assign.date }}
                </div>
                <div class="header-item">
                    <i class="material-icons">insert_drive_file</i>
                    {{ assign.code }}
                </div>
                <a class="waves-effect waves-light btn red accent-4 modal-trigger" @click.stop="deleteConfirmation(index)">
                    <i class="material-icons left">delete_forever</i>
                    DELETE
                </a>
            </div>
            <div class="collapsible-body">
                <div class="body-container">
                    <div class="row">
                        <div class="col m12 l6">
                            <div class="body-primary-container">
                                <div class="body-item">
                                    <p class="body-item-title"><i class="material-icons">assignment_late</i> Duty Name: </p>
                                    <p>{{ assign.duty }}</p>
                                </div>
                                <div class="body-item">
                                    <p class="body-item-title"><i class="material-icons">insert_drive_file</i> ODTS Code: </p>
                                    <p>{{ assign.code }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col m12 l6">
                            <div class="body-secondary-container">
                                <div class="body-item">
                                    <p class="body-item-title"><i class="material-icons">person</i> Assigned to: </p>
                                    <p>{{ assign.officer }}</p>
                                </div>
                                <div class="body-item">
                                    <p class="body-item-title"><i class="material-icons">event</i> Assigned Date: </p>
                                    <p>{{ assign.date }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    </ul>

    <div id="deleteInfoModal" class="modal">
        <div class="modal-content">
            <h4>Are you Sure to Delete this Assigned Duty</h4>
            <div class="row">
                <div class="col m12 l6">
                    <div class="body-primary-container">
                        <div class="body-item">
                            <p class="body-item-title"><i class="material-icons">assignment_late</i> Duty Name: </p>
                            <p>{{ deletionInfo.deleteDuty }}</p>
                        </div>
                        <div class="body-item">
                            <p class="body-item-title"><i class="material-icons">insert_drive_file</i> ODTS Code: </p>
                            <p>{{ deletionInfo.deleteCode }}</p>
                        </div>
                    </div>
                </div>
                <div class="col m12 l6">
                    <div class="body-secondary-container">
                        <div class="body-item">
                            <p class="body-item-title"><i class="material-icons">person</i> Assigned to: </p>
                            <p>{{ deletionInfo.deleteOfficer }}</p>
                        </div>
                        <div class="body-item">
                            <p class="body-item-title"><i class="material-icons">event</i> Assigned Date: </p>
                            <p>{{ deletionInfo.deleteDate }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <a class="modal-close waves-effect waves-green btn-flat">Cancel</a>
            <button class="btn waves-effect waves-light red accent-4" @click="deleteAssigned(deletionInfo.deleteId)">
                <i class="material-icons left">delete_forever</i>
                DELETE
            </button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'AssignedDutiesList',

    data() {
        return {
            deletionInfo: {
                deleteId: null,
                deleteDuty: '',
                deleteCode: '',
                deleteOfficer: '',
                deleteDate: '',
            }
        }
    },

    methods: {
        deleteConfirmation(index) {
            const modalInstance = M.Modal.getInstance(document.getElementById('deleteInfoModal'));
            modalInstance.open();
            this.setDeleteInfo(index);
        },

        setDeleteInfo(infoIndex) {
            this.deletionInfo = {
                deleteId: this.assigned[infoIndex].id,
                deleteDuty: this.assigned[infoIndex].duty,
                deleteCode: this.assigned[infoIndex].code,
                deleteOfficer: this.assigned[infoIndex].officer,
                deleteDate: this.assigned[infoIndex].date,
            }
        },

        deleteAssigned(deleteId) {
            this.$store.dispatch('deleteAssignedData', deleteId)
            const modalInstance = M.Modal.getInstance(document.getElementById('deleteInfoModal'));
            modalInstance.close();

            M.toast({
                html: '<p class="toast-text">Duty Deleted Successfully.<p>',
                displayLength: 8000
            })
        },

        resetDeleteInfo() {
            this.deletionInfo = {
                deleteDuty: '',
                deleteCode: '',
                deleteOfficer: '',
                deleteDate: '',
                deleteIndex: null
            }
        },

        initalizeMaterializeCSS() {
            const CollapsibleElem = document.querySelectorAll('.collapsible');
            M.Collapsible.init(CollapsibleElem, {});
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

<style scoped>
p {
    width: 100%;
}

.collapsible-header {
    display: flex;
    justify-content: space-between;
}

.header-item {
    display: flex;
    align-items: center;
    justify-content: center;
}

.body-item {
    display: flex;
}

.body-item-title {
    display: flex;
    align-items: center;
    gap: 1rem;
}
</style>