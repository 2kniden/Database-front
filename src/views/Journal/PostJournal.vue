<template>
  <div v-if="is_post">
    <div>
      <p class="headtext">发布日志</p>
    </div>

      <div class="cover-wrapper">
        <div class="cover-label">封面：</div>
        <div class="cover-container">
          <el-button type="primary" color="#626aef" :dark="isDark" @click="handleClick_cover">选择图片</el-button>
          <input type="file" ref="fileInput" style="display: none" accept="image/*" @change="handleCoverUpload">
        </div>
      </div>
      <div v-if="cover_url" class="show-cover">
        <div class="cover-image-border">
          <el-image class="cover-image" :src="cover_url" :fit="fit" />
        </div>
      </div> 

      <div class="title-wrapper">
        <div class="title-label">标题：</div>
        <div class="input-container">
          <el-input v-model="title" placeholder="(必填)" />
        </div>
      </div>

      <div class="editor-wrapper">
        <div class="editor-label">正文：</div>
        <div class="editor-container">
          <editor :init="editorConfig" v-model="content"></editor>
        </div>
      </div>

      <div class="tabs-wrapper">
        <div class="tabs-label">标签：</div>
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
          <div class="public-label">是否公开：</div>
          <div class="switch-container">
              <el-tooltip :content="is_public=='true'?'是':'否'" placement="top">
              <el-switch
                v-model="is_public"
                style="--el-switch-on-color: #8097FD; --el-switch-off-color: #808080"
                active-value="true"
                inactive-value="false"
              />
              </el-tooltip>
          </div>
          <div class="public-tip">启用后该日志发布后将在日志广场展示</div>
      </div>    

      <div class="save-journal">
        <el-button v-if="title" size="large" color="#626aef" :dark="isDark" @click="saveContent">发布</el-button>
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
import { ElInput } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import axios  from "axios";

function formatDateTime(date) {  
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
            return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
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
      editorConfig: {
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide',
        toolbar: 'undo redo | bold italic underline | image | fontsizeselect',
        plugins: 'lists image',
        height: 500,
        file_picker_types: 'image',
        file_picker_callback: this.openFilePicker,
        init: (editor) => {
          editor.on('init', () => {
            this.content = editor.getContent()
          })
        }
      },
      content: '',
      
      input_tab: '',
      selected_tabs: [],
      input_tab_Visible: false,
      Input_tab_Ref: null,
      re_tabs:[''],

      is_public: false,

      gifPath: {url: require('../../assets/journal/journal-upload.gif')},
    }
  },
  mounted() {
    this.initializeData();
  },
  methods: {
    initializeData(){
      var that = this;
      
      that.poster_id = "001";     //这个暂时不知道怎么获得，先写死

      axios.get('/Journal/PostJournal/getTabs/').then(res =>{
        that.re_tabs = res.data.tabs;
      });
    },

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
      //console.log(formData.get('file'));
      
      axios.post('/Journal/PostJournal/uploadCover/', {
        id: that.poster_id,
        cover: formData.get('file'),
        })
        .then(res => {
          // 处理服务器返回的响应
          that.cover_url = res.data.cover_url;
          that.cover_id = res.data.cover_id;
        })
        .catch(error => {
          // 处理错误
          alert('上传失败！');
        });
        
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
        this.selected_tabs.push(this.input_tab)
      }
      this.input_tab_Visible = false
      this.input_tab = ''
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
    saveContent() {
      var that = this;

      //const blob = new Blob([this.content], { type: 'text/html;charset=utf-8' });
      //saveAs(blob, 'article.html');   //保存正文html

      const now_time = new Date();
      console.log(this.poster_id);
      console.log(this.cover_url);
      console.log(this.title);
      //console.log(this.content);                //查看内容，这里暂时保存为文件便于查看
      console.log(formatDateTime(now_time));        //发布时间
      console.log(this.selected_tabs);
      console.log(this.is_public);

      axios.post('/Journal/PostJournal/uploadArticle/', {
        poster_id: that.poster_id,
        cover_id: that.cover_id,
        title: that.title,
        body: that.content,
        tabs: that.selected_tabs,
        is_public: that.is_public,
        post_time: formatDateTime(now_time),
        })
        .then(res => {
          // 处理服务器返回的响应
          that.is_post = false;
          console.log(res.data.article_id);
        })
        .catch(error => {
          // 处理错误
          alert('上传失败！');
        });
    }
  }

}
</script>

<style>
.headtext {
    position: relative;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    line-height: 50px;
}

/* 封面 */
.cover-wrapper {
  display: flex;
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
  height: 185px;
  margin-left: 60px;
}
.cover-image-border{
  height: 165px;
  width: 285px;
  border-radius: 15px;
  background-color:rgb(235, 235, 235);
  border:1px dashed;
}
.cover-image{
  width: 285px; 
  height: 165px; 
  border-radius: 15px;
}

/* 标题 */
.title-wrapper {
  display: flex;
  align-items: flex-start;
}
.title-label {
  margin-left: 10px;
  margin-right: 10px;
  font-weight: bold;
}
.input-container {
  flex: 1;
  margin-right: 20px;
  height: 50px; 
}

/* 正文 */
.editor-wrapper {
  display: flex;
  align-items: flex-start;
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

/* 是否公开 */
.public-wrapper {
  display: flex;
  align-items: flex-start;
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
  height: 30px;
  margin-bottom: 20px;
}

/* 发布后 */
.already-uploaded{
  height: 500px;
  font-size: 15px;
  background-color: white;
}
</style>