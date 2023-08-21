
<template>
  <!-- 头部展示图部分 -->
  <div class="bigback">


    <div class="front">
      <!-- 这里稍微有点问题先 -->
      <Header></Header>
      <img class="imghead" src="../assets/travel.png" alt="一张美丽的海景图片">

      <div class="attractionsearch">
        <Search></Search>
      </div>
      <div class="imgtitle">TRAVEL</div>
      <div class="location">
        选择你所在的城市
        <img src="../assets/location.svg" alt="location icon" class="imgicon" @click="choosemap">
        上海
        <!-- 这里需要设立自己来选择定位的逻辑，这里可以用谷歌的逻辑去写 -->
      </div>
    </div>
    <div class="smallback">


      <!-- 热门景点部分 -->
      <div class="middle">
        <StartTitle title="热门景点" entitle="Famous Attraction"></StartTitle>
        <!-- 热门景点缩略图 -->
        <div class="rec">
          <RecView v-for="item in recommendpiclist" :key="item.id" :picsrc="item.picsrc" :title="item.title"
            @click="ToDetail()"></RecView>
        </div>

      </div>

      <!-- 高分推荐部分 -->
      <div class="bottom">
        <StartTitle title="高分推荐" entitle="Highly recommended"></StartTitle>
        <!-- 高分推荐缩略图 -->
        <div class="rank">
          <div class="container">
            <RankView v-for="item in highranklist" :key="item.id" :picsrc="item.picsrc" :title="item.title"
              :score="item.score" :dec="item.dec"></RankView>
          </div>
          <div class="endline">
            -- 搜索查看更多精彩 --
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import RecView from '@/components/Attraction/recview.vue'
import RankView from '@/components/Attraction/highrankview.vue'
import Search from '@/components/Attraction/search.vue'
import StartTitle from '@/components/Attraction/smallfunc/startline.vue'
import Header from '@/components/Header.vue'
export default {
  data() {
    return {
      // 热门景点缩略图列表（先自己写列表）
      recommendpiclist: [{
        id: 1,
        picsrc: require('../assets/attractions/recommendpic/disney.png'),
        title: '迪士尼',
      }, {
        id: 2,
        picsrc: require('../assets/attractions/recommendpic/happyland.png'),
        title: '横沙岛',
      }, {
        id: 3,
        picsrc: require('../assets/attractions/recommendpic/hengsha.png'),
        title: '欢乐谷',
      }, {
        id: 4,
        picsrc: require('../assets/attractions/recommendpic/waitan.png'),
        title: '外滩',
      },],

      // 高分推荐列表
      highranklist: [{
        id: 1,
        title: '景点名称景点名称景点名称',
        picsrc: require('../assets/attractions/highrank/1.jpg'),
        score: '4.9',
        dec: '上海市浦东新区川沙新镇黄赵路310号',
      }, {
        id: 2,
        title: '景点名称景点名称景点名称',
        picsrc: require('../assets/attractions/highrank/2.jpg'),
        score: '4.9',
        dec: '上海市浦东新区川沙新镇黄赵路310号',
      }, {
        id: 3,
        title: '景点名称景点名称景点名称',
        picsrc: require('../assets/attractions/highrank/3.jpg'),
        score: '4.9',
        dec: '上海市浦东新区川沙新镇黄赵路310号',
      }, {
        id: 4,
        title: '景点名称景点名称景点名称',
        picsrc: require('../assets/attractions/highrank/4.jpg'),
        score: '4.9',
        dec: '上海市浦东新区川沙新镇黄赵路310号',
      }, {
        id: 5,
        title: '景点名称景点名称景点名称',
        picsrc: require('../assets/attractions/highrank/5.jpg'),
        score: '4.9',
        dec: '上海市浦东新区川沙新镇黄赵路310号',
      }, {
        id: 6,
        title: '景点名称景点名称景点名称',
        picsrc: require('../assets/attractions/highrank/6.jpg'),
        score: '4.9',
        dec: '上海市浦东新区川沙新镇黄赵路310号',
      },],
      // 地图展示相关数据
      

    }
  },

  methods: {

    ToDetail() {
      this.$router.push('/attraction-detail');
    },
    choosemap(){
      
    }
    
  },
  components: {
    // MyMap,
    RecView,
    RankView,
    StartTitle,
    Search,
    Header,

  }
}


</script>

<style>
.bigback {
  background-color: #F1F3FF;
}

.smallback {
  width: 90%;
  margin: 0 auto;
  background-color: #fff;
}

.front {
  position: relative;
}

.imghead {
  width: 100%;
  height: 600px;
}

.imgtitle {
  position: absolute;
  /* 设置为绝对定位，让它悬浮在背景图片之上 */
  top: 50%;
  /* 将文字的顶部定位到父容器的中间 */
  left: 50%;
  /* 将文字的左边定位到父容器的中间 */
  transform: translate(-50%, -50%);
  /* 使用transform属性将文字向左和向上移动其自身宽度和高度的一半，使其处于准确的中心位置 */
  letter-spacing: 6px;
  padding: 10px;
  /* 可选：如果添加了背景颜色，可以调整内边距以适应文本样式 */
  font-size: 90px;
  font-weight: bold;
  color: #fff;
}

.attractionsearch {
  position: absolute;
  /* 设置为绝对定位，让它悬浮在背景图片之上 */
  top: 8%;
  /* 将文字的顶部定位到父容器的中间 */
  right: 0%;
  /* 将文字的左边定位到父容器的中间 */
  transform: translate(-50%, -50%);
  /* 使用transform属性将文字向左和向上移动其自身宽度和高度的一半，使其处于准确的中心位置 */
  letter-spacing: 2px;
  padding: 10px;
  /* 可选：如果添加了背景颜色，可以调整内边距以适应文本样式 */
  font-weight: bold;
  font-size: 20px;
  color: #fff;
}

.location {
  position: absolute;
  /* 设置为绝对定位，让它悬浮在背景图片之上 */
  bottom: 5%;
  /* 将文字的顶部定位到父容器的中间 */
  left: 15%;
  /* 将文字的左边定位到父容器的中间 */
  transform: translate(-50%, -50%);
  /* 使用transform属性将文字向左和向上移动其自身宽度和高度的一半，使其处于准确的中心位置 */
  letter-spacing: 2px;
  padding: 10px;
  /* 可选：如果添加了背景颜色，可以调整内边距以适应文本样式 */
  font-weight: 100;
  color: #fff;
}

.imgicon {
  width: 25px;
  height: 30px;
  transform: translate(0, 25%);
}

/* 热门景点缩略图排版 */
.rec {
  display: flex;
  flex-direction: flex;
  justify-content: center;
  margin: 0 10px;
}


/* 高分景点缩略图排版 */
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.endline {
  font-size: 14px;
  color: #999999;
}
</style>
