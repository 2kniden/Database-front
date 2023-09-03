<template>
<div class="background">
    <div class="head"></div>
    <Header></Header>
    <TeamNav />
    <div class="team-content">
    <!-- 发布小队 -->
    <el-divider class="divider">发布我的小队</el-divider>
    <el-button
        class="card-button"
        type="primary"
        size="large"
        color="#8097FD"
        plain
        @click="dialogFormVisible = true"
        >发布新的旅行小队</el-button
    >
    <el-dialog
        v-model="dialogFormVisible"
        title="旅行小队信息"
        destroy-on-close
    >
        <PublishTeam @getData="getData" />
    </el-dialog>
    <!-- 分割线：招募中的小队 -->
    <el-divider class="divider">招募中的小队</el-divider>
    <div v-if="myRecruitingList.length === 0" class="no-teams-message">
        您暂无招募中的小队
    </div>
    <div v-else>
        <div
        v-for="(item, index) in myRecruitingList"
        :key="index"
        class="card-list"
        >
        <!-- 卡片 -->
        <el-card class="card">
            <!-- 第一行：题目+状态 -->
            <div class="card-line">
            <div class="card-title">{{ item.title }}</div>
            <div class="status">{{ item.status }}</div>
            <div class="clearfloat"></div>
            </div>
            <!-- 第二行：标签+人数 -->
            <div class="card-line">
            <div v-for="(tag, tagIndex) in item.tags" :key="tagIndex">
                <div v-if="tagIndex < 5" class="tag">{{ tag }}</div>
            </div>
            <div v-for="(customTag, customTagIndex) in item.customTags" :key="customTagIndex">
                <div v-if="customTagIndex + item.tags.length < 5" class="tag">{{ customTag }}</div>
            </div>
            <div class="num">
                <div class="num-img"></div>
                <div class="num-font">
                {{ item.members.length + 1 }}/{{ item.total }}
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="clearfloat"></div>
            </div>
            <!-- 第三行：详情 -->
            <div class="card-line">
            <div class="detail">{{ item.detail }}</div>
            </div>
            <!-- 第四行：按钮 -->
            <div>
            <el-button
                class="card-button"
                type="primary"
                size="large"
                color="#8097FD"
                plain
                @click="goDetails(item)"
                >查看详情</el-button
            >
            <el-button
                class="card-button"
                type="primary"
                size="large"
                color="#8097FD"
                plain
                @click="editTeam(item)"
                >编辑小队</el-button
            >
            </div>
        </el-card>
        </div>
    </div>
    <div class="clearfloat"></div>

    <!-- 分割线：招募完成的小队 -->
    <el-divider class="divider">招募完成的小队</el-divider>
    <div v-if="myRecruitedList.length === 0" class="no-teams-message">
        您暂无招募完成的小队
    </div>
    <div v-else>
        <div
        v-for="(item, index) in myRecruitedList"
        :key="index"
        class="card-list"
        >
        <!-- 卡片 -->
        <el-card class="card">
            <!-- 第一行：题目+状态 -->
            <div class="card-line">
            <div class="card-title">{{ item.title }}</div>
            <div class="status">{{ item.status }}</div>
            <div class="clearfloat"></div>
            </div>
            <!-- 第二行：标签+人数 -->
            <div class="card-line">
            <div v-for="(tag, tagIndex) in item.tags" :key="tagIndex">
                <div v-if="tagIndex < 5" class="tag">{{ tag }}</div>
            </div>
            <div v-for="(customTag, customTagIndex) in item.customTags" :key="customTagIndex">
                <div v-if="customTagIndex + item.tags.length < 5" class="tag">{{ customTag }}</div>
            </div>
            <div class="num">
                <div class="num-img"></div>
                <div class="num-font">
                {{ item.members.length + 1 }}/{{ item.total }}
                </div>
                <div class="clearfloat"></div>
            </div>
            <div class="clearfloat"></div>
            </div>
            <!-- 第三行：详情 -->
            <div class="card-line">
            <div class="detail">{{ item.detail }}</div>
            </div>
            <!-- 第四行：按钮 -->
            <div>
            <el-button
                class="card-button"
                type="primary"
                size="large"
                color="#8097FD"
                plain
                @click="goDetails(item)"
                >查看详情</el-button
            >
            <el-button
                class="card-button"
                type="primary"
                size="large"
                color="#8097FD"
                plain
                @click="editTeam(item)"
                >编辑小队</el-button
            >
            </div>
        </el-card>
        </div>
    </div>
    <div class="clearfloat"></div>
    </div>
    <div class="clearfloat"></div>
</div>
</template>

<script setup>
import Header from "@/components/Header";
import TeamNav from "@/components/TeamNav";
import PublishTeam from "@/views/Team/PublishTeam";
import { ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
// 切换至当前页面
const route = useRoute();
console.log("切换至我发布的小队页面");

// 进入我的小队详情页
const goDetails = (item) => {
router.push({
    path: "/Team/MyTeamDetails",
    // query: item,
    query: {
      teamId: item.teamId,
      destination: item.destination,
      title: item.title,
      detail: item.detail,
      status: item.status,
      tags: item.tags,
      customTags: item.customTags,
      publisher: JSON.stringify(item.publisher),
      members: JSON.stringify(item.members),
      applicants: JSON.stringify(item.applicants),
      total: item.total,
      traveltime: item.traveltime,
      posttime: item.posttime,
      // media: item.media,
    }
});
};

// 进入编辑小队页面
const editTeam = (item) => {
router.push({
    path: "/Team/EditTeam",
    // query: item,
    query: {
      teamId: item.teamId,
      destination: item.destination,
      title: item.title,
      detail: item.detail,
      status: item.status,
      tags: item.tags,
      customTags: item.customTags,
      publisher: JSON.stringify(item.publisher),
      members: JSON.stringify(item.members),
      applicants: JSON.stringify(item.applicants),
      total: item.total,
      traveltime: item.traveltime,
      posttime: item.posttime,
      // media: item.media,
    }
});
};

// 创建小队弹出框默认为不显示
const dialogFormVisible = ref(false);
// 子组件传递回窗口不可见信息
const getData = (val) => {
dialogFormVisible.value = val;
};

const myRecruitingList = ref([]);
const myRecruitedList = ref([]);
//对于可不可见的问题，我发布的小队能看到成员的信息和申请中改的信息，并且可以进行审核
myRecruitingList.value=[{
                // 小队标识符
                teamId: "1",
                destination: "青海",
                // 小队招募信息标题
                title: "八月中旬青海自驾旅行，寻找2-3个女生",
                // 小队招募信息详情
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                // 小队状态：这里暂时用string类型表示状态，实际使用需要根据status标识显示相应文字并修改背景颜色
                // 状态只包括两种：“招募中”，“招募完成”
                status: "招募中",
                // 标签：提供有限标签供选择，不能自定义
                tags: ["自驾", "限女生", "休闲"],
                // 标签自定义
                customTags: ["骑行", "美食", "音乐"],
                // 发布者：这里直接使用了用户名称，实际传递时可以通过用户id获取用户名称和头像信息（members和applicants同）
                publisher: {name: "青鸟", info: "阳光开朗女大学生", contact: "19912341234"},
                // 成员：成员中不包含发布者
                members: [{name: "葡萄真好吃", info: "铁血E人", contact: "19922223333"}, {name: "故事大王", info: "这区域的交友达人", contact: "12366666666"}],
                // 申请者：指申请加入小队但发布者还未通过的用户
                // 发布者通过申请后，申请者从applicants中删除，加入members
                applicants: [{name: "谋杀咖啡", info: "冒牌文艺青年", contact: "19988888888"}, {name: "飞翔的北极熊", info: "奇思妙想提供者", contact: "19945674567"}, {name: "滑稽的大礼帽", info: "阳光开朗大男孩", contact: "19922227777"}],
                // 人数上限
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "2",
                destination: "青海",
                title: "八月中旬川西自驾旅行",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["限女生", "休闲"],
                customTags: ["骑行", "美食", "音乐"],
                publisher: {name: "青鸟", info: "阳光开朗女大学生", contact: "19912341234"},
                members: [{name: "葡萄真好吃", info: "铁血E人", contact: "19922223333"}, {name: "故事大王", info: "这区域的交友达人", contact: "12366666666"}],
                applicants: [{name: "谋杀咖啡", info: "冒牌文艺青年", contact: "19988888888"}, {name: "飞翔的北极熊", info: "奇思妙想提供者", contact: "19945674567"}, {name: "滑稽的大礼帽", info: "阳光开朗大男孩", contact: "19922227777"}],
                total: 6,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "3",
                destination: "青海",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                customTags: ["骑行", "美食", "音乐"],
                publisher: {name: "青鸟", info: "阳光开朗女大学生", contact: "19912341234"},
                members: [{name: "葡萄真好吃", info: "铁血E人", contact: "19922223333"}, {name: "故事大王", info: "这区域的交友达人", contact: "12366666666"}],
                applicants: [{name: "谋杀咖啡", info: "冒牌文艺青年", contact: "19988888888"}, {name: "飞翔的北极熊", info: "奇思妙想提供者", contact: "19945674567"}, {name: "滑稽的大礼帽", info: "阳光开朗大男孩", contact: "19922227777"}],
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            }]
myRecruitedList.value=[{
                teamId: "4",
                destination: "青海",
                title: "八月中旬青海自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募完成",
                tags: ["自驾", "限女生", "休闲"],
                customTags: ["骑行", "美食", "音乐"],
                publisher: {name: "青鸟", info: "阳光开朗女大学生", contact: "19912341234"},
                members: [{name: "葡萄真好吃", info: "铁血E人", contact: "19922223333"}, {name: "故事大王", info: "这区域的交友达人", contact: "12366666666"}],
                applicants: [{name: "谋杀咖啡", info: "冒牌文艺青年", contact: "19988888888"}, {name: "飞翔的北极熊", info: "奇思妙想提供者", contact: "19945674567"}, {name: "滑稽的大礼帽", info: "阳光开朗大男孩", contact: "19922227777"}],
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "5",
                destination: "青海",
                title: "八月中旬川西自驾旅行",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募完成",
                tags: ["限女生", "休闲"],
                customTags: ["骑行", "美食", "音乐"],
                publisher: {name: "青鸟", info: "阳光开朗女大学生", contact: "19912341234"},
                members: [{name: "葡萄真好吃", info: "铁血E人", contact: "19922223333"}, {name: "故事大王", info: "这区域的交友达人", contact: "12366666666"}],
                applicants: [{name: "谋杀咖啡", info: "冒牌文艺青年", contact: "19988888888"}, {name: "飞翔的北极熊", info: "奇思妙想提供者", contact: "19945674567"}, {name: "滑稽的大礼帽", info: "阳光开朗大男孩", contact: "19922227777"}],
                total: 6,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "6",
                destination: "青海",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募完成",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                customTags: ["骑行", "美食", "音乐"],
                publisher: {name: "青鸟", info: "阳光开朗女大学生", contact: "19912341234"},
                members: [{name: "葡萄真好吃", info: "铁血E人", contact: "19922223333"}, {name: "故事大王", info: "这区域的交友达人", contact: "12366666666"}],
                applicants: [{name: "谋杀咖啡", info: "冒牌文艺青年", contact: "19988888888"}, {name: "飞翔的北极熊", info: "奇思妙想提供者", contact: "19945674567"}, {name: "滑稽的大礼帽", info: "阳光开朗大男孩", contact: "19922227777"}],
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            }]

//接口部分
/*
// 实际使用时需筛选出发布者为当前用户且小队状态为“招募中”的小队
axios
.get(
    "http://8.130.25.70:5555/api/Users/SelectTeam?id=843526A2B7784E73B28E73C797A2C81C&status=2"
)
.then((res) => {
    console.log(res.data);
    myRecruitingList.value = res.data;
});
// 实际使用时需筛选出发布者为当前用户且小队状态为“招募完成”的小队
axios
.get(
    "http://8.130.25.70:5555/api/Users/SelectTeam?id=843526A2B7784E73B28E73C797A2C81C&status=3"
)
.then((res) => {
    console.log(res.data);
    myRecruitedList.value = res.data;
});*/
</script>

<style>
.divider {
color: #4d4d4d;
letter-spacing: 5px;
}
.no-teams-message {
text-align: center;
margin: 20px 0;
font-size: 18px;
color: #999;
}
</style>
