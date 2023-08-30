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
          <!-- 第四行：目的地 -->
          <div class="card-line">
              <div class="line-name">旅行地点</div>
              <div class="float-left">{{ item.destination }}</div>
              <div class="clearfloat"></div>
          </div>
          <!-- 第五行：旅行时间 -->
          <div class="card-line">
              <div class="line-name">旅行时间</div>
              <div class="time float-left">{{ item.time[0] }} 至 {{ item.time[1] }}</div>
              <div class="clearfloat"></div>
          </div>
          <!-- 第六行：小队标签 -->
          <div class="card-line">
              <div class="line-name">小队标签</div>
              <div v-for="(tag, tagIndex) in item.tags" :key="tagIndex">
                  <div class="tag">{{ tag }}</div>
              </div>
              <div class="clearfloat"></div>
          </div>
          <!-- 第七行：小队成员 -->
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
          <!-- 第八行：发布日期 -->
          <div class="posttime">
            {{ item.posttime }}
          </div>
          <!-- 第九行：按钮 -->
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
import { ref } from 'vue';
import { useRoute } from "vue-router";
import { ElMessage } from 'element-plus';
import axios from "axios";

const route = useRoute()
console.log("切换至小队详情页")
const item = route.query

const cur_user_id="843526A2B7784E73B28E73C797A2C81C"

// 请求加入小队
const joinTeam = (item) => {
  // 将该用户添加到小队申请者列表applicants
  axios.post('http://8.130.25.70:5555/api/Teams/Apply',{
    UserID: cur_user_id,
    TeamID: item.teamId,
  })
  .then(res => {
    console.log(res.data);
    console.log(res.status);
    ElMessage({
      message: '成功发送加入小队请求！',
      type: 'success',
    })
  })
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
  });
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

.posttime{
  font-size: 14px;
  text-align: right;
  color: #808080;
}

.time {
  padding: 4px 12px;
  height: fit-content;
  width: fit-content;
  font-size: 14px;
  color: #fff;
  background-color: #6bc2f9;
  border-radius: 10px;
}

</style>