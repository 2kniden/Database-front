<template>
    <ul>
      <!-- 标准流排列两个choice -->
      <!-- choice1 -->
      <li class="choice clearfix">
        <router-link to="/Journal/JournalPlaza">
          <div class="nav-icon">
            <img src="../assets/journal/journal-plaza-icon.png">
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
            <img src="../assets/journal/my-journal-icon.png">
          </div>
          <div class="nav-text">
            <p>我的日志</p>
           </div>
        </router-link>
      </li>
      <!-- 图片展示 -->
      <li class="clearfix">
        <!-- 这里应该做成图片的动态展示 -->
        <!-- <img class="bgImg" :src="require('../assets/journal/'+page-info)" alt /> -->
  
      <!-- 我的日志 的导航栏背景图片应当可以穿出盒子 -->
      </li>
    </ul>
  </template>
  
  <script>
  export default {
      name:"JournalNav"

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
  
  li.choice{
    background-color:pink;
    position:relative;
    top:20px;
    height:60px;
    width:150px;
    border-radius: 25px;
  }
  
  .nav-icon {
    float:left;
    background-color: purple;
    padding: 5px;
    margin-left: 10px;
    margin-top: 5px;
  }
  
  .nav-text {
    float:left;
    background-color: purple;
    padding: 3px;
    margin-top: 15px;
  }
  
  .bgImg {
    /* position:static 使得top无法奏效 */
    position:relative;
    top:50px;
    background-color: black;
  }
  
  </style>