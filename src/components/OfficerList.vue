<template>
    <div class="card">
        <div class="card-content">
            <h6>Officer List</h6>

            <table class="highlight centered">
                <thead>
                <tr> 
                    <th class="name-column">Officer Name</th>
                </tr>
                </thead>

                <tbody>
                    <tr v-for="(officers, index) in this.officers" :key="index">
                        <td>{{ officers.name }}</td>
                        <td><button class="btn-small waves-effect waves-light blue darken-4" @click="editOfficer(index)">Edit</button></td>
                        <td><button class="btn-small waves-effect waves-light red darken-4" @click="deleteConfirmation(index)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div id="editOfficerModal" class="modal">
        <form @submit.prevent="saveEdit(editData)">
            <div class="modal-content">
                <h4>Edit Officer</h4>
                <div class="input-field col s12">
                    <input type="text" placeholder="Name" id="officerEditName" v-model="editData.name">
                    <label for="officerEditName">Officer Name</label>
                    <p v-if="validation.validateOfficer" class="validation">{{ validation.validateOfficer }}</p>
                </div>
            </div>
            <div class="modal-footer">
                <a @click.prevent="cancel" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
                <button class="btn waves-effect waves-light green acccent-4" type="submit">
                    Edit Officer
                    <i class="material-icons right">send</i>
                </button>
            </div>
        </form>
    </div>

    <div id="deleteOfficerModal" class="modal">
        <div class="modal-content">
            <h4>Are you Sure to Delete Officer</h4>
            <div class="row">
                <div class="col s12">
                    <p class="delete-officer-name">{{ deletionInfo.name }}</p>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <a @click.prevent="cancel" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
            <button class="modal-close btn waves-effect waves-light red accent-4" @click="deleteOfficer(deletionInfo.id)">
                Delete Officer
                <i class="material-icons left">delete_forever</i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OfficerList',
    data() {
        return {
            editData: {
                id: null,
                name: '',
            },
            
            deletionInfo: {
                id: null,
                name: '',
            },

            validation: {
                validateOfficer: ''
            }
        }
    },

    methods: {
        editOfficer(index) {
            const modalInstance = M.Modal.getInstance(document.getElementById('editOfficerModal'));
            modalInstance.open();
            this.setEditData(index);
        },

        setEditData(index) {
            this.editData = {
                id: this.officers[index].id,
                name: this.officers[index].name,
            }
        },

        validateOfficer() {
            let isValid = true;
            const regex = /^[a-zA-Z0-9.,\-! /]+$/;

            if(this.editData.name === '' || !regex.test(this.editData.name.trim())) {
                if (this.editData.name === '' ) {
                    this.validation.validateOfficer = 'Officer Name cannot by empty'
                    isValid = false
                } else {
                    this.validation.validateOfficer = 'Officer Name Invalid Format'
                    isValid = false
                }
            }

            return isValid
        },

        saveEdit(editData) {
            if (this.validateOfficer()) {
                const modalInstance = M.Modal.getInstance(document.getElementById('editOfficerModal'));
                modalInstance.close();

                this.$store.dispatch('editOfficerData', editData);
            }
        },

        deleteConfirmation(index) {
            const modalInstance = M.Modal.getInstance(document.getElementById('deleteOfficerModal'));
            modalInstance.open();
            this.setDeleteInfo(index);
        },

        setDeleteInfo(index) {
            this.deletionInfo = {
                id: this.officers[index].id,
                name: this.officers[index].name
            }
        },

        deleteOfficer(deleteId) {
            this.$store.dispatch('deleteOfficerData', deleteId);
            const modalInstance = M.Modal.getInstance(document.getElementById('deleteOfficerModal'));
            modalInstance.close();
        },

        initalizeMaterializeCSS() {
            M.updateTextFields()
        },
    },

    computed: {
        officers() {
            return this.$store.getters.officers
        }
    },

    mounted() {
        this.initalizeMaterializeCSS()
    },

    updated() {
        this.initalizeMaterializeCSS()
    }

}
</script>

<style scoped>
.modal-content {
    display: flex;
    flex-direction: column;
}

.delete-officer-name {
    font-size: 2rem;
    font-weight: 700;
}

.validation {
    color: red;
}
</style>