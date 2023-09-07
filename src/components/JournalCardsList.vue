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
              <div class="c-info">
                <div class="c-info-bg">
                  <span class="title">{{ card.title }}</span>
                  <div class="bottom">
                    <!-- 最多只显示两个标签 -->
                    <span class="tabs-wrapper" v-for="(tab,index2) in card.tabs" :key=index2>
                        <!-- 标签 -->
                        <el-tag
                        v-if="index2 < 2"
                        effect="dark"
                        color="#7990F9"
                        style="border-color:#8097FD"
                        round
                        >
                          #{{tab}}
                        </el-tag>
                    </span>
                    <time class="time">{{ card.postDate }}</time>
                  </div>
                </div>
              </div>
            </el-card>

            <!-- 设置可编辑时组件的样式，当用户具有编辑权限的时候-->
            <template >

            </template>
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
import { ElMessage } from 'element-plus'

// 由父组件告知每页大小
// 有父组件告知是否需要分页
// 这个地方可能是js的写法，如果是ts的话是可以写成对象然后规定数据类型的!!! Like this:
// const pageInationSpec = defineProps({
//   pagesize:Number,
//   ifInation:Boolean
// });

// 考虑到”我的日志“界面展示内容所属者(authorID)和浏览者(readerID)可能不一样，那么拥有的权限就不一样,所以要增加相应的判断
const pageSpec = defineProps(["pageSize","keyword","ifInation","readerID","authorID","displayType"]);

// 定义条目总数，当前页码
let totalNum=ref();
let curPageNum=ref(1);//默认为第一面
//请求url
let requestUrl=ref("/api/Journals/page");
// 展示出的卡片
const cards=reactive([]);

function decideURL(){
  if(pageSpec.authorID !== "" && pageSpec.readerID === ""){
    // "查看‘我的日志’"，但是却不告诉reader_id的名字
    console.log("组件使用不规范,默认显示全部日志");
  }
  else if(pageSpec.authorID !== "" && pageSpec.readerID !== ""){
    requestUrl.value = "/api/Journals/user/page/" + pageSpec.authorID;
  }
  else
    ;
}

// 获得卡片列表
// 无搜索关键词
function getCardLists() {
  axios.get(requestUrl.value+"/"+String(curPageNum.value)+"/"+String(pageSpec.pageSize)+"/"+String(pageSpec.displayType))
    .then(res=>{
      console.log(requestUrl.value+"/"+String(curPageNum.value)+"/"+String(pageSpec.pageSize)+"/"+String(pageSpec.displayType));
      totalNum.value = res.data.totalNum;
      cards.length=0;
      res.data.journalList.forEach(element => {
          const publishTime = new Date(element.publishTime);
          element.postDate = publishTime.getFullYear()+'-'+(publishTime.getMonth()+1)+'-'+publishTime.getDate();
          cards.push(element);
        });
      console.log("res.data.journalList",res.data.journalList);
      console.log("cards",cards);

    },
    err =>{
      console.log("can't get cards info");
    }
  )
}

// 有搜索关键词
function getCardLists_keyword() {
  axios.get(requestUrl.value+"/"+ String(curPageNum.value) + "/" + String(pageSpec.pageSize)+"/"+String(pageSpec.keyword)+"/"+String(pageSpec.displayType))
  .then(res=>{
      console.log(requestUrl.value+"/"+ String(curPageNum.value) + "/" + String(pageSpec.pageSize)+"/"+String(pageSpec.keyword)+"/"+String(pageSpec.displayType));
      totalNum.value = res.data.totalNum;
      cards.length=0;//先清空cards，push的方法会使得cards中的内容在不断累积
      res.data.journalList.forEach(element => {
        // 修改card上的显示时间
        const publishTime = new Date(element.publishTime);
        element.postDate = publishTime.getFullYear()+'-'+publishTime.getMonth()+'-'+publishTime.getDate();
        cards.push(element);
      });
      console.log("res.data.journalList",res.data.journalList);
      console.log("cards",cards);
  },err=>{
    console.log("can't get cards info")
  });
}

// 初始化加载
onBeforeMount(()=>{
  decideURL();
  // 先获取全部的日志
  getCardLists();
})

function handleCurrentPageChange(){
  console.log("监听到页面更新");
  console.log("curPageNum=",curPageNum);//
  // 是否有关键词？
  if(pageSpec.keyword === "全部" || pageSpec.keyword === "") {
    //后面那个是防止因为关键词缺失造成接口调用错误从而导致网页加载崩溃
    getCardLists();
  }
  else{
    console.log("keyword");
    getCardLists_keyword();
  }
}

// 监听keyword的变化;写成一个箭头函数才能真正监听到prop.keyword，但我也没弄懂为啥;写到一起是保证只调用一次接口
watch(()=>[pageSpec.keyword,pageSpec.displayType],([newKey,newType],[oldKey,oldType])=>{
  // 这样可以保证只调用一次接口
  if(newKey !== oldKey) {
    // 说明keyword发生了变化:重置displayType，调用接口
    console.log("监听到keyword变化");
    if(pageSpec.keyword === "全部" || pageSpec.keyword === "") {
      //后面那个是防止因为关键词缺失造成接口调用错误从而导致网页加载崩溃
      getCardLists();
    }
    else{
      getCardLists_keyword();
    }
  }
  else {
    console.log("监听到displayType变化");
    // keyword没发生变化，但仍然进入了这个函数，说明页面发生了变化
    if(pageSpec.keyword === "全部" || pageSpec.keyword === "") {
    //后面那个是防止因为关键词缺失造成接口调用错误从而导致网页加载崩溃
      getCardLists();
    }
    else{
      getCardLists_keyword();
    }
  }

  console.log("pageSpec.keyword=",pageSpec.keyword);
  console.log("pageSpec.displayType=",pageSpec.displayType);
  // console.log("newValue",newValue);
  // console.log("oldValue",oldValue);
  // 此时keyword变化时，displayType一定会改变；反之不然，但一定会调用接口，所以理论上这个监听函数可以不需要
  // // 展开搜索，因此页码从起始页开始计算
  // curPageNum.value=1;
  // // 按照道理来讲由于curPage.value也有一个监听函数，会产生回调，因此无需再在此处调用卡片更新函数
  // if(pageSpec.keyword === "全部" || pageSpec.keyword === "") {
  //   //后面那个是防止因为关键词缺失造成接口调用错误从而导致网页加载崩溃
  //   getCardLists();
  // }
  // else{
  //   getCardLists_keyword();
  // }
})

// watch(()=>pageSpec.displayType,()=>{
//   console.log("监听到displayType变化");
//   console.log("pageSpec.keyword=",pageSpec.keyword);
//   console.log("pageSpec.displayType=",pageSpec.displayType);
//   curPageNum.value=1;
//   if(pageSpec.keyword === "全部" || pageSpec.keyword === "") {
//     //后面那个是防止因为关键词缺失造成接口调用错误从而导致网页加载崩溃
//     getCardLists();
//   }
//   else{
//     getCardLists_keyword();
//   }
// })

// 日志卡片样式的动态绑定
function whenLocked(card) {
  if (card.authorization === 3) {
      return "private-style";
  }
}

// 查看日志详情
const toDetails = useRouter();
function checkDetails(card){
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
  margin-left: 50px;
  margin-top: 40px;
  border-radius: 15px;
  text-align: left;
}

.el-card.is-always-shadow {
  height:180px;
  border-radius: 20px;
  box-shadow: 2px 2px 3px #8097FD;
}

.el-card.is-always-shadow:hover {
  opacity: 1;
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
// 删除标志
.c-delete {
  background-color:rgba(255,255,255,0.7);
  width:30px;
  height:30px;
  border-radius: 5px;
  position: relative;
  z-index:900;
  bottom:180px;
  display: inline-block;
  padding-top:4px;
  padding-left:3px;
}

.private-style {
  opacity: 0.5;
  .c-info {
    bottom:124px;
  }
}

.c-delete:hover {
  box-shadow:1px 1px 5px rgb(100, 74, 248);
}

// 锁定标志
.c-is-locked {
  background-color:rgba(255,255,255,0.7);
  width:30px;
  height:30px;
  border-radius: 5px;
  position: relative;
  z-index:900;
  bottom:180px;
  left:145px;
  display: inline-block;
  padding-top:4px;
  padding-left:3px;
}

// 控制icon的大小
.c-delete .delete-icon,.c-is-locked .locked-icon {
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

// .locked-style {
//   opacity: 0.5;
//   .c-info {
//     bottom: 124px;
//   }
// }

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

span.el-tag.el-tag--dark.is-round {
    margin-right: 2px;
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
  margin-top: 40px;
  margin-left: 100px;
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
