<template>
    <div class="background">
        <div class="head"></div>
        <Header></Header>
        <TeamNav />
        <div class="team-content">
            <!-- 分割线：招募中的小队 -->
            <el-divider class="divider">招募中的小队</el-divider>
            <div v-for="(item, index) in myRecruitingList" :key="index" class="card-list">
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
                            <div class="tag">{{ tag }}</div>
                        </div>
                        <div class="num">
                            <div class="num-img"></div>
                            <div class="num-font">{{ item.members.length + 1 }}/{{ item.total }}</div>
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
                        <el-button class="card-button" type="primary" size="large" color="#8097FD" plain>查看详情</el-button>
                    </div>
                </el-card>
            </div>
            <div class="clearfloat"></div>

            <!-- 分割线：招募完成的小队 -->
            <el-divider class="divider">招募完成的小队</el-divider>
            <div v-for="(item, index) in myRecruitedList" :key="index" class="card-list">
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
                            <div class="tag">{{ tag }}</div>
                        </div>
                        <div class="num">
                            <div class="num-img"></div>
                            <div class="num-font">{{ item.members.length + 1 }}/{{ item.total }}</div>
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
                        <el-button class="card-button" type="primary" size="large" color="#8097FD" plain>查看详情</el-button>
                    </div>
                </el-card>
            </div>
            <div class="clearfloat"></div>
        </div>
        <div class="clearfloat"></div>
    </div>
</template>

<script setup>
import Header from "@/components/Header";
import TeamNav from "@/components/TeamNav";
import { ref } from "vue";
import { useRouter } from "vue-router";

// 测试数据，招募中的小队，实际使用时需筛选出发布者为用户且小队状态为招募中的小队
const myRecruitingList = ref([
    {
        // 小队标识符
        team_id: "1",
        title: "八月中旬青海自驾旅行，寻找2-3个女生",
        detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
        // 这里暂时用string类型表示状态，实际使用需要根据status标识显示相应文字并修改背景颜色
        status: "招募中",
        tags: ["自驾", "限女生", "休闲"],
        // 这里只显示了用户名称，实际传递时需要用户id和头像信息
        publisher: "青鸟",
        // 成员中不包含发布者
        members: ["葡萄真好吃", "故事大王"],
        // 人数上限
        total: 5
        // 现人数通过members数组长度加一计算
    },
    {
        team_id: "2",
        title: "八月中旬川西自驾旅行",
        detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
        status: "招募中",
        tags: ["限女生", "休闲"],
        publisher: "青鸟",
        members: ["葡萄真好吃", "故事大王", "彼得潘"],
        total: 6
    },
    {
        team_id: "3",
        title: "八月中旬新疆自驾旅行，寻找2-3个女生",
        detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
        status: "招募中",
        tags: ["自驾", "限女生", "休闲", "穷游"],
        publisher: "青鸟",
        members: ["葡萄真好吃", "故事大王"],
        total: 5
    }
])

// 测试数据，招募完成的小队，实际使用时需筛选出发布者为用户且小队状态为招募完成的小队
const myRecruitedList = ref([
    {
        // 小队标识符
        team_id: "4",
        title: "八月中旬青海自驾旅行，寻找2-3个女生",
        detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
        // 这里暂时用string类型表示状态，实际使用需要根据status标识显示相应文字并修改背景颜色
        status: "招募完成",
        tags: ["自驾", "限女生", "休闲"],
        // 这里只显示了用户名称，实际传递时需要用户id和头像信息
        publisher: "青鸟",
        // 成员中不包含发布者
        members: ["葡萄真好吃", "故事大王"],
        // 人数上限
        total: 5
        // 现人数通过members数组长度加一计算
    },
    {
        team_id: "5",
        title: "八月中旬川西自驾旅行",
        detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
        status: "招募完成",
        tags: ["限女生", "休闲"],
        publisher: "青鸟",
        members: ["葡萄真好吃", "故事大王", "彼得潘"],
        total: 6
    },
    {
        team_id: "6",
        title: "八月中旬新疆自驾旅行，寻找2-3个女生",
        detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
        status: "招募完成",
        tags: ["自驾", "限女生", "休闲", "穷游"],
        publisher: "青鸟",
        members: ["葡萄真好吃", "故事大王"],
        total: 5
    }
])
</script>

<style>
.divider {
    color: #4D4D4D;
    letter-spacing: 5px;
}
</style>