<template>
    <div id="datepickerContainer"></div>
    <div id="AssignDutiesModal" class="modal modal-fixed-footer">
        <form @submit.prevent="submit">
            <div class="modal-content">
                <h4>Assign Duties</h4>
                <div class="input-field col s12">
                    <select id="inputOfficer" v-model="assignData.officerIndex" ref="selectionOfficer">
                        <option value="" disabled selected>Select Officer</option>
                        <option v-for="(officer, index) in officers" :key="officer.id" :value="'officer' + (index)">{{ officer.name }}</option>
                    </select>
                    <label for="inputOfficer">Officer</label>
                    <p v-if="validation.officer" class="validation">{{ validation.officer }}</p>
                </div>
                <div class="input-field col s12">
                    <select id="inputDuties" v-model="assignData.dutyIndex" ref="selectionDuty">
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
                    <input type="text" id="inputCode" v-model="assignData.code">
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
import axios from 'axios';
export default {
    name: 'AssignDutiesModal',

    data() {
        return {
            // assign data
            assignData: {
                officer: '',
                duty: '',
                date: '',
                code: '',
                officerIndex: '',
                dutyIndex: '',
                officerId: null,
                dutyId: null                
                
            },
            // validation data
            validation: {
                officer: '',
                duty: '',
                date: '',
                code: ''
            },
        }
    },

    methods: {
        // handle submission
        submit() {
            if(this.validateSubmit()) {
                const selectionOfficer = this.$refs.selectionOfficer;
                const selectionDuty = this.$refs.selectionDuty;
                const selectedOfficer = selectionOfficer.options[selectionOfficer.selectedIndex];
                const selectedDuty = selectionDuty.options[selectionDuty.selectedIndex];
                const extractedOfficerIndex = parseInt(this.assignData.officerIndex.replace(/\D+/g, ""), 10);
                const extractedDutyIndex = parseInt(this.assignData.dutyIndex.replace(/\D+/g, ""), 10);
                const modal = M.Modal.getInstance(document.getElementById('AssignDutiesModal'));
                const inputDate = document.getElementById('inputDate');

                // set the officer and duty name
                if (selectedOfficer) {
                    this.assignData.officer = selectedOfficer.text;
                }
                if (selectedDuty) {
                    this.assignData.duty = selectedDuty.text;
                }

                // set the officer and duty id
                this.assignData.officerId = this.officers[extractedOfficerIndex].id;
                this.assignData.dutyId = this.duties[extractedDutyIndex].id;
                
                modal.close(); // close the modal
                this.postAssigned(this.assignData) // post assigned duty data -> database
                
                // clear the data
                this.assignData = {
                    officer: '',
                    duty: '',
                    date: '',
                    code: '',
                    officerIndex: '',
                    dutyIndex: '',
                    officerId: '',
                    dutyId: ''    
                }
                inputDate.value = ''; // clear the datepicker
            }
        },

        // handle cancelation
        cancel() {
            const inputDate = document.getElementById('inputDate');

            // clear the data
            this.assignData = {
                officer: '',
                duty: '',
                date: '',
                code: '',
                officerIndex: '',
                dutyIndex: '',
                officerId: '',
                dutyId: ''  
            }
            inputDate.value = ''; // clear the date picker

            // clear the validation
            this.validation = {
                officer: '',
                duty: '',
                date: '',
                code: ''
            }
        },

        // handle validation on submit
        validateSubmit() {
            // validiation message holder
            this.validation = {
                officer: '',
                duty: '',
                date: '',
                code: ''
            }

            // validation flag
            let isValid = true;
            // validate format
            const regex = /^\(\d+\)$/;

            // validate every input field
            if(this.assignData.officerIndex === '') {
                this.validation.officer = 'Please Select an Officer.'
                isValid = false;
            }
            
            if(this.assignData.dutyIndex === '') {
                this.validation.duty = 'Please Select a Duty.'
                isValid = false;
            }

            if(this.assignData.date === '') {
                this.validation.date = 'Please Select a Date.'
                isValid = false;
            }

            if(this.assignData.code === '' || !regex.test(this.assignData.code)) {
                if (this.assignData.code === '') {
                    this.validation.code = 'ODTS Code cannot be empty.'
                    isValid = false;
                } else {
                    this.validation.code = 'ODTS Code Invalid Format'
                    isValid = false;
                }
            } 

            // return flags
            return isValid;
        },

        // post the submission data -> database
        async postAssigned(assignData) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/addAssigned', {
                    officer_Id: assignData.officerId,
                    duty_Id: assignData.dutyId,
                    officer: assignData.officer,
                    duty: assignData.duty,
                    date: assignData.date,
                    code: assignData.code,
                    officerIndex: assignData.officerIndex,
                    dutyIndex: assignData.dutyIndex
                })

                if (response.status === 201) {
                    this.reloadAssigned();
                    M.toast({
                        html: '<p class="toast-text">Duty Assigned Successfully.<p>',
                        displayLength: 4000
                    })
                }
            } catch (error) {
                // console.log('unable to post assigned: ', error.response.data)
                M.toast({
                    html: '<p class="toast-text">Something went wrong Please try again Later.<p>',
                    displayLength: 4000
                })
            }
        },

        reloadAssigned() {
            this.$store.dispatch('requestAssignedData') // reload assigned data
        },

        // materializeCSS
        initalizeMaterializeCSS() {
            // select
            const selectElems = document.querySelectorAll('select');
            M.FormSelect.init(selectElems, {});
            // datepicker
            const dateElems = document.querySelectorAll('.datepicker');
            M.Datepicker.init(dateElems, {
                container: document.querySelector('#datepickerContainer'),
                format: 'mm/dd/yyyy'
            });
            // get datepicker input value
            this.assignData.date = document.getElementById('inputDate').value;
            // text labels
            M.updateTextFields()
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