<template>
    <div class="background">
        <div class="head"></div>
        <Header></Header>
        <TeamNav />
        <div class="detail-content">
            <!-- 第一行：题目+人数 -->
            <div class="card-line">
                <div class="card-title">{{ item.title }}</div>
                <div class="num">
                    <div class="num-img"></div>
                    <div class="num-font">{{ item.members.length + 1 }}/{{ item.total }}</div>
                    <div class="clearfloat"></div>
                </div>
                <div class="clearfloat"></div>
            </div>
            <!-- 第二行：详情 -->
            <div class="card-line">
                <div class="detail">{{ item.detail }}</div>
            </div>
            <!-- 第三行：小队状态 -->
            <div class="card-line">
                <div class="line-name">小队状态</div>
                <div class="status float-left">{{ item.status }}</div>
                <div class="clearfloat"></div>
            </div>
            <!-- 第四行：目的地 -->
            <div class="card-line">
                <div class="line-name">旅行地点</div>
                <div class="float-left">{{ item.destination }}</div>
                <div class="clearfloat"></div>
            </div>
            <!-- 第五行：旅行时间 -->
            <div class="card-line">
                <div class="line-name">旅行时间</div>
                <div class="time float-left">{{ item.time[0] }} 至 {{ item.time[1] }}</div>
                <div class="clearfloat"></div>
            </div>
            <!-- 第六行：小队标签 -->
            <div class="card-line">
                <div class="line-name">小队标签</div>
                <div v-for="(tag, tagIndex) in item.tags" :key="tagIndex">
                    <div class="tag">{{ tag }}</div>
                </div>
                <div class="clearfloat"></div>
            </div>
            <!-- 第七行：小队成员 -->
            <div class="card-line">
                <div class="line-name padding-h-five">小队成员</div>
                <div class="float-left">
                    <div>
                        <div class="float-left padding-h-five">{{ item.publisher }}</div>
                        <div class="publisher">发布者</div>
                        <div class="clearfloat"></div>
                    </div>
                    <div v-for="(member, mbIndex) in item.members" :key="mbIndex">
                        <div class="member">{{ member }}</div>
                    </div>
                </div>
                <div class="clearfloat"></div>
            </div>
            <!-- 第八行：发布日期 -->
            <div class="posttime">
              {{ item.postTime }}
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from "@/components/Header";
import TeamNav from "@/components/TeamNav";
import { useRoute } from "vue-router"

const route = useRoute()
console.log("切换至我的小队详情页")
const item = route.query

</script>

<style></style>