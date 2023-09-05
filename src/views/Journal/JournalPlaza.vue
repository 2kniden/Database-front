<template>
    <div class="journal-plaza-bg">
      <!-- 搜索 -->
      <div class="search clearfix">
        <div class="search-input">
          <el-input
          v-model="input"
          class="w-10 m-2"
          type="text"
          placeholder="快来找找看兴趣的日志吧"
          @keyup.enter="submitSearchText"
        />
        </div>
        
        <div class="search-button">
          <el-button class="searchbtn"
          round native-type="submit" 
          @click="submitSearchText">搜索</el-button>
        </div>
        
      </div>
  
      <!-- 热门 -->
      <div class="hotspot clearfix">
        <el-button class="hot-tag" ref="defaultbtn"
        @click="isChosen($event)"
        >全部</el-button>

        <el-button class="hot-tag" 
        v-for="(spot,index) in spots" 
        :key="index"
        @click="isChosen($event)"
        >{{ spot }}</el-button>
      </div>
      
      <!-- 日志展示 -->
      <div class="card-display">
        <JournalCardsList 
        :pageSize="jppagesize" 
        v-model:keyword="jpcurKeyword" 
        :ifInation="jptoInation" 
        :urlHeader="jpurl"></JournalCardsList>
      </div>      
      <!-- 翻页 -->
    </div>
</template>
  
<script setup>
import { ref,reactive,onMounted } from "vue"
import axios from "axios"
import JournalCardsList from "@/components/JournalCardsList.vue"

// 定义需要传递给JournalCardsList组建的值
const jptoInation = ref(true);
const jppagesize = ref(10);//journalPlaza中一页可以显示10个组件
const jpurl = ref("/api/Journals/page");
let jpcurKeyword = ref("");

//获得搜索节点
const defaultbtn = ref(null);
// name:"JournalPlaza",
//search
const input = ref('');
function submitSearchText() {
  // 同样是通过url把input.value中的值传到后端去，要注意错误处理
  if (input.value != ''){
    jpcurKeyword.value = input.value;
    console.log("curKeyword=",jpcurKeyword.value);
    // 清空input框
    input.value ="";
  }
  else{
    console.log("请在搜索框中输入一个值！");
  }
}

//热点搜索
const spots = ref([
  "上海","武汉","广州","北京","成都","西藏"
]);
function isChosen(e) {
  // 可以直接输出e看看其中的内容！
  // console.log(e);
  // console.log(e.target);
  // console.log(e.target.innerText);
  const chosenTag = ref(e.target.innerText);
  jpcurKeyword.value = chosenTag.value;
  console.log(`你选择了查看${chosenTag.value}的日志!!!!`);
}

// 无关键词时应默认加载全部日志,此处是自动获取焦点以获得相应的样式
onMounted(()=>{
  // 拿到"全部"这个DOM元素
  console.log(defaultbtn.value.ref);
  // 设置选定样式
  defaultbtn.value.ref.focus();
})
  
</script>
  
<style scoped>
/* 待修改:
  按钮被选中的样式不应该只由焦点决定,不然焦点移走的时候就会失去相关的效果 */
/* 清除浮动 */
.clearfix::before,.clearfix::after{
    content:"";
    display: block;
}

.clearfix::after{
    clear:both;
}

/* 设置整体背景 */
.journal-plaza-bg {
  border-radius: 20px;
  /* 如果直接使用opacity，那么文字颜色透明度也会随之改变 */
  background-color: rgba(255,255,255,0.5);
  width:1050px;
  height:545px;
}

/* 设置搜索栏样式 */
.search {
position: relative;
display: flex;
align-items: center;
justify-content: center;
top: 10px;
}

/* 搜索输入框 */
.search-input {
/* width: 100%; */
right: -28px;
position: relative;
}
.el-input.w-10.m-2 {
  float:left;
  width:500px;
}

::v-deep .el-input__wrapper {
  border-radius: 20px;
  box-shadow: 1px 3px 5px #8097FD;
}

/* 搜索按钮 */
.search-button {
  position: relative;
  left: -28px;
}
button.el-button.is-round.searchbtn {
  float:left;
  position:relative;
  width:85px;
  height:32px;
  color: #FFFFFF;
  background-color: #6d88fe;
  box-shadow: 1px 3px 5px #8097FD;
}

button.el-button.is-round.searchbtn:hover {
  opacity: 0.8;
}

/* 设置热点搜索区样式 */
.hotspot {
  position: relative;
  top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button.el-button.hot-tag {
  float:left;
  width:60px;
  height:32px;
  border-style:none;
  color: black;/* 将其中的文字设置为黑色 */
  background-color:rgba(255,255,255,0.5);
  /* background-color: black; */
}

button.el-button.hot-tag:hover {
  color: white;
  background-color: #8097FD;
  border-radius: 20px;
}

/* 按钮选中后的样式;不懂啊,这个咋实现的orz */
button.el-button.hot-tag:focus {
  /* display:block; */
  background-color: #6d88fe;
  color: white;
  border-radius: 20px;
  outline-style: none;
  /* height:32px;
  width:px; */
}

button.el-button.hot-tag.defaultChosen {
  background-color: #6d88fe;
  color: white;
  border-radius: 20px;
}


/* 设置卡片显示位置 */
.card-display {
  /* background-color: pink; */
  width:1030px;
  height:405px;
  position:relative;
  left:30px;
  top: 27px;
  border-radius: 20px;
}

::v-deep .cards-list {
  height: 400px;
}

/* .card-display */
p.test {
  float:left;
  background-color: blue;
  width:200px;
  height:170px;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 20px;
}

::v-deep .pgination-area {
  /* 这个width就不咋太好 */
  width: 1000px;
}

</style>