<template>

  <!--这里是导航栏-->
  <Header></Header>

  <!--这里是页面的下半部分-->
  <div class="background">
    <!--上半部分用户以及下方的切换栏-->
    <div class="up-content">
      <!--上半部分的人物部分-->
      <div class="user-content">

        <!--用户头像-->
        <img class="user-head-image" src="../assets/default_account.svg"/>

        <!--用户姓名-->
        <div class="user-name-text">用户1234</div>

        <!--vip等级-->
        <div class="vip-grade">&ensp;{{"vip"+vip_grade}}&ensp;</div>
      </div>

      <!--上部区的切换栏部分-->
      <div class="borad">
          
      </div>
    </div>
  </div>

</template>

<script>
import Header from "@/components/Header";

export default {
  name:"Personal",
  components:{
    Header,
  },
  data(){
      return{
          vip_grade:1,
      }
  }
}
</script>

<style>
.background{
    position: absolute;
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;

    background-color: #D9D9D9;
}
/* 上部区 */
.up-content{
    position: relative;
    display: flex;
    flex-direction: column;
    top:80px;
    width: 1480px;
    height: 200px;
}
/* 上部用户区 */
.user-content{
    position: relative;
    display: flex;
    width: 100%;
    height: 140px;
    background-color: #E4E8FC;
}
.user-head-image{
    position: relative;
    width: 50px;
    height: 50px;
    margin-left: 40px;
    margin-top: 65px;
}
.user-name-text{
    position: relative;
    display: flex;
    width: max-content;
    height: 30px;
    margin-left: 14px;
    margin-top: 78px;

    color: #4C4C4C;
    font-family: MiSans;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
.vip-grade{
    position: relative;
    display: flex;
    width: max-content;
    height: 15px;
    margin-left: 4px;
    margin-top: 70px;
    border-radius: 6.5px;
    background-color: #8097FD;

    color: #FFF;
    font-family: Microsoft New Tai Lue;
    font-size: 8px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1.98px;
}
/* 上部切换区 */
.borad{
    position: relative;
    display: flex;
    width: 100%;
    height: 60px;
    background-color: #FFFFFF;
}
</style>
