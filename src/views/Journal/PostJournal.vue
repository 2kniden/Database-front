<template>
  <div v-if="is_post">
    <div>
      <p class="headtext">发布日志</p>
    </div>
      <div class="cover-wrapper">
        <div class="cover-label">封面：</div>
        <div class="cover-container">
          <el-button type="primary" color="#626aef" dark @click="handleClick_cover">选择图片</el-button>
          <input type="file" ref="fileInput" style="display: none" accept="image/*" @change="handleCoverUpload">
        </div>
      </div>
      <div v-if="cover_url" class="show-cover">
        <div class="cover-image-border">
          <el-image class="cover-image" :src="cover_url"/>
        </div>
      </div>

      <div class="title-wrapper">
        <div class="title-label">标题：</div>
        <div class="input-container">
          <el-input v-model="title" placeholder="(必填，不可超过22个字符)" maxlength=22 show-word-limit />
          <span class="check-input-hint" v-if="inputIsValid === false">*输入超过22个字符，请重新输入</span>
        </div>
      </div>

      <div class="editor-wrapper">
        <div class="editor-label">正文：</div>
        <div class="editor-container">
          <editor :init="editorConfig" v-model="content" :api-key="apikey"></editor>
        </div>
      </div>

      <div class="tabs-wrapper">
        <div class="tabs-label" style="width: 48px;">标签：</div>
        <div class="tabs-container">
          <el-tag
            v-for="tag in selected_tabs"
            :key="tag"
            class="mx-1"
            effect="dark"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="input_tab_Visible"
            ref="Input_tab_Ref"
            v-model="input_tab"
            class="ml-1 w-20"
            size="small"
            placeholder="标签不超过4个字符"
            maxlength=4
            show-word-limit
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
            + 添加
          </el-button>

          <div class="tabs-label_2">推荐标签：</div>
          <div v-for="tag in re_tabs" :key="tag" class="re_tabs_item"
          :class="{ 'selected': is_tabSelected(tag) }" @click="handle_re_tabs(tag)">
            <div class="tag-text">{{tag}}</div>
          </div>
        </div>
      </div>

      <div class="public-wrapper">
          <div class="public-label">公开状态：</div>
          <div class="switch-container">
            <el-radio-group v-model="is_public" @change="handlePublicStatus(is_public)">
            <el-radio :label="1" style="--el-radio-input-border-color-hover: #8097FD;">公开</el-radio>
            <el-radio :label="2" style="--el-radio-input-border-color-hover: #8097FD;">仅关注者可见</el-radio>
            <el-radio :label="3" style="--el-radio-input-border-color-hover: #8097FD;">仅自己可见</el-radio>
            </el-radio-group>

              <!-- <el-tooltip :content="is_public=='true'?'是':'否'" placement="top">
              <el-switch
                v-model="is_public"
                style="--el-switch-on-color: #8097FD; --el-switch-off-color: #808080"
                active-value="true"
                inactive-value="false"
              />
              </el-tooltip> -->
          </div>
      </div>

      <div class="save-journal">
        <el-button v-if="title" size="large" color="#626aef" drak @click="saveContent">发布</el-button>
      </div>

  </div>

  <div v-else>
    <div class="already-uploaded">
      <br><br>
        <img :src="gifPath.url" alt="" style="height:150px">
        <p>发布成功！</p>
    </div>
  </div>

</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import { saveAs } from 'file-saver'
import { nextTick, ref } from 'vue'
import { ElInput,ElMessage,ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import axios  from "axios";
import { useRouter,useRoute } from "vue-router"
import OSS from 'ali-oss'

function formatDateTime(d) {
    const date = new Date(d);      //发布日期
    const date_year = date.getFullYear();
    const date_month = date.getMonth() + 1;
    const date_day = date.getDate(); 

    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();  
    h = h < 10 ? ('0' + h) : h;  
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute;  
    var second=date.getSeconds();  
    second=second < 10 ? ('0' + second) : second;  
    return y + m + d + h + minute + second;  
};

export default{
    name: "PostJournal",
    components:{
        'editor': Editor,
        ElInput,
        Plus,
    },
  data() {
    return {
      poster_id: "001",

      is_post: true,

      cover_url: '',
      cover_id: '',

      title: '',
      apikey:"5wey00pxhyichb698p1la4mlbm524jx7czschewimnv5mvbw",
      editorConfig: {
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide',
        toolbar: 'undo redo | bold italic underline | image | fontsizeselect',
        plugins: 'lists image',
        height: 500,
        file_picker_types: 'image',
        file_picker_callback: this.openFilePicker,
        // 图片处理函数，不要以base64的方式拿到图片
        images_upload_handler:this.imagesUploadHandler,
        init: (editor) => {
          editor.on('init', () => {
            this.content = editor.getContent();
          })
        }
      },
      content: '',

      input_tab: '',
      selected_tabs: [],
      input_tab_Visible: false,
      Input_tab_Ref: null,
      re_tabs:[''],

      is_public:1,

      gifPath: {url: 'https://jiyi-2023.oss-cn-shanghai.aliyuncs.com/Journal/journal-upload.gif'},
      inputIsValid:true,

      mode:'post',
      journal_id:'',
      OSSOptions: {
        endpoint:'',
        accessKeyId:'',
        accessKeySecret:'',
        bucket:'',
      },
      ossClient:'',
    }
  },
  mounted() {
    this.initializeData();
  },
  methods: {
    getOssOptions() {
      return new Promise((resolve,reject)=>{
        axios.get('/api/Teams/Access')
        .then (res=>{
          console.log('get it');
          console.log('res.data=',res.data);
          resolve(res.data);
        })
        .catch(err=>{
          console.log("can't get accesskeyId");
          reject('no');
        })
      })
    },
    initializeData(){
      var that = this;
      const query = this.$route.query;
      that.mode = query.mode;
      this.getOssOptions().then((res)=>{
        if(res !== 'no'){
            console.log('res=',res);
            const endpoint = res.endpoint;
            // that.OSSOptions.endpoint='oss-cn-shanghai.aliyuncs.com';
            that.OSSOptions.endpoint=res.endpoint;
            that.OSSOptions.accessKeyId=res.accessKeyId;
            that.OSSOptions.accessKeySecret=res.accessKeySecret;
            that.OSSOptions.bucket=res.bucketName;
            that.ossClient = new OSS(that.OSSOptions);
            console.log('that.OSSOptions=',that.OSSOptions);
            // console.log('that.ossClient=',that.ossClient);
          // 获得当前浏览者的id,先写死
          that.poster_id = "843526A2B7784E73B28E73C797A2C81C"; 

          //获取现有标签
          axios.get('/api/Journals/Tags/').then(res =>{
            that.re_tabs = res.data.tabs;
          });

          if(that.mode === 'edit'){
            // 则对相应内容进行填充
            that.journal_id = query.journal;
            axios.get('/api/Journals/'+ that.journal_id + '/' + that.poster_id)
              .then(res=>{
                  // 本篇日志的信息
                  that.title = res.data.Journal.title;
                  that.cover_url = res.data.Journal.cover_url;
                  that.selected_tabs = res.data.Journal.tabs;
                  that.content = res.data.Journal.body;
                  // that.is_public = res.data.Journal. 
              })
              .catch(err=>{
                ElMessage.error("获取信息失败");
              })
          }
          else{
            ;
          }//edit mode
        } else {
          console.log("fail to initializa!!!");
        }
      })//end of promise.then
    },

    // 上传图片,先获取图片,最后一起上传
    handleClick_cover() {
      this.$refs.fileInput.click();
    },

    handleCoverUpload(event) {
      var that = this;
      const files = event.target.files;
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

      if (!allowedExtensions.exec(files[0].name)) {
        alert('只允许上传图片文件');
        return;
      }
      const formData = new FormData();
      formData.append('file', files[0]);
      
      const coverObj = formData.get('file');

      const storeAs = 'Journal/';
      
      // 并不,这个只是对象
      console.log(coverObj);
      // 增加时间戳、防止名称重复
      const imgCreatedTime = formatDateTime(coverObj.lastModifiedDate);

      // 重命名:
      const ext = coverObj.name.split('.').pop();//后缀名只能为最后一个
      const coverRename = coverObj.name.split(ext)[0] + imgCreatedTime + '.' + ext;
      
      that.ossClient.put(storeAs+coverRename,coverObj)
      .then (res=>{
        console.log('yes');
        that.cover_url = res.url;
        console.log(that.cover_url);
      })
      .catch(err=>{
        console.log('no');
      })
      // that.cover_url = "https://dimg04.c-ctrip.com/images/01051120009q53j342A87_R_1600_10000.jpg";
    },

    handleClose(tag) {
      this.selected_tabs.splice(this.selected_tabs.indexOf(tag), 1)
    },

    showInput() {
      this.input_tab_Visible = true
      nextTick(() => {
        this.$refs.Input_tab_Ref.focus()
      })
    },

    handleInputConfirm() {
      if (this.input_tab) {
        if (this.input_tab.length <= 4) {
          this.selected_tabs.push(this.input_tab);
          this.input_tab_Visible = false;
          this.input_tab = '';
        }
      }
      return;
    },

    is_tabSelected(tag) {
      return this.selected_tabs.includes(tag)
    },

    handle_re_tabs(tag) {
      if (this.is_tabSelected(tag)) {
        const index = this.selected_tabs.indexOf(tag)
        if (index !== -1) {
          this.selected_tabs.splice(index, 1)
        }
      } else {
        this.selected_tabs.push(tag)
      }
    },

    openFilePicker(callback, value, meta) {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.onchange = () => {
        const file = input.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          const url = e.target.result
          callback(url)
        }
        reader.readAsDataURL(file)
      }
      input.click()
    },

    imagesUploadHandler(blobInfo,success,failure) {
          let that = this;
          let ext = blobInfo.filename().split('.').pop();
          let name = blobInfo.name();
          let curTime = new Date();
          curTime = formatDateTime(curTime);
          const imgName = that.poster_id + name + curTime + '.' + ext;
          const dirName = 'Journal/';
          console.log(imgName);

          that.ossClient.put(dirName+imgName,blobInfo.blob())
          .then(res=>{
            console.log('image_upload_handler:yes');
            success(res.url)
          })
          .catch(err =>{
            console.log(err);
          })
          console.log("done");
          
        },

    handlePublicStatus(is_public){
      console.log("is_public=",is_public);
    },

    saveContent() {
      var that = this;
      // 错误检查
      // 标题不超过22个字符，tabs不能为空
      if (this.selected_tabs.length === 0) {
        ElMessageBox.alert(
          "标签数不可为空",
          {
            confirmButtonText:"确认",
            type:"warning",
          }
        )
        return;
      }
      //const blob = new Blob([this.content], { type: 'text/html;charset=utf-8' });
      //saveAs(blob, 'article.html');   //保存正文html

      // 要将tabs转换成以逗号相隔的字符串进行上传
      let all_tabs="";
      this.selected_tabs.forEach(e => {
        if(all_tabs == "") {
          all_tabs = all_tabs + e;
        }
        else {
          all_tabs = all_tabs + "," + e;
        }
      })
      console.log(all_tabs);
      console.log(that.is_public);

      if(that.mode === 'edit') {
        axios.put('/api/Journals',{
          journalId:that.journal_id,
          title:that.title,
          journalContent:that.content,
          authorization:that.is_public,
          photoUrl:that.cover_url,
          journalTag:all_tabs,
        })
        .then(res=>{
          if(res.data.status) {
            that.is_post = false;
            ElMessage.success("上传成功");
          }

        })
        .catch(err=>{
          ElMessage.error("上传失败");

        });
      } else {
        console.log(that.content);
          axios.post('/api/Journals', {
            title: that.title,
            journalContent: that.content,
            authorization: that.is_public,
            // travelTime:
            // 这里还有一个cover_id
            photoUrl: that.cover_url,
            // travelType:
            journalTag: all_tabs,
            // routeId:
            userId: that.poster_id,
          })
          .then(res => {
            if (res.data.status) {
              // 处理服务器返回的响应
              that.is_post = false;
              // console.log(res.data.article_id);
              // 返回上级目录
              ElMessage.success("上传成功");
              // isPosedSuccess = true;
            }
          })
          .catch(error => {
            // 处理错误
            ElMessage.error('上传失败！');
          });
        }


    },
  }

}
</script>

<style scoped>
.headtext {
    position: relative;
    height: 50px;
  margin-left: 180px;
  margin-top: 30px;
    font-size: 20px;
    font-weight: bold;
    line-height: 50px;
}

/* 封面 */
.cover-wrapper {
  display: flex;
  margin-left: 180px;
  align-items: flex-start;
}
.cover-label {
  margin-left: 10px;
  margin-right: 10px;
  font-weight: bold;
}
.cover-container {
  height: 40px;
}
.show-cover{
  height: 175px;
  margin-left: 60px;
}
.cover-image-border{
  height: 150px;
  width: 150px;
  border-radius: 15px;
  background-color:rgb(255, 255, 255,0.8);
  border:1px dashed;
}
.cover-image{
  width: 150px;
  height: 150px;
  border-radius: 15px;
}

/* 标题 */
.title-wrapper {
  display: flex;
  align-items: flex-start;
  margin-left: 180px;
}
.title-label {
  margin-left: 10px;
  margin-right: 10px;
  font-weight: bold;
  white-space: nowrap; 
}
.input-container {
  flex: 1;
  margin-right: 20px;
  height: 50px;
  text-align: left;
  .check-input-hint {
    font-size: 7px;
    color:#fa8080;
  }
}

/* 正文 */
.editor-wrapper {
  display: flex;
  align-items: flex-start;
  margin-left: 180px;
}
.editor-label {
  margin-left: 10px;
  margin-right: 10px;
  font-weight: bold;
}
.editor-container {
  flex: 1;
  margin-right: 20px;
  margin-bottom: 15px;
}

/* 标签 */
.tabs-wrapper {
  display: flex;
  align-items: flex-start;
  margin-left: 180px;
}
.tabs-label {
  margin-left: 10px;
  margin-right: 10px;
  font-weight: bold;
  line-height: 20px;
}
.tabs-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  width: 700px;
}
.tabs-label_2{
  font-size: 10px;
  font-weight: normal;
  height: 25px;
  line-height: 25px;
  margin-left: 15px;
}
.re_tabs_item {
  font-size: 10px;
  display: flex;
  align-items: center;
  color: gray;
  text-decoration: underline;
  cursor: pointer;
}
.re_tabs_item.selected {
  color: blue;
  text-decoration: none;
}

.el-tag--dark {
  --el-tag-bg-color:#8097FD;
  --el-tag-border-color:#8097FD;
  --el-tag-hover-color:#b1bef8;
}

.el-button {
  --el-button-hover-text-color:#8097FD;
  --el-button-hover-border-color:#8097FD;
  --el-button-hover-bg-color:#d0d9ff;
}

:deep(.el-radio__input.is-checked .el-radio__inner) {
  border-color:#8097FD;
  background: #8097FD;
}

:deep(.el-radio__input.is-checked){
  --el-color-primary:#8097FD;
}
/* 是否公开 */
/* .el-radio__input.is-checked .el-radio__inner {
  border-color: #8097FD;
  background-color: #8097FD;
}

.el-radio__input.is-checked .el-radio__label {
  color: #8097FD;
} */

.public-wrapper {
  display: flex;
  align-items: flex-start;
  margin-left: 180px;
}
.public-label {
  margin-left: 10px;
  margin-right: 10px;
  font-weight: bold;
  height: 35px;
  line-height: 35px;
}
.switch-container {
  margin-left: 0px;
  margin-right: 20px;
  height: 35px;
  line-height: 35px;
}
.public-tip{
  font-size: 10px;
  height: 35px;
  line-height: 35px;
}

/* 发布 */
.save-journal{
  height: 60px;
  width: 200px;
  margin-left: 500px;
}

/* 发布后 */
.already-uploaded{
  height: 500px;
  font-size: 15px;
  background-color: white;
}
</style>
