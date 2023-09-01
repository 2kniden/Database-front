<template>
    <div class="background">
      <div class="head"></div>
      <Header></Header>
      <TeamNav />
      <div class="detail-content">
        <div class="form-title">编辑我的旅行小队</div>
        <el-form :model="form">
          <!-- 主题 -->
          <el-form-item label="主题" :label-width="formLabelWidth">
            <el-input
              v-model="team.title"
              maxlength="18"
              placeholder="请输入小队的重点信息"
              show-word-limit
              type="text"
            />
          </el-form-item>
          <!-- 详情 -->
          <el-form-item label="详情" :label-width="formLabelWidth">
            <el-input
              v-model="team.detail"
              :autosize="{ minRows: 3 }"
              maxlength="120"
              placeholder="请输入小队的详细信息"
              show-word-limit
              type="textarea"
            />
          </el-form-item>
          <!-- 目的地 -->
          <el-form-item label="目的地" :label-width="formLabelWidth">
            <el-input
              v-model="team.destination"
              maxlength="10"
              placeholder="请输入旅行省份/市/景区"
              show-word-limit
              type="text"
            />
          </el-form-item>
          <!-- 人数上限 -->
          <el-form-item label="人数上限" :label-width="formLabelWidth">
            <el-input-number v-model="team.total" :min="1" />
          </el-form-item>
          <!-- 标签 -->
          <el-form-item label="标签" :label-width="formLabelWidth">
            <el-checkbox-group v-model="team.tags" :max="5">
              <el-checkbox-button label="年轻人" />
              <el-checkbox-button label="限男生" />
              <el-checkbox-button label="限女生" />
              <el-checkbox-button label="自驾" />
              <el-checkbox-button label="报团" />
              <el-checkbox-button label="奢华" />
              <el-checkbox-button label="穷游" />
              <el-checkbox-button label="休闲" />
              <el-checkbox-button label="充实" />
            </el-checkbox-group>
          </el-form-item>
          <!-- 招募状态 -->
          <el-form-item label="招募状态" :label-width="formLabelWidth">
            <el-switch
              v-model="team.status"
              active-text="招募中"
              inactive-text="招募结束"
              active-value="招募中"
              inactive-value="招募结束"
            />
          </el-form-item>
          <!-- 旅行时间 -->
          <el-form-item label="旅行时间" :label-width="formLabelWidth">
            <div class="demo-date-picker">
              <div class="block">
                <el-date-picker
                  v-model="team.time"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  format="YYYY/MM/DD"
                  value-format="YYYY-MM-DD"
                  :size="default"
                />
              </div>
            </div>
          </el-form-item>
          <!-- 小队成员 -->
          <el-form-item label="小队成员" :label-width="formLabelWidth">
            <div class="float-left" style="width: 400px">
              <div>
                <div class="float-left">{{ team.publisher }}</div>
                <div class="publisher" style="padding: 2px 10px; font-size: 14px">
                  发布者
                </div>
                <div class="clearfloat"></div>
              </div>
              <div
                v-for="(member, mbIndex) in team.members"
                :key="mbIndex"
                style="margin: 10px 0"
              >
                <div style="float: left">{{ member }}</div>
                <el-button
                  type="danger"
                  :icon="Delete"
                  circle
                  style="float: right"
                  @click="removeMember(mbIndex)"
                />
                <div class="clearfloat"></div>
              </div>
            </div>
            <div class="clearfloat"></div>
          </el-form-item>
          <!-- 小队申请 -->
          <el-form-item label="小队申请" :label-width="formLabelWidth">
            <div class="float-left" style="width: 400px">
              <div
                v-for="(applicant, appIndex) in team.applicants"
                :key="appIndex"
                style="margin-bottom: 10px"
              >
                <div style="float: left">{{ applicant }}</div>
                <el-button
                  type="danger"
                  :icon="Delete"
                  circle
                  style="float: right"
                  @click="removeApplicant(appIndex)"
                />
                <el-button
                  type="success"
                  :icon="Check"
                  circle
                  style="float: right; margin-right: 16px"
                  @click="approveApplicant(appIndex)"
                />
                <div class="clearfloat"></div>
              </div>
            </div>
            <div class="clearfloat"></div>
          </el-form-item>
        </el-form>
        <!-- 放弃和确认按钮 -->
        <div style="margin-top: 40px">
          <el-button size="large" style="margin-right: 30px" @click="cancelEdit"
            >放弃修改</el-button
          >
          <el-button size="large" type="primary" @click="commitEdit"
            >确认修改</el-button
          >
        </div>
      </div>
    </div>
</template>
  
<script setup>
import Header from "@/components/Header";
import TeamNav from "@/components/TeamNav";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Check, Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import axios from "axios";

const router = useRouter();

// 切换至当前页面
const route = useRoute();
console.log("切换至编辑小队页面");
const item = route.query;

// 当前小队信息
const team = ref({
    teamId: item.teamId,
    destination: item.destination,
    title: item.title,
    detail: item.detail,
    status: item.status,
    tags: item.tags,
    publisher: item.publisher,
    members: item.members,
    applicants: item.applicants,
    total: item.total,
    time: item.traveltime,
});

console.log(team.value.status);

// 信息名称长度
const formLabelWidth = "80px";

// 移除小队成员
const removeMember = (mbIndex) => {
    console.log("移除小队成员：" + team.value.members[mbIndex]);
    ElMessage({
        message: "成功移除小队成员！",
        type: "success",
    });
    team.value.members.splice(mbIndex, 1);
    console.log("此时小队成员有：" + team.value.members);
};

// 通过小队申请者
const approveApplicant = (appIndex) => {
    if (team.value.members.length + 1 < team.value.total) {
        console.log("通过小队申请者：" + team.value.applicants[appIndex]);
        ElMessage({
        message: "成功通过小队申请！",
        type: "success",
        });
        team.value.members.push(team.value.applicants[appIndex]);
        team.value.applicants.splice(appIndex, 1);
        console.log("此时小队成员有：" + team.value.members);
        console.log("此时小队申请者有：" + team.value.applicants);
    } else {
        console.log("小队人数已达上限，小队申请通过失败！");
        ElMessage.error("小队人数已达上限，小队申请通过失败！");
    }
};

// 移除小队申请者
const removeApplicant = (appIndex) => {
    console.log("移除小队申请者：" + team.value.applicants[appIndex]);
    ElMessage({
        message: "成功移除小队申请者！",
        type: "success",
    });
    team.value.applicants.splice(appIndex, 1);
    console.log("此时小队申请者有：" + team.value.applicants);
};

// 切换至我发布的小队页面
const goMyPublishedTeam = () => {
    setTimeout(() => {
        router.replace({//使用replace 使用户不能通过浏览器回退键返回
        path: "/Team/MyPublishedTeam",
        });
    }, 100); // 100毫秒（0.1秒）延迟
};

// 放弃修改
const cancelEdit = () => {
    ElMessage({
        message: "已放弃本次修改，修改记录将不会被保存",
        type: "warning",
    });
    router.replace({ //直接返回 不需要延时
        path: "/Team/MyPublishedTeam",
    });
};

//小队状态码转换
const num_of_status=ref(0);
const changeTeamStatus=()=>{
    if(team.value.status==="招募中"){
        num_of_status.value=0;
    }
    else if(team.value.status==="招募结束"){
        num_of_status.value=1;
    }
}

const cur_user_id = "843526A2B7784E73B28E73C797A2C81C";
// 确认修改
const commitEdit = () => {
    changeTeamStatus();//获取对应的小队状态码
    // 这里在控制台打印小队主题进行测试验证修改成功
    console.log(team.value.title);
    // 根据team_id从数据库中查找到该小队信息，进行更新
    axios
        .put("http://8.130.25.70:5555/api/Teams/" + { cur_user_id }, {
        teamId: team.value.teamId,
        title: team.value.title,
        detail: team.value.detail,
        status: num_of_status.value,
        tags: team.value.tags,
        total: team.value.total,
        traveltime: team.value.time,
        destination: team.value.destination,
        })
        .then((res) => {
        console.log(res.data);
        console.log(res.status);
        ElMessage({
            message: cur_user_id + "成功修改小队！"+num_of_status.value,
            type: "success",
        });
        goMyPublishedTeam();
        })
        .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
            ElMessage({
                message: "提交失败！请保证修改后的相关信息的完整性！",
                type: "warning",
            });
        } else {
            console.log("Error", error.message);
        }
        });

};
</script>

<style>
.form-title {
margin-bottom: 30px;
font-size: 18px;
}
</style>
