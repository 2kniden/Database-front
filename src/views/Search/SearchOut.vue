<template>
  <div class="scontainer">
    <div class="sbackground" />
    <Header></Header>
    <Loading v-if="LOADING"></Loading>
    <div class="sections">

      <div v-for="(result, index) in attractionResults" :class="{
        plant_background: true,
        SectionContainer: true,
        testenter: true
      }" :key="result.title" :data-delay="index * 200" @click="navToPlantinfo(result.id)" v-if="type === 'attraction'">
        <!-- <div class="image-hover-thumb">
            <div class="image-container" alt="" />
          </div> -->

        <div class="article-container">
          <div class="big_info">
            <h2 style="margin-bottom:8px">
              {{ result.title }}
            </h2>

          </div>
        </div>

        <div class="morphology-container">
          {{ result.location }}
        </div>
      </div>

      <div v-for="(result, index) in journalResults" :class="{
        plant_background: true,
        SectionContainer: true,
        testenter: true
      }" :key="result.title" :data-delay="index * 200" v-bind:style="{backgroundImage:'url('+journalResults.photoUrl+')'}" @click="navToPlantinfo(result.id)" v-if="type === 'journal'">
        <!-- <div class="image-hover-thumb">
            <div class="image-container" alt="" />
          </div> -->

        <div class="article-container">
          <div class="big_info">
            <h2 style="margin-bottom:8px">
              {{ result.title }}
            </h2>

          </div>
        </div>

        <div class="morphology-container">
          {{ result.tag }}
        </div>
      </div>

      <div v-for="(result, index) in teamResults" :class="{
        plant_background: true,
        SectionContainer: true,
        testenter: true
      }" :key="result.title" :data-delay="index * 200" :style="{backgroundImage:'url('+teamResults.photoUrl+')'}" @click="navToPlantinfo(result.id)" v-if="type === 'team'">
        <!-- <div class="image-hover-thumb">
            <div class="image-container" alt="" />
          </div> -->

        <div class="article-container">
          <div class="big_info">
            <h2 style="margin-bottom:8px">
              {{ result.title }}
            </h2>

          </div>
        </div>

        <div class="morphology-container">
          {{ result.tag }}
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import axios from "axios";
import Loading from "@/components/Loading.vue";
export default {
  name: "Search",
  inject: ["reload"], //注入依赖
  components: {
    Header,
    Loading
  },
  data() {
    return {
      testshow: [],
      attractionResults:[],
      journalResults: [],
      teamResults:[],
      LOADING: true,
      type:"attraction",
      keyWord:''
    };
  },
  created() {
    // for (let i = 0; i < response.data.length; i++) {
    //   this.testshow.push(false);
    // }
  },
  mounted() {
    // window.addEventListener("scroll", this.handleScroll);
    //当前滚动位置到达testref的时候，显示div（100作为调整用）
    // window.scroll(0, Math.max(window.pageYOffset - 50, 0));
    let that = this;
    that.keyWord = this.$route.query.key
    console.log(that.keyWord)

    axios
        .get("/api/search/AllSearch", {
          params: {
            Keyword: that.keyWord
          }
        })
        .then(function (response) {
          console.log("post请求成功");
          console.log(response.data);
          for (let i = 0; i < response.data.length; i++) {
            if(response.data[i].type === 'attraction')
              that.attractionResults.push(response.data[i]);
            else if(response.data[i].type === 'journal')
              that.journalResults.push(response.data[i]);
            else if(response.data[i].type === 'team')
              that.teamResults.push(response.data[i]);
          }
          console.log(that.attractionResults)
          console.log(that.journalResults)
          console.log(that.teamResults)
          that.LOADING = false;
        })
        .catch(function (error) {
          console.log("post请求失败");
          console.log(error.message);

        });
  },
  beforeRouteLeave(to,from,next) {
    window.removeEventListener("scroll", this.bindHandleScroll);
    next();
  },
  methods: {
    navToPlantinfo(id) {
      console.log("jump to acknowledgeinfo:" + id);
      this.$router.push({
        path: "/acknowledgeinfo",
        query: {
          key: id
        }
      });
      this.reload();
    },
    componentDidMount() {
      this.checkScrollHeightAndLoadAnimation();
      window.addEventListener("scroll", this.bindHandleScroll);
    },
    componentWillUnmount() {
      window.removeEventListener("scroll", this.bindHandleScroll);
    },
    bindHandleScroll() {
      this.checkScrollHeightAndLoadAnimation();
    },
    checkScrollHeightAndLoadAnimation() {
      // alert(1);
      console.log(this.searchResults.length);
      const windowHeight = window.innerHeight;
      var leftElement = document.getElementsByClassName("item_container");
      for (let i = 0; i <= this.searchResults.length; i++) {
        if (
            window.pageYOffset + windowHeight >
            leftElement[i].offsetTop + 200
        ) {
          if (i > 2) leftElement[i].classList.add("fadein");
          else leftElement[i].style = "opacity:1;";
        } else {
          if (i > 2) leftElement[i].style = "opacity:0;";
          else leftElement[i].classList.add("fadeout");
        }
      }
      // if (leftElement)
    },
    handleScroll() {
      this.componentDidMount();
    }
    // handleScroll() {
    // this.currentScroll = window.pageYOffset; //表示当前滚动的位置
    // if (this.currentScroll >= this.$refs.testref1.offsetBottom - 550) {
    //   //当前滚动位置到达testref的时候，显示div（100作为调整用）
    //   this.testShow1 = true;
    // }
  }
};
</script>

<style>
*
{
  margin: 0;
  padding: 0;
  border: 0;
}

body
{
  background-color:#D9DFFD;
}

.article-container p
{
  font-size: 18px;
  cursor: pointer;
}

.article-container p:hover
{
  opacity: 0.7;
  cursor: pointer;
}

.article-container h2:hover
{
  opacity: 0.7;
  color: #265098;
  cursor: pointer;
}

.scontainer
{
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 出现竖直滚动条计算内容偏移 */
  margin-right: calc(100% - 100vw);
  padding-right: 17px;
  background-color: #D9DFFD;
}

.sbackground
{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  padding-top: 40%;
  background-repeat: no-repeat;
}

.sections
{
  position: relative;
  margin-top: 50px;
  padding-bottom: 90px;
}

.SectionContainer
{
  z-index: 4;
  width: 900px;
  height: 200px;
  position: relative;
  margin-top: 60px;
  border-radius: 20px;
  transition: all 0.3s;
  display: flex;
  box-shadow: 4px 4px 5px 1px #e60c0c1c;
  cursor: pointer;
}

.SectionContainer:hover
{
  transform: scale(1.15, 1.15);
  box-shadow: 4px 4px 5px 1px #b4adadb2;
  transition: all 0.3s;
}

.testenter
{
  z-index: 4;
  width: 900px;
  height: 200px;
  position: relative;
  margin-top: 40px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 6px;
  box-shadow: 4px 4px 5px 1px #c6bebea3;
  transition: all 0.3s;
  opacity: 1 !important;
  display: flex;
  padding: 20px;
}

.testenter:hover
{
  transform: scale(1.15, 1.15);
  box-shadow: 6px 6px 5px 1px #458f8684;
  transition: all 0.3s;
}

.test
{
  transform: translateY(10%);
  opacity: 0;
}

.big_info
{
  text-align: center;
  width: 250px;
  padding-right: 50px;
  -webkit-text-fill-color: rgb(255, 255, 255);
}

.section-title-wrap
{
  display: block;
  margin: auto;
  position: relative;
  text-align: center;
}

.plant_background
{
  z-index: 3;
  background-size: cover;
  background-position: 50% 50%;
  background-size: 300px 300px;
  background-repeat: no-repeat;
  width: 900px;
  height: 200px;
  border-top: 100px;
  background-position: left;
  position: relative;
  border-radius: 20px;
  /* -webkit-background-clip: text;*/
}

.plant_background:hover
{
  transform: scale(1.1, 1.1);
}

/*---------------------------------------
  SECTION TITLE
-----------------------------------------*/
.section-title-wrap
{
  display: block;
  margin: auto;
  position: relative;
  text-align: center;
}

.section-title-line
{
  background: var(--border-color);
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 2px;
  margin: 0 auto;
}

.section-title-icon
{
  color: var(--primary-color);
  font-size: var(--h5-font-size);
  display: inline-block;
  vertical-align: top;
  margin-right: 10px;
  margin-left: 10px;
  width: 30px;
  height: 30px;
  line-height: 30px;
}

/*---------------------------------------
  IMAGE
-----------------------------------------*/

.image-container
{
  width: 200px;
  height: 200px;
  /*background-image: url("../../../static/bamboo.png");*/
  background-size: 100% 100%;
  border-radius: var(--border-radius-medium);
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.image-container:hover
{
  transform: scale(1.1);
  transition: all 0.5s;
  overflow: hidden;
}

.article-container
{
  float: right;
  display: inline;
  position: relative;
  text-align: center;
  left: 0;
  font-size: 20px;
  color: rgb(82, 98, 89);
  text-shadow: 2px 2px 1px rgb(59, 58, 58);
  padding: 30px 0;
}

.morphology-container
{
  z-index: 5;
  color: black;
  font-size: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 83%;
  width: 600px;
}
</style>
