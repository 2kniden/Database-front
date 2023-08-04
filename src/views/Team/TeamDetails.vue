<template>
    <div class="background">
        <div class="head"></div>
        <Header></Header>
        <TeamNav />
        <div class="detail-content">
            <!-- 第一行：题目+人数 -->
            <div class="card-line">
                <div class="card-title">{{ item.title }}</div>
                <div class="num">
                    <div class="num-img"></div>
                    <div class="num-font">{{ item.members.length + 1 }}/{{ item.total }}</div>
                    <div class="clearfloat"></div>
                </div>
                <div class="clearfloat"></div>
            </div>
            <!-- 第二行：详情 -->
            <div class="card-line">
                <div class="detail">{{ item.detail }}</div>
            </div>
            <!-- 第三行：小队状态 -->
            <div class="card-line">
                <div class="line-name">小队状态</div>
                <div class="status float-left">{{ item.status }}</div>
                <div class="clearfloat"></div>
            </div>
            <!-- 第四行：小队标签 -->
            <div class="card-line">
                <div class="line-name">小队标签</div>
                <div v-for="(tag, tagIndex) in item.tags" :key="tagIndex">
                    <div class="tag">{{ tag }}</div>
                </div>
                <div class="clearfloat"></div>
            </div>
            <!-- 第五行：小队成员 -->
            <div class="card-line">
                <div class="line-name padding-h-five">小队成员</div>
                <div class="float-left">
                    <div>
                        <div class="float-left padding-h-five">{{ item.publisher }}</div>
                        <div class="publisher">发布者</div>
                        <div class="clearfloat"></div>
                    </div>
                    <div v-for="(member, mbIndex) in item.members" :key="mbIndex">
                        <div class="member">{{ member }}</div>
                    </div>
                </div>
                <div class="clearfloat"></div>
            </div>
            <!-- 第六行：按钮 -->
            <div>
                <el-button class="card-button" type="primary" size="large" color="#8097FD" plain
                    @click="joinTeam(item)">加入小队</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from "@/components/Header";
import TeamNav from "@/components/TeamNav";
import { useRoute } from "vue-router"

const route = useRoute()
console.log("切换至商品详情页")
const item = route.query

// 请求加入小队（未实现）
const joinTeam = (item) => {
    console.log("请求加入小队")
    alert("已发送加入请求")
    // 获取小队的id
    const team_id = item.team_id
    // 获取用户id
    // 将该用户添加到小队申请者列表（后端）
}
</script>

<style>
.detail-content {
    margin: 130px auto;
    padding: 50px;
    background-color: #fff;
    width: 1090px;
    height: auto;
}

.float-left {
    float: left;
}

.line-name {
    float: left;
    margin-right: 20px;
}

.padding-h-five {
    padding: 5px 0;
}

.publisher {
    float: left;
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #8A80FD;
    border-radius: 10px;
    font-size: 14px;
    color: #fff;
}

.member {
    margin-top: 16px;
    text-align: left;
}
</style>