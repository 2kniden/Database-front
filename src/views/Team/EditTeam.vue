<template>
    <div class="background">
      <div class="head"></div>
      <Header></Header>
      <TeamNav />
      <div class="detail-content">
        <div class="form-title">编辑我的旅行小队</div>
        <button class="team-delete-button" @click="deleteTeam(team.teamId)">删除小队</button>
        <div class="clearfloat"></div>
        <el-form :model="form">
          <el-divider class="divider">小队信息管理</el-divider>
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
          <!-- 自定义标签 -->
          <el-form-item label="自定义标签" :label-width="formLabelWidth">
            <el-tag
              v-for="tag in team.customTags"
              :key="tag"
              class="mx-1"
              size="large"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="InputRef"
              v-model="inputValue"
              maxlength="3"
              show-word-limit
              class="ml-1 w-20"
              style="width: 110px;"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag ml-1" @click="showInput">
              + 新标签
            </el-button>
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
                  v-model="team.traveltime"
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
          <!-- 自我简介 -->
          <el-form-item label="自我简介" :label-width="formLabelWidth">
            <el-input
              v-model="team.publisher.info"
              maxlength="18"
              placeholder="请输入简短的自我介绍，让其他小队成员了解你"
              show-word-limit
              type="text"
            />
          </el-form-item>
          <!-- 联系方式 -->
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input
              v-model="team.publisher.contact"
              maxlength="18"
              placeholder="请输入你的电话/微信号，只有加入你的小队的成员才能看到你的联系方式"
              show-word-limit
              type="text"
            />
          </el-form-item>
          <!-- 小队二维码 -->
          <el-form-item label="小队二维码" :label-width="formLabelWidth">
            <div>
              <div style="float: left; margin-bottom: 10px;">
                <el-button type="primary" dark @click="handleClick_cover">选择图片</el-button>
                <input type="file" ref="fileInput" style="display: none" accept="image/*" @change="handleCoverUpload">
                <div class="QRcode_tips">（如需更改请点击上传）</div>
              </div>
              <div class="clearfloat"></div>
              <!-- 展示图片 -->
              <div v-if="teamContactImg">
                <el-image class="team-image" :src="teamContactImg" :fit="fit" />
              </div> 
            </div>
          </el-form-item>
          <el-divider class="divider">成员信息管理</el-divider>
          <!-- 小队成员 -->
          <el-form-item label="小队成员" :label-width="formLabelWidth">
            <div class="float-left" style="width: 400px">
              <div>
                <img class="edit_headImage" :src="team.publisher.headimage" alt="">
                <div class="float-left">{{ team.publisher.name }}</div>
                <div class="publisher" style="padding: 2px 10px; font-size: 14px; margin: 0 0 10px 10px;">
                  发布者
                </div>
                <div class="clearfloat"></div>
              </div>
              <div v-if="team.members.length === 0">
                <div class="clearfloat"></div>
              </div>
              <div v-else>
                <el-collapse v-model="memberCollapse" style="min-width: 450px;">
                  <el-collapse-item v-for="(member, mbIndex) in team.members" :key="mbIndex" :title="member.name">
                    <div style="width: 400px; border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
                      <!-- 这里放头像会对不齐，所以要不可以不放？ -->
                            <!-- <img class="edit_headImage" :src="IMGSRC" alt=""> -->
                            <div style="float: left ">{{ member.name }}</div>
                            <el-button
                              type="danger"
                              :icon="Delete"
                              circle
                              style="float: right"
                              @click="removeMember(mbIndex)"
                            />
                            <div class="clearfloat"></div>
                            <div class="clearfloat"></div>
                              <div style="float: left">申请信息：</div>
                              <!-- 申请信息过长的话会换行显示，提供的数据太长了，后端修改就好 -->
                              <div style="float: left">{{ member.info }}</div>
                              <div class="clearfloat"></div>
                              <div style="float: left">联系方式：</div>
                              <div style="float: left">{{ member.contact }}</div>
                              <div class="clearfloat"></div>
                        </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
            <div class="clearfloat"></div>
          </el-form-item>
          <!-- 小队申请 -->
          <el-form-item label="小队申请" :label-width="formLabelWidth">
            <!-- Check if there are applicants, if not, display a message -->
            <div v-if="team.applicants.length === 0"  style="padding-left: 10px; color: #999;">
                当前暂无申请者！
            </div>
            <div v-else>
              <el-collapse v-model="applicantCollapse" style="min-width: 450px;">
                <el-collapse-item v-for="(applicant, appIndex) in team.applicants" :key="appIndex" :title="applicant.name" :name="'applicant' + appIndex">
                  <div class="float-left" style="width: 400px; border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
                    <!-- <img class="edit_headImage" :src="IMGSRC" alt=""> -->
                    <div style="float: left">{{ applicant.name }}</div>
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
                    <div style="float: left">申请信息：</div>
                    <div style="float: left">{{ applicant.info }}</div>
                    <div class="clearfloat"></div>
                    <div style="float: left">联系方式：</div>
                    <div style="float: left">{{ applicant.contact }}</div>
                    <div class="clearfloat"></div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
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
import { nextTick, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Check, Delete } from "@element-plus/icons-vue";
import { ElMessage, ElInput } from "element-plus";
import axios from "axios";
import OSS from 'ali-oss';

const router = useRouter();

// 切换至当前页面
const route = useRoute();
console.log("切换至编辑小队页面");
// const item = route.query;
const item = {
  teamId: route.query.teamId,
  destination: route.query.destination,
  title: route.query.title,
  detail: route.query.detail,
  status: route.query.status,
  tags: route.query.tags,
  customTags: route.query.customTags,
  publisher: JSON.parse(route.query.publisher),
  members: JSON.parse(route.query.members),
  applicants: JSON.parse(route.query.applicants),
  total: route.query.total,
  traveltime: route.query.traveltime,
  posttime: route.query.posttime,
  media:route.query.media,
}
console.log(item)

// 当前小队信息
const team = ref({
    teamId: item.teamId,
    destination: item.destination,
    title: item.title,
    detail: item.detail,
    status: item.status,
    tags: item.tags,
    customTags: item.customTags,
    publisher: item.publisher,
    members: item.members,
    applicants: item.applicants,
    total: item.total,
    traveltime: item.traveltime,
    posttime:item.posttime,
    teamContact:item.media
});

console.log(team.value.status);

// 信息名称长度
const formLabelWidth = "90px";

// 自定义标签
const inputValue = ref('')
  const inputVisible = ref(false)
  const InputRef = ref(null)

  const handleClose = (tag) => {
    team.value.customTags.splice(team.value.customTags.indexOf(tag), 1)
  }

  const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
      InputRef.value.input.focus()
    })
  }

  const handleInputConfirm = () => {
    if (inputValue.value) {
      team.value.customTags.push(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ''
  }

const memberCollapse=ref();
const applicantCollapse=ref();

// 移除小队成员
const removeMember = (mbIndex) => {
    console.log("移除小队成员：" + team.value.members[mbIndex]);
    // 重新设置折叠状态
    memberCollapse.value = team.value.members.map(() => false);
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
        // 重新设置折叠状态
        applicantCollapse.value = team.value.applicants.map(() => false);
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
    // 重新设置折叠状态
    applicantCollapse.value = team.value.applicants.map(() => false);
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

const deleteTeam=(team_id)=>{
  console.log(team_id);
  axios
      .delete(
      "http://8.130.25.70:5555/api/Teams/" + String(team_id),{}
      )
      .then((res) => {
        console.log(res.data);
        console.log(res.status);
        ElMessage({
            message: "成功删除当前小队！",
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
      } else {
          console.log("Error", error.message);
      }
      });
}

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

  let ossClient={};
 
 const getOssOptions = () => {
 return new Promise((resolve, reject) => {
   axios.get("/api/Teams/Access")
     .then(res => {
       console.log('get it');
       console.log(res.data);
       resolve(res.data); // 返回res.data作为Promise的解决值
     })
     .catch(err => {
       console.log("can't get accesskeyId");
       reject('no');
     })
 });
}

getOssOptions().then(res => {
 if (res !== 'no') {
   const OSSOptions = {
     endpoint: res.endpoint,
     accessKeyId: res.accessKeyId,
     accessKeySecret: res.accessKeySecret,
     bucket: res.bucketName
   };

   ossClient = new OSS(OSSOptions);
   console.log(ossClient);
 }
});

 const fileInput = ref(null)
 const teamContactImg = ref('')

 const handleClick_cover = () => {
   fileInput.value.click()
 }

 const handleCoverUpload = (event) => {
   const files = event.target.files
   const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i

   if (!allowedExtensions.exec(files[0].name)) {
     alert('只允许上传图片文件')
     return
   }

   const formData = new FormData()
   formData.append('file', files[0])
   const coverObj = formData.get('file')

   // 配置oss相关
   const storeAs = 'contact/'

   // 并不,这个只是对象
   console.log(coverObj)
   // 增加时间戳、防止名称重复
   const imgCreatedTime = getCurrentTime()

   // 重命名:
   const ext = coverObj.name.split('.').pop() // 后缀名只能为最后一个
   const coverRename = coverObj.name.split(ext)[0] + imgCreatedTime + cur_user_id + '.' + ext
   console.log(coverRename)

   // 上传给oss
   // const promiseList = Promise(that.ossClient.put(storeAs+coverRename,coverObj));

   ossClient.put(coverRename, coverObj)
     .then(res => {
       console.log('yes')
       teamContactImg.value = res.url
       team.value.teamContact = teamContactImg.value
       console.log(team.value.teamContact)
     })
     .catch(err => {
       console.log('no')
     });
 }
</script>

<style>
.form-title {
  margin-bottom: 10px;
  font-size: 18px;
}

.team-delete-button {
    display: inline-block;
    background-color: #ff6666; /* 使用浅红色背景 */
    color: white;
    font-size: 12px; /* 减小字体大小 */
    padding: 3px 6px; /* 减小按钮的内边距以使按钮变小 */
    border: none;
    text-align: center;
    cursor: pointer;
    float: right; /* 将按钮靠页面右边 */
    /* margin-bottom: 5px; 添加按钮底部的外边距，根据需要调整距离 */
    border-radius: 5px; /* 添加圆角边框 */
  }

.edit_headImage{
  float: left;
  border-radius: 50%;
  width: 30px; /* 根据需要调整宽度和高度 */
  height: 30px;
  object-fit: cover; /* 保持图片比例并填充整个圆形区域 */
  margin-right: 10px; /* 根据需要调整距离 */
}

.QRcode_tips{
  font-size: 12px; 
  color: #999;
}

</style>
