<template>
    <div class="card-content">
        <div></div>
        <h6>Duties List</h6>
        
        <table class="highlight centered">
            <thead>
            <tr>
                <th class="name-column">Duty Name</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(duties, index) in this.duties" :key="index">
                <td>{{ duties.duty }}</td>
                <td><button class="btn-small waves-effect waves-light blue darken-4">Edit</button></td>
                <td><button class="btn-small waves-effect waves-light red darken-4">Delete</button></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'DutiesList',

    methods: {
        //  delete and edit methods
    },

    computed: {
        duties() {
            return this.$store.getters.duties
        }
    }
}
</script>