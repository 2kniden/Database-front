<template>
    <div class="travelNav">
        <el-menu :default-active="active" model="vertical" router>
            <el-menu-item index="/Team">旅行小队广场</el-menu-item>
            <el-menu-item index="/Team/MyPublishedTeam">我发布的小队</el-menu-item>
            <el-menu-item index="/Team/MyJoinedTeam">我加入的小队</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'teamNav',
    data() {
        return {
            active: "/Team"
        };
    },
    created() {
        this.active = this.$route.path;
    }
}
</script>

<style>
.travelNav {
    float: left;
    position: fixed;
    left: 0;
    top: 130px;
    width: 130px;
}
</style>