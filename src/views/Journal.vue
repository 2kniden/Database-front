<template lang="en">
  <div class="JournalPage">
    <!-- 导航栏 -->
    <!-- 外部容器指定位置 -->
    <!-- 样式直接在目标上设定 -->
    <nav calss="navBar clearfix">
        <Header></Header>
    </nav>

    <main class="mainBody clearfix">
    <!-- 二级导航栏 -->
        <div class="sub-nav">
            <JournalNav></JournalNav>
        </div>

        <!-- 内容主体 -->
        <div class="content-display">
            <router-View></router-View>
        </div>
    </main>
   
  </div>
</template>

<script>
import { component } from "vue";
import Header from "@/components/Header";
import JournalNav from "@/components/JournalNav";

export default {
    name:"Journal",
    components: {
            Header,
            JournalNav
    },
    beforeCreate () {
        this.$nextTick(()=>{
        document.body.setAttribute('style', 'background:#F1F3FF')
        });
    },
    //实例销毁之前钩子--移除body 标签的属性style
    beforeDestroy () {
        document.body.removeAttribute('style');
    }
}
</script>

<style scoped>
/* 清除内外边距，加上scoped后这个不起效果了!!!!!! */
* {
    padding:0;
    margin:0;
}

/* 给整个页面设置背景颜色，这个暂时还没有解决，等会儿研究具体方案
.JournalPage {
    content:"";
    display: block;
    height:100%;
    background-color:purple;
} */

/* 清除浮动 */
.clearfix::before,.clearfix::after{
    content:"";
    display: block;
}

.clearfix::after{
    clear:both;
}

/* 设置每个板块所在的位置 */
/* .navBar {
    height:70px;
    background-color: gray;
} */

nav {
    height:65px;
    width:100%;
    /* margin-bottom: 10px; <-- 写在这里是为了提醒自己，这个地方会出现嵌套块元素塌陷的问题*/
    background-color: #FFFFFF;
    position:relative;
    z-index: 10000;/*为了让navbar浮在所有元素的上方 */
}

.header {
    background-color: #FFFFFF;
}

main {
    height:500px;
    /* margin:10px 0px; */
    background-color: transparent;
}

.sub-nav{
    float:left;
    /* background-color: grey; */
    height:100%;
    width:150px;
    margin:20px 5px 10px;
}

.content-display {
    float:left;
    width:1000px;
    margin:20px 20px;
}

</style>