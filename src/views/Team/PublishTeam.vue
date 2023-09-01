<template>
    <div class="dialog-body">
      <el-form :model="form">
        <el-form-item label="主题" :label-width="formLabelWidth">
          <el-input
            v-model="team.title"
            maxlength="18"
            placeholder="请输入小队的重点信息"
            show-word-limit
            type="text"
          />
        </el-form-item>
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
        <el-form-item label="目的地" :label-width="formLabelWidth">
          <el-input
            v-model="team.destination"
            maxlength="10"
            placeholder="请输入旅行省份/市/景区"
            show-word-limit
            type="text"
          />
        </el-form-item>
        <el-form-item label="人数上限" :label-width="formLabelWidth">
          <el-input-number v-model="team.total" :min="2" />
        </el-form-item>
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
      </el-form>
    </div>
  
    <div class="dialog-footer">
      <el-button size="large" @click="dialogInvisible">取消</el-button>
      <el-button size="large" type="primary" @click="commitTeamMessage"
        >提交</el-button
      >
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { ElMessage } from "element-plus";
  import { useRoute, useRouter } from "vue-router";
  import axios from "axios";
  const router = useRouter();
  // 信息名称长度
  const formLabelWidth = "80px";
  
  // 向父组件传递窗口不可见信息
  const emit = defineEmits(["getData"]);
  const dialogInvisible = () => {
    emit("getData", false);
  };
  
  const team = ref({
    destination: "",
    title: "",
    detail: "", //正文
    status: "招募中",
    tags: [],
    publisher: "",
    members: [],
    applicants: [],
    total: 2, //总人数
    destination: "",
    time: [],
    postTime: "",
  });
  
  //当前用户id
  const cur_user_id = "843526A2B7784E73B28E73C797A2C81C";
  
  // 获取当前时间
  const getCurrentTime = () => {
    var date = new Date();
    var year = date.getFullYear();
    var month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minute =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var second =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    // 格式如："2023-08-30 13:48:44"
    const currentTime =
      year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return currentTime;
  };
  
  // 提交小队信息
  const commitTeamMessage = () => {
    // 获取发布时间
    team.value.postTime = getCurrentTime();
    //这里在控制台打印小队主题进行测试
    console.log(team.value.title);
    console.log(team.value.time);
    console.log(team.value.postTime);
    console.log(team.value.destination);
    axios
      .post("http://8.130.25.70:5555/api/Teams", {
        managerid: cur_user_id,
        title: team.value.title,
        status: 0, //刚发布默认招募中
        total: team.value.total,
        postTime: team.value.postTime,
        traveltime: team.value.time,
        destination: team.value.destination,
        detail: team.value.detail,
        tagList: team.value.tags,
      })
      .then((res) => {
        console.log(res.data);
        console.log(res.status);
        ElMessage({
          message: "成功发布小队！",
          type: "success",
        });
        setTimeout(() => {
            router.go(0);
        }, 100); // 100毫秒（0.1秒）延迟
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          ElMessage({
            message: "提交失败！请完整地填写相关信息后再次提交！",
            type: "warning",
          });
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
    //   // 关闭窗口
    //   dialogInvisible();
    // 强制刷新当前路由

  };
  </script>
  
  <style>
  .dialog-footer {
    margin-top: 40px;
  }
  
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
  
  .demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
  }
  
  .demo-date-picker .block {
    float: left;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
  }
  
  .demo-date-picker .block:last-child {
    border-right: none;
  }
  </style>
  