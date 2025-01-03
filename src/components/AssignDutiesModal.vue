<template>
    <div id="AssignDutiesModal" class="modal modal-fixed-footer">
        <form @submit.prevent="">
            <div class="modal-content">
                <h4>Assign Duties</h4>
                <div class="input-field col s12">
                    <select class="red-text">
                        <option value="" disabled selected>Choose Duty</option>
                        <option value="1">Option 1</option>
                    </select>
                    <label>Select Duty</label>
                </div>
                <div class="input-field col s12">
                    <select style="color: red">
                        <option value="" disabled selected>Choose Officer</option>
                        <option value="1">Option 1</option>
                    </select>
                    <label>Select Oficer</label>
                </div>
            </div>
            <div class="modal-footer">
                <a @click.prevent class="modal-close waves-effect waves-green btn-flat">Cancel</a>
                <div class="btn waves-effect waves-light green acccent-4" type="submit" name="action">
                    Submit
                    <i class="material-icons right">send</i>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'AssignDutiesModal',

    mounted() {
        const selectElems = document.querySelectorAll('select');
        M.FormSelect.init(selectElems, {})
    }
    
}
</script>

<style scoped>
.modal-content {
    display: flex;
    flex-direction: column;
}
</style>