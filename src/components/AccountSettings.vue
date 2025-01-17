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
        <form @submit.prevent="submitUsername">
            <div class="modal-content">
                <h4>Username</h4>
                <div class="input-field col s12">
                    <input type="text" placeholder="Username" class="validate" id="accountUsername" v-model="editUserData.username">
                    <label for="accountUsername">Account Username</label>
                    <p v-if="validate.username" class="validation">{{ validate.username }}</p>
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
        <form @submit.prevent="submitPassword">
            <div class="modal-content">
                <h4>Password</h4>
                <div class="input-field col s12">
                    <input type="text" placeholder="Password" class="validate" id="accountPassword" v-model="editUserData.password">
                    <label for="accountPassword">Account Password</label>
                    <p v-if="validate.password" class="validation">{{ validate.password }}</p>
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

    data() {
        return {
            editUserData: {
                id: '',
                username: '',
                password: ''
            },

            validate: {
                username: '',
                password: ''
            }
        }
    },

    methods: {
        submitUsername() {
            if (this.validUsername()) {
                const modalInstance = M.Modal.getInstance(document.getElementById('UsernameModal'));
                modalInstance.close();

                this.$store.dispatch('editUsername', this.editUserData)
            }
        },


        submitPassword() {
            if (this.validPassword()) {
                const modalInstance = M.Modal.getInstance(document.getElementById('PasswordModal'));
                modalInstance.close();

                this.$store.dispatch('editPassword', this.editUserData)
            }
        },


        validUsername() {
            this.validate = {
                username: '',
            }

            let isValid = true;
            const regex = /^[a-zA-Z0-9]+$/;

            if (this.editUserData.username === '' || !regex.test(this.editUserData.username)) {
                if (this.editUserData.username === '') {
                    this.validate.username = 'Username cannot be empty'
                    isValid = false
                } else {
                    this.validate.username = 'Invalid Username format'
                    isValid = false
                }
            }

            return isValid
        },

        validPassword() {
            this.validate = {
                password: ''
            }

            let isValid = true;
            const regex = /^[a-zA-Z0-9]+$/;

            if (this.editUserData.password === '' || !regex.test(this.editUserData.password)) {
                if (this.editUserData.password === '') {
                    this.validate.password = 'Password cannot be empty'
                    isValid = false
                } else {
                    this.validate.password = 'Invalid Password format'
                    isValid = false
                }
            }

            return isValid
        },

        loadUserData() {
            this.editUserData.id = this.userData.id;
            this.editUserData.username = this.userData.username;
        },

        initalizeMaterializeCSS() {
            M.updateTextFields()
        }
    },

    computed: {
        userData() {
            return this.$store.getters.userData;
        }
    },

    watch: {
        userData: {
            handler() {
                this.loadUserData()
            },
            deep: true
        }
    },

    mounted() {
        this.$store.dispatch('requestUserData');
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