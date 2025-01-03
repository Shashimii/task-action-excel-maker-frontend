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
                    <tr>
                        <td>Alvin</td>
                        <td><button class="btn-small waves-effect waves-light blue darken-4">Edit</button></td>
                        <td><button class="btn-small waves-effect waves-light red darken-4">Delete</button></td>
                    </tr>
                    <tr>
                        <td>Alan</td>
                        <td><button class="btn-small waves-effect waves-light blue darken-4">Edit</button></td>
                        <td><button class="btn-small waves-effect waves-light red darken-4">Delete</button></td>
                    </tr>
                    <tr>
                        <td>Jonathan</td>
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
}
</script>