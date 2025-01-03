<template>
    <ul class="collapsible">
        <li>
            <div class="collapsible-header"><i class="material-icons">person</i>Officer Alvin</div>
            <div class="collapsible-body">
                <ul>
                    <li>
                        <span>3. Resolution of Administrative Complaints/Cases / Civil Cases</span>
                    </li>
                    <li>
                        <span>1.4.2 Conduct of Call</span>
                    </li>
                    <li>
                        <span>1.5 Attendance in Inter-Agency and /or foreign meetings/ workshops/ conferences, and preparations of report/s therefore</span>
                    </li>
                </ul>
            </div>
        </li>
        <li>
            <div class="collapsible-header"><i class="material-icons">person</i>Officer Jonathan</div>
            <div class="collapsible-body"><span>1.4.2 Conduct of Call</span></div>
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