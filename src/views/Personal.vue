<template>

  <!--这里是导航栏-->
  <Header></Header>

  <!--这里是页面的下半部分-->
  <div class="background">
    <div class="main-content">
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
                <!--页面切换-->
                <div
                        class="choose"
                        v-for="item in opt"
                        :key="item.id"
                        :class="{ choose_active: chooseId === item.id }"
                        @click="handleItemClick(item.id)"
                >
                    {{item.name}}
                </div>
                <!--特别人数-->
                <div class="special-user">
                    <!--关注数-->
                    <div class="special-user-board">
                        <img class="special-user-icon" src="../assets/personal/focus-people.png"/>
                        <div class="special-user-text">
                            <div class="amount-text">关注数</div>
                            <div class="amount-num">{{focus_people}}</div>
                        </div>
                    </div>
                    <!--粉丝数-->
                    <div class="special-user-board">
                        <img class="special-user-icon" src="../assets/personal/fan-people.png"/>
                        <div class="special-user-text">
                            <div class="amount-text">粉丝数</div>
                            <div class="amount-num">{{fan_people}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--个人页面-->
        <div class="user-page">

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
          opt:[
              {id:0,name:"主页"},
              {id:1,name:"个人资料"},
              {id:2,name:"收藏夹"},
              {id:3,name:"设置"},
          ],
          chooseId:0,
          focus_people:238,
          fan_people:262,
      }
  },
  methods:{
      handleItemClick(id) {
          // 处理选项点击事件，切换选项的激活状态
          this.chooseId = id;
          // 在这里可以执行其他相应的操作，根据选项的 id 来处理不同的逻辑
      },
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
.main-content{
    position: relative;
    display: flex;
    flex-direction: column;
    top:80px;
    width: 1480px;
    height: 800px;
}
/* 上部区 */
.up-content{
    position: relative;
    display: flex;
    flex-direction: column;
    //top:80px;
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
.choose{
    position: relative;
    display: flex;
    width: 150px;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;

    color: #888;
    font-family: MiSans;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
.choose_active{
    background-color: #8097FD;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05) inset;
    color:#FFFFFF;
}
.special-user{
    position: relative;
    display: flex;
    justify-content: flex-end;
    width: 880px;
    height: 100%;
}
.special-user-board{
    position: relative;
    display: flex;
    width: 115px;
    height: 52px;
    margin-top: 8px;
    margin-right: 45px;
    align-items: center;
}
.special-user-icon{
    position: relative;
    width: 45px;
    height: 45px;
}
.special-user-text{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 62px;
    height: 50px;
    margin-left: 4px;
    justify-content: center;

    color: #888;
    font-family: MiSans;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
.amount-text{
    position: relative;
    width: 100%;
    height: 24px;
}
.amount-num{
    position: relative;
    width: 100%;
    height: 26px;
}
/* 个人资料部分 */
.user-page{
    position: relative;
    display: flex;
    width: 1480px;
    height: 600px;
    margin-top: 50px;

    background-color: #FFFFFF;
}
</style>
