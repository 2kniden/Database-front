<template>
    <div>
        <h1>让我们来测试一下地图吧</h1>
        <div class="part1">
            <el-button @click="getTest()">分割一下</el-button>
            <el-button @click="getBaiduMap()">调用百度地图</el-button> 
        </div>
    </div>
</template>


<script setup>
import axios from "axios";
import { ref } from "vue"
const testpageNum = ref(2);
const testpageSize = ref(6);
const keyword = ref("keyword");

function getTests() {
    console.log('hello world');
}

</script>

<style scoped>

</style>