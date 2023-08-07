<template>
    <div class="background">
        <div class="head"></div>
        <Header></Header>
        <TeamNav />
        <div class="team-content">
            <!-- 分割线：审核中的小队 -->
            <el-divider class="divider">审核中的小队</el-divider>
            <div v-for="(item, index) in myJoiningList" :key="index" class="card-list">
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
                    </div>
                </el-card>
            </div>
            <div class="clearfloat"></div>

            <!-- 分割线：已加入的小队 -->
            <el-divider class="divider">已加入的小队</el-divider>
            <div v-for="(item, index) in myJoinedList" :key="index" class="card-list">
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
                            @click="quitTeam(item)">退出小队</el-button>
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
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus';

// 进入我的小队详情页
const router = useRouter()
const goDetails = (item) => {
    router.push({
        path: '/Team/MyTeamDetails',
        query: item
    })
}

// 测试数据，审核中的小队
// 实际使用时需筛选出审核数组applicants包含当前用户的小队（未实现）
const myJoiningList = ref()

// 测试数据，已加入的小队
// 实际使用时需筛选出成员数组members包含当前用户的小队（未实现）
const myJoinedList = ref()

axios.get('/Team/MyJoinedTeam/Joining')
    .then(res => {
        console.log(res.data.team_info);
        myJoiningList.value = res.data.team_info
    });

axios.get('/Team/MyJoinedTeam/Joined')
    .then(res => {
        console.log(res.data.team_info);
        myJoinedList.value = res.data.team_info
    });

// 退出小队（未实现）
const quitTeam = (item) => {
    // 当前小队信息
    const team = ref({
        team_id: item.team_id,
        title: item.title,
        detail: item.detail,
        status: item.status,
        tags: item.tags,
        publisher: item.publisher,
        members: item.members,
        applicants: item.applicants,
        total: item.total
    })
    // 要退出的小队id
    const team_id = team.value.team_id
    // 获取当前用户id（未实现）

    // 在team.value.members中找到当前用户id元素，并将其从members数组中删除（未实现）

    // 根据team_id找到数据库中该小队信息，替换为更新后的team信息（未实现）

    // 弹出提示
    ElMessage({
        message: '成功退出小队！',
        type: 'success',
    })
}

</script>

<style></style>