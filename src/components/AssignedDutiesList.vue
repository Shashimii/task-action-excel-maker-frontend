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
                <a class="waves-effect waves-light btn red accent-4" @click="deleteAssigned(index)">
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
                                    <p class="body-item-title"><i class="material-icons">event</i> Due Date: </p>
                                    <p>{{ assign.date }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'AssignedDutiesList',

    methods: {
        deleteAssigned(index) {
            this.assigned.splice(index, 1);
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