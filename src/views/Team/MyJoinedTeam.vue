<template>
    <div class="background">
      <div class="head"></div>
      <Header></Header>
      <TeamNav />
      <div class="team-content">
        <!-- 分割线：审核中的小队 -->
        <el-divider class="divider">审核中的小队</el-divider>
        <div v-if="myJoiningList.length === 0 && stoptime1 === 1" class="no-teams-message">
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
                <div v-if="item.status === '招募中'" class="status" style="background-color: #7db0fd;">{{ item.status }}</div>
                <div v-if="item.status === '招募结束'" class="status" style="background-color: #ecb66f;">{{ item.status }}</div>
                <div class="clearfloat"></div>
              </div>
              <!-- 第二行：标签+人数 -->
              <div class="card-line">
                <div v-for="(tag, tagIndex) in item.tags" :key="tagIndex">
                  <div v-if="tagIndex < 5" class="tag">{{ tag }}</div>
                </div>
                <div v-for="(customTag, customTagIndex) in item.customTags" :key="customTagIndex">
                  <div v-if="customTagIndex + item.tags.length < 5" class="tag">{{ customTag }}</div>
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
        <div v-if="myJoinedList.length === 0 && stoptime2 === 1" class="no-teams-message">
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
                <div v-if="item.status === '招募中'" class="status" style="background-color: #7db0fd;">{{ item.status }}</div>
                <div v-if="item.status === '招募结束'" class="status" style="background-color: #ecb66f;">{{ item.status }}</div>
                <div class="clearfloat"></div>
              </div>
              <!-- 第二行：标签+人数 -->
              <div class="card-line">
                <div v-for="(tag, tagIndex) in item.tags" :key="tagIndex">
                  <div v-if="tagIndex < 5" class="tag">{{ tag }}</div>
                </div>
                <div v-for="(customTag, customTagIndex) in item.customTags" :key="customTagIndex">
                  <div v-if="customTagIndex + item.tags.length < 5" class="tag">{{ customTag }}</div>
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
      // query: item,
      query: {
        Ismine: 0,
        teamId: item.teamId,
        destination: item.destination,
        title: item.title,
        detail: item.detail,
        status: item.status,
        tags: item.tags,
        customTags: item.customTags,
        publisher: JSON.stringify(item.publisher),
        members: JSON.stringify(item.members),
        applicants: JSON.stringify(item.applicants),
        total: item.total,
        traveltime: item.traveltime,
        posttime: item.posttime,
        isJoined:item.isJoined,
        media: item.media,
      }
    });
};

const myJoiningList = ref([]);
const myJoinedList = ref([]);
//当前用户id 小队id
const cur_user_id = "小美";

//设置一个延时，用于防止没有调用完接口提前显示没有查询结果
let stoptime1=ref(0);
let stoptime2=ref(0);

// 获取我已申请正在审核中的小队
axios.get('/api/Teams/SelectTeam?name='+String(cur_user_id)+'&status=0')
  .then((res) => {
      console.log(res.data);
      myJoiningList.value = res.data;
      stoptime1 = 1;
      })
      .catch(error => {
          console.error("获取小队列表失败:", error);
        }); 
// 获取我加入的小队信息
axios.get('/api/Teams/SelectTeam?name='+String(cur_user_id)+'&status=1')
  .then((res) => {
      console.log(res.data);
      myJoinedList.value = res.data;
      stoptime2 = 1;
      })
  .catch(error => {
          console.error("获取小队列表失败:", error);
        }); 

// 退出小队
const quitTeam = (item) => {
  //接口部分
  axios.delete("/api/Teams/" +String(item.teamId) +"/" +String(cur_user_id),{})
      .then((res) => {
      console.log(res.data);
      console.log(res.status);
      // 成功退出小队后，等待一段时间再执行页面刷新
      ElMessage({
          message: "成功退出小队！" ,
          type: "success",
          });
      setTimeout(() => {
          router.go(0); // 刷新页面
      }, 100); // 100毫秒（0.1秒）延迟
      });
      // .catch(function (error) {
      // if (error.response) {
      //     console.log(error.response.data);
      //     console.log(error.response.status);
      //     console.log(error.response.headers);
      // } else if (error.request) {
      //     console.log(error.request);
      // } else {
      //     console.log("Error", error.message);
      // }
      // });
};
</script>

<style></style>
  