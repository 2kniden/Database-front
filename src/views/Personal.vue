<template>

  <!--这里是导航栏-->
  <Header></Header>

  <!--这里是页面的下半部分-->
  <div class="background">
      <div class="left_choose">
        <div class="left_choose_change">
            <div class="choose_content" @click="chooseinone">
                <img class="choose_content_icon" src="../assets/personal/selfhome.png">
                <div class="choose_content_text">
                    个人中心
                </div>
            </div>
            <div class="choose_content">
                <img class="choose_content_icon" src="../assets/personal/selfinfo.png">
                <div class="choose_content_text">
                    用户信息
                </div>
            </div>
            <div class="choose_content">
                <img class="choose_content_icon" src="../assets/personal/selflike.png">
                <div class="choose_content_text">
                    收藏夹
                </div>
            </div>
            <div class="choose_content">
                <img class="choose_content_icon" src="../assets/personal/selfsetup.png">
                <div class="choose_content_text">
                    设置
                </div>
            </div>
        </div>
        <div class="writeframe">
            <div class="writeimg">
                <img class="200px" src="../assets/personal/writepassage.png">
            </div>
            <div class="writesth">
                <img class="writeicon" src="../assets/personal/writeicon.png">
                <div class="writecontent">
                    添加日志
                </div>
            </div>
        </div>
    </div>
      <div class="rightpart">
          <div class="welcome">
              <div class="welcome_left">
                  <div class="welcomeback">
                      <div class="welcomecontent">
                          Hi,欢迎回来
                      </div>
                      <div class="welcomesb">
                          {{sbname}}
                      </div>
                      <div class="welcome_right">
                          <img class="welimg" src="../assets/personal/welimg.png">
                      </div>
                  </div>
                  <div class="folandfans">
                      <img class="fol" src="../assets/personal/follow.png">
                      <div class="fcontent">
                          <div class="fconts">
                              关注数
                          </div>
                          <div class="fconts" style="margin-top: 6px">
                              238
                          </div>
                      </div>
                      <img class="fans" src="../assets/personal/fans.png">
                      <div class="fcontent">
                          <div class="fconts">
                              粉丝数
                          </div>
                          <div class="fconts" style="margin-top: 6px">
                              262
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="myrecord">

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
          sbname:"账户1234",
          vip_grade:1,
          contents:[
              {id:0,name:"个人主页"},
              {id:1,name:"用户信息"},
              {id:2,name:"收藏夹"},
              {id:3,name:"设置"},
          ],
          chooseId:0,
          focus_people:238,
          fan_people:262,
      }
  },
  methods:{
      chooseinone() {
          // 处理选项点击事件，切换选项的激活状态

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
    height: auto;

    background-color: #F1F3FF;
}

.left_choose{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 227px;
    height: 834px;
    margin-top: 80px;
}

.choosein{
    position: absolute;
    width: 227px;
    height: 86px;
    flex-shrink: 0;
    border-radius: 20px;
    background: #FFF;
    backdrop-filter: blur(2px);
}

.left_choose_change{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 384px;
    margin-top: 23px;
    margin-left: 25px;
}

.choose_content{
    position: relative;
    display: flex;
    width: 100%;
    height: 86px;
    border-radius: 20px;
    margin-top: 10px;
    background-color: #F1F3FF;
    justify-content: flex-start;
    align-items: center;

    color: #8097FD;
    font-family: MiSans;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.choose_content_icon{
    position: relative;
    display: flex;
    width:40px;
    height: 40px;
    margin-left: 23px;
}

.choose_content_text{
    position: relative;
    display: flex;
    width:max-content;
    height: 30px;
    margin-left: 37px;

    color: #8097FD;
    font-family: MiSans;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.writeframe{
    width: 227px;
    height: 268px;
    flex-shrink: 0;
    margin-top: 128px;
}

.writesth{
    width: 227px;
    height: 68px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 20px;
    background: #D9DFFD;
    margin-left: 30px;
}

.writeimg{
    position: relative;
    display: flex;
    width: 200px;
    height: 200px;
    margin-left: 40px;
}

.writeicon{
    position: relative;
    display: flex;
    width: 35px;
    height: 35px;
    margin-left: 48px;
}

.writecontent{
    position: relative;
    display: flex;
    width:max-content;
    height: 26px;
    margin-left: 10px;

    color: #FFF;
    font-family: MiSans;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.rightpart{
    position: relative;
    width:max-content;
    height: max-content;
    overflow-y: auto;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
}

.welcome{
    position: relative;
    display: flex;
    flex-direction: row;
    width: max-content;
    height: 585px;
    margin-left: 22px;
    margin-top: 150px;
}

.welcome_left{
    position: relative;
    display: flex;
    flex-direction: column;
    width:max-content;
    height: 355px;
    border-radius: 40px;
    background: #D9DFFD;
    margin-top: 50px;
}

.welcomeback{
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width:max-content;
    height: 50px;
    margin-top: 60px;
    margin-left: 69px;
}

.welcomecontent{
    position: relative;
    display: flex;
    width: 194px;
    height: 41px;

    color: #000;
    font-family: MiSans;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.welcomesb{
    position: relative;
    display: flex;
    width: 166px;
    height: 50px;
    margin-left: 20px;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
    background: #8097FD;

    color: #FFF;
    font-family: MiSans;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.folandfans{
    position: relative;
    display: flex;
    flex-direction: row;
    width: 322px;
    height: 57px;
    align-items: center;
    gap: 38px;
    margin-top: 96px;
    margin-left: 69px;
}

.fcontent{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 54px;
    height: 57px;
}

.fconts{
    position: relative;
    color: #888;
    font-family: MiSans;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.welcome_right{
    position: relative;
    width: 850px;
    height: 585px;
    margin-left: 50px;
}

.welimg{
    position: relative;
    width: 761px;
    height: 521px;
    margin-top: 130px;
}

.myrecord{
    position: relative;
    width: 1528px;
    height: 798px;
}

</style>
