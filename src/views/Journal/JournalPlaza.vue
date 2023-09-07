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
      <div>
        <div class="hotspot clearfix">
          <el-button class="hot-tag"
          v-for="(spot,index) in spots"
          :key="index"
          v-model="nowChosen"
          :class="chosenSpotStyle(spot)"
          @click="isChosen($event)"
          >{{ spot }}</el-button>
        </div>
        <!-- 展示类型 -->
        <el-select v-model="value" value-key="id" placeholder="列表展示方式"
        @change="changeDisplayType(value)">
          <el-option
            v-for="item in displayOptions"
            :key="item.id"
            :label="item.label"
            :value="item"
          />
        </el-select>
      </div>

      <!-- 日志展示 -->
      <div class="card-display">
        <JournalCardsList
        :pageSize="jppagesize"
        v-model:keyword="jpcurKeyword"
        :ifInation="jptoInation"
        :readerID="jpreaderId"
        :authorID="jpauthorId"
        :displayType="jpdisplayType"></JournalCardsList>
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
const jpreaderId = ref("");
const jpauthorId = ref("")
const jpcurKeyword = ref("");
const jpdisplayType = ref("1");
let nowChosen =ref("全部");

//热点搜索
const spots = ref([
  "全部","上海","武汉","广州","北京","成都","西藏"
]);

// 列表展示方式
// 这里如果使用reactive就会出错……
const value = ref({
  id:"1",
  label:"正常显示"
})
const displayOptions = ref([
  {
    id:"1",
    label:"正常显示",
  },
  {
    id:"2",
    label:"最近发布",
  },
  {
    id:"3",
    label:"最多点赞",
  },
  {
    id:"4",
    label:"最多收藏",
  },
  {
    id:"5",
    label:"最多浏览",
  },
  {
    id:"6",
    label:"只查看公开日志",
  }
]);

//获得搜索节点
// const defaultbtn = ref(null);
// name:"JournalPlaza",
//search
const input = ref('');
function submitSearchText() {
  // 同样是通过url把input.value中的值传到后端去，要注意错误处理
  if (input.value != ''){
    // jpdisplayType.value = 1;
    // 重置选择器
    value.value = {
      id:"1",
      label:"正常显示"
    }
    jpcurKeyword.value = input.value;

    let flag = ref(true);
    spots.value.forEach((e)=>{
      if(e === input.value && flag.value === true) {
        nowChosen.value=e;
        flag.value=false;
      }
      else
        ;
    })
    if(flag.value === true) {
      nowChosen.value = "";
    }

    // console.log("curKeyword=",jpcurKeyword.value);
    // 清空input框
    // input.value ="";
  }
  else{
    console.log("请在搜索框中输入一个值！");
  }
}


function isChosen(e) {
  // 可以直接输出e看看其中的内容！
  // console.log(e);
  // console.log(e.target);
  // console.log(e.target.innerText);
  const chosenTag = ref(e.target.innerText);
  nowChosen.value = chosenTag.value;
  jpcurKeyword.value = chosenTag.value;
  // 重置选择器
  value.value = {
      id:"1",
      label:"正常显示"
  }
  jpdisplayType.value = "1";
  // 清空输入框样式
  input.value='';
  console.log(`你选择了查看${chosenTag.value}的日志!!!!`);
}

// 更改选中框的样式
// 这个地方不能仅仅用获得焦点！！不然在点击分页或其他之后样式就会消失！
// 这样做可以实现样式动态绑定……是因为跟这个dom相关的数据发生了改变，要进行新的渲染，因此实现更新的吗？
function chosenSpotStyle(spot) {
  // console.log(spot);
  if(nowChosen.value === spot) {
    return "spot-is-chosen";
  }
}

function changeDisplayType(value) {
  console.log("value.id=",value.id);
  // 当值发生改变后，就需要把它传递给子组件，以获取相应的结果
  jpdisplayType.value = value.id;
}

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
  width: 1300px;
  height: 720px;
  margin-left: 120px;
  margin-top: 50px;
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

:deep(.el-input__wrapper) {
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
button.el-button.hot-tag.spot-is-chosen {
  background-color: #6d88fe;
  color: white;
  border-radius: 20px;
  outline-style: none;
}
/* button.el-button.hot-tag:focus {
  display:block;
  background-color: #6d88fe;
  color: white;
  border-radius: 20px;
  outline-style: none;
  height:32px;
  width:px;
} */

button.el-button.hot-tag.defaultChosen {
  background-color: #6d88fe;
  color: white;
  border-radius: 20px;
}

.display-type {
    float: right;
    /* padding-bottom: 10px; */
    bottom: 16px;
    position: relative;
}

.el-select {
  left:415px;
  bottom: 13px;
}

.el-select.el-input__wrapper.is-focused {
  border-color: #8097FD;
}


/* 设置卡片显示位置 */
.card-display {
  /* background-color: pink; */
  width:1200px;
  height:550px;
  position:relative;
  margin-left: 40px;
  border-radius: 20px;
}

:deep(.cards-list) {
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

:deep(.pgination-area) {
  /* 这个width就不咋太好 */
  width: 1000px;
}

</style>
