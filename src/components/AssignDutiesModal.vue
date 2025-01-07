<template>
    <div id="datepickerContainer"></div>
    <div id="AssignDutiesModal" class="modal modal-fixed-footer">
        <form @submit.prevent="submit">
            <div class="modal-content">
                <h4>Assign Duties</h4>
                <div class="input-field col s12">
                    <select id="inputOfficer" v-model="assignData.valueOfficer" ref="selectionOfficer">
                        <option value="" disabled selected>Select Officer</option>
                        <option v-for="(officer, index) in officers" :key="officer.id" :value="'officer' + (index)">{{ officer.name }}</option>
                    </select>
                    <label for="inputOfficer">Officer</label>
                    <p v-if="validation.officer" class="validation">{{ validation.officer }}</p>
                </div>
                <div class="input-field col s12">
                    <select id="inputDuties" v-model="assignData.valueDuty" ref="selectionDuty">
                        <option value="" disabled selected>Select Duties</option>
                        <option v-for="(duty, index) in duties" :key="duty.id" :value="'duty' + (index)">{{ duty.duty }}</option>
                    </select>
                    <label for="inputDuties">Duties</label>
                    <p v-if="validation.duty" class="validation">{{ validation.duty }}</p> 
                </div>
                <div class="input-field col s12">
                    <input type="text" id="inputDate" class="datepicker">
                    <label for="inputDate">Date</label>
                    <p v-if="validation.date" class="validation">{{ validation.date }}</p> 
                </div>
                <div class="input-field col s12">
                    <input type="text" id="inputCode" v-model="assignData.inputCode">
                    <label for="inputCode">ODTS Number</label>
                    <p v-if="validation.code" class="validation">{{ validation.code }}</p> 
                </div>
            </div>
            <div class="modal-footer">
                <a @click.prevent="cancel" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
                <button class="btn waves-effect waves-light green acccent-4" type="submit" name="action">
                    Submit
                    <i class="material-icons right">send</i>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'AssignDutiesModal',

    data() {
        return {
            assignData: {
                inputOfficer: '',
                inputDuty: '',
                inputDate: '',
                inputCode: '',
                valueOfficer: '',
                valueDuty: ''                
                
            },

            validation: {
                officer: '',
                duty: '',
                date: '',
                code: ''
            }
        }
    },

    methods: {
            submit() {
                if(this.validateSubmit()) {
                    const selectionOfficer = this.$refs.selectionOfficer;
                    const selectedOfficer = selectionOfficer.options[selectionOfficer.selectedIndex];

                    if (selectedOfficer) {
                        this.assignData.inputOfficer = selectedOfficer.text;
                    }

                    const selectionDuty = this.$refs.selectionDuty;
                    const selectedDuty = selectionDuty.options[selectionDuty.selectedIndex];

                    if (selectedDuty) {
                        this.assignData.inputDuty = selectedDuty.text;
                    }
                }
            },

        cancel() {
            this.assignData = {
                inputOfficer: '',
                inputDuty: '',
                inputDate: '',
                inputCode: '',
                valueOfficer: '',
                valueDuty: '' 
            }

            const inputDate = document.getElementById('inputDate');
            inputDate.value = '';
        },

        validateSubmit() {
            this.validation = {
                officer: '',
                duty: '',
                date: '',
                code: ''
            }

            let isValid = true;

            if(this.assignData.valueOfficer === '') {
                this.validation.officer = 'Please Select an Officer.'
                isValid = false;
            }
            
            if(this.assignData.valueDuty === '') {
                this.validation.duty = 'Please Select a Duty.'
                isValid = false;
            }

            if(this.assignData.inputDate === '') {
                this.validation.date = 'Please Select a Date.'
                isValid = false;
            }

            if(this.assignData.inputCode === '') {
                this.validation.code = 'ODTS Code cannot be empty.'
                isValid = false;
            }

            return isValid;
        },

        initalizeMaterializeCSS() {
            const selectElems = document.querySelectorAll('select');
                M.FormSelect.init(selectElems, {});
                
            const dateElems = document.querySelectorAll('.datepicker');
                M.Datepicker.init(dateElems, {
                container: document.querySelector('#datepickerContainer') 
            });

            M.updateTextFields()
            this.assignData.inputDate = document.getElementById('inputDate').value;
        },
    },

    computed: {
        officers() {
            return this.$store.getters.officers;
        },

        duties() {
            return this.$store.getters.duties;
        }
    },

    mounted() {
        this.initalizeMaterializeCSS();
    },

    updated() {
        this.initalizeMaterializeCSS();
    },
}
</script>

<style scoped>
.modal-content {
    display: flex;
    flex-direction: column;
}

.validation {
    color: red;
}
</style>