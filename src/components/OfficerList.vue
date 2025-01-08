<template>
    <div class="card">
        <div class="card-content">
            <h6>Officer List</h6>

            <table class="highlight centered">
                <thead>
                <tr> 
                    <th class="name-column">Officer Name</th>
                </tr>
                </thead>

                <tbody>
                    <tr v-for="(officers, index) in this.officers" :key="index">
                        <td>{{ officers.name }}</td>
                        <td><button class="btn-small waves-effect waves-light blue darken-4">Edit</button></td>
                        <td><button class="btn-small waves-effect waves-light red darken-4">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OfficerList',

    methods: {
        //  delete and edit methods
    },

    computed: {
        officers() {
            return this.$store.getters.officers
        }
    }
}
</script>