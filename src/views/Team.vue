<template>
  <div class="background">
    <div class="head"></div>
    <Header></Header>
    <TeamNav />
    <div class="team-content">
      <div class="search clearfix">
        <div class="search-img"></div>
        <div class="search-input">
          <el-input
          style="width: 300px;"
          v-model="input"
          class="w-10 m-2"
          type="text"
          placeholder="快来找找感兴趣的旅行小队吧"
          @keyup.enter="submitSearchText"
          />
        </div>
      
        <div > 
          <el-button class="search-button" color="#8097FD" plain
           native-type="submit" 
          @click="submitSearchText">搜索</el-button>
        </div>

      </div>
      <div v-for="(item, index) in teamList" :key="index" class="card-list">
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
            <el-button class="card-button" v-if="item.status === '招募中'" type="primary" size="large" color="#8097FD" plain
            @click="joinTeamDialogVisible = true; applicantTeam = item;">加入小队</el-button>
            <el-button class="card-button" v-if="item.status === '招募结束'" type="primary" size="large" plain disabled 
            style="background-color: rgb(242, 245, 255); color: rgb(169, 185, 253); border-color: rgb(192, 203, 254);"
            @click="joinTeamDialogVisible = true; applicantTeam = item;">加入小队</el-button>
          </div>
        </el-card>
      </div>
      <div class="clearfloat"></div>
    </div>
    <div class="clearfloat"></div>
  </div>
  <!-- 加入小队信息填写页面 -->
  <el-dialog v-model="joinTeamDialogVisible" title="加入小队申请信息">
    <el-form :model="form" style="margin-top: 30px;">
      <el-form-item label="自我简介" :label-width="formLabelWidth">
        <el-input
          v-model="applicant.info"
          maxlength="18"
          placeholder="请输入简短的自我介绍，让其他小队成员了解你"
          show-word-limit
          type="text"
        />
      </el-form-item>
      <el-form-item label="联系方式" :label-width="formLabelWidth">
        <el-input
          v-model="applicant.contact"
          maxlength="18"
          placeholder="请输入你的电话/微信号，只有加入小队后其他成员才能看到你的联系方式"
          show-word-limit
          type="text"
        />
      </el-form-item>
    </el-form>
    <div class="dialog-footer" style="margin-top: 70px;">
      <el-button size="large" @click="joinTeamDialogVisible = false">取消</el-button>
      <el-button size="large" type="primary" @click="joinTeam(applicantTeam)">提交</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import Header from "@/components/Header";
import TeamNav from "@/components/TeamNav";
import { ref } from 'vue';
import { useRouter } from "vue-router";
import axios from "axios";
import { ElMessage } from 'element-plus';

//进入小队详情
const router = useRouter()
const goDetails = (item) => {
  router.push({
    path: '/Team/TeamDetails',
    // query: item
    query: {
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
    }
  })
}

// 当前用户id（用户姓名）
const cur_user_id="小美"

// 加入小队填写信息页面
const joinTeamDialogVisible = ref(false)
// 申请者信息
const applicant = ref({
  // 申请者姓名
  name: cur_user_id,
  info: "",
  contact: ""
})
// 申请的小队
const applicantTeam = {}

// 信息名称长度
const formLabelWidth = "80px";

// 获取小队的信息
const teamList = ref([])

//搜索
const input = ref('');
function submitSearchText() {
    if (input.value != ''){
      // jpdisplayType.value = 1;
      // 重置选择器
      router.push({
        path: '/Team/SearchTeam',
        query: {
          searchkey:input.value,
        }        
      })
    }
    else{
      console.log("请在搜索框中输入一个值！");
      ElMessage({
      message:'请在搜索框中输入一个值！',
      type: "warning",
    });
    }
}
    
axios.get('/api/Teams/'+String(cur_user_id))
  .then(res => {
    console.log(res.data);
    teamList.value=res.data;
  })
  .catch(error => {
      console.error("获取小队列表失败:", error);
    }); 

// 请求加入小队
const joinTeam = (applicantTeam) => {
  // 将该用户添加到小队申请者列表applicants的接口
  console.log(applicantTeam.teamId)
  console.log(cur_user_id)
  console.log(applicant.value.info)
  console.log(applicant.value.contact)
  axios.post('/api/Teams/Apply',{
    teamid: applicantTeam.teamId,
    name:cur_user_id,
    info:applicant.value.info,
    contact:applicant.value.contact
  })
  .then(res => {
    console.log(res.data);
    console.log(res.status);
    setTimeout(() => {
        router.replace({
        path: "/Team/MyJoinedTeam",
        });
    }, 100); // 100毫秒（0.1秒）延迟
    ElMessage({
      message:'成功发送加入小队请求！',
      type: "success",
    });
  })
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      ElMessage({
            message: "申请失败！请填写完整的自我介绍与联系方式！",
            type: "error",
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

  // 关闭填写加入小队信息页面
  //joinTeamDialogVisible.value = false
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
  /* background-color: #80FD8A; */
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
  height: 104px;
  text-align: left;
}

.card-button {
  margin: 10px 20px 0;
}

/* 设置搜索栏样式 */
.search {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 10px;
  margin-top: 20px; /* 通过调整这个值来增加搜索框离下方的距离 */
  margin-bottom: 20px; /* 通过调整这个值来增加搜索框离下方的距离 */
}

/* 搜索输入框 */
.search-input {
/* width: 100%; */
  right: -28px;
  position: relative;
}

/* 搜索按钮 */
.search-button {
  position: relative;
  left: 0px;
}

.search-img{
    float: left;
    margin-right: -20px;
    height: 30px;
    width: 30px;
    background-image: url(../../src/assets/team/search-img.png);
}

</style>
