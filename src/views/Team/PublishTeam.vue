<template>
    <div class="dialog-body">
        <el-form :model="form">
            <el-form-item label="主题" :label-width="formLabelWidth">
                <el-input v-model="team.title" maxlength="18" placeholder="请输入小队的重点信息" show-word-limit type="text" />
            </el-form-item>
            <el-form-item label="详情" :label-width="formLabelWidth">
                <el-input v-model="team.detail" :autosize="{ minRows: 3 }" maxlength="200" placeholder="请输入小队的详细信息"
                    show-word-limit type="textarea" />
            </el-form-item>
            <el-form-item label="人数上限" :label-width="formLabelWidth">
                <el-input-number v-model="team.total" :min="1" />
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
        </el-form>
    </div>

    <div class="dialog-footer">
        <el-button size="large" @click="dialogInvisible">取消</el-button>
        <el-button size="large" type="primary" @click="commitTeamMessage">提交</el-button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import axios from "axios";

// 信息名称长度
const formLabelWidth = '80px'

// 向父组件传递窗口不可见信息
const emit = defineEmits(['getData'])
const dialogInvisible = () => {
    emit('getData', false)
}

const team = ref({
    team_id: "1",
    title: "",
    detail: "",
    status: "招募中",
    tags: [],
    publisher: "",
    members: [],
    applicants: [],
    total: 1
})

//当前用户id
const cur_user_id="haha"

// 提交小队信息
const commitTeamMessage = () => {
    // 这里在控制台打印小队主题进行测试
    console.log(team.value.title)
    axios.post('/Team/PublishTeamInfo/',{
        user_id: cur_user_id,
        new_team: team.value,
    })
    .then(res => {
        //将返回新的小队列表
        //获取到新的小队列表后 需要刷新页面 即可实现更新
    })
    .catch(error => {
      alert('操作失败！');
    });

  ElMessage({
        message: '成功提交小队信息！',
        type: 'success',
    })
    // 关闭窗口
    dialogInvisible()
    location.reload();
}
</script>

<style>
.dialog-footer {
    margin-top: 40px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

/* .el-checkbox-button {
    margin-right: 10px;
} */
</style>