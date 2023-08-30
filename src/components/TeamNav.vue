<template>
    <div class="travelNav">
        <el-menu :default-active="active" model="vertical" router>
            <el-menu-item index="/Team">
                <el-icon><Notification /></el-icon>
                旅行小队广场
            </el-menu-item>
            <el-menu-item index="/Team/MyPublishedTeam">
                <el-icon><Service /></el-icon>
                我发布的小队
            </el-menu-item>
            <el-menu-item index="/Team/MyJoinedTeam">
                <el-icon><ZoomIn /></el-icon>
                我加入的小队
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import {
  Notification,
  ZoomIn,
  Service,
  Menu as IconMenu,
} from '@element-plus/icons-vue'

export default {
    name: 'teamNav',
    components: {
        Notification, 
        ZoomIn,
        Service
    },
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
    width: 150px;
}
</style>