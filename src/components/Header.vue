<template>
  <div class="header">
    <!--首先绘制左上角的网页名称-->
    <div class="main_logo">
      <img class="main_logo_icon" src="../assets/main_logo.svg"/>
      <div class="main_logo_text">迹忆旅游平台</div>
    </div>

    <!--进行选项的绘制-->
    <div class="nav-menu" :style="menuChangeColor">
      <p class="nav-menu-item" @click="handleTabChange('Attraction')">景点</p>
      <p class="nav-menu-item" @click="handleTabChange('Journal')">日志</p>
      <p class="nav-menu-item" @click="handleTabChange('Team')">旅行小队</p>
    </div>

    <!--进行右侧图形的绘制-->
    <div class="right">
      <SearchBtn></SearchBtn>
      <div class="personal-page">
        <img class="personal-page-headimage" src="../assets/default_account.svg"/>
        <div class="personal-page-text" :style="menuChangeColor" @click="goToPersonal">个人中心</div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBtn from "@/views/Search/SearchBtn";
export default {
  components:{
    SearchBtn,
  },
  data() {
    return {
      //选中的选项卡
      activeTab: "",
    };
  },
  computed:{
    menuChangeColor(){
      //根据全局变量的值确定在哪一个页面，来改变选项的颜色
      if(this.$globalData.navbarActive=='home'){//如果在首页，就是白色
        return{
          color:'#FFFFFF',
        };
      }
      else{//如果在其他页面
        return{
          color:"#4C4C4C",
        };
      }
    }
  },
  methods: {
    //切换选项卡
    handleTabChange(name) {
      console.log("选项卡切换到:", name);
      const routeName = name;
      this.$globalData.navbarActive=routeName;
      this.$router.push("/"+routeName);
    },
    //进入个人主页
    goToPersonal() {
      console.log("跳转到个人页面");
      this.$globalData.navbarActive="personal";
      this.$router.push({ name: "personal" });
    },
  },
  mounted() {

  },
  created() {
    // 在created生命周期钩子中获取全局变量的值并赋给本地变量
    // this.activeTab=this.$globalData.navbarActive;
  }
};
</script>

<style>
.header {
  background-color: transparent;
  /*background-color: #ffffff;*/
  /*padding: 20px;*/
  width: 100vw;
  height: 80px;
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
}

.main_logo{
  position: relative;
  display: flex;
  width: 270px;
  height: 100%;

  background-color: #FFFFFF;/*不管是不是首页，logo的背景色都是白色*/
}

.main_logo_icon{
  position: relative;
  display: flex;
  width: 60px;
  height: 60px;
  margin-top: 12px;
  margin-left: 19px;
}

.main_logo_text{
  position: relative;
  display: flex;
  width: max-content;
  height: 30px;
  margin-left: 8px;
  margin-top: 20px;

  color: #8097FD;
  font-family: Microsoft YaHei;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.nav-menu{
  position: relative;
  display: flex;
  width: 500px;
  height: 100%;
  margin-top: 4px;
  align-items: center;

  color: #FFFFFF;
}

.nav-menu .nav-menu-item{
  position: relative;
  display: flex;
  width: max-content;
  height: 40px;
  margin-left: 120px;

  font-family: MiSans;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

/*右部内容*/
.right{
  position: relative;
  display: flex;
  width: 950px;
  height: 100%;
  margin-top: 15px;
  justify-content: flex-end;
}

.personal-page{
  position: relative;
  display: flex;
  width: 200px;
  height: 50px;
  margin-left: 58px;
}

.personal-page-headimage{
  position: relative;
  display: flex;
  width: 40px;
  height: 40px;
}

.personal-page-text{
  position: relative;
  display: flex;
  width: max-content;
  height: 30px;
  margin-top: 8px;
  margin-left: 10px;

  color: #FFFFFF;
  font-family: MiSans;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

</style>
