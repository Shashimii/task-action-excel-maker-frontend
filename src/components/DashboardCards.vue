<template>
    <div class="row">
        <div class="col s12 m6">
            <div class="card teal darken-4">
                <div class="card-content white-text center">
                    <h5>Total Assigned Duties</h5>
                    <h4>{{ assigned.length }}</h4>
                </div>
            </div>
        </div>
        <div class="col s12 m6 l3">
            <div class="card purple darken-4">
                <div class="card-content white-text center">
                    <h5>Total Duties</h5>
                    <h4>{{ duties.length }}</h4>
                </div>
            </div>
        </div>
        <div class="col s12 m6 l3">
            <div class="card blue accent-4">
                <div class="card-content white-text center">
                    <h5>Total Officers</h5>
                    <h4>{{ officers.length }}</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DashboardCards',

    computed: {
        officers() {
            return this.$store.getters.officers
        },

        duties() {
            return this.$store.getters.duties
        },

        assigned() {
            return this.$store.getters.assigned
        }
    }
}
</script>