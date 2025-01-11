<template>
    <div v-if="this.officers.length != 0 && this.duties.length != 0">
        <div ref="table_container" class="map-table-container"></div>
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
        createTable() {
            const table = document.createElement("table");
            table.id = "mapTable";
            table.className = "centered map-table"
            
            const header = table.createTHead();

            const headerRow1 = header.insertRow();
            headerRow1.className = "map-tr";
            const headerRow2 = header.insertRow();
            headerRow2.className = "map-tr";

            const th1 = document.createElement("th");
            th1.className = "map-th";
            th1.innerHTML = "<p>Duties / Targets</p>";
            headerRow1.appendChild(th1);

            const th2 = document.createElement("th");
            th2.colSpan = this.officers.length;
            th2.className = "map-th";
            th2.innerHTML = "<p>Action Officer</p>";
            headerRow1.appendChild(th2);

            const emptyHeader = document.createElement("th");
            emptyHeader.className = "map-th";
            headerRow2.appendChild(emptyHeader);

            this.officers.forEach(officer => {
                const th = document.createElement("th");
                th.className = "map-th";
                th.innerHTML = "<p>" + officer.name + "</p>"
                headerRow2.appendChild(th);
            })

            const body = table.createTBody();

            this.duties.forEach((duty, dutyIndex) => {
                const row = body.insertRow();
                row.className = "map-tr";

                const dutyCell = document.createElement("th");
                dutyCell.className = "map-th";
                dutyCell.innerHTML = "<p>" + duty.duty + "</p>"
                row.appendChild(dutyCell);

                this.officers.forEach((officer, officerIndex) => {
                    const dataCell = document.createElement("td");
                    dataCell.className = "map-td";
                    dataCell.setAttribute("id", "duty" + dutyIndex + "-" + "officer" + officerIndex)
                    row.appendChild(dataCell)
                })
            })

            return table
        },

        assignDuty() {
            const assignedList = this.assigned;

            const cells = document.querySelectorAll('#mapTable td.map-td');
            cells.forEach(cell => {
                cell.innerHTML = ''
            })

            console.log(cells);

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
    },

    watch: {
        assigned: {
            handler() {
                this.assignDuty();
            },
            deep: true
        },
    },

    mounted() {
        if (this.officers.length != 0 && this.duties.length != 0) {
            this.createTable();
            const container = this.$refs.table_container;
            container.appendChild(this.createTable());
            this.assignDuty();
        }
    }
}
</script>

<style scoped>
.map-table-container {
    overflow-x: auto;
}
</style>
