<template>
    <div class="dialog-body">
        <el-form :model="form">
            <el-form-item label="景区评分" :label-width="formLabelWidth">
                <div class="scores">
                    <div class="totalscore">
                        <el-rate v-model="calvalue" disabled show-score text-color="#8097FD" score-template="{value}"
                            :size="'big'">
                        </el-rate>
                    </div>
                    <div class="scorebg">
                        <div class="detailscore">
                            <div class="scoreword">景色</div>

                            <el-rate v-model="iconvalue1" show-text :texts="texts" @click="showScore" :size="'small'"
                                text-color="#8097FD">
                            </el-rate>
                        </div>
                        <div class="detailscore">

                            <div class="scoreword">趣味</div>
                            <el-rate v-model="iconvalue2" show-text :texts="texts" @click="showScore" :size="'small'"
                                text-color="#8097FD">
                            </el-rate>
                        </div>
                        <div class="detailscore">
                            <div class="scoreword">性价比</div>
                            <el-rate v-model="iconvalue3" show-text :texts="texts" @click="showScore" :size="'small'"
                                text-color="#8097FD">
                            </el-rate>
                        </div>

                    </div>
                </div>



            </el-form-item>
            <el-form-item label="评论详情" :label-width="formLabelWidth">
                <el-input class="eleinput" v-model="comment.detail" :autosize="{ minRows: 3 }" maxlength="200"
                    placeholder="请输入评论详情" show-word-limit type="textarea" />
            </el-form-item>
            <el-form-item label="上传图片" :label-width="formLabelWidth">
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3"
                    :on-exceed="handleExceed" :file-list="fileList" :on-success="uploadFileSuccess"
                    :on-error="uploadFileError">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>
    </div>

    <div class="dialog-footer">
        <el-button size="large" @click="dialogInvisible">取消</el-button>
        <el-button size="large" type="primary" @click="commitCommet">发表</el-button>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import axios from 'axios';
import OSS from 'ali-oss'
import { toRaw } from '@vue/reactivity'

export default {
    props:{
        attractionID:Number,
    },
    mounted() {
        this.initializeData();
    },
    data() {
        return {
            formLabelWidth: "70px",
            iconvalue1: 0,
            iconvalue2: 0,
            iconvalue3: 0,
            fileList: [],

            texts: ['极差', '失望', '一般', '满意', '惊喜'],
            comment: {
                // 评论里要有啥
                avgscore: 0,//评分带小数点
                detail: '',
                picList: [],//照片列表暂时
               
            },
            // 上传至oss相关
            OSSOptions: {
                endpoint: '',
                accessKeyId: '',
                accessKeySecret: '',
                bucket: '',
            },
            ossClient: '',
        }
    },
    conponents: {
        ElMessage,
        OSS,
        axios,
        toRaw
    },
    computed: {
        calvalue() {
            return ((this.iconvalue1 + this.iconvalue2 + this.iconvalue3) / 3).toFixed(1);

        }
    },

    methods: {
        // 把图片传到上面去
        getOssOptions() {
            return new Promise((resolve, reject) => {
                axios.get('/api/Teams/Access')
                    .then(res => {
                        console.log('res.data=', res.data);
                        resolve(res.data);
                    })
                    .catch(err => {
                        console.log("can't get accesskeyId");
                        reject('no');
                    })
            })
        },
        initializeData() {
            var that = this;
            this.getOssOptions().then((res) => {
                if (res !== 'no') {
                    const endpoint = res.endpoint;
                    // that.OSSOptions.endpoint='oss-cn-shanghai.aliyuncs.com';
                    that.OSSOptions.endpoint = res.endpoint;
                    that.OSSOptions.accessKeyId = res.accessKeyId;
                    that.OSSOptions.accessKeySecret = res.accessKeySecret;
                    that.OSSOptions.bucket = res.bucketName;
                    that.ossClient = new OSS(that.OSSOptions);
                    console.log('that.OSSOptions=', that.OSSOptions);
                } else {
                    console.log("fail to initializa");
                }
            })//end of promise.then
        },
        showScore() {
            console.log(this.iconvalue1, this.iconvalue2, this.iconvalue3);
        },
        //上传失败
        uploadFileError(err, file, fileList) {
            this.$message.error("上传失败！")
        },
        //上传成功
        uploadFileSuccess(response, file, fileList) {
            // console.log(file.raw)
            this.comment.picList.push(file);

        },
        handleRemove(file, fileList) {
            // console.log(file, fileList);
            this.comment.picList = fileList;
        },
        handlePreview(file) {
            // console.log(file);
        },
        // 这里还要设置一下如果选择了其他类型文件也要报错
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },

        uploadtoOss(val) {
            const coverObj = toRaw(val);
            const storeAs = 'Attraction/';
            const coverNames = [];

            const uploadPromises = coverObj.map((cover, index) => {
                const imgCreatedTime = this.formatDateTime(cover.raw.lastModifiedDate);
                const ext = cover.name.split('.').pop();
                const coverRename = cover.name.split(ext)[0] + imgCreatedTime + '.' + ext;
                coverNames.push(coverRename);

                const currentCoverRename = coverNames[index];
                const currentCoverObj = cover.raw;

                return this.ossClient.put(storeAs + currentCoverRename, currentCoverObj)
                    .then(res => {
                        console.log('oss上传成功');
                        this.comment.picList[index] = res.url;
                    })
                    .catch(err => {
                        console.log('oss上传失败');
                        throw err; // 上传失败时抛出错误
                    });
            });

            return Promise.all(uploadPromises);

        },
        postAttrComment() {
            // 现在要换成body传参
            const data = {
                userID: '843526A2B7784E73B28E73C797A2C81C',
                attractionid: this.attractionID,
                commentDetail: this.comment.detail,
                rating: this.comment.avgscore,
                commentSrc: this.comment.picList
            };
            // 这里有图片上传就有问题
            axios.post('/api/attrations/PostComments', data, null)
                .then(res => {
                    console.log(res.data);
                    console.log('post上传成功');

                })
                .catch(error => {
                    // 处理错误
                    console.log('post上传失败');
                });
        },
        async commitCommet() {
            // 获取时间
            const currentDate = new Date();
            this.comment.commentDate = this.formatDateTime(currentDate);
            // 获取分数
            this.comment.avgscore = this.calvalue;
            if (this.comment.calvalue === 0 || this.comment.detail.trim() === "") {
                ElMessage({
                    message: '评分和详情不能为空!',
                    type: 'error',
                })
                return;
            }
            // 让oss上传完再post，需要加一个异步操作
            try {
                await this.uploadtoOss(this.comment.picList);
                await this.postAttrComment();
                ElMessage({
                    message: '发布成功！',
                    type: 'success',
                });
                this.dialogInvisible();
            } catch (error) {
                console.error('提交评论失败', error);
            }

            this.dialogInvisible();

        },
        // 关闭页面
        dialogInvisible() {
            // 发出关闭弹窗的事件给父组件监听
            this.$emit('getData', false);
        },
        formatDateTime(date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            minute = minute < 10 ? ('0' + minute) : minute;
            var second = date.getSeconds();
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        },





    }
}

</script>

<style>
.dialog-footer {
    margin-top: 40px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

.scores {
    display: flex;
    flex-direction: column;
}

.scoreword {
    font-size: 8px;
    color: #777;
    width: 60px;
    text-align: left;
    transform: translate(0, -10%);
}

.detailscore {
    display: flex;
    flex-direction: row;
}

.totalscore {
    text-align: left;
}

.scorebg {
    background-color: #F1F3FF;
    width: 200px;
    padding: 10px;
    border-radius: 10px;
}

/* .el-checkbox-button {
    margin-right: 10px;
} */
</style>