<template>
  <div class="background">
    <div class="head"></div>
    <Header></Header>
    <TeamNav />
    <div class="team-content">
      <div v-for="(item, index) in teamList" :key="index" class="card-list">
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
              @click="joinTeam(item)">加入小队</el-button>
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
import { useRouter } from "vue-router";
import axios  from "axios";

// 进入小队详情页
const router = useRouter()
const goDetails = (item) => {
  router.push({
    path: '/Team/TeamDetails',
    query: item
  })
}

// 请求加入小队（未实现）
const joinTeam = (item) => {
  console.log("请求加入小队")
  alert("已发送加入请求")
  // 获取小队的id
  const team_id = item.team_id
  // 获取用户id
  // 将该用户添加到小队申请者列表applicants（后端）
}

// 测试数据，实际调用后端时需要对部分内容进行更换，如需更换需同时更改相关页面template内容

const teamList = ref()
axios.get('/Team/TeamSquare/')
    .then(res => {
      console.log(res.data.team_info);
      teamList.value = res.data.team_info
    });
</script>

<style>
.background {
  background-color: #EDEDED;

  /* min-height: 100vh; */
  &::before {
    content: ' ';
    position: fixed;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #EDEDED;
    background-size: 100% auto;
  }
}

.head {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 80px;
  background-color: #fff;
}

.team-content {
  margin: 130px auto;
  padding: 20px;
  background-color: #fff;
  width: 1090px;
  height: auto;
}

.card {
  margin: 30px;
  padding: 10px 0;
  float: left;
  width: 480px;
}

.card-line {
  margin-bottom: 20px;
}

.clearfloat {
  clear: both;
  height: 0;
  font-size: 1px;
  line-height: 0px;
}

.status {
  float: right;
  padding: 4px 12px;
  height: fit-content;
  width: fit-content;
  font-size: 14px;
  color: #fff;
  background-color: #80FD8A;
  border-radius: 10px;
}

.card-title {
  float: left;
  /* margin: 20px; */
  font-size: 18px;
}

.tag {
  float: left;
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #8097FD;
  border-radius: 10px;
  font-size: 14px;
  color: #fff;
}

.num {
  float: right;
  margin-top: 1px;
}

.num-img {
  float: left;
  width: 28px;
  height: 28px;
  background-image: url(../../src/assets/team/num-img.png);
}

.num-font {
  float: right;
  margin-left: 10px;
  color: #8097FD;
  line-height: 28px;
}

.detail {
  text-align: left;
}

.card-button {
  margin: 10px 20px 0;
}
</style>
