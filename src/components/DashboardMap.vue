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

        <div class="container center">
            <button class="btn green accent-4" @click="this.excelExport()"><i class="material-icons left">file_download</i>Download Table as Excel File</button>
        </div>
    </div>
    <div v-else class="no-prompt">
        <p class="no-prompt-primary-text">Not Enough Duties and Officer to show IPCR Tracker.</p>
        <p class="no-prompt-secondary-text">Add Enough Duties and Officer on Settings.</p>
    </div>
</template>

<script>
import ExcelJS from 'exceljs';
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
        },
        
        // this excel export method is still not optimized and created on vanila javascript
        excelExport() {
            let workbook = new ExcelJS.Workbook(); // creare a new worksheet using ExcelJS
            let worksheet = workbook.addWorksheet("Sheet1") // add sheet named "Sheet 1"
            let table = document.getElementById("mapTable") // Html Table

            // make the excel table
            let tableData = [] // table data 2d array
            const rowCount = table.rows.length; // count the number of rows needed
            
            // create the row
            const htmlTableRowToArray = (htmlTableRow) => {
                return Array.from(htmlTableRow.cells).map(cell => {
                    if (cell.textContent != '' && cell.querySelector("p")) { // check if there is a text on the cell "<p>"
                        return Array.from(cell.querySelectorAll("p")).map(p => p.textContent.trim() + "\n").join(" "); // format the cell texts accordingly
                    } else {
                        return cell.textContent.trim(); // trim whitespaces only for blank cells
                    }
                })
            }

            // create the 2d array
            for (let i = 0; i < rowCount; i++) {
                const htmlTableRow = htmlTableRowToArray(table.rows[i]); // create the rows
                tableData.push(htmlTableRow) // push the rows to 2d array
            }

            // console.table(tableData) // debug the table

            // functions

            // format selcted text color using rich text
            const formatTextColorGreen = (text) => {
                const regex = /(\([^)]+\))/g; // match to texts like "(text)"
                const textParts = text.split(regex); // split text into parts as needed in richText

                // map and transform into new array for richText
                return textParts.map(part => {
                    // check for matching texts on every part
                    if (regex.test(part)) {
                        // apply the green color on matching parts
                        return {font: {color: {argb: '008000'} }, text: part};
                    } else {
                        // apply nothing
                        return {text: part};
                    }
                });
            }

            // count the line breaks for cell height calculation
            const countLineBreaks = (cell) => {
                if (typeof cell !== 'string') return 0;
                const matches = cell.match(/\n/g);
                
                return matches ? matches.length : 0;
            }

            // create the excel table
            tableData.forEach((row, rowIndex) => {
                let worksheetRow = worksheet.addRow(row); // add tableData as rows
                let autoHeight = 0; // initalize height

                row.forEach((cellData, cellIndex) => {
                    
                    // determine the exact height of the row
                    let height = 100 + countLineBreaks(cellData) * 10; // compute the height
                    if (height > autoHeight) { // if height > current auto height
                        autoHeight = height; // set new auto height
                    }

                    // height
                    if (rowIndex <= 1) {
                        worksheet.getRow(rowIndex + 1).height = 40; // fixed height for the headers
                    } else {
                        worksheet.getRow(rowIndex + 1).height = autoHeight; // calculated height for the data rows
                    }

                    // width
                    worksheet.getColumn(cellIndex + 1).width = 30;

                    // apply cell styles
                    let cell = worksheetRow.getCell(cellIndex + 1);

                    // font color for codes
                    if (cellIndex !== 0 && typeof cellData === 'string') {
                        cell.value = {
                            richText: formatTextColorGreen(cellData)
                        }
                    } else {
                        cell.value = cellData;
                    }

                    // border
                    cell.border = {
                        top: { style: "medium", color: { argb: "000000" } },
                        left: { style: "medium", color: { argb: "000000" } },
                        bottom: { style: "medium", color: { argb: "000000" } },
                        right: { style: "medium", color: { argb: "000000" } },
                    }

                    // background color
                    if (rowIndex <= 1) {
                        cell.fill = {
                            type: "pattern",
                            pattern: "solid",
                            fgColor: { argb: "F4F4F4" },
                        };
                        
                        cell.font = {
                            bold: true,
                            size: 14
                        };
                    } else if (rowIndex % 2 === 1 && rowIndex > 2 && cellIndex != 0) {
                        cell.fill = {
                            type: "pattern",
                            pattern: "solid",
                            fgColor: { argb: "F4F4F4" },
                        };
                    } else if (cellIndex === 0) {
                        cell.fill = {
                            type: "pattern",
                            pattern: "solid",
                            fgColor: { argb: "E0E0E0" },
                        };

                        cell.font = {
                            bold: true,
                            size: 14
                        };
                    }

                    // text wrapping and alignment
                    cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
                });
            });

            // cell merging for the header
            worksheet.mergeCells("B1:H1");

            // write the file then download
            workbook.xlsx.writeBuffer().then((buffer) => {
                let blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                let link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "IPCR.xlsx";
                link.click();
            });

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
