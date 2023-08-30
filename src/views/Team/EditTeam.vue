<template>
    <div class="background">
        <div class="head"></div>
        <Header></Header>
        <TeamNav />
        <div class="detail-content">
            <div class="form-title">编辑我的旅行小队</div>
            <el-form :model="form">
                <!-- 主题 -->
                <el-form-item label="主题" :label-width="formLabelWidth">
                    <el-input v-model="team.title" maxlength="18" placeholder="请输入小队的重点信息" show-word-limit type="text" />
                </el-form-item>
                <!-- 详情 -->
                <el-form-item label="详情" :label-width="formLabelWidth">
                    <el-input v-model="team.detail" :autosize="{ minRows: 3 }" maxlength="120" placeholder="请输入小队的详细信息"
                        show-word-limit type="textarea" />
                </el-form-item>
                <!-- 目的地 -->
                <el-form-item label="目的地" :label-width="formLabelWidth">
                    <el-input v-model="team.destination" maxlength="10" placeholder="请输入旅行省份/市/景区" show-word-limit type="text" />
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
                <!-- 招募状态 -->
                <el-form-item label="招募状态" :label-width="formLabelWidth">
                    <el-switch v-model="team.status" active-text="招募中" inactive-text="招募结束" active-value="招募中"
                        inactive-value="招募结束" />
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
                            :size="default"
                        />
                        </div>
                    </div>
                </el-form-item>
                <!-- 小队成员 -->
                <el-form-item label="小队成员" :label-width="formLabelWidth">
                    <div class="float-left" style="width: 400px;">
                        <div>
                            <div class="float-left">{{ team.publisher }}</div>
                            <div class="publisher" style="padding: 2px 10px; font-size: 14px;">发布者</div>
                            <div class="clearfloat"></div>
                        </div>
                        <div v-for="(member, mbIndex) in team.members" :key="mbIndex" style="margin: 10px 0;">
                            <div style="float: left;">{{ member }}</div>
                            <el-button type="danger" :icon="Delete" circle style="float: right;"
                                @click="removeMember(mbIndex)" />
                            <div class="clearfloat"></div>
                        </div>
                    </div>
                    <div class="clearfloat"></div>
                </el-form-item>
                <!-- 小队申请 -->
                <el-form-item label="小队申请" :label-width="formLabelWidth">
                    <div class="float-left" style="width: 400px;">
                        <div v-for="(applicant, appIndex) in team.applicants" :key="appIndex" style="margin-bottom: 10px;">
                            <div style="float: left;">{{ applicant }}</div>
                            <el-button type="danger" :icon="Delete" circle style="float: right;"
                                @click="removeApplicant(appIndex)" />
                            <el-button type="success" :icon="Check" circle style="float: right; margin-right: 16px;"
                                @click="approveApplicant(appIndex)" />
                            <div class="clearfloat"></div>
                        </div>
                    </div>
                    <div class="clearfloat"></div>
                </el-form-item>
            </el-form>
            <!-- 放弃和确认按钮 -->
            <div style="margin-top: 40px;">
                <el-button size="large" style="margin-right: 30px;" @click="cancelEdit">放弃修改</el-button>
                <el-button size="large" type="primary" @click="commitEdit">确认修改</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from "@/components/Header";
import TeamNav from "@/components/TeamNav";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Check, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import axios from "axios";

const router = useRouter()

// 切换至当前页面
const route = useRoute()
console.log("切换至编辑小队页面")
const item = route.query

// 当前小队信息
const team = ref({
    team_id: item.team_id,
    destination: item.destination,
    title: item.title,
    detail: item.detail,
    status: item.status,
    tags: item.tags,
    publisher: item.publisher,
    members: item.members,
    applicants: item.applicants,
    total: item.total,
    time: item.time
})

// 信息名称长度
const formLabelWidth = '80px'

// 移除小队成员
const removeMember = (mbIndex) => {
    console.log("移除小队成员：" + team.value.members[mbIndex])
    ElMessage({
        message: '成功移除小队成员！',
        type: 'success',
    })
    team.value.members.splice(mbIndex, 1)
    console.log("此时小队成员有：" + team.value.members)
}

// 通过小队申请者
const approveApplicant = (appIndex) => {
    if (team.value.members.length + 1 < team.value.total) {
        console.log("通过小队申请者：" + team.value.applicants[appIndex])
        ElMessage({
            message: '成功通过小队申请！',
            type: 'success',
        })
        team.value.members.push(team.value.applicants[appIndex])
        team.value.applicants.splice(appIndex, 1)
        console.log("此时小队成员有：" + team.value.members)
        console.log("此时小队申请者有：" + team.value.applicants)
    } else {
        console.log("小队人数已达上限，小队申请通过失败！")
        ElMessage.error('小队人数已达上限，小队申请通过失败！')
    }
}

// 移除小队申请者
const removeApplicant = (appIndex) => {
    console.log("移除小队申请者：" + team.value.applicants[appIndex])
    ElMessage({
        message: '成功移除小队申请者！',
        type: 'success',
    })
    team.value.applicants.splice(appIndex, 1)
    console.log("此时小队申请者有：" + team.value.applicants)
}

// 切换至我发布的小队页面
const goMyPublishedTeam = () => {
    router.push({
        path: '/Team/MyPublishedTeam',
    })
}

// 放弃修改
const cancelEdit = () => {
    ElMessage({
        message: '已放弃本次修改，修改记录将不会被保存',
        type: 'warning',
    })
    goMyPublishedTeam()
}

const cur_user_id="haha"
// 确认修改
const commitEdit = () => {
    // 这里在控制台打印小队主题进行测试验证修改成功
    console.log(team.value.title)

    // 根据team_id从数据库中查找到该小队信息，进行更新
    axios.put('/Team/EditTeamInfo/',{
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
        message: '成功修改我的小队信息！',
        type: 'success',
    })
    goMyPublishedTeam()
}

</script>

<style>
.form-title {
    margin-bottom: 30px;
    font-size: 18px;
}
</style>