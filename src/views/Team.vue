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
            <div v-if="item.status === '招募中'" class="status" style="background-color: #7db0fd;">{{ item.status }}</div>
            <div v-if="item.status === '招募结束'" class="status" style="background-color: #ecb66f;">{{ item.status }}</div>
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
            <div class="detail">{{ item.detail+'applicants'+item.applicants }}</div>
          </div>
          <!-- 第四行：按钮 -->
          <div>
            <el-button class="card-button" type="primary" size="large" color="#8097FD" plain
              @click="goDetails(item)">查看详情</el-button>
            <el-button class="card-button" v-if="item.status === '招募中'" type="primary" size="large" color="#8097FD" plain
            @click.stop="joinTeam(item)">加入小队</el-button>
            <el-button class="card-button" v-if="item.status === '招募结束'" type="primary" size="large" plain disabled 
            style="background-color: rgb(242, 245, 255); color: rgb(169, 185, 253); border-color: rgb(192, 203, 254);"
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

//进入小队详情
const router = useRouter()
const goDetails = (item) => {
  router.push({
    path: '/Team/TeamDetails',
    query: item,
  })
}

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

const cur_user_id="843526A2B7784E73B28E73C797A2C81C"
var temp1,temp2,temp3,temp4;
// 获取小队的信息
const teamList = ref([])
teamList.value=[ {
                // 小队标识符
                teamId: "1",
                // 旅行目的地
                destination: "青海",
                // 小队招募信息标题
                title: "八月中旬青海自驾旅行，寻找2-3个女生",
                // 小队招募信息详情
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                // 小队状态：只包括两种：“招募中”，“招募完成”
                status: "招募中",
                // 标签：提供有限标签供选择，不能自定义
                tags: ["自驾", "限女生", "休闲"],
                // 发布者：这里直接使用了用户名称，实际传递时可以通过用户id获取用户名称和头像信息（未实现）
                // members和applicants同理需要由id获取
                // 对此进行更改后，所有涉及小队中用户名称显示的内容都需要相应修改！！！
                publisher: "青鸟",
                // 成员：成员中不包含发布者
                members: ["葡萄真好吃", "故事大王"],
                // 申请者：指申请加入小队但发布者还未通过的用户
                // 发布者通过申请后，申请者从applicants中删除，加入members
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                // 人数上限
                total: 5,
                // 现人数通过members数组长度加一计算
                // 这里用一个数组表示旅行时间
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07 00:06:11",
            },
            {
                teamId: "2",
                destination: "青海",
                title: "八月中旬川西自驾旅行",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["限女生", "休闲"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王", "彼得潘"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 6,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "3",
                destination: "青海",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "4",
                destination: "青海",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "5",
                destination: "青海",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "6",
                destination: "青海",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "7",
                destination: "青海",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            }]

//这是get接口       
/*axios.get('http://8.130.25.70:5555/api/Teams')
  .then(res => {
    console.log(res.data);
    // temp1=res.data[2];
    // temp2=res.data[1];
    // temp3=res.data[2];
    // temp4=res.data[3];
    // teamList.value.push(temp1);
    // teamList.value.push(temp2);
    // teamList.value.push(temp3);
    // teamList.value.push(temp4);
    teamList.value=res.data;
  })
  .catch(error => {
      console.error("获取小队列表失败:", error);
    }); */

// 请求加入小队
const joinTeam = (item) => {
  //直接把新的信息插入第一个小队 （可以不需要修改TeamDetails里的加入小队的功能 这里修改好可以直接复制）
  const firstTeam = teamList.value[0];
  firstTeam.applicants.push("haha");
  firstTeam.members.push("haha");
  //这里我想告诉后端就返回和用户没有关联的小队，不用返回用户加入或者申请加入的了


  // 将该用户添加到小队申请者列表applicants的接口
  /*axios.post('http://8.130.25.70:5555/api/Teams/Apply',{
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
  });*/
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
</style>
