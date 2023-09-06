<template>
<div class="background">
    <div class="head"></div>
    <Header></Header>
    <TeamNav />
    <div class="detail-content">
        <!-- 头部：（题目+目的地）+小队状态+加入按钮 -->
        <div class="card-line">
        <!-- 左侧：题目+目的地 -->
        <div style="float: left;">
            <div class="card-line team-title">{{ item.title }}</div>
            <div class="clearfloat"></div>
            <div>
            <div class="destination-img"></div>
            <div style="float: left;" class="team-destination">{{ item.destination }}</div>
            </div>
        </div>
        <!-- 右侧：加入小队 -->
        <!-- <div class="team-button">
            <el-button v-if="item.status === '招募中'" type="primary" size="large" color="#8097FD" plain style="float: right;"
            @click="joinTeam(item)">加入小队</el-button>
            <el-button v-if="item.status === '招募结束'" type="primary" size="large" plain disabled 
            style="float: right; background-color: rgb(242, 245, 255); color: rgb(169, 185, 253); border-color: rgb(192, 203, 254);"
            @click="joinTeam(item)">加入小队</el-button>
        </div> -->
        <!-- 右侧：小队状态 -->
        <div style="float: right">
            <div v-if="item.status === '招募中'" class="team-status" style="background-color: #7db0fd;">{{ item.status }}</div>
            <div v-if="item.status === '招募结束'" class="team-status" style="background-color: #ecb66f;">{{ item.status }}</div>
        </div>
        <div class="clearfloat"></div>
        </div>
        <!-- 身体1：（详情+旅行时间）+小队成员 -->
        <div style="margin-top: 30px;">
            <!-- 左侧：详情+旅行时间 -->
            <div style="float: left; width: 656px;">
                <!-- 详细信息 -->
                <div style="margin-bottom: 16px;">
                    <div style="margin-bottom: 10px;">
                        <div class="detail-img"></div>
                        <div class="detail-title">详细信息</div>
                        <div class="clearfloat"></div>
                    </div>
                    <div class="team-detail">{{ item.detail }}</div>
                </div>
                <el-divider />
                <!-- 旅行时间 -->
                <div style="margin-bottom: 16px;">
                <div style="margin-bottom: 14px;">
                    <div class="time-img"></div>
                    <div class="detail-title">旅行时间</div>
                    <div class="clearfloat"></div>
                </div>
                <el-date-picker
                    v-model="item.traveltime"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD"
                    :disabled="true"
                    style="float: left;"
                />
                <div class="clearfloat"></div>
                </div>
                <el-divider />
            </div>
            <!-- 右侧：小队成员 -->
            <div class="member-card">
                <div style="margin-bottom: 8px;">
                    <div class="mem-img"></div>
                    <div class="detail-title">小队成员</div>
                    <div class="detail-title" style="margin-left: 6px; color: #666666;">({{ item.members.length + 1 }}/{{ item.total }})</div>
                    <!-- 查看全部 -->
                    <el-button text @click="membersDialogVisible = true" style="float: right;">查看全部</el-button>
                    <el-dialog v-model="membersDialogVisible" title="Tips" width="50%" draggable>
                        <template #header>
                            <div class="mem-img"></div>
                            <div class="detail-title">小队成员</div>
                            <div class="detail-title" style="margin-left: 6px; color: #666666;">({{ item.members.length + 1 }}/{{ item.total }})</div>
                        </template>
                        <div>
                            <!-- 发布者 -->
                            <div style="margin: 12px 0 10px 10px; text-align: left; font-weight: bold; color: #808080; font-size: 16px;">小队发布者</div>
                            <el-table :data="publisherList" style="width: 100%">
                                <el-table-column prop="name" label="姓名" width="180" />
                                <el-table-column prop="info" label="自我简介" width="320" />
                                <el-table-column prop="contact" label="联系方式" />
                            </el-table>
                            <!-- 小队成员 -->
                            <div style="margin: 20px 0 10px 10px; text-align: left; font-weight: bold; color: #808080; font-size: 16px;">小队成员</div>
                            <div v-if="item.members && item.members.length > 0">
                                <el-table :data="item.members" style="width: 100%">
                                    <el-table-column prop="name" label="姓名" width="180" />
                                    <el-table-column prop="info" label="自我简介" width="320" />
                                    <el-table-column prop="contact" label="联系方式" />
                                </el-table>
                            </div>
                            <div v-else>
                                该小队暂无成员加入~
                            </div>
                            <!-- 小队申请者（通过flag只有我发布的小队会显示） -->
                            <!-- 小队申请者 -->
                            <div v-if="flag == 1">
                                <!-- 添加距离 -->
                                <div style="margin-top: 25px;"></div>
                                <div class="mem-img"></div>
                                <div class="detail-title">小队申请者</div>
                                <div class="clearfloat"></div>
                                <div style="margin: 20px 0 10px 10px; text-align: left; font-weight: bold; color: #808080; font-size: 16px;">小队申请者（请在编辑小队中通过成员申请）</div>
                                <div v-if="item.applicants && item.applicants.length > 0">
                                    <el-table :data="item.applicants" style="width: 100%">
                                        <el-table-column prop="name" label="姓名" width="180" />
                                        <el-table-column prop="info" label="自我简介" width="320" />
                                        <el-table-column prop="contact" label="联系方式" />
                                    </el-table>
                                </div>
                                <div v-else>
                                    该小队暂无申请者~
                                </div>
                           </div>
                        </div>
                    </el-dialog>
                    <div class="clearfloat"></div>
                </div>
                <div>
                    <!-- 发布者 -->
                    <div>
                        <img class="headImage" :src=" item.publisher.headimage" alt="">
                        <!-- <el-avatar style="float: left;" :icon="UserFilled" /> -->
                        <div class="mem-name">{{ item.publisher.name }}</div>
                        <div class="publisher">发布者</div>
                        <div class="clearfloat"></div>
                    </div>
                    <!-- 小队成员 -->
                    <div v-for="(member, mbIndex) in item.members" :key="mbIndex">
                        <div v-if="mbIndex < 3" style="margin-top: 10px;">
                            <img class="headImage" :src="member.headimage" alt="">
                            <!-- <el-avatar style="float: left;" :icon="UserFilled" /> -->
                            <div class="mem-name">{{ member.name }}</div>
                            <div class="clearfloat"></div>
                        </div>
                    </div>
                    <!-- 小队申请者（通过flag只有我发布的小队会显示） -->
                    <div v-if="flag == 1">
                        <!-- 添加距离 -->
                        <div style="margin-top: 25px;"></div>
                        <div class="mem-img"></div>
                        <div class="detail-title">小队申请者</div>
                        <div class="clearfloat"></div>
                        <div  v-if="item.applicants.length > 0">
                            <div v-for="(applicant, appIndex) in item.applicants" :key="appIndex">
                                <div v-if="appIndex < 2" style="margin-top: 10px;">
                                    <img class="headImage" :src="applicant.headimage" alt="">
                                    <!-- <el-avatar style="float: left;" :icon="UserFilled" /> -->
                                    <div class="mem-name">{{ applicant.name }}</div>
                                    <div class="clearfloat"></div>
                                </div>
                            </div>
                       </div>
                       <div v-else>
                        <div class="none_applicant">该小队暂无申请者~</div>
                       </div>
                    </div>
                    <div class="clearfloat"></div>
                </div>
            </div>
            <div class="clearfloat"></div>
        </div>
        <!-- 身体2：小队标签 -->
        <div>
        <!-- 小队标签 -->
        <div style="margin-bottom: 16px;">
            <div style="margin-bottom: 14px;">
                <div class="tag-img"></div>
                <div class="detail-title">小队标签</div>
                <div class="clearfloat"></div>
            </div>
            <div v-for="(tag, tagIndex) in item.tags" :key="tagIndex">
                <div class="tag-card">
                    <div class="tag-icon">
                        <img v-if="tag === '年轻人'" src="../../assets/team/young.png">
                        <img v-else-if="tag === '限男生'" src="../../assets/team/male.png">
                        <img v-else-if="tag === '限女生'" src="../../assets/team/female.png">
                        <img v-else-if="tag === '自驾'" src="../../assets/team/car.png">
                        <img v-else-if="tag === '报团'" src="../../assets/team/tour.png">
                        <img v-else-if="tag === '奢华'" src="../../assets/team/luxury.png">
                        <img v-else-if="tag === '穷游'" src="../../assets/team/poor.png">
                        <img v-else-if="tag === '休闲'" src="../../assets/team/leisure.png">
                        <img v-else-if="tag === '充实'" src="../../assets/team/tight.png">
                        <img v-else :src="require('../../assets/' + customTagImg[tagIndex % customTagImg.length])">
                    </div>
                    <div class="clearfloat"></div>
                    <div class="team-tag">{{ tag }}</div>
                    <div class="tag-description">
                        <div v-if="tag === '年轻人'">趁青春，多旅行！<br>用一段美好的旅途，一些珍贵的邂逅，点缀我们的青春记忆</div>
                        <div v-else-if="tag === '限男生'">兄弟们，速速集结！<br>驾驶风驰电掣的自由，徜徉于壮丽景色，让我们一起享受旅途</div>
                        <div v-else-if="tag === '限女生'">姐妹们，准备启程！<br>想看美景，吃美食，拍美美的照片？<br>快来加入我们！</div>
                        <div v-else-if="tag === '自驾'">嘀嘀嘀，准备启程！<br>让我们来自驾，感受道路上的自由与探险，欣赏沿途的美丽风光。</div>
                        <div v-else-if="tag === '报团'">自己制定旅行计划太忙太累？没关系，专业旅行团为我们排忧解难<br>只管玩，就对了！</div>
                        <div v-else-if="tag === '奢华'">旅行就是要享受！<br>住豪华酒店，坐舒适交通，享可口美食···<br>我们的旅途尽享奢华</div>
                        <div v-else-if="tag === '穷游'">用有限的预算，体验丰富的旅行！<br>穷游穷的是预算，而不是风景和经历</div>
                        <div v-else-if="tag === '休闲'">赶场式旅行？NO！<br>我们拒绝走马观花，要的就是在旅行的过程中放松身心</div>
                        <div v-else-if="tag === '充实'">时间有限，但想看的风景无限<br>难得的假日，用充实的旅途填充我们的记忆！</div>
                        <div v-else>这也是我们的小队特色<br>心动了？<br>那就赶快加入我们！</div>
                    </div>
                </div>
            </div>
            <!-- 自定义标签 -->
            <div v-for="(customTag, customTagIndex) in item.customTags" :key="customTagIndex">
              <div class="tag-card">
                <div class="tag-icon">
                  <img :src="require('../../assets/' + customTagImg[customTagIndex % customTagImg.length])">
                </div>
                <div class="clearfloat"></div>
                <div class="team-tag">{{ customTag }}</div>
                <div class="tag-description">
                  <div>这也是我们的小队特色<br>心动了？<br>那就赶快加入我们！</div>
                </div>
              </div>
            </div>
            <div class="clearfloat"></div>
            </div>
        </div>
        <!-- 底部：发布日期 -->
        <div class="posttime">
            {{ item.posttime }}
        </div>
    </div>
</div>
</template>

<script setup>
import Header from "@/components/Header";
import TeamNav from "@/components/TeamNav";
import { ref } from 'vue';
import { UserFilled } from '@element-plus/icons-vue';
import { useRoute } from "vue-router"
import {
  ArrowLeft,
} from '@element-plus/icons-vue'

const membersDialogVisible = ref(false)

// 自定义标签的替代图标（随机显示）
const customTagImg = [
  "team/custom-tag-1.png",
  "team/custom-tag-2.png",
  "team/custom-tag-3.png",
  "team/custom-tag-4.png",
  "team/custom-tag-5.png",
]

const route = useRoute()
console.log("切换至我的小队详情页")
// const item = route.query
const item = {
  teamId: route.query.teamId,
  destination: route.query.destination,
  title: route.query.title,
  detail: route.query.detail,
  status: route.query.status,
  tags: route.query.tags,
  customTags: route.query.customTags,
  publisher: JSON.parse(route.query.publisher),
  members: JSON.parse(route.query.members),
  applicants: JSON.parse(route.query.applicants),
  total: route.query.total,
  traveltime: route.query.traveltime,
  posttime: route.query.posttime,
  // media:route.query.media,
}
const flag=route.query.flag;
console.log(item)
console.log(flag)

const publisherList = []
publisherList[0] = item.publisher

</script>

<style>
.none_applicant{
    color: #808080; 
    text-align: left;
    margin-top: 10px; 
}
</style>