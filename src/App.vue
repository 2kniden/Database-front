<template>
<!--  <div>-->
<!--    <el-container>-->
<!--      <el-header><Header /></el-header>-->
<!--      <el-main><router-view/></el-main>-->
<!--    </el-container>-->
<!--  </div>-->
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
// import Header from './components/Header.vue';

export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  mounted() {
    window.addEventListener("beforeunload", e => {
      window.scroll(0, 100);
    });
  },
  methods: {
    async name() {
      //async  await  是解决异步的一种方案，必须要加，但是原生封装就不用
      // const { data: res } = await this.$http.get("/api");
      // this.data = res;
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
