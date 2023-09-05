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
                <!-- 这里有问题 -->
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
export default {
    data() {
        return {
            formLabelWidth: "70px",
            iconvalue1: 0,
            iconvalue2: 0,
            iconvalue3: 0,
            texts: ['极差', '失望', '一般', '满意', '惊喜'],
            comment: {
                // 确定是哪条评论
                attractionid: "123",//景区id
                commentid: "123",//评论id
                userid: "123",//用户id
                username: "123",//用户名
                uesrsrc: '123',//用户头像
                // 评论里要有啥
                avgscore: 0,//评分带小数点
                detail: '',
                picList: [],//照片列表
                // 其他信息
                commentDate: '',//时间
                commentCity: '',//ip地址这个不方便就不加
            },
        }
    },
    conponents: {
        ElMessage
    },
    computed: {
        calvalue() {
            return ((this.iconvalue1 + this.iconvalue2 + this.iconvalue3) / 3).toFixed(1);

        }
    },

    methods: {
        showScore() {
            console.log(this.iconvalue1, this.iconvalue2, this.iconvalue3);
        },
        //上传失败
        uploadFileError(err, file, fileList) {
            this.$message.error("上传失败！")
        },
        //上传成功
        uploadFileSuccess(response, file, fileList) {
            this.comment.picList.push(file);
            console.log(this.comment.picList);

        },
        handleRemove(file, fileList) {

            this.comment.picList = fileList;
        },
        handlePreview(file) {

            console.log(file);
        },
        // 这里还要设置一下如果选择了其他类型文件也要报错
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        commitCommet() {
            // 获取时间
            const currentDate = new Date();
            this.comment.commentDate = this.formatDateTime(currentDate);
            // 获取分数
            this.comment.avgscore = this.calvalue;
            if (this.comment.calvalue === 0 || this.comment.detail.trim() === "") {
                // 如果评分为0或详情为空，不允许提交
                // 可以显示错误提示或采取其他适当的操作
                ElMessage({
                    message: '评分和详情不能为空!',
                    type: 'error',
                })
                return;
            }

            ElMessage({
                message: '发布成功！',
                type: 'success',
            })
            // 打印一下
            // console.log(this.comment);
            // 把这条东西存入数据库
           

            // 发表完也要关闭
            this.$emit('getData', this.comment);

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
        }





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