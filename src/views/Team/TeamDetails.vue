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
              {{ item.postTime }}
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
const cur_user_id = route.params.user_id
const item = route.query

// 请求加入小队
const joinTeam = (item) => {
  // 将该用户添加到小队申请者列表applicants
  axios.post('/Team/AddTeamApplicants/',{
    user_id: cur_user_id,
    team_id: item.team_id,
  })
  .then(res => {
    if(res.data.status==1){
      item.applicants=res.data.cur_team.applicants; //将返回的小队申请列表赋予当前item
      ElMessage({
        message: cur_user_id+'成功发送加入小队请求！'+item.team_id,
        type: 'success',
      })
    }
    else if(res.data.status==2){
      ElMessage({
        message: cur_user_id+'已发送申请，正在审核中！'+item.team_id,
        type: 'success',
      })
    }
    else if(res.data.status==3){
      ElMessage({
        message: cur_user_id+'已加入该小队！'+item.team_id,
        type: 'success',
      })
    }
  })
  .catch(error => {
    alert('操作失败！');
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