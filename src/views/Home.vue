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

    <!--加载整个展示页面背景图-->
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
      <div class="change-photo">
        <img class="left-change-photo" src="../assets/home/left-change.png" @click="moveCircleLeft"/>
        <img class="right-change-photo" src="../assets/home/right-change.png" @click="moveCircleRight"/>
      </div>

    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import { reactive } from 'vue';

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
      })
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
  },
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
}
.up-background{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

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
  top: 40%;
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
</style>
