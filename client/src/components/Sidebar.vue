<template>
    <aside>
        <nav class="rad-sidebar rad-nav-min">
            <ul>
                <li>
                    <a href="/#/" class="inbox">
                        <i class="fa fa-dashboard"><span class="icon-bg rad-bg-success"></span></i>
                        <span class="rad-sidebar-item">Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="/#/editor">
                        <i class="fa fa-newspaper-o">
                            <span class="icon-bg rad-bg-danger"></span>
                        </i>
                        <span class="rad-sidebar-item">New Post</span>
                    </a>
                </li>
                <li><a href="/#/trash" class="snooz">
                        <i class="fa fa-trash">
                            <span class="icon-bg rad-bg-primary"></span>
                        </i>
                        <span class="rad-sidebar-item">Recently Deleted</span>
                    </a>
                </li>
                <!-- <li>
                    <a href="#" class="done">
                        <i class="fa fa-area-chart">
                            <span class="icon-bg rad-bg-warning"></span>
                        </i>
                        <span class="rad-sidebar-item">Drafts</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-wrench"><span class="icon-bg rad-bg-violet"></span></i>
                        <span class="rad-sidebar-item">Settings</span>
                    </a>
                </li> -->
            </ul>
        </nav>
    </aside>
</template>

<script>
export default {
    name: 'sidebar',
    data() {
        return {}
    }
}
</script>

<style scoped>

</style>
