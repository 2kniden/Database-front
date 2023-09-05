<template>
    <div>
        <h1>让我们来测试一下地图吧</h1>
        <div class="part1">
            <el-button @click="getTest()">分割一下</el-button>
            <el-button @click="getBaiduMap()">调用百度地图</el-button> 
        </div>
        <el-divider></el-divider>
    </div>
    <div>
        <h1>别管上面了,让我们来测试一下图片上传吧</h1>
        <!-- 只要能接收图片,展示图片即可 -->
        <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <el-icon><Plus /></el-icon>
            <template #file="{ file }">
            <div>
                <img @click="handleRemove(file)" class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                >
                    <el-icon><zoom-in /></el-icon>
                </span>
                <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                >
                    <el-icon><Delete /></el-icon>
                </span>
            </div>
            </template>
        </el-upload>
        <!-- 这个是如果选择了查看大图,才会出现 -->
        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
        <!-- <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :before-upload="beforeCoverUpload"
            :on-success="handleCoverSuccess"
            :on-preview="handlePictureCardPreviw"
            :on-error="handleError"
            >
             如果收到了相关的图片 
            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
            <!-- <el-icon v-model="uploadVisible" class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload> -->
        <!-- 缩略图 -->
    </div>
    <div>
        <el-divider></el-divider>
        <h1>测试使用富文本编辑器时，如果content本身有内容能否在编辑框里正常显示</h1>
        <div class="edit-area">
            <Editor :api-key="apiKey" :init="editorConfig" v-model="content"></Editor>
        </div>
    </div>
    <div>
        <el-divider></el-divider>
        <h1>测试地图接口调用</h1>
    </div>
    <div>
        <el-divider></el-divider>
        <h1>测试客户端图片直传oss</h1>
    </div>
</template>

<!-- <script>
import Editor from '@tinymce/tinymce-vue'
export default {
    components:{
        'editor':Editor
    },
    data:{
        content:"",
        apiKey:"5wey00pxhyichb698p1la4mlbm524jx7czschewimnv5mvbw",
        editorConfig:{
            language_url: '/tinymce/langs/zh_CN.js',
            language: 'zh_CN',
            skin_url: '/tinymce/skins/ui/oxide',
            toolbar: 'undo redo | bold italic underline | image | fontsizeselect',
            plugins: 'lists image',
            height: 500,
            init: (editor) => {
                editor.on('init', () => {
                    this.content = editor.getContent();
                })
            }
        }
    }
}
</script> -->

<script setup>
import { ref,reactive } from "vue"
// import { ElMessage } from 'element-plus'
import { Delete,Plus,ZoomIn } from '@element-plus/icons-vue'
import Editor from '@tinymce/tinymce-vue'
// import type { UploadFile } from 'element-plus'

// editor
let content = ref("<p>你好<strong>你好</strong><em>你好</em><u>你好</u>你好<p>" );
const apiKey = ref("5wey00pxhyichb698p1la4mlbm524jx7czschewimnv5mvbw");
const editorConfig = reactive({
            language_url: '/tinymce/langs/zh_CN.js',
            language: 'zh_CN',
            skin_url: '/tinymce/skins/ui/oxide',
            toolbar: 'undo redo | bold italic underline | image | fontsizeselect',
            plugins: 'lists image',
            height: 500,
            init: (editor) => {
                editor.on('init', () => {
                    content.value = editor.getContent();
                })
            }
        });
const testpageNum = ref(2);
const testpageSize = ref(6);
const keyword = ref("keyword");

function getTests() {
    console.log('hello world');
}

const imgurl = ref('');
const dialogVisible = ref(false);
const dialogImageUrl = ref("");
// const uploadVisible = ref(true);

const handleRemove = (file) => {
  console.log(file);
  
}

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}
// const beforeCoverUpload = (rawFile) =>{
//     if (rawFile.type !== 'image/jpeg' 
//         || rawFile.type !== 'image/png' ) {
//             ElMessage.error('封面图必须为JPG或PNG格式!')
//             return false
//     }
//     console.log('成功')
// }
// const handleCoverSuccess = (response,uploadFile) =>{
//     cosole.log(response);
//     console.log(uploadFile);
//     imgurl.value = URL.createObjectURL(uploadFile);
//     console.log("成功")
// }

// const handlePictureCardPreviw = (imgurl) => {
//     if (imgurl.value != '') {
//         dialogImageUrl.value = imgurl.value;
//         dialogVisible.value = true;
//         uploadVisible.value = false;
//     }
// }

// const handleError = (rawfile) => {
//     console.log(rawfile);
//     console.log("shibai")
// }
</script>

<style scoped>
/* 设置上传样式 */
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>