<template>
  <div class="background">

    <!--训练上传弹窗-->
    <div class="video-form">
      <Transition name="bounce">
        <div class="video-box" v-if="isShow">
          <div class="video-close-btn" @click="isShow=false">
            ×
          </div>
          <!--视频播放器-->
          <vue3VideoPlay
              style="top: 50px"
              v-bind="options"
              @play="onPlay"
              @pause="onPause"
              @timeupdate="onTimeupdate"
              @canplay="onCanplay" />
        </div>
      </Transition>

      <Transition name="fadeInOut">
        <div class="post-background" v-if="isShow"></div>
      </Transition>
    </div>

    <!--加载整个上部页面展示页面背景图-->
    <div class="up-background">
      <Header></Header>

      <!--中间部分的场景绘制-->
      <div class="middle-content">
        <!--中间的左侧部分-->
        <div class="middle-left-content">
          <!--标题-->
          <div class="title">在这里遇见&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>属于你的浪漫旅途</div><!--中间加入了空格和回车来调整文字位置-->
          <!--用来变化的小圈-->
          <div class="circles-container">
            <div
                v-for="(circle, index) in circles"
                :key="index"
                class="circle"
                :class="{ 'active': index === currentIndex }"
            ></div>
          </div>
        </div>

        <!--中间的右侧部分-->
        <div class="middle-right-content">
          <!--视频板-->
          <div class="video-borad">
            <!--上方描述-->
            <div class="story-content">在世界范围找寻内心自我的<br>安心之处</div>

            <!--观看视频部分-->
            <div class="video" @click.stop="isShow=true">
              <img class="video-icon" src="../assets/home/start.png"/>
              <div class="video-text">观看视频</div>
            </div>

          </div>

        </div>

      </div>

      <!--首页下部内容-->
      <div class="down-content">
        <!--变换图片-->
        <div class="change-photo">
          <img class="left-change-photo" src="../assets/home/left-change.png" @click="moveCircleLeft"/>
          <img class="right-change-photo" src="../assets/home/right-change.png" @click="moveCircleRight"/>
        </div>
        <!--登陆注册按钮-->
        <div class="login-register" @click="changeToLogin">登录/注册</div>
      </div>

    </div>

    <div class="detail-page">
      <!-- 底下的曲线部分 -->
      <img class="curve-line" src="../assets/home/curveLine.png"/>

      <!--中间的内容-->
      <div class="about-us" ref="aboutUs" :class="{hide:true,enter:showAboutUs}">关于我们</div>
      <div class="page-detail" ref="pageDetail" :class="{hide:true,enter:showPageDetail}">专为年轻人打造的旅游资源一体化平台，让<br>你的旅行变得简单而幸福。<br>关注我们，获得第一手旅游讯息。</div>
      <div class="provide" ref="Provide" :class="{hide:true,enter:showProvide}">我们能够为您提供什么？</div>

      <!--景点-->
      <img class="content-image" src="../assets/home/tour.png" ref="contentImage1" :class="{hide:true,enter:showContentImage1}"/>
      <div class="content-title" ref="contentTitle1" :class="{hide:true,enter:showContentTitle1}">旅途中无论在哪里<br>都有亮丽如画的风景</div>
      <div class="content-detail" ref="contentDetail1" :class="{hide:true,enter:showContentDetail1}">在这里，你可以拥有独特的旅行体验，感受不一样的旅程，享受真正的自由，自由探索想去的美景。</div>
      <div class="jump-button" @click="changePage('景点')" ref="jumpButton1" :class="{hide:true,enter:showJumpButton1}">
        <div class="jump-button-text" ref="jumpButtonText1" :class="{hide:true,enter:showJumpButtonText1}">立&ensp;即<br><br>查&ensp;询</div>
      </div>

      <!--他人日志-->
      <img class="content-image" src="../assets/home/otherDesign.png" style="margin-top: 2180px;margin-left: 100px;" ref="contentImage2" :class="{hide:true,enter:showContentImage2}"/>
      <div class="content-title" style="margin-top: 2050px;margin-left: 290px;" ref="contentTitle2" :class="{hide:true,enter:showContentTitle2}">详实有效的他人旅游计划<br>可在线搜索</div>
      <div class="content-detail" style="margin-top: 2350px;margin-left: 500px;" ref="contentDetail2" :class="{hide:true,enter:showContentDetail2}">旅行带你走出安逸之乡，教会你以一种全新的方式感受世界万物，让你的记忆被奇妙的经历充满。</div>
      <div class="jump-button" style="margin-top: 2350px;margin-left: 290px;" @click="changePage('他人日志')" ref="jumpButton2" :class="{hide:true,enter:showJumpButton2}">
        <div class="jump-button-text" ref="jumpButtonText2" :class="{hide:true,enter:showJumpButtonText2}">立&ensp;即<br><br>查&ensp;询</div>
      </div>

      <!--个人日志-->
      <img class="content-image" src="../assets/home/journal.png" style="margin-top: 3120px;margin-left: -570px;" ref="contentImage3" :class="{hide:true,enter:showContentImage3}"/>
      <div class="content-title" style="margin-top: 3220px;width: 600px;" ref="contentTitle3" :class="{hide:true,enter:showContentTitle3}">当回忆成为宝贵的宝藏<br>个人日志是打开珍藏之门的钥匙</div>
      <div class="content-detail" style="margin-top: 3420px;" ref="contentDetail3" :class="{hide:true,enter:showContentDetail3}">记录生活，留下情感，探索自我，体验成长。让每一天都有故事，让每一个瞬间都有意义。用个人日志，让你的回忆永不褪色。开始记录，开始珍藏。</div>
      <div class="jump-button" style="margin-top: 3420px;" @click="changePage('个人日志')" ref="jumpButton3" :class="{hide:true,enter:showJumpButton3}">
        <div class="jump-button-text" ref="jumpButtonText3" :class="{hide:true,enter:showJumpButtonText3}">立&ensp;即<br><br>查&ensp;询</div>
      </div>

      <!--小队-->
      <img class="content-image" src="../assets/home/team.png" style="margin-top: 4100px;margin-left: 100px;" ref="contentImage4" :class="{hide:true,enter:showContentImage4}"/>
      <div class="content-title" style="margin-top: 4300px;margin-left: 100px;" ref="contentTitle4" :class="{hide:true,enter:showContentTitle4}">公开透明的旅游小队召集<br>寻求你的志同道合旅客</div>
      <div class="content-detail" style="margin-top: 4500px;margin-left: 100px;" ref="contentDetail4" :class="{hide:true,enter:showContentDetail4}">一个人的旅行难免孤独，茫茫宇宙中去寻找与你心跳共频的人是多么浪漫，携手走向未知的浪漫。</div>
      <div class="jump-button" style="margin-top: 4500px;margin-left: 450px;" @click="changePage('小队')" ref="jumpButton4" :class="{hide:true,enter:showJumpButton4}">
        <div class="jump-button-text" ref="jumpButtonText4" :class="{hide:true,enter:showJumpButtonText4}">立&ensp;即<br><br>查&ensp;询</div>
      </div>

      <!--最下部的地图-->
      <div ref="refChart" class="map"></div>
    </div>

  </div>

</template>

<script>
import Header from "@/components/Header";
import { reactive } from 'vue';
import echarts from "echarts";
import "echarts-gl";
import world from "../plugins/world";

export default {
  name:"Home",
  components:{
    Header
  },
  data() {
    return {
      circles: [0, 1, 2,3], // 四个空心小圈
      currentIndex: 0, // 当前实心小圈的索引
      isShow:false,// 起初不展示视频播放栏
      options : reactive({
        width: '1200px', //播放器高度
        height: '750px', //播放器高度
        color: "#2f90b2", //主题色
        muted: false, //静音
        webFullScreen: false,
        speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
        autoPlay: false, //自动播放
        loop: false, //循环播放
        mirror: false, //镜像画面
        lightOff: false,  //关灯模式
        volume: 0.3, //默认音量大小
        control: true, //是否显示控制器
        title: '土耳其热气球', //视频名称
        src: require("../assets/home/土耳其热气球.mp4"), //视频源
        poster: '', //封面
      }),
      // 地球必需图片
      baseTexture: require("../assets/home/baseTexture.jpg"),
      heightTexture: require("../assets/home/heightTexture.jpg"),

      //下部图片依次显现
      currentScroll:0,
      showAboutUs:false,
      showPageDetail:false,
      showProvide:false,
      //四个部分
      showContentImage1:false,
      showContentTitle1:false,
      showContentDetail1:false,
      showJumpButton1:false,
      showJumpButtonText1:false,

      showContentImage2:false,
      showContentTitle2:false,
      showContentDetail2:false,
      showJumpButton2:false,
      showJumpButtonText2:false,

      showContentImage3:false,
      showContentTitle3:false,
      showContentDetail3:false,
      showJumpButton3:false,
      showJumpButtonText3:false,

      showContentImage4:false,
      showContentTitle4:false,
      showContentDetail4:false,
      showJumpButton4:false,
      showJumpButtonText4:false,
    };
  },
  methods:{
    moveCircleLeft() {
      // 将实心小圈索引左移一个位置
      this.currentIndex = (this.currentIndex - 1 + this.circles.length) % this.circles.length;
    },
    moveCircleRight() {
      // 将实心小圈索引右移一个位置
      this.currentIndex = (this.currentIndex + 1) % this.circles.length;
    },
    onPlay(ev){
      console.log('播放')
    },
    onPause(ev){
      console.log(ev, '暂停')
    },
    onTimeupdate(ev){
      console.log(ev, '时间更新')
    },
    onCanplay(ev){
      console.log(ev, '可以播放')
    },
    changeToLogin(){
      this.$router.push("/login");
    },
    changePage(name){
      if(name==='景点'){
        this.$router.push("/Attraction");
      }
      else if(name==='他人日志'){
        this.$router.push("/Journal/JournalPlaza");
      }
      else if(name==='个人日志'){
        this.$router.push("/Journal/MyJournal");
      }
      else if(name==='小队'){
        this.$router.push("/Team");
      }
    },
    handleScroll(){
      this.currentScroll = window.pageYOffset //表示当前滚动的位置

      if (this.currentScroll >= this.$refs.aboutUs.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showAboutUs = true;
      }
      if (this.currentScroll >= this.$refs.pageDetail.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showPageDetail = true;
      }
      if (this.currentScroll >= this.$refs.Provide.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showProvide = true;
      }

      //四个部分
      if (this.currentScroll >= this.$refs.contentImage1.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showContentImage1 = true;
      }
      if (this.currentScroll >= this.$refs.contentTitle1.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showContentTitle1 = true;
      }
      if (this.currentScroll >= this.$refs.contentDetail1.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showContentDetail1 = true;
      }
      if (this.currentScroll >= this.$refs.jumpButton1.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showJumpButton1 = true;
      }
      if (this.currentScroll >= this.$refs.jumpButtonText1.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showJumpButtonText1 = true;
      }

      if (this.currentScroll >= this.$refs.contentImage2.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showContentImage2 = true;
      }
      if (this.currentScroll >= this.$refs.contentTitle2.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showContentTitle2 = true;
      }
      if (this.currentScroll >= this.$refs.contentDetail2.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showContentDetail2 = true;
      }
      if (this.currentScroll >= this.$refs.jumpButton2.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showJumpButton2 = true;
      }
      if (this.currentScroll >= this.$refs.jumpButtonText2.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showJumpButtonText2= true;
      }

      if (this.currentScroll >= this.$refs.contentImage3.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showContentImage3 = true;
      }
      if (this.currentScroll >= this.$refs.contentTitle3.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showContentTitle3 = true;
      }
      if (this.currentScroll >= this.$refs.contentDetail3.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showContentDetail3 = true;
      }
      if (this.currentScroll >= this.$refs.jumpButton3.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showJumpButton3 = true;
      }
      if (this.currentScroll >= this.$refs.jumpButtonText3.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showJumpButtonText3 = true;
      }

      if (this.currentScroll >= this.$refs.contentImage4.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showContentImage4 = true;
      }
      if (this.currentScroll >= this.$refs.contentTitle4.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showContentTitle4 = true;
      }
      if (this.currentScroll >= this.$refs.contentDetail4.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showContentDetail4 = true;
      }
      if (this.currentScroll >= this.$refs.jumpButton4.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showJumpButton4 = true;
      }
      if (this.currentScroll >= this.$refs.jumpButtonText4.offsetTop - 100) { //当前滚动位置到达的时候，显示div（100作为调整用）
        this.showJumpButtonText4 = true;
      }
    },
    init() {
      var myChart = echarts.init(this.$refs.refChart);
      /*
    图中相关城市经纬度,根据你的需求添加数据
    关于国家的经纬度，可以用首都的经纬度或者其他城市的经纬度
    */
      var geoCoordMap = {
        上海: [121.47, 31.23],
        广州: [113.5107, 23.2196],
        重庆: [107.7539, 30.1904],
        芬兰: [24.909912, 60.169095],
        美国: [-100.696295, 33.679979],
        日本: [139.710164, 35.706962],
        韩国: [126.979208, 37.53875],
        瑞士: [7.445147, 46.956241],
        东南亚: [117.53244, 5.300343],
        澳大利亚: [135.193845, -25.304039],
        德国: [13.402393, 52.518569],
        英国: [-0.126608, 51.208425],
        加拿大: [-102.646409, 59.994255],
      };

      /*
        记录下起点城市和终点城市的名称，以及权重
        数组第一位为终点城市，数组第二位为起点城市，以及该城市的权重，就是图上圆圈的大小
     */

      var CQData = [[{ name: "重庆" }, { name: "英国", value: 70 }]];

      var GZData = [[{ name: "广州" }, { name: "日本", value: 30 }]];

      var NNData = [
        [{ name: "上海" }, { name: "加拿大", value: 80 }],
        [{ name: "上海" }, { name: "美国", value: 100 }],
        [{ name: "上海" }, { name: "澳大利亚", value: 95 }],
        [{ name: "上海" }, { name: "瑞士", value: 50 }],
      ];

      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = geoCoordMap[dataItem[1].name];
          var toCoord = geoCoordMap[dataItem[0].name];
          if (fromCoord && toCoord) {
            res.push([fromCoord, toCoord]);
          }
        }
        return res;
      };

      var series = []; // 3D飞线
      var dser = []; // 2D散点坐标
      [
        ["重庆", CQData],
        ["广州", GZData],
        ["上海", NNData],
      ].forEach(function (item) {
        dser.push(
            {
              type: "effectScatter",
              coordinateSystem: "geo",
              zlevel: 3,
              rippleEffect: {
                brushType: "stroke",
              },
              label: {
                fontSize: 24,
                show: true,
                position: "right",
                formatter: "{b}",
              },
              itemStyle: {
                normal: {
                  color: "#f5f802",
                },
              },
              data: item[1].map(function (dataItem) {
                return {
                  name: dataItem[1].name,
                  value: geoCoordMap[dataItem[1].name],
                  symbolSize: dataItem[1].value / 4,
                };
              }),
            },
            {
              type: "effectScatter",
              coordinateSystem: "geo",
              zlevel: 3,
              rippleEffect: {
                brushType: "stroke",
              },
              label: {
                normal: {
                  show: true,
                  position: "left",
                  fontSize: 18,
                  formatter: "{b}",
                },
              },
              itemStyle: {
                normal: {
                  color: "#ff0000",
                },
              },
              data: [
                {
                  name: item[0],
                  value: geoCoordMap[item[0]],
                  symbolSize: parseInt(Math.random() * 20 + 10),
                  label: {
                    normal: {
                      position: "right",
                    },
                  },
                },
              ],
            }
        );
        series.push({
          type: "lines3D",
          effect: {
            show: true,
            period: 3, //速度
            trailLength: 0.1, //尾部阴影
          },
          lineStyle: {
            //航线的视图效果
            color: "#9ae5fc",
            width: 1,
            opacity: 0.6,
          },
          data: convertData(item[1]), // 特效的起始、终点位置，一个二维数组，相当于coords: convertData(item[1])
        });
      });

      myChart.setOption({
        backgroundColor: "rgba(3,28,72,0.3)",
        title: {
          show: true,
        },
        geo: {
          type: "map",
          map: world,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          boundingCoords: [
            [-180, 90],
            [180, -90],
          ],
          zoom: 0,
          roam: false,
          itemStyle: {
            borderColor: "#000d2d",
            normal: {
              areaColor: "#2455ad",
              borderColor: "#000c2d",
            },
            emphasis: {
              areaColor: "#357cf8",
            },
          },
          label: {
            fontSize: 24,
          },
        },
        // series: dser,
      });
      var option = {
        backgroundColor: "rgba(0,0,0,0)", //canvas的背景颜色
        globe: {
          baseTexture: this.baseTexture,
          heightTexture: this.heightTexture,
          top: "middle",
          left: "center",
          displacementScale: 0,
          environment: "none",
          shading: "color",
          viewControl: {
            distance: 240,
            autoRotate: true,
          },
        },
        series: series,
      };

      myChart.setOption(option);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll,true);
    this.init();
  }
}
</script>

<style>
*
{
  margin: 0;
  padding: 0;
  border: 0;
}
.background{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: visible;
  margin-right: calc(100% - 100vw);
  padding-right: 17px;
}
.up-background{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  background-image: url("../assets/home/up-background.png");
  background-size: cover;
}
/* 中部的内容 */
.middle-content{
  position: relative;
  display: flex;
  width: 1530px;
  height: 280px;
  margin-top: 330px;
  margin-left: 60px;
}
.middle-left-content{
  position: relative;
  display: flex;
  flex-direction: column;
  width: 810px;
  height: 100%;
}
.title{
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 211px;

  color: rgba(255, 255, 255, 0.97);
  font-family: STHupo;
  font-size: 96px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.circles-container{
  position: relative;
  display: flex;
  align-items: center;
  width: 142px;
  height: 22px;
  margin-top: 51px;
  margin-left: 55px;
}
.circle {
  width: 18px;
  height: 18px;
  border: 1px solid #FFFFFF;
  border-radius: 50%;
  margin-left: 15px;
}
.active {
  background-color: #FFFFFF; /* 设置实心小圈的背景颜色 */
}
.middle-right-content{
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 720px;
  height: 100%;
}
.video-borad{
  position: relative;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 200px;
  margin-top: 50px;
}
.story-content{
  position: relative;
  display: flex;
  text-align: start;
  width: 100%;
  height: 90px;

  color: #FFFFFF;
  font-family: MiSans;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.video{
  position: relative;
  display: flex;
  width: 210px;
  height: 80px;
  margin-top: 25px;

  align-items: center;
}
.video-icon{
  position: relative;
  display: flex;
  width: 76px;
  height: 76px;
}
.video-text{
  position: relative;
  display: flex;
  width: max-content;
  height: 30px;
  margin-left: 25px;

  color: #FFF;
  font-family: MiSans;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
/* 下部的内容 */
.down-content{
  position: relative;
  display: flex;
  width: 1580px;
  height: 180px;
}
.change-photo{
  position: relative;
  display: flex;
  width: 170px;
  height: 60px;
  margin-top: 130px;
  margin-left: 120px;
}
.left-change-photo{
  position: relative;
  display: flex;
  width: 50px;
  height: 50px;
}
.right-change-photo{
  position: relative;
  display: flex;
  width: 50px;
  height: 50px;
  margin-left: 50px;
}
.login-register{
  position: relative;
  display: flex;
  width: 350px;
  height: 100px;
  margin-top: 80px;
  margin-left: 930px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background: #D0BAFF;

  color: #FFF;
  font-family: MiSans;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
/* 视频播放 */
.post-background {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
}
.video-form {
  z-index: 1;
  position: fixed;
  top: 45%;
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.video-box {
  display: flex;
  position: absolute;
  height: 800px;
  width: 1200px;
  padding: 20px;
  border-radius: 10px;
  z-index: 5;
  margin-bottom: 30px;
  background-color: #000000;
}
.video-close-btn {
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 30px;
  cursor: pointer;
  color: #fff;
  z-index: 999;
}
/* 进行打开视频播放栏的动画 */
.bounce-enter-active {
  animation: bounce-in 0.5s ease-in-out;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse ease-in-out;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

.fadeInOut-enter {
  opacity: 0;
  transform: translateY(-20px);
}

.fadeInOut-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fadeInOut-leave-active,
.fadeInOut-enter-active {
  transition: all 0.2s;
}

.fadeInOut-downUp-enter {
  opacity: 0;
  transform: translateY(-2px);
}

.fadeInOut-downUp-leave-to {
  opacity: 0;
  transform: translateY(-2px);
}

.fadeInOut-downUp-leave-active,
.fadeInOut-downUp-enter-active {
  transition: all 0.2s;
}

/* 下半部分包含曲线的部分 */
.detail-page{
  width:100%;
  height: 6480px;
  position: absolute;
  margin-top: 100vh;

  background: linear-gradient(180deg, #2B4FC4 0%, rgba(239, 240, 246, 0.45) 100%);
  /*margin-right: calc(100% - 100vw);*/
  /*padding-right: 17px;*/
}
.curve-line{
  position: absolute;
  height: 5400px;
  width: 1200px;
  margin-left: -600px;
  z-index: 1;
}
/* 地图样式 */
.map{
  position: absolute;
  width:1000px;
  height: 1000px;
  margin-top: 5600px;
  margin-left: 350px;
}

/* 下部逐渐显现的div */
.about-us{
  position: absolute;
  width: max-content;
  height: 75px;
  margin-left: 880px;
  margin-top: 230px;

  color: #FFF;
  text-align: center;
  font-family: STHupo;
  font-size: 52px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.page-detail{
  position: absolute;
  width: 1100px;
  height: 200px;
  margin-left: 430px;
  margin-top: 350px;

  color: #FFF;
  text-align: center;
  font-family: STHupo;
  font-size: 56px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  opacity: 0;
  transform: translateY(10%);
}
.provide{
  position: absolute;
  width: max-content;
  height: 50px;
  margin-left: 290px;
  margin-top: 1020px;

  color: #5E5E5E;
  text-align: center;
  font-family: STHupo;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  opacity: 0;
  transform: translateY(10%);
}
.content-image{
  position: absolute;
  width: 615px;
  height: 700px;
  margin-left: -570px;
  margin-top: 1150px;

  opacity: 0;
  transform: translateY(10%);
}
.content-title{
  position: absolute;
  width: 570px;
  height: 100px;
  margin-left: 1050px;
  margin-top: 1300px;

  color: #5E5E5E;
  text-align: center;
  font-family: STHupo;
  font-size: 42px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.content-detail{
  position: absolute;
  width: 270px;
  height: 330px;
  margin-left: 1050px;
  margin-top: 1500px;

  color: #000;
  font-family: MiSans;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

/* 跳转按钮 */
.jump-button{
  position: absolute;
  width: 180px;
  height: 180px;
  margin-left: 1400px;
  margin-top: 1500px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  background: rgba(137, 126, 255, 0.69);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);

  color: #FFF;
  font-family: STHupo;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.jump-button-text{
  position: relative;
  width: 160px;
  height: 160px;
  margin-left: 10px;
  margin-top: 20px;
}
.enter{
  opacity: 1 !important;
  transform: translateY(0%) !important;
  transition: all 2s ease;
}
.hide{
  opacity: 0;
  transform: translateY(10%);
}
</style>
