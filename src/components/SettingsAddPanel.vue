<template>
    <div class="card">
        <div class="card-content">
            <h6>Add New</h6>
            <ul class="add-panel-items">
                <li><a class="btn-small waves-effect waves-light green darken-4 btn-block modal-trigger" href="#AddDutiesModal">Duty</a></li>
                <li><a class="btn-small waves-effect waves-light green darken-4 btn-block modal-trigger" href="#AddOfficerModal">Officer</a></li>
            </ul>
        </div>
    </div>

    <div id="AddDutiesModal" class="modal">
        <form @submit.prevent="submitDuties">
            <div class="modal-content">
                <h4>Add Duty</h4>
                <div class="input-field col s12">
                    <input type="text" placeholder="Title" id="dutyTitle" v-model="duty.duty">
                    <label for="dutyTitle">Duty Title</label>
                    <p v-if="validation.validateDuty" class="validation">{{ validation.validateDuty }}</p>
                </div>
            </div>
            <div class="modal-footer">
                <a @click.prevent="cancel" class="modal-close waves-effect waves-green btn-flat" @click="cancel()">Cancel</a>
                <button class="btn waves-effect waves-light green acccent-4" type="submit" name="action">
                    Add Duty
                    <i class="material-icons right">send</i>
                </button>
            </div>
        </form>
    </div>

    <div id="AddOfficerModal" class="modal">
        <form @submit.prevent="submitOfficer">
            <div class="modal-content">
                <h4>Add Officer</h4>
                <div class="input-field col s12">
                    <input type="text" placeholder="Name" id="officerName" v-model="officer.name">
                    <label for="officerName">Officer Name</label>
                    <p v-if="validation.validateOfficer" class="validation">{{ validation.validateOfficer }}</p>
                </div>
            </div>
            <div class="modal-footer">
                <a @click.prevent="cancel" class="modal-close waves-effect waves-green btn-flat" @click="cancel()">Cancel</a>
                <button class="btn waves-effect waves-light green acccent-4" type="submit" name="action">
                    Add Officer
                    <i class="material-icons right">send</i>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'AddPanel',

    data() {
        return {
            duty: {
                duty: ''
            },

            officer: {
                name: ''
            },

            validation: {
                valdiateDuty: '',
                validateOfficer: ''
            } 
        }
    },

    methods: {
        submitDuties() {
            if (this.validateDuty()) {
                const modalInstance = M.Modal.getInstance(document.getElementById('AddDutiesModal'));
                modalInstance.close();
                this.$store.dispatch('addDuty', this.duty);

                M.toast({
                    html: '<p class="toast-text">Duty Title Added Successfully.<p>',
                    displayLength: 8000
                })
            }
        },

        submitOfficer() {
            if (this.validateOfficer()) {
                const modalInstance = M.Modal.getInstance(document.getElementById('AddOfficerModal'));
                modalInstance.close();
                this.$store.dispatch('addOfficer', this.officer);

                M.toast({
                    html: '<p class="toast-text">Officer Added Successfully.<p>',
                    displayLength: 8000
                })
            }
        },

        cancel() {
            this.clearStored()
        },

        clearStored() {
            this.duty = {
                duty: ''
            },

            this.officer = {
                name:''
            }

        },

        validateDuty() {
            this.validation = {
                valdiateDuty: '',
            } 

            let isValid = true;
            const regex = /^[a-zA-Z0-9.,\-! /]+$/;

            if(this.duty.duty === '' || !regex.test(this.duty.duty.trim())) {
                if (this.duty.duty === '') {
                    this.validation.validateDuty = 'Duty Title cannot by empty'
                    isValid = false
                } else {
                    this.validation.validateDuty = 'Duty Title has Invalid Characters'
                    isValid = false
                }
            }

            return isValid
        },

        
        validateOfficer() {
            this.validation = {
                validateOfficer: ''
            } 

            let isValid = true;
            const regex = /^[a-zA-Z0-9.,\-! /]+$/;

            if(this.officer.name === '' || !regex.test(this.officer.name.trim())) {
                if (this.officer.name === '' ) {
                    this.validation.validateOfficer = 'Officer Name cannot by empty'
                    isValid = false
                } else {
                    this.validation.validateOfficer = 'Officer Name has Invalid Characters'
                    isValid = false
                }
            }

            return isValid
        },
        
        

        initalizeMaterializeCSS() {
            M.updateTextFields()
        },
    },

    computed: {
        duties() {
            return this.$store.getters.duties
        },
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
.add-panel-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.modal-content {
    display: flex;
    flex-direction: column;
}

.validation {
    color: red;
}

</style>