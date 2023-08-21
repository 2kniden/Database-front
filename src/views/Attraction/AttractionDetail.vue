<template>
    <div class="bigtitle">上海迪士尼度假区</div>
    <div class="detailhead">
        <!-- 轮播图 -->
        <Splide class="slides" :options="{ rewind: true }">
            <SplideSlide v-for="item in slides" :key="item">
                <img :src="item">
            </SplideSlide>

        </Splide>
        <!-- 简介栏 -->
        <div>
            <DetailView :title="declist.title" :picsrc="declist.picsrc" :score="declist.score"
                :commentnum="declist.commentnum" :location="declist.location" :weekday="declist.weekday"
                :weekend="declist.weekend" :phone="declist.phone" :price="declist.price"></DetailView>
        </div>
    </div>

    <div class="maincontainer">
        <div class="leftdetail">
            <div class="tickit">
                <span class="maintitle">票价信息:</span>
            </div>
            <!-- 按日期显示票价信息 -->
            <div class="tickitbtn">
                <el-button type="primary" round size="small" plain color="#8097FD">今日</el-button>
                <el-button type="primary" round size="small" plain color="#8097FD">明日</el-button>
                <el-button type="primary" round size="small" plain color="#8097FD">7.25</el-button>
                <el-button type="primary" round size="small" plain color="#8097FD">
                    更多信息<el-icon class="el-icon--right">
                        <DArrowRight />
                    </el-icon>
                </el-button>
            </div>
            <!-- 显示票价信息 -->
            <div>
                <ViewTicket :title="ticketlist.title" :standard="ticketlist.standard" :isbuy="ticketlist.isbuy"
                    :price="ticketlist.price" :buynum="ticketlist.buynum"></ViewTicket>
            </div>
            <div class="viewdes">
                <span class="maintitle">景点简介:</span>
                <div class="vdetail">我是简介我是简介我是简介我是简介我是简介我是简介我是
                    简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我
                    是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介
                    我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简
                    介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介</div>
            </div>
            <div class="usercomment">
                <div class="chead">
                    <div class="cheadleft">
                        <div>
                            <div class="maintitle">用户点评:</div>
                            <div class="comnum"> (1234条)</div>
                        </div>

                    </div>
                    <el-button type="primary" plain color="#8097FD" @click="ToEdit">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        写评论
                    </el-button>

                </div>
                <!-- 这里是用户评论部分 -->
                <div>
                    <attrComment v-for="item in commentlist" :key="item.id" :userlog="item.userlog"
                        :attrname="item.attrname" :attrstar="item.attrstar" :comword="item.comword" :comtime="item.comtime"
                        :comlikes="item.comlikes" :comunlikes="item.comunlikes" :picsrc="item.picsrc">

                    </attrComment>
                </div>


            </div>
        </div>
        <div class="rightdetail"></div>
    </div>
</template>
  
<script >
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import attrComment from '../../components/Attraction/attractionComment/attrComment.vue'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import DetailView from '../../components/Attraction/viewdetail.vue'
import ViewTicket from '../../components/Attraction/viewticket.vue'
export default {
    data() {
        return {
            // 轮播图图片
            slides: [
                require("../../assets/attractions/highrank/1.jpg"),
                require("../../assets/attractions/highrank/2.jpg"),
                require("../../assets/attractions/highrank/3.jpg"),

            ],
            // 简介栏
            declist: {
                title: "上海迪士尼度假区",
                picsrc: require('../../assets/attractions/recommendpic/disney.png'),
                score: 4.9,
                commentnum: 1234,
                location: "上海市浦东新区川沙新镇黄赵路310号",
                weekday: "9:00-21:00",
                weekend: "8:00-22:00",
                phone: "13880235123",
                price: 689
            },
            // 售票
            ticketlist: {
                title: "成人票",
                standard: "标准:12周岁以上12周岁以上12周岁以上12周岁以上12周岁以上",
                isbuy: "可定",
                price: 689,
                buynum: 4000,
            },
            
            // 评论相关数据
            commentlist: [{
                id: 1,
                userlog: require("../../assets/attractions/highrank/1.jpg"),
                attrname: "吃掉米麻薯的头",
                attrstar: "4.9",
                comword: "我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论",
                comtime: "2023-01-01 12:34",
                comlikes: 23,
                comunlikes: 23,
                picsrc: [
                    require("../../assets/attractions/highrank/1.jpg"),
                    require("../../assets/attractions/highrank/2.jpg"),
                    require("../../assets/attractions/highrank/3.jpg")
                ]
            }, {
                id: 2,
                userlog: require("../../assets/attractions/highrank/1.jpg"),
                attrname: "吃掉米麻薯的头",
                attrstar: "4.9",
                comword: "我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论",
                comtime: "2023-01-01 12:34",
                comlikes: 23,
                comunlikes: 23
            },]
        };
    },
    methods: {
        ToEdit(){
            this.$router.push("/comment-edit");
        }
    },
    components: {
        Splide,
        SplideSlide,
        DetailView,
        ViewTicket,
        attrComment
    }
}

</script>
  
<style>
/* 其他部分 */
.bigtitle {
    display: flex;
    padding: 5px 0 0 35px;
    font-size: 16px;
    font-weight: bold;
}

.maintitle {
    font-size: 16px;
    font-weight: bold;
    margin-left: 10px;
}

.detailhead {
    display: flex;
    flex-direction: row;
    margin: 10px 35px 20px 0;

}


/* 这里是图片展示区域 */
.slides {
    width: 700px;
    height: 350px;
}

.splide__slide {
    width: 700px;
    height: 350px;
}

/* 设置图片填充方式为完整填充 */
.splide__slide img {
    width: 89%;
    height: 100%;
    object-fit: cover;
    border: #8097FD 2px solid;
}

.splide__arrow {
    font-size: 12px;
    /* 设置箭头图标的大小 */
    color: #8097FD;
    /* 设置箭头图标的颜色 */
    background-color: #fff;
    /* 设置箭头的背景颜色 */
    border-radius: 50%;
    /* 设置圆形背景，使箭头显示为圆形 */
    padding: 5px;
    /* 设置箭头的内边距，以增加可点击区域 */
    border: 1px solid #8097FD;
    /* 设置箭头的边框样式 */
}


/* 下面所有的左半部分 */
.maincontainer {
    padding: 0px 30px;
    display: flex;
    flex-direction: row;
}

.leftdetail {
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    /* 添加这一行，将子元素左对齐 */
}

.tickitbtn {
    margin: 10px;
}


.viewdes {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
}

.vdetail {
    display: flex;
    align-items: flex-start;
    text-align: left;
    /* 添加这一行，将容器内的文字左对齐 */
    padding: 10px;
    font-size: 12px;
    color: #888;
    line-height: 2;
    text-indent: 2em;
}

/* 用户评论 */
.usercomment {
    width: 100%;
}

.cheadleft {
    display: flex;
    flex-direction: column;

}

.comnum {
    font-size: 12px;
    color: #888;
    margin-top: 5px;
}

.chead {
    width: 100%;
    padding-right: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>
  