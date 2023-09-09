
<template>
  <!-- 头部展示图部分 -->
  <div class="bigback">


    <div class="front">
      <Header></Header>
      <img class="imghead" src="../assets/travel.png" alt="一张美丽的海景图片">

      <div class="attractionsearch">
        <Search></Search>
      </div>
      <div class="imgtitle">TRAVEL</div>
      <div class="location">
        选择你所在的城市
        <img src="../assets/location.svg" alt="location icon" class="imgicon" @click="showCascader">
        {{ chosencity }}
        <!-- 遮罩层 -->
        <div class="mask" v-show="showMask">
          <!-- 内容区域，包含 el-cascader -->
          <div class="content">
            <el-cascader size="small" :options="options" v-model="selectedOptions" @change="handleChange"></el-cascader>
            <el-button class="mapbtn" size="mini" round @click="hideCascader">确定</el-button>
          </div>

        </div>


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
            @click="ToDetail(item.id)"></RecView>
        </div>

      </div>

      <!-- 高分推荐部分 -->
      <div class="bottom">
        <StartTitle title="高分推荐" entitle="Highly recommended"></StartTitle>
        <!-- 高分推荐缩略图 -->
        <div class="rank">
          <div class="container">
            <RankView v-for="item in highranklist" :key="item.id" :picsrc="item.picsrc[0]" :title="item.title"
              :score="item.score" :dec="item.position" @click="ToDetail(item.id)"></RankView>
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
import { ElMessage } from 'element-plus';
import axios from 'axios'
// 城市选择器
import { pcTextArr } from "element-china-area-data";

export default {
  mounted() {
    this.initializeData();//默认位置是上海
  },
  data() {
    return {

      // 热门景点缩略图列表
      recommendpiclist: [],
      // 高分推荐列表
      highranklist: [],
      // 城市选择器
      optionsbefore: pcTextArr,
      showMask: false, // 控制遮罩层显示/隐藏
      options: [
        {
          value: '上海市',
          label: '上海市'
        },
        {
          value: '北京市',
          label: '北京市'
        },
        {
          value: '广东省',
          label: '广东省'
        },
        {
          value: '天津市',
          label: '天津市'
        },
        {
          value: '河北省',
          label: '河北省'
        },
        {
          value: '山西省',
          label: '山西省'
        },
        {
          value: '内蒙古自治区',
          label: '内蒙古自治区'
        },
        {
          value: '辽宁省',
          label: '辽宁省'
        },
        {
          value: '吉林省',
          label: '吉林省'
        },
        {
          value: '黑龙江省',
          label: '黑龙江省'
        },

        {
          value: '江苏省',
          label: '江苏省'
        },
        {
          value: '浙江省',
          label: '浙江省'
        },
        {
          value: '安徽省',
          label: '安徽省'
        },
        {
          value: '福建省',
          label: '福建省'
        },
        {
          value: '江西省',
          label: '江西省'
        },
        {
          value: '山东省',
          label: '山东省'
        },
        {
          value: '河南省',
          label: '河南省'
        },
        {
          value: '湖北省',
          label: '湖北省'
        },
        {
          value: '湖南省',
          label: '湖南省'
        },

        {
          value: '广西壮族自治区',
          label: '广西壮族自治区'
        },
        {
          value: '海南省',
          label: '海南省'
        },
        {
          value: '重庆市',
          label: '重庆市'
        },
        {
          value: '四川省',
          label: '四川省'
        },
        {
          value: '贵州省',
          label: '贵州省'
        },
        {
          value: '云南省',
          label: '云南省'
        },
        {
          value: '西藏自治区',
          label: '西藏自治区'
        },
        {
          value: '陕西省',
          label: '陕西省'
        },
        {
          value: '甘肃省',
          label: '甘肃省'
        },
        {
          value: '青海省',
          label: '青海省'
        },
        {
          value: '宁夏回族自治区',
          label: '宁夏回族自治区'
        },
        {
          value: '新疆维吾尔自治区',
          label: '新疆维吾尔自治区'
        }
      ],
      selectedOptions: [],
      chosencity: '上海市',//先按照这个存
    }
  },

  methods: {
    handleChange(value) {
      //value代表每个地方的区域码
      console.log(value);
    },
    ToDetail(val) {
      // 先获取attractionID
      console.log(val);
      this.goToTop();
      // 传参
      this.$router.push({ name: 'attractiondetails', query: { attractionID:val  } });
      // this.$router.push('/attraction-detail');
    },
    showCascader() {
      // 显示遮罩层
      this.showMask = true;
    },
    hideCascader() {
      // 隐藏遮罩层
      if (this.selectedOptions.length === 0) {
        ElMessage({
          message: '选择不能为空!',
          type: 'error',
        })
      }
      else {
        this.showMask = false;
        this.chosencity = this.selectedOptions[0];
        this.initializeData();
      }

    },
    goToTop() {
      window.scrollTo(0, 0);
    },
    initializeData() {
      // 获取热门景点
      axios
        .get('/api/attrations/PopularAttractions?city=' + this.chosencity)
        .then((response) => {
          console.log("热门景点", response)
          this.recommendpiclist = response.data

        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

      // 获取高分推荐
      axios
        .get('/api/attrations/HighScoreRecommends?city=' + this.chosencity)
        .then((response) => {
          console.log("高分推荐", response)
          this.highranklist = response.data
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });


    },


  },
  components: {
    // MyMap,
    RecView,
    RankView,
    StartTitle,
    Search,
    Header,
    axios,
    pcTextArr,
    ElMessage
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
  height: 630px;
}

.imgtitle {
  position: absolute;
  /* 设置为绝对定位，让它悬浮在背景图片之上 */
  top: 50%;
  /* 将文字的顶部定位到父容器的中间 */
  left: 50%;
  /* 将文字的左边定位到父容器的中间 */
  transform: translate(-50%, -30%);
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

/* 遮罩层样式 */
.mask {
  position: fixed;
  top: -70px;
  left: 75px;
  width: 200px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 内容区域样式 */
.content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.mapbtn {
  margin-top: 10px;

}
</style>
