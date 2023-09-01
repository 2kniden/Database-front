<template>
    <div class="bigtitle">上海迪士尼度假区</div>
    <div class="detailhead">
        <!-- 轮播图 -->
        <Splide class="slides" :options="{ rewind: true }">
            <SplideSlide v-for="item in declist.slides" :key="item">
                <img :src="item">
            </SplideSlide>

        </Splide>
        <!-- 简介栏 -->
        <div>
            <DetailView :title="declist.title" :score="declist.score" :commentnum="declist.commentnum"
                :location="declist.location" :weekday="declist.weekday" :weekend="declist.weekend" :phone="declist.phone"
                :price="declist.price" :date="declist.date"></DetailView>
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
                <el-button type="primary" round size="small" plain color="#8097FD">{{ tomtomday }}</el-button>
                <el-button type="primary" round size="small" plain color="#8097FD" @click="showtimepicker">
                    更多日期<el-icon class="el-icon--right">
                        <DArrowRight />
                    </el-icon>
                </el-button>
                <el-dialog title="选择更多日期" v-model="showpicker" width="50%" destroy-on-close :show-dialog="showpicker">
                    <!-- 这里逻辑还没写不确定加不加 -->
                    <el-date-picker v-model="morevalue1" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-dialog>

            </div>
            <!-- 显示票价信息 -->
            <div class="ticketdetail">
                <!-- 这里先不用v-if -->
                <div>
                    <ViewTicket v-for="item in ticketlist" :key="item.ticketid" :titleint="item.titleint"
                        :isCollectedint="item.isCollectedint" :isRefundint="item.isRefundint" :price="item.price"
                        :buynum="item.buynum"></ViewTicket>
                </div>
                <!-- <div v-else>
                    <ViewTicket :titleint="ticketlist[0].titleint" :isCollectedint="ticketlist[0].isCollectedint"
                        :isRefundint="ticketlist[0].isRefundint" :price="ticketlist[0].price"
                        :buynum="ticketlist[0].buynum"></ViewTicket>
                </div> -->
                <div class="ticshow" @click="ticketshowmore=!ticketshowmore">{{ticketshowmore?'收起':'展示更多'}} </div>

            </div>
            <div class="viewdes">
                <span class="maintitle">景点简介:</span>
                <div class="vdetail">{{ declist.attrdetail }}</div>
            </div>
            <div class="usercomment">
                <div class="chead">
                    <div class="cheadleft">
                        <div>
                            <div class="maintitle">用户点评:</div>
                            <div class="comnum"> (1234条)</div>
                        </div>

                    </div>
                    <div>
                        <!-- 这里会移动一下最后实在不行就固定位置吧 -->
                        <el-button type="primary" plain color="#8097FD" @click="ToEdit">
                            <el-icon>
                                <EditPen />
                            </el-icon>
                            写评论
                        </el-button>

                        <!-- 弹窗组件 -->
                        <el-dialog title="发布评论" v-model="showDialog" width="50%" destroy-on-close :show-close="false"
                            :show-dialog="showDialog">
                            <EitComment @getData="getData"></EitComment>
                        </el-dialog>
                    </div>

                </div>
                <!-- 这里是用户评论部分，这里名称改了一下 -->
                <div>
                    <attrComment v-for="item in commentlist" :key="item.commentid" :userlog="item.userlog"
                        :attrname="item.username" :attrstar="item.avgscore" :comword="item.detail"
                        :comtime="item.commentDate" :comlikes="item.likes" :comunlikes="item.unlikes"
                        :picsrc="item.picList">

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
import EitComment from '../Attraction/editcomment.vue'
import axios from 'axios'
export default {
    mounted() {
        this.initializeData();
    },
    data() {
        return {
            // 景区日期，票价日期（今日、明日、后日，后日显示日期：
            today: '',
            tomtomday: '',
            // 更多日期，可查看从进来开始往后7天、以下全是日期选择相关参数
            showpicker: false,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            morevalue1: '',

            // 景点id和userid先写死
            user_id: '123',
            attraction_id: '123455',

            // 景点介绍+简介栏
            declist: '',
            // 售票，这里的逻辑还没有处理的很好，先放着
            ticketlist: '',
            ticketshowmore: false,//显示更多（否则只显示成人票）
            showDialog: false, // 控制发布评论弹窗的显示和隐藏
            // 评论相关数据
            commentlist: [],
            // 相关日志数据
            journallist: []
        };
    },

    methods: {
        initializeData() {
            // 获取票价日期
            const time = new Date();
            this.today = this.formatDateTime(time);
            time.setDate(time.getDate() + 2); // 将日期增加2天（后天）
            this.tomtomday = this.formatDateTime(time);

            //获取当日票价
            axios
                .get('/Attraction/getticket?attraction_id=' + this.attraction_id + '&date=' + this.today)
                .then((response) => {

                    this.ticketlist = response.data.ticketlist;
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });


            // 获取景点相关信息：获取景点图片、介绍、景点简介信息
            axios
                .get('/Attraction/getattrdata?attraction_id=' + this.attraction_id)
                .then((response) => {

                    this.declist = response.data.declist;
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
            // 获取评论信息
            axios
                .get('/Attraction/getcommentdata?attraction_id=' + this.attraction_id)
                .then((response) => {
                    this.commentlist = response.data.commentlist;
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },
        
        ToEdit() {
            this.showDialog = true;
        },
        // 处理关闭逻辑
        getData(val) {
            if (val != false) {
                console.log(val);//获取传回来的数据
                // 添加一条评论数据，然后现在push进comment
                this.addcommentdata();

            }
            this.showDialog = false;
        },
        addcommentdata() {
            // var that = this;
            // axios.post('/Attraction/postComments/', {
            //     poster_id: that.reader.reader_id,
            //     article_id: that.article_id,
            //     content: that.reader.post_comment,
            //     post_time: formatDateTime(now_time),
            //     post_likes: 0,
            // })
            //     .then(res => {
            //         if (res.data.status) {
            //             that.comments.push({
            //                 comment_id: res.data.comment_id,
            //                 poster_id: that.reader.reader_id,
            //                 poster_avatar: that.reader.reader_avatar,
            //                 poster_name: that.reader.reader_name,
            //                 poster_review: that.reader.post_comment,
            //                 post_time: formatDateTime(now_time),
            //                 post_likes: 0,
            //                 is_like: false,
            //                 permission_of_delete: true,    //删除评论权限     
            //             });
            //         }
            //     })
            //     .catch(error => {
            //         alert('操作失败！');
            //     });
        },
        formatDateTime(date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            minute = minute < 10 ? ('0' + minute) : minute;
            var second = date.getSeconds();
            second = second < 10 ? ('0' + second) : second;
            return m + '-' + d;
        },
        showtimepicker() {
            this.showpicker = true;
        }

    },
    components: {
        Splide,
        SplideSlide,
        DetailView,
        ViewTicket,
        attrComment,
        EitComment
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

.ticketdetail {
    display: flex;
    flex-direction: row;
}

.ticshow {
    margin-left: 10px;
    font-size: 10px;
    color: #888;
    margin-top: 100px;
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
  