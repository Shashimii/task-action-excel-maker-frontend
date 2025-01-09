<template>
    <div class="card">
        <div class="card-content">
            <h6>Account Settings</h6>
            <ul class="account-settings">
                <li><a class="btn-small waves-effect waves-light green darken-4 btn-block modal-trigger" href="#UsernameModal">Username</a></li>
                <li><a class="btn-small waves-effect waves-light green darken-4 btn-block modal-trigger" href="#PasswordModal">Password</a></li>
            </ul>
        </div>
    </div>

    <div id="UsernameModal" class="modal">
        <form @submit.prevent="submitDuties">
            <div class="modal-content">
                <h4>Username</h4>
                <div class="input-field col s12">
                    <input type="text" placeholder="Username" class="validate" id="accountUsername">
                    <label for="accountUsername">Account Username</label>
                </div>
            </div>
            <div class="modal-footer">
                <a @click.prevent="cancel" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
                <button class="btn waves-effect waves-light green acccent-4" type="submit" name="action">
                    Apply Changes
                    <i class="material-icons right">send</i>
                </button>
            </div>
        </form>
    </div>

    <div id="PasswordModal" class="modal">
        <form @submit.prevent="submitOfficer">
            <div class="modal-content">
                <h4>Password</h4>
                <div class="input-field col s12">
                    <input type="text" placeholder="Password" class="validate" id="accountPassword">
                    <label for="accountPassword">Account Password</label>
                </div>
            </div>
            <div class="modal-footer">
                <a @click.prevent="cancel" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
                <button class="btn waves-effect waves-light green acccent-4" type="submit" name="action">
                    Apply Changes
                    <i class="material-icons right">send</i>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'AccountSettings',

    methods: {
            initalizeMaterializeCSS() {
                const ModalElems = document.querySelectorAll('.modal');
                M.Modal.init(ModalElems, {});
                M.updateTextFields() 
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
.account-settings {
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