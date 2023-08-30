<template>
    <div class="background">
        <div class="head"></div>
        <Header></Header>
        <TeamNav />
        <div class="team-content">
            <!-- 发布小队 -->
            <el-divider class="divider">发布我的小队</el-divider>
            <el-button class="card-button" type="primary" size="large" color="#8097FD" plain
                @click="dialogFormVisible = true">发布新的旅行小队</el-button>
            <el-dialog v-model="dialogFormVisible" title="旅行小队信息" destroy-on-close>
                <PublishTeam @getData="getData" />
            </el-dialog>
            <!-- 分割线：招募中的小队 -->
            <el-divider class="divider">招募中的小队</el-divider>
            <div v-for="(item, index) in myRecruitingList" :key="index" class="card-list">
                <!-- 卡片 -->
                <el-card class="card">
                    <!-- 第一行：题目+状态 -->
                    <div class="card-line">
                        <div class="card-title">{{ item.title }}</div>
                        <div class="status">{{ item.status }}</div>
                        <div class="clearfloat"></div>
                    </div>
                    <!-- 第二行：标签+人数 -->
                    <div class="card-line">
                        <div v-for="(tag, tagIndex) in item.tags" :key="tagIndex">
                            <div class="tag">{{ tag }}</div>
                        </div>
                        <div class="num">
                            <div class="num-img"></div>
                            <div class="num-font">{{ item.members.length + 1 }}/{{ item.total }}</div>
                            <div class="clearfloat"></div>
                        </div>
                        <div class="clearfloat"></div>
                    </div>
                    <!-- 第三行：详情 -->
                    <div class="card-line">
                        <div class="detail">{{ item.detail }}</div>
                    </div>
                    <!-- 第四行：按钮 -->
                    <div>
                        <el-button class="card-button" type="primary" size="large" color="#8097FD" plain
                            @click="goDetails(item)">查看详情</el-button>
                        <el-button class="card-button" type="primary" size="large" color="#8097FD" plain
                            @click="editTeam(item)">编辑小队</el-button>
                    </div>
                </el-card>
            </div>
            <div class="clearfloat"></div>

            <!-- 分割线：招募完成的小队 -->
            <el-divider class="divider">招募完成的小队</el-divider>
            <div v-for="(item, index) in myRecruitedList" :key="index" class="card-list">
                <!-- 卡片 -->
                <el-card class="card">
                    <!-- 第一行：题目+状态 -->
                    <div class="card-line">
                        <div class="card-title">{{ item.title }}</div>
                        <div class="status">{{ item.status }}</div>
                        <div class="clearfloat"></div>
                    </div>
                    <!-- 第二行：标签+人数 -->
                    <div class="card-line">
                        <div v-for="(tag, tagIndex) in item.tags" :key="tagIndex">
                            <div class="tag">{{ tag }}</div>
                        </div>
                        <div class="num">
                            <div class="num-img"></div>
                            <div class="num-font">{{ item.members.length + 1 }}/{{ item.total }}</div>
                            <div class="clearfloat"></div>
                        </div>
                        <div class="clearfloat"></div>
                    </div>
                    <!-- 第三行：详情 -->
                    <div class="card-line">
                        <div class="detail">{{ item.detail }}</div>
                    </div>
                    <!-- 第四行：按钮 -->
                    <div>
                        <el-button class="card-button" type="primary" size="large" color="#8097FD" plain
                            @click="goDetails(item)">查看详情</el-button>
                        <el-button class="card-button" type="primary" size="large" color="#8097FD" plain
                            @click="editTeam(item)">编辑小队</el-button>
                    </div>
                </el-card>
            </div>
            <div class="clearfloat"></div>
        </div>
        <div class="clearfloat"></div>
    </div>
</template>

<script setup>
import Header from "@/components/Header";
import TeamNav from "@/components/TeamNav";
import PublishTeam from "@/views/Team/PublishTeam";
import { ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const router = useRouter()

// 切换至当前页面
const route = useRoute()
console.log("切换至我发布的小队页面")

// 进入我的小队详情页
const goDetails = (item) => {
    router.push({
        path: '/Team/MyTeamDetails',
        query: item
    })
}


// 进入编辑小队页面
const editTeam = (item) => {
    router.push({
        path: '/Team/MyPublishedTeam/EditTeam',
        query: item
    })
}

// 创建小队弹出框默认为不显示
const dialogFormVisible = ref(false)
// 子组件传递回窗口不可见信息
const getData = (val) => {
    dialogFormVisible.value = val
}

const myRecruitingList = ref()
const myRecruitedList = ref()

// 实际使用时需筛选出发布者为当前用户且小队状态为“招募中”的小队
axios.get('/Team/MyPublishedTeam/Recruiting')
    .then(res => {
        console.log(res.data.team_info);
        myRecruitingList.value = res.data.team_info
    });
// 实际使用时需筛选出发布者为当前用户且小队状态为“招募完成”的小队
axios.get('/Team/MyPublishedTeam/Recruited')
    .then(res => {
        console.log(res.data.team_info);
        myRecruitedList.value = res.data.team_info
    });
</script>

<style>
.divider {
    color: #4D4D4D;
    letter-spacing: 5px;
}
</style>