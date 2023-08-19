<template>
    <!-- “我的日志”背景 -->
    <div class="jmDiaplayBG">
        <div>
            <p class="jmtest">
                这里展示我的日志
            </p>
        </div>

        <div>
            <router-link to="/Journal/JournalDetails">
             <div>
                <p>前往日志详情</p>
            </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default{
    name: "MyJournal"
}
</script>

<style>
.jmtest {
    position: relative;
}
</style>