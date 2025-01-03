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
  height: 100vh;
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
</style>
