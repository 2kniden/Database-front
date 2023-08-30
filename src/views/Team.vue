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
              @click.stop="joinTeam(item)">加入小队</el-button>
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
import { ref } from 'vue';
import { useRouter } from "vue-router";
import axios from "axios";
import { ElMessage } from 'element-plus';


// // 获取当前用户id
// const cur_user_id=ref();
// axios.get('/api/Users')
//   .then(res => {
//     console.log(res.data.user_id);
//     cur_user_id.value = res.data.user_id;
//   })
//   .catch(error => {
//     console.error("获取用户ID失败:", error);
//   });
const cur_user_id="haha"
// 获取小队的信息
const teamList = ref()
axios.get('/Team/TeamSquare/')
  .then(res => {
    console.log(res.data);
    teamList.value = res.data.team_info
  })
  .catch(error => {
      console.error("获取小队列表失败:", error);
    });


const router = useRouter()
const goDetails = (item) => {
  router.push({
    path: '/Team/TeamDetails',
    params: {
      user_id: "haha",
    },
    query: item,
  })
}

// 请求加入小队
const joinTeam = (item) => {
  // 将该用户添加到小队申请者列表applicants
  // axios.post('/Team/AddTeamApplicants/',{
  //   user_id: cur_user_id.value,
  //   team_id: item.team_id,
  // })
  // .then(res => {
  //   if(res.data.status==1){
  //     item.applicants=res.data.cur_team.applicants; //将返回的小队申请列表赋予当前item
  //     ElMessage({
  //       message: cur_user_id.value+'成功发送加入小队请求！'+item.team_id,
  //       type: 'success',
  //     })
  //   }
  //   else if(res.data.status==2){
  //     ElMessage({
  //       message: cur_user_id.value+'已发送申请，正在审核中！'+item.team_id,
  //       type: 'success',
  //     })
  //   }
  //   else if(res.data.status==3){
  //     ElMessage({
  //       message: cur_user_id.value+'已加入该小队！'+item.team_id,
  //       type: 'success',
  //     })
  //   }
  // })
  // .catch(error => {
  //   alert('操作失败！');
  // });
}
</script>

<style>
.background {
  background-color: #F1F3FF;;

  /* min-height: 100vh; */
  &::before {
    content: ' ';
    position: fixed;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #F1F3FF;
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
  border-radius: 10px;
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
