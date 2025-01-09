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
                    <input type="text" placeholder="Title" id="dutyTitle" v-model="duty.title">
                    <label for="dutyTitle">Duty Title</label>
                </div>
            </div>
            <div class="modal-footer">
                <a @click.prevent="cancel" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
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
                </div>
            </div>
            <div class="modal-footer">
                <a @click.prevent="cancel" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
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
                title: ''
            },

            officer: {
                name: ''
            }
        }
    },

    methods: {
        
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