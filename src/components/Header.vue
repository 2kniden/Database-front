<template>
  <div class="header">
    <img
      :src="require('@/assets/main_logo.svg')"
      class="main_logo"
      alt="迹忆旅游平台"
    />
    <el-tabs
      v-model="activeTab"
      class="choose-tabs"
      @tab-change="handleTabChange"
    >
      <el-tab-pane label="迹忆旅游平台" name="home"></el-tab-pane>
      <el-tab-pane label="景点" name="attractions"></el-tab-pane>
      <el-tab-pane label="日志" name="journals"></el-tab-pane>
      <el-tab-pane label="旅游小队" name="teams"></el-tab-pane>
    </el-tabs>
    <div class="account-tab" @click="goToPersonal">
      <el-avatar
        :size="25"
        :src="require('@/assets/default_account.svg')"
      ></el-avatar>
      <span>账户1234</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //选中的选项卡
      activeTab: "home",
    };
  },
  methods: {
    //切换选项卡
    handleTabChange(name) {
      console.log("选项卡切换到:", name);
      const routeName = name;
      this.$router.push({ name: routeName });
    },
    //进入个人主页
    goToPersonal() {
      console.log("跳转到个人页面");
      this.$router.push({ name: "personal" });
    },
  },
};
</script>

<style>
.header {
  background-color: #ffffff;
  padding: 20px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

.main_logo {
  position: fixed;
  width: 30px;
  height: 30px;
  top: 20px;
  left: 10px;
}

.choose-tabs {
  position: fixed;
  width: 100%;
}

.choose-tabs .el-tabs__item {
  margin-left: 30px;
}

.account-tab {
  position: fixed;
  top: 18px;
  right: 20px;
  height: 30px;
  width: 100px;
  cursor: pointer;
}
</style>
