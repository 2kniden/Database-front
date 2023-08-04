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
const teamList = ref([
  {
    // 小队标识符
    team_id: "1",
    // 小队招募信息标题
    title: "八月中旬青海自驾旅行，寻找2-3个女生",
    // 小队招募信息详情
    detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
    // 小队状态：这里暂时用string类型表示状态，实际使用需要根据status标识显示相应文字并修改背景颜色
    // 状态只包括两种：“招募中”，“招募完成”
    status: "招募中",
    // 标签：提供有限标签供选择，不能自定义
    tags: ["自驾", "限女生", "休闲"],
    // 发布者：这里直接使用了用户名称，实际传递时可以通过用户id获取用户名称和头像信息（members和applicants同）
    publisher: "青鸟",
    // 成员：成员中不包含发布者
    members: ["葡萄真好吃", "故事大王"],
    // 申请者：指申请加入小队但发布者还未通过的用户
    // 发布者通过申请后，申请者从applicants中删除，加入members
    applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
    // 人数上限
    total: 5
    // 现人数通过members数组长度加一计算
  },
  {
    team_id: "2",
    title: "八月中旬川西自驾旅行",
    detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
    status: "招募中",
    tags: ["限女生", "休闲"],
    publisher: "青鸟",
    members: ["葡萄真好吃", "故事大王", "彼得潘"],
    applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
    total: 6
  },
  {
    team_id: "3",
    title: "八月中旬新疆自驾旅行，寻找2-3个女生",
    detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
    status: "招募中",
    tags: ["自驾", "限女生", "休闲", "穷游"],
    publisher: "青鸟",
    members: ["葡萄真好吃", "故事大王"],
    applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
    total: 5
  },
  {
    team_id: "4",
    title: "八月中旬新疆自驾旅行，寻找2-3个女生",
    detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
    status: "招募中",
    tags: ["自驾", "限女生", "休闲", "穷游"],
    publisher: "青鸟",
    members: ["葡萄真好吃", "故事大王"],
    applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
    total: 5
  },
  {
    team_id: "5",
    title: "八月中旬新疆自驾旅行，寻找2-3个女生",
    detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
    status: "招募中",
    tags: ["自驾", "限女生", "休闲", "穷游"],
    publisher: "青鸟",
    members: ["葡萄真好吃", "故事大王"],
    applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
    total: 5
  },
  {
    team_id: "6",
    title: "八月中旬新疆自驾旅行，寻找2-3个女生",
    detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
    status: "招募中",
    tags: ["自驾", "限女生", "休闲", "穷游"],
    publisher: "青鸟",
    members: ["葡萄真好吃", "故事大王"],
    applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
    total: 5
  },
  {
    team_id: "7",
    title: "八月中旬新疆自驾旅行，寻找2-3个女生",
    detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
    status: "招募中",
    tags: ["自驾", "限女生", "休闲", "穷游"],
    publisher: "青鸟",
    members: ["葡萄真好吃", "故事大王"],
    applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
    total: 5
  }
])
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
