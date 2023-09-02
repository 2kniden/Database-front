<template>
<div class="background">
  <div class="head"></div>
  <Header></Header>
  <TeamNav />
  <div class="detail-content">
    <!-- 返回键 -->
    <!-- <div class="goback" >
      <div class="clickable-area" @click="go_Back">
        <el-icon class="float-left"><ArrowLeft /></el-icon>
        <div class="float-left">返回</div>
      </div>
    </div>
    <div class="clearfloat"></div> -->
    <!-- 头部：（题目+目的地）+小队状态+加入按钮 -->
    <div class="card-line">
      <!-- 左侧：题目+目的地 -->
      <div style="float: left;">
        <div class="card-line team-title">{{ item.title }}</div>
        <div class="clearfloat"></div>
        <div>
          <div class="destination-img"></div>
          <div style="float: left;" class="team-destination">{{ item.destination }}</div>
        </div>
      </div>
      <!-- 右侧：加入小队 -->
      <div class="team-button">
        <el-button v-if="item.status === '招募中'" type="primary" size="large" color="#8097FD" plain style="float: right;"
        @click="joinTeam(item)">加入小队</el-button>
        <el-button v-if="item.status === '招募结束'" type="primary" size="large" plain disabled 
        style="float: right; background-color: rgb(242, 245, 255); color: rgb(169, 185, 253); border-color: rgb(192, 203, 254);"
        @click="joinTeam(item)">加入小队</el-button>
      </div>
      <!-- 右侧：小队状态 -->
      <div style="float: right">
        <div v-if="item.status === '招募中'" class="team-status" style="background-color: #7db0fd;">{{ item.status }}</div>
        <div v-if="item.status === '招募结束'" class="team-status" style="background-color: #ecb66f;">{{ item.status }}</div>
      </div>
      <div class="clearfloat"></div>
    </div>
    <!-- 身体1：（详情+旅行时间）+小队成员 -->
    <div style="margin-top: 30px;">
      <!-- 左侧：详情+旅行时间 -->
      <div style="float: left; width: 656px;">
        <!-- 详细信息 -->
        <div style="margin-bottom: 16px;">
          <div style="margin-bottom: 10px;">
            <div class="detail-img"></div>
            <div class="detail-title">详细信息</div>
            <div class="clearfloat"></div>
          </div>
          <div class="team-detail">{{ item.detail }}</div>
        </div>
        <el-divider />
        <!-- 旅行时间 -->
        <div style="margin-bottom: 16px;">
          <div style="margin-bottom: 14px;">
            <div class="time-img"></div>
            <div class="detail-title">旅行时间</div>
            <div class="clearfloat"></div>
          </div>
          <el-date-picker
            v-model="item.time"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            :disabled="true"
            style="float: left;"
          />
          <div class="clearfloat"></div>
        </div>
        <el-divider />
      </div>
      <!-- 右侧：小队成员 -->
      <div class="member-card">
        <div style="margin-bottom: 14px;">
          <div class="mem-img"></div>
          <div class="detail-title">小队成员</div>
          <div class="detail-title" style="margin-left: 6px; color: #666666;">({{ item.members.length + 1 }}/{{ item.total }})</div>
          <div class="clearfloat"></div>
        </div>
        <div>
          <div>
            <div class="user-img"></div>
            <div class="float-left padding-h-five">{{ item.publisher }}</div>
            <div class="publisher">发布者</div>
            <div class="clearfloat"></div>
          </div>
          <div v-for="(member, mbIndex) in item.members" :key="mbIndex">
            <div class="member">{{ member }}</div>
          </div>
          <div class="clearfloat"></div>
        </div>
      </div>
      <div class="clearfloat"></div>
    </div>
    <!-- 身体2：小队标签 -->
    <div>
      <!-- 小队标签 -->
      <div style="margin-bottom: 16px;">
          <div style="margin-bottom: 14px;">
            <div class="tag-img"></div>
            <div class="detail-title">小队标签</div>
            <div class="clearfloat"></div>
          </div>
          <div v-for="(tag, tagIndex) in item.tags" :key="tagIndex">
            <div class="tag-card">
              <div class="tag-icon">
                <img v-if="tag === '年轻人'" src="../../assets/team/young.png">
                <img v-if="tag === '限男生'" src="../../assets/team/male.png">
                <img v-if="tag === '限女生'" src="../../assets/team/female.png">
                <img v-if="tag === '自驾'" src="../../assets/team/car.png">
                <img v-if="tag === '报团'" src="../../assets/team/tour.png">
                <img v-if="tag === '奢华'" src="../../assets/team/luxury.png">
                <img v-if="tag === '穷游'" src="../../assets/team/poor.png">
                <img v-if="tag === '休闲'" src="../../assets/team/leisure.png">
                <img v-if="tag === '充实'" src="../../assets/team/tight.png">
              </div>
              <div class="clearfloat"></div>
              <div class="team-tag">{{ tag }}</div>
              <div class="tag-description">
                <div v-if="tag === '年轻人'">趁青春，多旅行！<br>用一段美好的旅途，一些珍贵的邂逅，点缀我们的青春记忆</div>
                <div v-if="tag === '限男生'">兄弟们，速速集结！<br>驾驶风驰电掣的自由，徜徉于壮丽景色，让我们一起享受旅途</div>
                <div v-if="tag === '限女生'">姐妹们，准备启程！<br>想看美景，吃美食，拍美美的照片？<br>快来加入我们！</div>
                <div v-if="tag === '自驾'">嘀嘀嘀，准备启程！<br>让我们来自驾，感受道路上的自由与探险，欣赏沿途的美丽风光。</div>
                <div v-if="tag === '报团'">自己制定旅行计划太忙太累？没关系，专业旅行团为我们排忧解难<br>只管玩，就对了！</div>
                <div v-if="tag === '奢华'">旅行就是要享受！<br>住豪华酒店，坐舒适交通，享可口美食···<br>我们的旅途尽享奢华</div>
                <div v-if="tag === '穷游'">用有限的预算，体验丰富的旅行！<br>穷游穷的是预算，而不是风景和经历</div>
                <div v-if="tag === '休闲'">赶场式旅行？NO！<br>我们拒绝走马观花，要的就是在旅行的过程中放松身心</div>
                <div v-if="tag === '充实'">时间有限，但想看的风景无限<br>难得的假日，用充实的旅途填充我们的记忆！</div>
              </div>
            </div>
          </div>
          <div class="clearfloat"></div>
        </div>
    </div>
    <!-- 底部：发布日期 -->
    <div class="posttime">
      {{ item.postTime }}
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
import {
  ArrowLeft,
} from '@element-plus/icons-vue'

const route = useRoute()
console.log("切换至小队详情页")
const item = route.query

const go_Back = () => {
  window.history.back();
}

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
    ElMessage({
          message: "申请失败！您已在当前的小队关系中！",
          type: "warning",
        });
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

.goback{
  display: inline-block; /* 使元素只包裹其内容 */
  font-size: 16px; /* 设置字号较小 */
  color: #ccc; /* 设置颜色为浅灰色 */
  cursor: pointer; /* 添加鼠标指针样式，使其看起来可以点击 */
  display: flex;
  align-items: center; /* 垂直居中元素 */
  margin-bottom: 20px; /* 调整间隙的大小，根据需要进行调整 */
}

.clickable-area {
  cursor: pointer;
  display: flex;
  align-items: center;
  /* 可以根据需要添加 padding 来增加点击区域的大小 */
}

.clickable-area:hover {
  color: #333;   /*鼠标悬停时改变颜色，可以根据需要调整 */
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

.team-title {
  font-size: 28px;
  color: #666666;
}

.team-destination {
  display: flex;
  height: 28px;
  padding-left: 10px;
  color: #808080;
  font-size: 16px;
  align-items: flex-end;
}

.destination-img {
  float: left;
  height: 32px;
  width: 32px;
  background-image: url(../../assets/team/destination.png);
}

.team-button .el-button {
  margin-top: 20px;
  margin-right: 40px;
  padding: 14px 20px;
  height: fit-content;
  width: fit-content;
  font-size: 18px;
  /* color: #fff; */
  /* background-color: #9caefc; */
  border-radius: 4px;
}

.team-status {
  margin-top: 20px;
  margin-right: 40px;
  padding: 12px 20px;
  height: fit-content;
  width: fit-content;
  font-size: 18px;
  color: #fff;
  /* background-color: #80c780; */
  /* background-color: #6acd9d; */
  border-radius: 4px;
}

.team-detail {
  height: 72px;
  text-align: left;
  line-height: 24px;
  color: #333333;
}

.detail-img {
  float: left;
  margin-right: 8px;
  height: 24px;
  width: 24px;
  background-image: url(../../assets/team/detail.png);
}

.time-img {
  float: left;
  margin-right: 8px;
  height: 24px;
  width: 24px;
  background-image: url(../../assets/team/time.png);
}

.mem-img {
  float: left;
  margin-right: 8px;
  height: 24px;
  width: 24px;
  background-image: url(../../assets/team/mem.png);
}

.tag-img {
  float: left;
  margin-right: 8px;
  height: 24px;
  width: 24px;
  background-image: url(../../assets/team/tag.png);
}

.detail-title {
  float: left;
  display: flex;
  height: 24px;
  align-items: flex-end;
  color: #4D4D4D;
}

.tag-card {
  float: left;
  margin-right: 20px;
  padding: 20px;
  height: 165px;
  width: 140px;
  /* background-color: #bec9fa; */
  border-style:dashed;
  border-color:#bec9fa;
  border-width: 4px;
}

.team-tag {
  margin-bottom: 10px;
  text-align: left;
  color: #474B59;
}

.tag-icon {
  float: left;
  margin-bottom: 10px;
  height: 52px;
  width: 52px;
  /* background-color: skyblue; */
}

.tag-description {
  font-size: 14px;
  /* line-height: 20px; */
  text-align: left;
}

.member-card {
  float: right;
  height: 280px;
  width: 300px;
  /* background-color: pink; */
}

.user-img {
  float: left;
  height: 28px;
  width: 28px;
  background-color: gray;
}
</style>