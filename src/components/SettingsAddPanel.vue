<template>
    <div class="card">
        <div class="card-content">
            <h6>Add New</h6>
            <ul class="add-panel-items">
                <li><button class="btn-small waves-effect waves-light green darken-4 btn-block">Duty</button></li>
                <li><button class="btn-small waves-effect waves-light green darken-4 btn-block">Officer</button></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddPanel',
}
</script>

<style scoped>
.add-panel-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>