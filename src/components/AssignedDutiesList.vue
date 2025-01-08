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
                <ul>
                    <li>{{ assign.duty }} ~ {{ assign.code }} ~ {{ assign.date }}</li>
                </ul>
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
.collapsible-header {
    display: flex;
    justify-content: space-between;
}

.header-item {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>