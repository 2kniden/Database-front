<template>
  <div class="search-box">
    <input
        type="text"
        class="search-txt"
        v-model="searchKeyword"
        placeholder="开始你的搜索"
        @keyup.enter="onClickSearch"
    />
    <div class="search-btn" @click="onClickSearch">
      <span class="iconfont icon-search"></span>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "SearchBtn",
  inject: ["reload"], //注入依赖
  data() {
    return {
      searchKeyword: ""
    };
  },

  methods: {
    onClickSearch() {
      let that = this;
      this.$router.push({
        path: "/searchout",
        query: {
          key: that.searchKeyword
        }
      });
      this.reload();
    }
  }
};
</script>
<style>
/* 搜索框 */
.search-box {
  position: relative;

  background-color: #D9D9D920;
  height:30px;
  border-radius: 20px;

  margin-right: 20px !important;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
}

.search-box:hover > .search-txt {
  width: 300px;
  font-size: 16px;
  color: rgb(113, 113, 113);
}

.search-txt {
  border: none;
  background: none;
  outline: none;

  width: 0;

  float: left;
  color: rgb(113, 113, 113, 0);
  font-size: 0px;
  font-family: "SimSun";

  transition: width 0.4s, font-size 0.1s ease-out, color 0.2s;
  transform: translate(20px, 0);

  font-weight: 200;
}

.iconfont {
  position: relative;

  font-family: "SimSun" !important;
  font-size: 20px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.search-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.icon-search {
  position: relative;
  width: 26px;
  height: 26px;
  content: "";
  background: url("../../assets/search/search_logo.png") no-repeat 0 0;
  background-size: cover;
}
</style>
