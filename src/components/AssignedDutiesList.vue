<template>
    <ul class="collapsible">
        <li v-for="(assign, index) in this.assigned" :key="index">
            <div class="collapsible-header">
                <i class="material-icons">person</i>
                {{ assign.officer }} ~ {{ assign.date }} ~ {{ assign.code }} ~ {{ index }} <a class="waves-effect waves-light btn red accent-4" @click="deleteAssigned(index)">DELETE</a>
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