<template>
    <div class="dialog-body">
      <el-form :model="team">
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
          <el-input-number v-model="team.total" :min="2" />
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
            </div>
            <div class="clearfloat"></div>
            <!-- 展示图片 -->
            <div v-if="teamContactImg">
              <el-image class="team-image" :src="teamContactImg" :fit="fit" />
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
  import { nextTick, ref,onMounted } from "vue";
  import { ElMessage, ElInput } from "element-plus";
  import { useRoute, useRouter } from "vue-router";
  import OSS from 'ali-oss';
  import axios from "axios";

  const router = useRouter();
  // 信息名称长度
  const formLabelWidth = "90px";
  
  // 向父组件传递窗口不可见信息
  const emit = defineEmits(["getData"]);
  const dialogInvisible = () => {
    emit("getData", false);
  };
  
  //当前用户id
  const cur_user_id = "小美";

  const team = ref({
    title: "",
    detail: "", //正文
    status: "招募中",
    tags: [],
    customTags: [],
    publisher: {name: cur_user_id, info: "", contact: ""},
    members: [],
    applicants: [],
    total: 2, //总人数
    destination: "",
    time: [],
    posttime: "",
    teamContact: ""
  });
  

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
    team.value.posttime = getCurrentTime();
    //这里在控制台打印小队主题进行测试
    console.log(team.value.title);
    console.log(team.value.time);
    console.log(team.value.posttime);
    console.log(team.value.destination);
    console.log(team.value.publisher.name);
    console.log(team.value.publisher.info);
    console.log(team.value.publisher.contact);
    axios
      .post("/api/Teams", {
        managerName: team.value.publisher.name,
        managerInfo: team.value.publisher.info,
        contactway:team.value.publisher.contact,
        title:team.value.title,
        status: 0, //刚发布默认招募中
        total: team.value.total,
        traveltime: team.value.time,
        destination: team.value.destination,
        detail: team.value.detail,
        tags: team.value.tags,
        customTags:team.value.customTags,
        media:team.value.teamContact
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
            type: "error",
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

  .team-image{
  width: 150px; 
  /* height: 150px;  */
  border-radius: 15px;
}
  </style>
  