<template>
    <ul>
      <!-- 标准流排列两个choice -->
      <!-- choice1 -->
      <li class="choice clearfix">
        <router-link to="/Journal/JournalPlaza" >
          <div class="nav-icon">
            <img src="https://jiyi-2023.oss-cn-shanghai.aliyuncs.com/Journal/journal-plaza-icon.png">
          </div>
          <div class="nav-text">
            <p>日志广场</p>
          </div>
        </router-link>
      </li>
      <!-- choice2 -->
      <li class="choice clearfix">
        <router-link to="/Journal/MyJournal">
          <div class="nav-icon">
            <img src="https://jiyi-2023.oss-cn-shanghai.aliyuncs.com/Journal/my-journal-icon.png"/>
          </div>
          <div class="nav-text">
            <p>我的日志</p>
           </div>
        </router-link>
      </li>

      <!-- 图片展示 -->
      <li class="clearfix">
        <!-- 这里应该做成图片的动态展示 -->
        <img class="bgImg" :src="src"/>
      <!-- 我的日志 的导航栏背景图片应当可以穿出盒子 -->
      </li>
    </ul>
  </template>
  
  <script>
  import { useRoute } from "vue-router";
  import { watch,ref} from "vue"

  export default {
    name:"JournalNav",
    setup(){
      // 修改导航栏背景图片
      const src = ref("");
      const route = useRoute();
      watch(route,(to)=>{
        if(route.path === "/Journal/JournalPlaza") {
          src.value = "https://jiyi-2023.oss-cn-shanghai.aliyuncs.com/Journal/journal-plaza-bgPNG.png";
        } else if(route.path === "/Journal/MyJournal") {
          src.value = "https://jiyi-2023.oss-cn-shanghai.aliyuncs.com/Journal/my-journal-bgPNG.png";
        } else {
          src.value = "https://jiyi-2023.oss-cn-shanghai.aliyuncs.com/Journal/other-page-bgPNG.png";
        }
      },{immediate:true})

      return {
       src
      }
    }
  }
  </script>
   
  <style scoped>
  /* 清除基本样式，但这个再加上scoped后不起作用了!!! */
  * {
    margin:0;
    padding:0;
  }
  
  ul {
    list-style-type: none;
  }
  
  /* 清除浮动 */
  .clearfix::before,.clearfix::after{
      content:"";
      display: block;
  }
  
  .clearfix::after{
      clear:both;
  }
  
  /* 设置按键样式 */
  li.choice{
    /* background-color:pink; */
    position:relative;
    top:20px;
    height:60px;
    width:150px;
    border-radius: 25px;
  }

  /* 修改路由链接样式 */
  li.choice a {
    text-decoration-style: none;
    font-family: MiSans;
    font-weight: bold;
    color: #8097FD;
  }

  /* 设置鼠标悬浮样式 */
  li.choice:hover {
    background-color: #FFFFFF;
  }

  /* 设置选中样式 */
 /* 为啥这个没有效果呢我说……  -----啊已经解决了*/
 /* 设置了height后就可以显示了，但是形状非常奇怪
 不知道为什么这个不能继承父选择器的样式
 可能是我忘记的某个知识点吧 */
li.choice a.router-link-active.router-link-exact-active {
  background-color: #FFFFFF;
    display: block;
    height: 60px;
    /* z-index: auto; */
    border-radius: 25px;
  }
  
  .nav-icon {
    float:left;
    /* background-color: purple; */
    padding: 5px;
    margin-left: 10px;
    margin-top: 5px;
  }
  
  .nav-text {
    float:left;
    /* background-color: purple; */
    padding: 3px;
    margin-top: 15px;
  }
  
  .bgImg {
    /* position:static 使得top无法奏效 */
    position:relative;
    top:80px;
    /* 为了设置成图片浮动在最上方的效果 */
    z-index: 100;
    /* background-color: black; */
  }
  
  </style>