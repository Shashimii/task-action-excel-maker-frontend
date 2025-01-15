<template>
    <div class="card-content">
        <div></div>
        <h6>Duties List</h6>
        
        <table class="highlight centered">
            <thead>
            <tr>
                <th class="name-column">Duty Name</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(duties, index) in this.duties" :key="index">
                <td>{{ duties.duty }}</td>
                <td><button class="btn-small waves-effect waves-light blue darken-4" @click="editDuty(index)">Edit</button></td>
                <td><button class="btn-small waves-effect waves-light red darken-4" @click="deleteConfirmation(index)">Delete</button></td>
            </tr>
            </tbody>
        </table>
    </div>

    <div id="editDutiesModal" class="modal">
        <form @submit.prevent="saveEdit(editData.index)">
            <div class="modal-content">
                <h4>Edit Duty</h4>
                <div class="input-field col s12">
                    <input type="text" placeholder="Title" id="dutyTitle" v-model="editData.duty">
                    <label for="dutyTitle">Duty Title</label>
                    <p v-if="validation.validateDuties" class="validation">{{ validation.validateDuties }}</p>
                </div>
            </div>
            <div class="modal-footer">
                <a @click.prevent="cancel" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
                <button class="btn waves-effect waves-light green acccent-4" type="submit">
                    Edit Duty
                    <i class="material-icons right">send</i>
                </button>
            </div>
        </form>
    </div>

    <div id="deleteDutiesModal" class="modal">
        <div class="modal-content">
            <h4>Are you Sure to Delete Duty</h4>
            <div class="row">
                <div class="col s12">
                    <p class="delete-duty-title">{{ deletionInfo.duty }}</p>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <a @click.prevent="cancel" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
            <button class="modal-close btn waves-effect waves-light red accent-4" @click="deleteDuty(deletionInfo.id)">
                Delete Duty Title
                <i class="material-icons left">delete_forever</i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DutiesList',

    data() {
        return {
            editData: {
                duty: '',
                index: null
            },

            deletionInfo: {
                id: null,
                duty: ''
            },

            validation: {
                validateDuties: ''
            }
        }
    },

    methods: {
        editDuty(index) {
            const modalInstance = M.Modal.getInstance(document.getElementById('editDutiesModal'));
            modalInstance.open();
            this.setEditData(index);
        },

        setEditData(index) {
            this.editData = {
                duty: this.duties[index].duty,
                index: index
            }
        },

        validateDuty() {
            let isValid = true;
            const regex = /^[a-zA-Z0-9.,\-! /]+$/;

            if(this.editData.duty === '' || !regex.test(this.editData.duty.trim())) {
                if (this.editData.duty === '' ) {
                    this.validation.validateDuties = 'Duty Title cannot by empty'
                    isValid = false
                } else {
                    this.validation.validateDuties = 'Duty Title Invalid Format'
                    isValid = false
                }
            }

            return isValid
        },

        saveEdit() {
            if (this.validateDuty()) {
                const modalInstance = M.Modal.getInstance(document.getElementById('editDutiesModal'));
                modalInstance.close();

                this.duties[this.editData.index].duty = this.editData.duty;

                M.toast({
                    html: '<p class="toast-text">Duty Title Edited Successfully.<p>',
                    displayLength: 8000
                })
            }
        },

        deleteConfirmation(index) {
            const modalInstance = M.Modal.getInstance(document.getElementById('deleteDutiesModal'));
            modalInstance.open();
            this.setDeleteInfo(index);
        },

        setDeleteInfo(index) {
            this.deletionInfo = {
                id: this.duties[index].id,
                duty: this.duties[index].duty,
            }
        },

        deleteDuty(dutyId) {
            this.$store.dispatch('deleteDutyData', dutyId);
            const modalInstance = M.Modal.getInstance(document.getElementById('deleteDutiesModal'));
            modalInstance.close();

            M.toast({
                html: '<p class="toast-text">Duty Deleted Successfully.<p>',
                displayLength: 8000
            })
        },

        initalizeMaterializeCSS() {
            M.updateTextFields()
        },
    },

    computed: {
        duties() {
            return this.$store.getters.duties
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

.delete-duty-title {
    font-size: 2rem;
    font-weight: 700;
}

.validation {
    color: red;
}
</style>