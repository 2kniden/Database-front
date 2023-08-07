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

// 提交小队信息
// 需要在后端数据库中插入该小队（未实现）
const commitTeamMessage = () => {
    ElMessage({
        message: '成功提交小队信息！',
        type: 'success',
    })
    // 输入的小队信息保存在team里
    // 如小队主题的值为team.value.title
    // 这里在控制台打印小队主题进行测试
    console.log(team.value.title)

    // team.publiser需要获取当前用户的用户信息（未实现）

    // team.team_id需要生成唯一team_id（未实现）

    // 将小队信息保存进数据库（未实现）

    // 关闭窗口
    dialogInvisible()
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