<template>
    <div v-if="hasData">
        <div ref="table_container" class="map-table-container">
            <table id="mapTable" class="centered map-table">
                <thead>
                    <tr class="map-tr">
                        <th class="map-th">
                            <p>Duties / Targets</p>
                        </th>
                        <th :colspan="officers.length" class="map-th">
                            <p>Action Officer</p>
                        </th>
                    </tr>
                    <tr class="map-tr">
                        <th class="map-th">
                        </th>
                        <th v-for="(officer, officerIndex) in officers" :key="officerIndex" class="map-th">
                            <p>{{ officer.name }}</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(duty, dutyIndex) in duties" :key="dutyIndex" class="map-tr">
                        <th class="map-th">
                            <p>{{ duty.duty }}</p>
                        </th>
                        <td v-for="(officer, officerIndex) in officers" :key="officerIndex" class="map-td" :id="'duty' + dutyIndex + '-' + 'officer' + officerIndex">
                        </td>
                    </tr> 
                </tbody>
            </table>
        </div>
    </div>
    <div v-else class="no-prompt">
        <p class="no-prompt-primary-text">Not Enough Duties and Officer to show IPCR Tracker.</p>
        <p class="no-prompt-secondary-text">Add Enough Duties and Officer on Settings.</p>
    </div>
</template>

<script>
export default {
    name: 'DashboardMap',

    methods: {
        assignDuty() {
            const assignedList = this.assigned;
            const cells = document.querySelectorAll('#mapTable td.map-td');
            cells.forEach(cell => {
                cell.innerHTML = ''
            })

            assignedList.forEach((assign) => {
                const cellIndex = assign.dutyIndex + '-' + assign.officerIndex;
                const cell = document.getElementById(cellIndex);
                
                if (cell) {
                    cell.innerHTML += '<p>' + assign.date + ' ' + assign.code + '</p>';
                } else {
                    console.error('unable to find cell');
                }
            })
        }
    },

    computed: {
        officers() {
            return this.$store.getters.officers;
        },

        duties() {
            return this.$store.getters.duties;
        },

        assigned() {
            return this.$store.getters.assigned;
        },

        // checks if the data is loaded from the api
        hasData() {
            return this.officers.length !== 0 && this.duties.length !== 0;
        }
    },

    watch: {
        assigned: {
            handler() {
                this.assignDuty();
            },
        }
    },

    mounted() {
        // loads the data
        this.$store.dispatch('requestDutiesData') // duties
        this.$store.dispatch('requestOfficersData') // officers
        this.$store.dispatch('requestAssignedData') // assigned
    },
}
</script>

<style scoped>
.map-table-container {
    overflow-x: auto;
}
</style>
