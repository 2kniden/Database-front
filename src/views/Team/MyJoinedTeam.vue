<template>
    <div class="background">
      <div class="head"></div>
      <Header></Header>
      <TeamNav />
      <div class="team-content">
        <!-- 分割线：审核中的小队 -->
        <el-divider class="divider">审核中的小队</el-divider>
        <div v-if="myJoiningList.length === 0" class="no-teams-message">
          您暂无审核中的小队
        </div>
        <div v-else>
          <div
            v-for="(item, index) in myJoiningList"
            :key="index"
            class="card-list"
          >
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
                  <div class="num-font">
                    {{ item.members.length + 1 }}/{{ item.total }}
                  </div>
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
                <el-button
                  class="card-button"
                  type="primary"
                  size="large"
                  color="#8097FD"
                  plain
                  @click="goDetails(item)"
                  >查看详情</el-button
                >
              </div>
            </el-card>
          </div>
        </div>
        <div class="clearfloat"></div>
  
        <!-- 分割线：已加入的小队 -->
        <el-divider class="divider">已加入的小队</el-divider>
        <div v-if="myJoinedList.length === 0" class="no-teams-message">
          您暂无已加入的小队
        </div>
        <div v-else>
          <div
            v-for="(item, index) in myJoinedList"
            :key="index"
            class="card-list"
          >
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
                  <div class="num-font">
                    {{ item.members.length + 1 }}/{{ item.total }}
                  </div>
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
                <el-button
                  class="card-button"
                  type="primary"
                  size="large"
                  color="#8097FD"
                  plain
                  @click="goDetails(item)"
                  >查看详情</el-button
                >
                <el-button
                  class="card-button"
                  type="primary"
                  size="large"
                  color="#8097FD"
                  plain
                  @click="quitTeam(item, index)"
                  >退出小队</el-button
                >
              </div>
            </el-card>
          </div>
          <div class="clearfloat"></div>
        </div>
      </div>
      <div class="clearfloat"></div>
    </div>
</template>
  
<script setup>
import Header from "@/components/Header";
import TeamNav from "@/components/TeamNav";
import { ref, nextTick } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

// 进入我的小队详情页
const router = useRouter();
const goDetails = (item) => {
router.push({
    path: "/Team/MyTeamDetails",
    query: item,
});
};

const myJoiningList = ref([]);
const myJoinedList = ref([]);

// 获取我已申请正在审核中的小队
axios
.get(
    "http://8.130.25.70:5555/api/Users/SelectTeam?id=843526A2B7784E73B28E73C797A2C81C&status=0"
)
.then((res) => {
    console.log(res.data);
    myJoiningList.value = res.data;
});
// 获取我加入的小队信息
axios
.get(
    "http://8.130.25.70:5555/api/Users/SelectTeam?id=843526A2B7784E73B28E73C797A2C81C&status=1"
)
.then((res) => {
    console.log(res.data);
    myJoinedList.value = res.data;
});

//当前用户id 小队id
const cur_user_id = "843526A2B7784E73B28E73C797A2C81C";
const cur_team_id = ref();

// 退出小队
const quitTeam = (item) => {
cur_team_id.value = item.teamId;
axios
    .delete(
    "http://8.130.25.70:5555/api/Teams/" +
        String(cur_user_id) +
        "/" +
        String(cur_team_id.value),
    {}
    )
    .then((res) => {
    console.log(res.data);
    console.log(res.status);
    // 成功退出小队后，等待一段时间再执行页面刷新
    setTimeout(() => {
        ElMessage({
        message: cur_user_id + "成功退出小队！" + cur_team_id,
        type: "success",
        });
        router.go(0); // 刷新页面
    }, 100); // 100毫秒（0.1秒）延迟
    })
    .catch(function (error) {
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log("Error", error.message);
    }
    });

//   ElMessage({
//     message: cur_user_id + "成功退出小队！" + cur_team_id,
//     type: "success",
//   });
//   router.go(0);
};
</script>

<style></style>
  