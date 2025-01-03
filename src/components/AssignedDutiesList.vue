<template>
    <ul class="collapsible">
        <li>
            <div class="collapsible-header"><i class="material-icons">person</i>Officer Name</div>
            <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
        <li>
            <div class="collapsible-header"><i class="material-icons">person</i>Officer Name</div>
            <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'AssignedDutiesList',

    mounted() {
        const CollapsibleElem = document.querySelectorAll('.collapsible');
        M.Collapsible.init(CollapsibleElem, {});
    }
}
</script>