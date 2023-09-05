<template>
    <!-- 当搜索条数为零时，给出相应提示 -->
    <div class="placeholder" v-if="totalNum == 0 ">
      <div class="hint">
        <p>啊哦，没有你想要的结果</p>
        <p>换一个关键词试试吧</p>
      </div>
      <div class="hint-img">
        <img src="../assets/journal/journal-have-no-result.png" alt="">
      </div>
    </div>
    <div v-else>
        <div class="cards-list">
        <div v-for="(card,index) in cards" :key="card.journal_id" class="cards">
            <el-card :body-style="{ padding: '0px' }"
            @click="checkDetails(card)"
            :class="whenLocked(card)">
              <div class="c-img">
                <img :src="card.photoUrl" alt="这里是封面图" class="cover-image"/>
              </div>
              <span v-if="card.authorization === 3" class="c-is-locked">
                <img src="../assets/journal/journal_locked.png" class="locked-icon" />
              </span>
              <div class="c-info" >
                <div class="c-info-bg">
                  <span class="title">{{ card.title }}</span>
                  <div class="bottom">
                    <span class="tags-display">#{{ card.journalTag }}</span>
                    <time class="time">{{ card.postDate }}</time>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
      </div>

      <div v-if="pageSpec.ifInation === true" class="pgination-area">
        <el-pagination background layout="prev, pager, next" 
          :total="totalNum" 
          :default-page-size="pageSpec.pageSize"
          v-model:current-page ="curPageNum"
          @update:current-page="handleCurrentPageChange"/>
      </div>
    </div>
    
</template>

<script setup>
import { reactive,ref,onBeforeMount,watch } from "vue"
import axios from "axios"
import { useRouter } from 'vue-router'

// 由父组件告知每页大小
// 有父组件告知是否需要分页
// 这个地方可能是js的写法，如果是ts的话是可以写成对象然后规定数据类型的!!! Like this:
// const pageInationSpec = defineProps({
//   pagesize:Number,
//   ifInation:Boolean
// });

const pageSpec = defineProps(["pageSize","keyword","ifInation","urlHeader"]);

// 定义条目总数，当前页码
let totalNum=ref();
let curPageNum=ref(1);//默认为第一面
const cards=reactive([]);

// 获得卡片列表
// 无搜索关键词
function getCardLists() {
  axios.get(pageSpec.urlHeader+"/"+String(curPageNum.value)+"/"+String(pageSpec.pageSize))
    .then(res=>{
      totalNum.value = res.data.totalNum;
      cards.length=0;
      res.data.journalList.forEach(element => {
          const publishTime = new Date(element.publishTime);
          element.postDate = publishTime.getFullYear()+'-'+publishTime.getMonth()+'-'+publishTime.getDate();
          cards.push(element);
        });
    },
    err =>{
      console.log("can't get cards info");
    }
  )
}

// 有搜索关键词
function getCardLists_keyword() {
  axios.get(pageSpec.urlHeader+"/"+ String(curPageNum.value) + "/" + String(pageSpec.pageSize)+"/"+String(pageSpec.keyword))
  .then(res=>{
      console.log("res=",res);
      totalNum.value = res.data.totalNum;
      cards.length=0;//先清空cards，push的方法会使得cards中的内容在不断累积
      res.data.journalList.forEach(element => {
        // 修改card上的显示时间
        const publishTime = new Date(element.publishTime);
        element.postDate = publishTime.getFullYear()+'-'+publishTime.getMonth()+'-'+publishTime.getDate();
        cards.push(element);
      });
    console.log(cards);
    console.log(totalNum.value);
  })
}

// 初始化加载
onBeforeMount(()=>{
  // 先获取全部的日志
  getCardLists();
})

function handleCurrentPageChange(){
  console.log("监听到页面更新");
  console.log("curPageNum=",curPageNum);//
  // 是否有关键词？
  getCardLists();
}

// 监听keyword的变化;写成一个箭头函数才能真正监听到prop.keyword，但我也没弄懂为啥
watch(()=>pageSpec.keyword,(newValue,oldValue)=>{
  console.log("监听到keyword变化");
  console.log("pageSpec.keyword=",pageSpec.keyword);
  console.log("newValue",newValue);
  console.log("oldValue",oldValue);
  // 展开搜索，因此页码从起始页开始计算
  curPageNum.value=1;
  // 按照道理来讲由于curPage.value也有一个监听函数，会产生回调，因此无需再在此处调用卡片更新函数
  if(pageSpec.keyword === "全部" || pageSpec.keyword === "") { 
    //后面那个是防止因为关键词缺失造成接口调用错误从而导致网页加载崩溃
    getCardLists();
  }
  else{
    getCardLists_keyword();
  }
})

// 日志卡片样式的动态绑定
function whenLocked(card) {
  if (card.authorization === 3) {
    console.log("card.authorization === 3");
    return "locked-style";
  }
}

// 查看日志详情
const toDetails = useRouter(); 
function checkDetails(card){
  console.log("card=",card);
  toDetails.push({
    path:"/Journal/JournalDetails/" + card.journal_id,
    query: card
  });
}

</script>

<style lang="scss" scoped>
// 设置卡片的展示样式
.cards {
  width:180px;
  height:180px;
  float:left;
  margin-right:23px;
  margin-bottom:20px;
  border-radius: 15px;
  text-align: left;
}

.el-card.is-always-shadow {
  height:180px;
  border-radius: 20px;
  box-shadow: 2px 2px 3px #8097FD;
}

.el-card.is-always-shadow:hover {
  box-shadow: none;
  .title{
    text-decoration-line: underline;
  }
}

// 卡片图片展示区
.c-img {
  width:180px;
  height:180px;
}

.c-img img{
  width:100%;
  height:100%;
}

.cover-image {
  width: 100%;
  display: block;
}

.c-is-locked {
  background-color:rgba(255,255,255,0.7);
  width:30px;
  height:30px;
  border-radius: 5px;
  position: relative;
  z-index:900;
  bottom:180px;
  left:148px;
  display: inline-block;
  padding-top:4px;
  padding-left:3px;
}

// 控制icon的大小
.c-is-locked .locked-icon {
  width:25px;
  height:25px;
}

// 标题、时间、标签
.c-info{
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  max-height: 80px;
  z-index: 900;
  position: relative;
  bottom:90px;
  // bottom: 124px;
}

.locked-style {
  opacity: 0.5;
  .c-info {
    bottom: 124px;
  }
}

.c-info-bg{
  width: 140px;
  padding:10px;
  border-radius: 15px;
  background-color: rgba(255,255,255,0.7);
}

.title {
  display:block;//变成块级元素
  font-weight: 500;
  font-size: 12px;
  font-family: MiSans;
  color:#373a49;
  max-height:35px;
}

.tags-display {
  padding:3px;
  font-family: MiSans;
  font-size: 8px;
  background-color: #8097FD;
  border-radius: 15px;
  color:#FFFFFF;
  font-weight: 300;
}
// .bottom {
//   margin-top: 5px;
//   line-height: 12px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// 时间
.time {
  display:block;//变成块级元素
  font-size: 5px;
  color: #0000008a;
  position: relative;
  top:5px;
}


.button {
  padding: 0;
  min-height: auto;
}



/* 分页器样式 */
.pgination-area {
  float:left;
  position:relative;
  width:100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

    /* 细节样式；这么大一长串真的是看着挺丑陋的…… */
    .el-pagination.is-background .btn-next.is-active, .el-pagination.is-background .btn-prev.is-active, ::v-deep.pgination-area .el-pagination.is-background .el-pager li.is-active.number{
        background-color: #8097FD;
    }

    ::v-deep.el-pagination.is-background .btn-next.is-active.is-last, ::v-deep.el-pagination.is-background .btn-prev.is-active.is-first, ::v-deep.el-pagination.is-background .el-pager li:hover{
        background-color: #8097FD;
        color: #FFFFFF;
    }
.hint {
  position: relative;
  top:20px;
}
.hint p{
  margin: 5px 0;
  font-family: MiSans;
  font-weight: 400;
  color: #7582bb;
}
</style>