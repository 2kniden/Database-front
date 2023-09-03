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
                <el-radio-group v-model="radio">
                    <el-radio :label="11" @click="btn1()" autofocus="true">今日</el-radio>
                    <el-radio :label="12" @click="btn2()">明日</el-radio>
                    <el-radio :label="13" @click="btn3()">{{ tomtomday }}</el-radio>
                    <el-radio :label="14" @click="showtimepicker">
                        {{ moreday }}<el-icon class="el-icon--right">
                            <DArrowRight />
                        </el-icon>
                    </el-radio>
                </el-radio-group>



                <el-dialog title="选择更多日期" v-model="showpicker" width="50%" destroy-on-close :show-dialog="showpicker">
                    <el-date-picker v-model="morevalue1" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                    </el-date-picker>
                    <div class="dialog-footer">
                        <el-button size="large" @click="pickerInvisible">取消</el-button>
                        <el-button size="large" type="primary" @click="commitpicker">确定</el-button>
                    </div>
                </el-dialog>

            </div>
            <!-- 显示票价信息 -->
            <div class="ticketdetail">
                <!-- 这里先不用v-if -->
                <div v-if="ticketshowmore">
                
                    <ViewTicket v-for="item in ticketlist" :key="item.ticketid" :titleint="item.titleint"
                        :isCollectedint="item.isCollectedint" :isRefundint="item.isRefundint" :price="item.price"
                        :buynum="item.buynum"></ViewTicket>
                </div>
                <div v-else>
                    <ViewTicket :titleint="firstticket.titleint" :isCollectedint="firstticket.isCollectedint"
                        :isRefundint="firstticket.isRefundint" :price="firstticket.price"
                        :buynum="firstticket.buynum"></ViewTicket>
                </div>
                <div class="ticshow" @click="ticketshowmore = !ticketshowmore">{{ ticketshowmore ? '收起' : '展示更多' }} </div>

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
                <!-- 用户评论部分 -->
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
import { ElMessage } from 'element-plus';
export default {

    mounted() {
        this.initializeData();
    },
    data() {
        return {
            // 景区日期，票价日期（今日、明日、后日，后日显示日期：
            today: '',
            tomtomday: '',
            moreday: '更多日期',//选项卡内容
            radio: 11,
            // 日期选择组件：更多日期，可查看从进来开始往后7天、以下全是日期选择相关参数
            showpicker: false,
            pickerOptions: {
                // 这里设置日期可选择范围，还未设置（这里遇到问题）
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
            firstticket:'',
            ticketshowmore: false,//显示更多（否则只显示成人票）

            // 评论
            showDialog: false, // 控制发布评论弹窗的显示和隐藏
            // 评论相关数据
            commentlist: [],
            // 相关日志数据
            journallist: []
        };
    },

    methods: {
        initializeData() {
            // 默认是展示今日票价
            this.currSelectDate = new Date();
            // 获取票价后日日期展示
            const time = new Date();
            this.today = this.formatDateTime(time);
            time.setDate(time.getDate() + 2); // 将日期增加2天（后天）
            this.tomtomday = this.formatDateTime(time);

            //获取票价,这里日期还没选好
            axios
                .get('/Attraction/getticket?attraction_id=' + this.attraction_id + '&date=' + this.currSelectDate)
                .then((response) => {

                    this.ticketlist = response.data.ticketlist;
                    this.firstticket = this.ticketlist[0];
                    // console.log(this.ticketlist[0])
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
        // 点击日期按钮选择
        btn1() {
            this.currSelectDate = new Date();
            this.moreday = '更多日期';
            // console.log(this.currSelectDate);
        },
        btn2() {
            const time = new Date();
            time.setDate(time.getDate() + 1); // 将日期增加1天（明天）
            this.currSelectDate = time;
            this.moreday = '更多日期';
            // console.log(this.currSelectDate);
        },
        btn3() {
            const time = new Date();
            time.setDate(time.getDate() + 2); // 将日期增加2天（后天）
            this.currSelectDate = time;
            this.moreday = '更多日期';
            // console.log(this.currSelectDate);
        },
        //编辑评论页面
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
        // 日期选择的选择器显示与否
        showtimepicker() {
            this.currSelect = 4;
            this.showpicker = true;
        },
        pickerInvisible() {
            this.showpicker = false;
            console.log(this.currSelectDate);
        },
        commitpicker() {
            if (this.morevalue1.length === 0) {
                ElMessage({
                    message: '选择不能为空!',
                    type: 'error',
                })
            } else {
                this.pickerInvisible();
                this.moreday = this.formatDateTime(this.morevalue1);//更多日期选项内容变成选择日期
                this.currSelectDate = this.morevalue1;
                console.log(this.currSelectDate)
            }

        }

    },
    components: {
        Splide,
        SplideSlide,
        DetailView,
        ViewTicket,
        attrComment,
        EitComment,
        ElMessage
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
    margin: 0px 0 0 10px;
    padding-bottom: 10px;
    font-size: 10px;
    color: #888;
    align-items: flex-end; /* 将文本垂直居底部 */
    display: flex;
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

/* 票价日期选中后颜色修改 */
/* 选中后的字体颜色 */
.el-radio__input.is-checked+.el-radio__label {
    color: #8097FD !important;
}

/* 选中后小圆点的颜色 */
.el-radio__input.is-checked .el-radio__inner {
    background: #8097FD !important;
    border-color: #8097FD !important;
}
.el-icon--right{
    transform: translate(0%, 15%);
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

.dialog-footer {
    margin-top: 40px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
  