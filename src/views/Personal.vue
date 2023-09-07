<template>

  <!--这里是导航栏-->
  <Header></Header>

  <!--这里是页面的下半部分-->
  <div class="background" >
    <div class="left_choose" :style="{height:leftContentHeight+'px'}">
      <div class="left_choose_change" :style="{height:navBarHeight+'px'}">
        <div class="big_content" :style="chooseChangeStyle('个人中心')" @click="setActive('个人中心')">
          <div class="choose_content" :style="chooseChangeStyle('个人中心')" @click="setActive('个人中心')">
            <img class="choose_content_icon" src="../assets/personal/selfhome.png">
            <div class="choose_content_text">
              个人中心
            </div>
          </div>
        </div>
        <div class="big_content" :style="chooseChangeStyle('用户信息')" @click="setActive('用户信息')">
          <div class="choose_content" :style="chooseChangeStyle('用户信息')" @click="setActive('用户信息')">
            <img class="choose_content_icon" src="../assets/personal/selfinfo.png">
            <div class="choose_content_text">
              用户信息
            </div>
          </div>
        </div>
        <div class="big_content" :style="chooseChangeStyle('收藏夹')" @click="setActive('收藏夹')">
          <div class="choose_content" :style="chooseOnlyChangeColor('收藏夹')" @click="setActive('收藏夹')">
            <img class="choose_content_icon" src="../assets/personal/selflike.png">
            <div class="choose_content_text">
              收藏夹
            </div>
          </div>
          <div class="big_content_son" :style="choose_fav_style('日志')" @click="setFavSmallActive('日志')" v-if="activeChoose==='收藏夹'">
            <img class="son_cycle" src="../assets/personal/white_cycle.png" v-if="favActiveChoose === '日志'"/>
            <img class="son_cycle" src="../assets/personal/purple_cycle.png" v-if="favActiveChoose !== '日志'"/>
            <div class="son_text">日志</div>
          </div>
          <div class="big_content_son" :style="choose_fav_style('小队')" @click="setFavSmallActive('小队')" v-if="activeChoose==='收藏夹'">
            <img class="son_cycle" src="../assets/personal/white_cycle.png" v-if="favActiveChoose === '小队'"/>
            <img class="son_cycle" src="../assets/personal/purple_cycle.png" v-if="favActiveChoose !== '小队'"/>
            <div class="son_text">小队</div>
          </div>
        </div>
        <div class="big_content" :style="chooseChangeStyle('设置')" @click="setActive('设置')">
          <div class="choose_content" :style="chooseOnlyChangeColor('设置')" @click="setActive('设置')">
            <img class="choose_content_icon" src="../assets/personal/selfsetup.png">
            <div class="choose_content_text">
              设置
            </div>
          </div>
          <div class="big_content_son" :style="choose_set_style('账号')" @click="setSetSmallActive('账号')" v-if="activeChoose==='设置'">
            <img class="son_cycle" src="../assets/personal/white_cycle.png" v-if="setActiveChoose === '账号'"/>
            <img class="son_cycle" src="../assets/personal/purple_cycle.png" v-if="setActiveChoose !== '账号'"/>
            <div class="son_text">账号</div>
          </div>
          <div class="big_content_son" :style="choose_set_style('隐私')" @click="setSetSmallActive('隐私')" v-if="activeChoose==='设置'">
            <img class="son_cycle" src="../assets/personal/white_cycle.png" v-if="setActiveChoose === '隐私'"/>
            <img class="son_cycle" src="../assets/personal/purple_cycle.png" v-if="setActiveChoose !== '隐私'"/>
            <div class="son_text">隐私</div>
          </div>
          <div class="big_content_son" :style="choose_set_style('登录')" @click="setSetSmallActive('登录')" v-if="activeChoose==='设置'">
            <img class="son_cycle" src="../assets/personal/white_cycle.png" v-if="setActiveChoose === '登录'"/>
            <img class="son_cycle" src="../assets/personal/purple_cycle.png" v-if="setActiveChoose !== '登录'"/>
            <div class="son_text">登录</div>
          </div>
        </div>
      </div>
      <div class="writeframe" :style="{marginTop:leftDownMargintop+'px'}">
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
    <div class="rightpart-personalpage" v-if="activeChoose==='个人中心'">
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
        <div class="myrecord_title">
          我的日志
        </div>
        <div class="display-box">
          <div class="page" v-for="pageIndex in totalMyPostPages" :key="pageIndex" v-show="currentMyPostPage === pageIndex">
            <div class="row" v-for="rowIndex in 2" :key="rowIndex">
              <div class="box" v-for="boxIndex in 4" :key="boxIndex">
                <div class="box_title">
                  <div class="box_name">
                    上海周末家庭旅行的好去处？浦东这3个小众旅游地我逢人必推！
                  </div>
                  <div class="box_time">
                    2023/07/03
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pagination">
            <button
                class="arrow-btn prev-btn"
                @click="prevPage('个人中心')"
                :disabled="currentMyPostPage === 1"
                v-if="currentMyPostPage !== 1"
            >
              <img class="turnleft" src="../assets/personal/turnleft.png">
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="page-list">
              <button
                  v-for="pageIndex in totalMyPostPages"
                  :key="pageIndex"
                  :class="['page-btn', { 'pag_active': currentMyPostPage === pageIndex }]"
                  @click="changePage('个人中心',pageIndex)"
              >
                {{ pageIndex }}
              </button>
            </div>
            <button
                class="arrow-btn next-btn"
                @click="nextPage('个人中心')"
                :disabled="currentMyPostPage === totalMyPostPages"
                v-if="currentMyPostPage !== totalMyPostPages"
            >
              <img class="turnleft" src="../assets/personal/turnright.png">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--用户信息页面-->
    <div class="rightpart-user" v-if="activeChoose==='用户信息'">
      <div class="user_info">
        <div class="title-info">
          <div class="left-title">
            <div class="infos-title">
              请告诉我们有关于你吧！
            </div>
            <div class="form-container">
              <div v-for="(item, index) in formFields" :key="index" class="form-field">
                <div class="icon-container">
                  <img :src="item.icon" alt="" class="info-icon" />
                </div>
                <div class="content">
                  <label class="icon-title">&ensp;{{ item.title }}&ensp;</label>
                  <input v-model="item.value" type="text" class="input-field" v-if="index!==3"/>
                  <input v-model="selectedDate" type="text" class="input-field" v-if="index===3"/>
                  <img class="calendar-icon" src="../assets/personal/calendar.png" v-if="index===3" @click="isCalendarOpen=!isCalendarOpen">
                </div>
              </div>

              <VueDatePicker v-model="selectedDate" inline auto-apply
                             style="position:absolute;margin-left: 560px;margin-top: 30px;z-index:20;"
                             v-if="isCalendarOpen"
                             :format="dateFormat"
              />

            </div>
          </div>
          <div class="right-info">
            <div class="headpic">
              <div class="head_picture">
                <img class="shushupic" src="../assets/personal/shushu.jpg">
              </div>
              <div class="shushuchange">
                点击更换
              </div>
              <div class="name_box">
                <div class="name_box_1">
                  账户1234
                </div>
                <div class="name_box_2">
                  2年忆龄
                </div>
                <div class="name_box_3">
                  VIP
                </div>
              </div>
            </div>
            <div class="form-container">
              <div v-for="(item, index) in formFields2" :key="index" class="form-field">
                <div class="icon-container">
                  <img :src="item.icon" alt="" class="info-icon" />
                </div>
                <div class="content">
                  <label class="icon-title">&ensp;{{ item.title }}&ensp;</label>
                  <input v-model="item.value" type="text" class="input-field" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="yes-no">
          <div class="ohyes">
            确认更改
          </div>
          <div class="ohno">
            取消更改
          </div>
        </div>
        <img class="code-page" src="../assets/personal/Manprogrammingcode.png">
      </div>
    </div>

    <!--收藏夹日志页面-->
    <div class="rightpart-star" v-if="activeChoose==='收藏夹' && favActiveChoose === '日志'">

      <img class="smallSymbolPhoto" src="../assets/personal/Favrizhi.png"/>

      <div class="up-title">
        <div class="lookatyourstarnote">
          <img class="star-icon" src="../assets/personal/mystarnote.png">
          看看你收藏的日志吧！
        </div>
      </div>
      <div class="display-box" style="margin-top: -200px">
        <div class="page" v-for="pageIndex in totalFavPostPages" :key="pageIndex" v-show="currentFavPostPage === pageIndex">
          <div class="row" v-for="rowIndex in 2" :key="rowIndex">
            <div class="box" v-for="boxIndex in 4" :key="boxIndex">
              <div class="box_title">
                <div class="box_name">
                  上海周末家庭旅行的好去处？浦东这3个小众旅游地我逢人必推！
                </div>
                <div class="box_time">
                  2023/07/03
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pagination">
          <button
              class="arrow-btn prev-btn"
              @click="prevPage('日志')"
              :disabled="currentFavPostPage === 1"
              v-if="currentFavPostPage !== 1"
          >
            <img class="turnleft" src="../assets/personal/turnleft.png">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="page-list">
            <button
                v-for="pageIndex in totalFavPostPages"
                :key="pageIndex"
                :class="['page-btn', { 'pag_active': currentFavPostPage === pageIndex }]"
                @click="changePage('日志',pageIndex)"
            >
              {{ pageIndex }}
            </button>
          </div>
          <button
              class="arrow-btn next-btn"
              @click="nextPage('日志')"
              :disabled="currentFavPostPage === totalFavPostPages"
              v-if="currentFavPostPage !== totalFavPostPages"
          >
            <img class="turnleft" src="../assets/personal/turnright.png">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>

    <!--收藏夹小队页面-->
    <div class="rightpart-star" v-if="activeChoose==='收藏夹' && favActiveChoose === '小队'">

      <img class="smallSymbolPhoto" style="top:-50px;" src="../assets/personal/Favteam.png"/>

      <div class="up-title">
        <div class="lookatyourstarnote">
          <img class="star-icon" src="../assets/personal/mystarteam.png">
          看看你收藏的小队吧！
        </div>
      </div>
      <div class="display-box" style="margin-top: -200px">
        <div class="page" v-for="pageIndex in totalFavTeamPages" :key="pageIndex" v-show="currentFavTeamPage === pageIndex">
          <div class="row" v-for="rowIndex in 2" :key="rowIndex">
            <div class="box" v-for="boxIndex in 4" :key="boxIndex">
              <div class="box_title">
                <div class="box_name">
                  上海周末家庭旅行的好去处？浦东这3个小众旅游地我逢人必推！
                </div>
                <div class="box_time">
                  2023/07/03
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pagination">
          <button
              class="arrow-btn prev-btn"
              @click="prevPage('小队')"
              :disabled="currentFavTeamPage === 1"
              v-if="currentFavTeamPage !== 1"
          >
            <img class="turnleft" src="../assets/personal/turnleft.png">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="page-list">
            <button
                v-for="pageIndex in totalFavTeamPages"
                :key="pageIndex"
                :class="['page-btn', { 'pag_active': currentFavTeamPage === pageIndex }]"
                @click="changePage('小队',pageIndex)"
            >
              {{ pageIndex }}
            </button>
          </div>
          <button
              class="arrow-btn next-btn"
              @click="nextPage('小队')"
              :disabled="currentFavTeamPage === totalFavTeamPages"
              v-if="currentFavTeamPage !== totalFavTeamPages"
          >
            <img class="turnleft" src="../assets/personal/turnright.png">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>

    <!--设置的账号页面-->
    <div class="rightpart-star" v-if="activeChoose==='设置' && setActiveChoose === '账号'">

      <img class="smallSetSymbolPhoto" src="../assets/personal/accountSymbol.png"/>

      <div class="zhanghao_title">
        你的账号与安全设置
      </div>

      <!--手机绑定-->
      <div class="account_page_content">
        <!--内容类型-->
        <div class="account_page_type">手机绑定</div>
        <!--内容展示-->
        <div class="account_page_text">13323</div>
        <img class="account_page_icon" src="../assets/personal/accountRightArrow.png"/>
      </div>

      <!--账号密码-->
      <div class="account_page_content">
        <!--内容类型-->
        <div class="account_page_type">账号密码</div>
        <!--内容展示-->
        <div class="account_page_text">13323</div>
        <img class="account_page_icon" src="../assets/personal/accountRightArrow.png"/>
      </div>

      <!--邮箱绑定-->
      <div class="account_page_content">
        <!--内容类型-->
        <div class="account_page_type">邮箱绑定</div>
        <!--内容展示-->
        <div class="account_page_text">13323</div>
        <img class="account_page_icon" src="../assets/personal/accountRightArrow.png"/>
      </div>

      <!--注销账号-->
      <div class="account_page_content">
        <!--内容类型-->
        <div class="account_page_type">注销账号</div>
        <!--内容展示-->
        <div class="account_page_text"></div>
        <img class="account_page_icon" src="../assets/personal/accountRightArrow.png"/>
      </div>
    </div>

    <!--设置的登录页面-->
    <div class="rightpart-star" v-if="activeChoose==='设置' && setActiveChoose === '登录'">

      <img class="smallSetSymbolPhoto" src="../assets/personal/loginSymbol.png"/>

      <div class="zhanghao_title">
        你的登录与账户设置
      </div>

      <!--切换账号-->
      <div class="account_page_content">
        <!--内容类型icon-->
        <img class="account_page_text_icon" src="../assets/personal/changeAccount.png"/>
        <!--内容类型-->
        <div class="account_page_type" style="margin-left: 20px">切换账号</div>
        <!--内容展示-->
        <div class="account_page_text"></div>
        <img class="account_page_icon" src="../assets/personal/accountRightArrow.png"/>
      </div>

      <!--退出登录-->
      <div class="account_page_content">
        <!--内容类型icon-->
        <img class="account_page_text_icon" src="../assets/personal/exitAccount.png"/>
        <!--内容类型-->
        <div class="account_page_type" style="margin-left: 20px">退出登录</div>
        <!--内容展示-->
        <div class="account_page_text"></div>
        <img class="account_page_icon" src="../assets/personal/accountRightArrow.png"/>
      </div>
      
    </div>

  </div>

</template>

<script>
import Header from "@/components/Header";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import moment from "moment";
import {ref} from "vue";

export default {
  name:"Personal",
  components:{
    Header,
      VueDatePicker,
  },
  data(){
    return{
      sbname:"账户1234",
      vip_grade:1,

      navItems: [
        { label: '个人中心', icon: require('../assets/personal/selfhome.png') },
        { label: '用户信息', icon: require('../assets/personal/selfinfo.png') },
        { label: '收藏夹', icon: require('../assets/personal/selflike.png') },
        { label: '设置', icon: require('../assets/personal/selfsetup.png') }
      ],
      formFields: [
        { icon: require('../assets/personal/nickname.png'), title: '昵称', value: '账户1234' },
        { icon: require('../assets/personal/location.png'), title: '所在地', value: '上海' },
        { icon: require('../assets/personal/sex.png'), title: '性别', value: '女' },
        { icon: require('../assets/personal/birth.png'), title: '生日', value: '2004-01-10' }
      ],
      formFields2: [
        { icon: require('../assets/personal/phone.png'), title: '手机', value: '15279316223' },
        { icon: require('../assets/personal/email.png'), title: '邮箱', value: '827868303@qq.com' },
        { icon: require('../assets/personal/easytalk.png'), title: '简介', value: 'hahahaha' },
      ],

      activeIndex: 0,
      currentMyPostPage: 1,
      totalMyPostPages: 5,
      currentFavPostPage: 1,
      totalFavPostPages: 5,
      currentFavTeamPage: 1,
      totalFavTeamPages: 5,

      activeChoose:"个人中心",
      favActiveChoose:"日志",
      setActiveChoose:"账号",
      leftContentHeight:834, //左边总高度
      navBarHeight:324,      //左边上面导航栏高度
      leftDownMargintop:188, //左边下面距离上面的高度

      isCalendarOpen: false,
      dateFormat: 'yyyy-MM-dd',
      selectedDate:moment(new Date()).format("YYYY-MM-DD"),
      // selectedDate:ref(new Date()),
    };
  },
  methods:{
    choose_fav_style(name){
      let that=this;
      if(that.favActiveChoose === name){
        return{
          color:"#FFFFFF",
          backgroundColor:"#D9DFFD",
        };
      }
    },
    choose_set_style(name){
      let that=this;
      if(that.setActiveChoose === name){
        return{
          color:"#FFFFFF",
          backgroundColor:"#D9DFFD",
        };
      }
    },
    chooseChangeStyle(name){
      let that=this;
      if(that.activeChoose===name&&that.activeChoose==="收藏夹"){
        return{
          height:"223px",
          backgroundColor:"#FFFFFF",
        };
      }
      else if(that.activeChoose===name&&that.activeChoose==="设置"){

        return{
          height: "265px",
          backgroundColor:"#FFFFFF",
        };
      }
      else{
        if(that.activeChoose===name){
          return{
            backgroundColor:"#FFFFFF",
          };
        }
      }
    },
    chooseOnlyChangeColor(name){
      let that=this;
      if(that.activeChoose===name){
        return{
          backgroundColor:"#FFFFFF",
        };
      }
    },
    setActive(name) {
      let that=this;
      that.activeChoose=name;
      if(that.activeChoose==="收藏夹"){
        that.leftContentHeight=971;
        that.navBarHeight=461;
        that.leftDownMargintop=51;
      }
      else if(that.activeChoose==="设置"){
        that.leftContentHeight=1013;
        that.navBarHeight=503;
        that.leftDownMargintop=9;
      }
      else{
        that.leftContentHeight=834;
        that.navBarHeight=324;
        that.leftDownMargintop=188;
      }
      console.log(that.activeChoose)
    },
    setFavSmallActive(name){
      let that = this;
      that.favActiveChoose = name;
    },
    setSetSmallActive(name){
      let that = this;
      that.setActiveChoose = name;
    },
    prevPage(name) {
      if(name === "个人中心"){
        if (this.currentMyPostPage > 1) {
          this.currentMyPostPage--;
        }
      }
      else if(name === "日志"){
        if(this.currentFavPostPage > 1){
          this.currentFavPostPage--;
        }
      }
      else if(name === "小队"){
        if(this.currentFavTeamPage > 1){
          this.currentFavTeamPage--;
        }
      }
    },
    nextPage(name) {
      if(name === "个人中心"){
        if (this.currentMyPostPage < this.totalMyPostPages) {
          this.currentMyPostPage++;
        }
      }
      else if(name === "日志"){
        if(this.currentFavPostPage < this.totalFavPostPages){
          this.currentFavPostPage++;
        }
      }
      else if(name === "小队"){
        if(this.currentFavTeamPage < this.totalFavTeamPages){
          this.currentFavTeamPage++;
        }
      }
    },
    changePage(name,pageIndex) {
      if(name === "个人中心"){
        this.currentMyPostPage = pageIndex;
      }
      else if(name === "日志"){
        this.currentFavPostPage = pageIndex;
      }
      else if(name === "小队"){
        this.currentFavTeamPage = pageIndex;
      }
    },
    openCalendar() {
      this.isCalendarOpen = true;
    },
    closeCalendar() {
      this.isCalendarOpen = false;
    }
  },
}
</script>

<style>
.background{
    position: absolute;
    display: flex;
    width: 100vw;
    height: 100vh;

    background-color: #F1F3FF;
}

.left_choose{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 257px;
    height: 834px;
    //height: 1013px;
    margin-top: 80px;
}

.left_choose_change{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 227px;
    height: 324px;
    margin-top: 23px;
    margin-left: 25px;
}

.choose_content{
    position: relative;
    display: flex;
    width: 100%;
    height: 76px;
    border-radius: 20px;
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

.big_content{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 76px;
    border-radius: 20px;
    margin-top: 5px;
    background-color: #F1F3FF;

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
    position: relative;
    display: flex;
    flex-direction: column;
    width: 227px;
    height: 268px;
    margin-top: 188px;
    margin-left: 30px;
}

.writesth{
    width: 227px;
    height: 68px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 20px;
    background: #D9DFFD;
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

.rightpart-personalpage{
    position: relative;
    width: 1380px;
    height: 760px;
    margin-left: 22px;
    overflow-y: auto;
    margin-top: 80px;
    padding-top: 40px;
    //display: flex;
    flex-direction: column;

    /* 隐藏浏览器默认的滚动条 */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 11 */

    /* 自定义滚动条样式（Webkit浏览器）*/
    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-track {
        background-color: #F1F3FF;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #8097FD;
        border-radius: 8px;
        height: 8px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }
}

.rightpart-user{
    position: relative;
    width: 1380px;
    height: 760px;
    margin-left: 22px;
    margin-top: 80px;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
}

.user_info{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 1300px;
    height: 754px;

    border-radius: 40px;
    background: rgba(255, 255, 255, 0.50);
}

.title-info{
    position: relative;
    display: flex;
    flex-direction: row;
    width: 977px;
    height: 540px;
    margin-left: 111px;
    margin-top: 56px;
}

.yes-no{
    position: relative;
    display: flex;
    flex-direction: row;
    width: 447px;
    height: 74px;
    margin-left: 441px;
    margin-top: 58px;
}

.left-title{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 437px;
    height: 534px;
}

.infos-title{
    width: 356px;
    height: 51px;
    color: #8097FD;
    font-family: MiSans;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.welcome{
    position: relative;
    display: flex;
    width: 1280px;
    height: 585px;
    margin-top: 80px;
}

.welcome_left{
    position: relative;
    display: flex;
    flex-direction: column;
    width:1280px;
    height: 335px;
    border-radius: 40px;
    background: #D9DFFD;
}

.welcomeback{
    position: relative;
    display: flex;
    align-items: center;
    width:1211px;
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
    margin-top: -50px;
}

.welimg{
    position: relative;
    width: 761px;
    height: 521px;
    margin-top: 130px;
}

.myrecord{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 1280px;
    height: 735px;
    margin-top: -150px;
    border-radius: 48px;

    background-color: #FFFFFF;
}

.myrecord_title{
    position: relative;
    display: flex;
    width: 130px;
    height: 39px;
    margin-top: 62px;
    margin-left: 69px;

    color: #8097FD;
    font-family: MiSans;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.display-box{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: max-content;
    height: 629px;
    margin-top: 50px;
    margin-left: 69px;
}

.page{
    position: relative;
    display: flex;
    flex-direction: column;
    width: max-content;
    height: 500px;
}

.row{
    position: relative;
    display: flex;
    flex-direction: row;
    width: max-content;
    height: 240px;
    gap: 60px;
}

.box{
    position: relative;
    display: flex;
    flex-direction: column;
    background-image: url("../assets/personal/record.png");
    width: 240px;
    height: 209px;
    border-radius: 15px;
}

.box_title{
  position: relative;
  display: flex;
  flex-direction: column;
  width: 227px;
  height: 72px;
  margin-top: 130px;
  margin-left: 6px;

  border-radius: 10px;
  background: rgba(221, 221, 221, 0.50);
  backdrop-filter: blur(2px);
  z-index: 3;
}

.box_name{
    position: relative;
    width: 211px;
    height: 38px;
    text-align: left;
    margin-top: 7px;
    margin-left: 8px;

    color: #FFF;
    font-family: MiSans;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 19.2px */
}

.box_time{
    position: relative;
    width: 55px;
    height: 16px;
    text-align: left;
    margin-top: 5px;
    margin-left: 8px;

    color: #FFF;
    font-family: MiSans;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 16px */
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}

.arrow-btn {
    background-color: #f9f9f9;
    border: none;
    padding: 10px;
    border-radius: 50%;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    margin: 0 5px;
}

.arrow-btn:hover {
    background-color: #e0e0e0;
    transform: scale(1.1);
}

.prev-btn {
    margin-right: 10px;
}

.page-list {
    display: flex;
    align-items: center;
}

.page-btn {
    background-color: #f9f9f9;
    border: none;
    padding: 8px 15px;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 0 5px;
}

.page-btn:hover {
    background-color: #e0e0e0;
}

.pag_active {
    background-color: #8097FD;
    color: white;
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    margin-top: 35px;
    padding-right: 30px;
}

.form-field {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.icon-container {
    align-items: center;
    margin-top: 15px;
    margin-right: 45px;
}

.info-icon {
    width: 40px;
    height: 40px;
}

.icon-title {
    position: absolute;
    width: max-content;
    height: 29px;
    //opacity: 0.5;
    margin-left: 35px;
    margin-top: -10px;
    pointer-events: none; /* Prevent the label from interfering with input clicks */
    background-color: #F8F9FF;

    color: #8097FD;
    font-family: MiSans;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    //background: #F8F9FF;

    z-index: 10;
}

.input-field {
    width: 352px;
    height: 66px;
    border-radius: 25px;
    border: 2px solid #8097FD;
    transition: border-color 0.3s; /* 添加过渡效果 */
    padding: 0px 0px 0px 38px;

    background: #F8F9FF;

    color: #8097FD;
    font-family: MiSans;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    z-index: 8;
}

.input-field:focus {
    border-color: #D9DFFD; /* 修改焦点状态时的边框颜色 */
    outline: none; /* 去除默认的聚焦边框 */
}

.calendar-icon{
    position: absolute;
    width: 30px;
    height: 30px;
    margin-top: 20px;
    margin-left: -50px;
}

.right-info{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 474px;
    height: 540px;
    margin-left: 80px;
    margin-top: -6px;
}

.headpic{
    position: relative;
    display: flex;
    flex-direction: row;
    width: 396px;
    height: 167px;
    margin-left: 70px;
    margin-top: 5px;
}

.head_picture{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 159px;
    height: 160px;
}

.shushupic{
    width: 159px;
    height: 159px;
    border-radius: 159px;
    border: 4px solid #D9DFFD;
}

.shushuchange{
    position: relative;
    width: 48px;
    height: 16px;
    margin-left: -34px;
    margin-top: 149px;

    color: #D9D9D9;
    font-family: MiSans;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.name_box{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 164px;
    height: 145px;
    margin-left: 59px;
    margin-top: 5px;
}

.name_box_1{
    position: relative;
    display: flex;
    width: 164px;
    height: 58px;
    align-items: center;
    justify-content: center;

    border-radius: 15px;
    border: 4px solid #D9DFFD;

    color: #8097FD;
    font-family: MiSans;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.name_box_2{
    position: relative;
    display: flex;
    width: 51px;
    height: 19px;
    margin-top: 22px;

    color: #8097FD;
    font-family: MiSans;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.name_box_3{
    position: relative;
    display: flex;
    width: 57px;
    height: 30px;
    margin-top: 25px;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
    background: #FFB84D;

    color: #FFF;
    font-family: MiSans;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.yes-no{
    position: relative;
    display: flex;
    width: 447px;
    height: 74px;
    flex-direction: row;
    align-items: center;
    gap: 145px;

    margin-top: 58px;
    margin-left: 420px;
}

.ohyes{
    position: relative;
    display: flex;
    width: 151px;
    height: 74px;
    align-items: center;
    justify-content: center;

    border-radius: 20px;
    background: #D9DFFD;

    color: #8097FD;
    font-family: MiSans;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.ohno{
    position: relative;
    display: flex;
    width: 151px;
    height: 74px;
    align-items: center;
    justify-content: center;

    border-radius: 20px;
    background: #D9D9D9;

    color: #FFF;
    font-family: MiSans;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.code-page{
    position: relative;
    margin-top: -300px;
    margin-left: 900px;
    width: 480px;
    height: 436px;
}

.rightpart-star{
    position: relative;
    width: 1300px;
    height: 720px;
    margin-left: 22px;
    margin-top: 120px;
    padding-top: 40px;
    display: flex;
    flex-direction: column;

    border-radius: 40px;
    background: rgba(255, 255, 255, 0.50);
}

.up-title{
    position: relative;
    display: flex;
    flex-direction: row;
    width: 902px;
    height: 456px;
    margin-top: -107px;
    margin-left: 84px;
}

.lookatyourstarnote{
    position: relative;
    display: flex;
    flex-direction: row;
    width: 399px;
    height: 51px;
    margin-top: 120px;

    gap: 32px;

    color: #8097FD;
    font-family: MiSans;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%; /* 51.2px */
}

.star-icon{
    width: 45px;
    height: 45px;
}

.choose_content_son{
    position: relative;
    display: flex;
    flex-direction: row;
    width: 106px;
    height: 42px;
    margin-top: 31px;
    margin-left: 87px;

    border-radius: 10px;
    backdrop-filter: blur(2px);

    color: #FFF;
    font-family: MiSans;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.zhanghao_title{
    position: relative;
    display: flex;
    width: 288px;
    height: 43px;
    flex-direction: column;
    justify-content: center;
    margin-top: 30px;
    margin-left: 130px ;

    color: #8097FD;
    font-family: MiSans;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

/* 小选择底下的标志性图片 */
.smallSymbolPhoto{
  position: absolute;
  width: 432px;
  height: 456px;
  left:500px;
  top:-80px;
}
.smallSetSymbolPhoto{
  position: absolute;
  width: 560px;
  height: 456px;
  left:750px;
  top:350px;
}

<<<<<<< Updated upstream
=======
/* 收藏夹子目录 */
.big_content_son{
  position: relative;
  display: flex;
  width: 106px;
  height: 42px;
  margin-left: 80px;
  margin-top: 10px;
  border-radius: 10px;
  background: #FFFFFF;
  backdrop-filter: blur(2px);
  align-items: center;

  color: #000000;
  font-family: MiSans;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.son_cycle{
  position: relative;
  display: flex;
  width: 19px;
  height: 19px;
  margin-left: 10px;
}
.son_text {
  position: relative;
  display: flex;
  width: max-content;
  height: 42px;
  margin-left: 15px;
  margin-top: 12px;
}

/* 设置子目录 */
.account_page_content{
  position: relative;
  display: flex;
  width: 650px;
  height: 110px;
  margin-left: 150px;
  margin-top: 20px;
  align-items: center;
  border-bottom: 3px solid #D9DFFD; /* 下划线样式 */
}
.account_page_type{
  position: relative;
  display: flex;
  width: max-content;
  height: 45px;
  margin-left: 60px;
  margin-top: 20px;

  color: #000;
  text-align: center;
  font-family: MiSans;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.account_page_text{
  position: relative;
  display: flex;
  width: 200px;
  height: 45px;
  margin-left: 130px;
  margin-top: 30px;
  justify-content: flex-end;

  color: #000;
  text-align: center;
  font-family: SimHei;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.account_page_icon{
  position: relative;
  display: flex;
  width: 21px;
  height: 21px;
  margin-left: 30px;
  margin-top: 12px;
}
.account_page_text_icon{
  position: relative;
  display: flex;
  width: 33px;
  height: 33px;
  margin-left: 35px;
  margin-top: 12px;
}

>>>>>>> Stashed changes
</style>
