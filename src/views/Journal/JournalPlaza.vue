<template>
    <div class="journal-plaza-bg">
      <!-- 搜索 -->
      <div class="line">

        <el-button
        round="true" color="#8097FD"
        native-type="submit" >搜索</el-button>
      </div>
  
      <!-- 热门 -->
      <div class="line">
        <!-- <div class="flex justify-space-between mb-4 flex-wrap gap-4">
            <el-button
            v-for="button in buttons"
            :key="button.text"
            :type="button.type"
            text
            >{{ button.text }}</el-button>
        </div> -->
      </div>
      
      <!-- 日志展示第一行 -->
      <div class="line clearfix">
        <div class="card">
          <p>card1</p>
        </div>
        <div class="card">
          <p>card2</p>
        </div>
        <div class="card">
          <p>card3</p>
        </div>
        <div class="card">
          <p>card4</p>
        </div>
      </div>
      
      <!-- 日志展示第二行 -->
      <div class="line clearfix">
        <div class="card">
          <p>card1</p>
        </div>
        <div class="card">
          <p>card2</p>
        </div>
        <div class="card">
          <p>card3</p>
        </div>
        <div class="card">
          <p>card4</p>
        </div>
      </div>
      
      <!-- 翻页 -->
    </div>
</template>
  
<script>
export default {
    name:"JournalPlaza"
   
  }
//     const buttons:{[index:string]:any} = [
//     { type: '', text: 'plain' },
//     { type: 'primary', text: 'primary' },
//     { type: 'success', text: 'success' },
//     { type: 'info', text: 'info' },
//     { type: 'warning', text: 'warning' },
//     { type: 'danger', text: 'danger' },
// ] as const

 
  </script>
  
  <style scoped>
  /* 清除浮动 */
  .clearfix::before,.clearfix::after{
      content:"";
      display: block;
  }
  
  .clearfix::after{
      clear:both;
  }
  
  .journal-plaza-bg {
    border-radius: 20px;
    background-color: #FFFFFF;
    opacity: 0.5;
    width:auto;
    height:auto;
  }

  .card {
    float:left;
    background-color: pink;
    width:200px;
    height:170px;
    margin-left: 20px;
    margin-top: 15px;
    border-radius: 20px;
  }
  
  </style>