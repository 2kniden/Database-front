<template>
    <div class="background">
        <div class="head"></div>
        <Header></Header>
        <TeamNav />
        <div class="team-content">
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
                        <el-button class="card-button" type="primary" size="large" color="#8097FD" plain>查看详情</el-button>
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
                        <el-button class="card-button" type="primary" size="large" color="#8097FD" plain>查看详情</el-button>
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
import axios  from "axios";
import { useRouter } from "vue-router";

// 测试数据，招募中的小队，实际使用时需筛选出发布者为当前用户且小队状态为“招募中”的小队
const myRecruitingList = ref()

// 测试数据，招募完成的小队，实际使用时需筛选出发布者为当前用户且小队状态为“招募完成”的小队
const myRecruitedList = ref()

axios.get('/Team/MyPublishedTeam/Recruiting')
    .then(res => {
      console.log(res.data.team_info);
      myRecruitingList.value = res.data.team_info
    });

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