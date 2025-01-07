<template>
    <router-view/>
</template>

<style>
#app {
  font-family: "Lexend", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #eceff1;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.input-field input:focus {
  border-bottom: 1px solid #00c853  !important;
}

.material-icons.prefix.active {
  color: #00c853;
}

.btn-block {
  width: 100%;
}

.name-column {
    width: 100%;
}

.map-table {
    border-collapse: collapse;
    margin: 20px auto;
}
.map-th, .map-td {
    border: 2px solid #000000;
    padding: 8px;
    text-align: center;
    min-width: 7rem;
}
.map-th {
    background-color: #f4f4f4;
}
.map-th:first-child {
    background-color: #e0e0e0;
}
.map-tr {
    background-color: #f4f4f4;
}
.map-tr:hover {
    background-color: #e0e0e0;;
}

.datepicker-modal {
    top: 25% !important;
}
</style>
