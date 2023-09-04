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
            <div class="tickit" ref="t1">
                <span class="maintitle">票价信息:</span>
            </div>
            <!-- 按日期显示票价信息 -->
            <div class="tickitbtn" ref="t2">
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
            <div class="ticketdetail" ref="t3">
                <div v-if="ticketshowmore">
                    <ViewTicket v-for="item in ticketlist" :key="item.ticketid" :titleint="item.titleint"
                        :isCollectedint="item.isCollectedint" :isRefundint="item.isRefundint" :price="item.price">
                    </ViewTicket>
                </div>
                <!-- 这里有点点问题 -->
                <div v-else>
                    <ViewTicket :titleint="firstticket.titleint" :isCollectedint="firstticket.isCollectedint"
                        :isRefundint="firstticket.isRefundint" :price="firstticket.price"></ViewTicket>
                </div>
                <div class="ticshow" @click="ticshowmore">{{ ticketshowmore ? '收起' : '展示更多' }} </div>

            </div>
            <div class="viewdes" ref="t4">
                <span class="maintitle">景点简介:</span>
                <div class="vdetail">{{ declist.attrdetail }}</div>
            </div>
            <div class="usercomment" ref="t5">
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
                    <attrComment v-for="item in currentPageData" :key="item.commentid" :userlog="item.userlog"
                        :attrname="item.username" :attrstar="item.avgscore" :comword="item.detail"
                        :comtime="item.commentDate" :comlikes="item.likes" :comunlikes="item.unlikes"
                        :picsrc="item.picList">

                    </attrComment>
                    <div class="endword">
                        <div class="endright">{{ pagestartIndex }}-{{ pageendIndex }}/{{ totalItems }}条</div>
                        <div class="endleft">
                            <div class="eltabs">
                                <!-- 分页展示数据 -->
                                <el-tabs v-model="activeTab" @tab-click="handleTabClick">
                                    <el-tab-pane label="上一页" name="prev" :disabled="activeTab === '1'"></el-tab-pane>
                                    <el-tab-pane v-for="page in displayedPages" :label="page" :name="page.toString()"
                                        :key="page"></el-tab-pane>
                                    <el-tab-pane label="下一页" name="next"
                                        :disabled="activeTab === pageCount.toString()"></el-tab-pane>
                                </el-tabs>
                            </div>
                            <div class="tolpage">{{ pageCount }}页</div>
                        </div>

                    </div>
                </div>


            </div>
        </div>
        <div class="rightdetail">
            <div class="rightjournal" ref="jourtitle">推荐日志</div>
            <div class="journal" ref="journal" :style="{ maxHeight: journalMaxHeight }">
                <JournalValue v-for="item in journallist" :key="item.journalid" :userName="item.userName"
                    :userSrc="item.userSrc" :position="item.position" :axisnum="item.axisnum" :axispic="item.axispic"
                    :tag="item.tag" :title="item.title" :picSrc="item.picSrc" :posterDate="item.posterDate"
                    :like="item.like" :collect="item.collect"></JournalValue>
            </div>
        </div>
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
import JournalValue from '../../components/Attraction/attrjournal.vue'
import Journal from '../Journal.vue'


export default {

    mounted() {
        this.initializeData();
        const elementsToObserve = [
            this.$refs.t1,
            this.$refs.t2,
            this.$refs.t3,
            this.$refs.t4,
            this.$refs.t5,
        ];

        // 创建ResizeObserver实例
        const resizeObserver = new ResizeObserver(this.handleResize);

        // 监听每个元素的大小变化
        for (const element of elementsToObserve) {
            if (element) {
                resizeObserver.observe(element);
            }
        }
        // 计算总体高度
        this.calculateTotalHeight();
    },
    computed: {
        // 计算总页数
        pageCount() {
            this.totalItems = this.commentlist.length;
            this.totalPage = Math.ceil(this.totalItems / this.pageSize);
            return this.totalPage;
        },
        // 计算当前页的数据
        currentPageData() {
            const allData = this.commentlist;
            // 根据当前页和每页的条数计算数据的起始和结束索引
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = this.pageSize < this.commentlist.length - startIndex ? this.pageSize + startIndex : this.commentlist.length;

            // 设置 pagestartIndex 和 pageendIndex
            this.pagestartIndex = startIndex + 1;
            this.pageendIndex = endIndex;


            // 从 'allData' 中提取当前页的数据
            return allData.slice(startIndex, endIndex);
        },
        displayedPages() {
            const dcurrentPage = parseInt(this.activeTab);
            const halfDisplay = 2; // 显示当前页前后各2页
            const pages = [];
            if (this.pageCount < 5) {
                for (let i = 1; i <= this.pageCount; i++) {
                    pages.push(i);
                }
            } else {
                let startPage = Math.max(1, dcurrentPage - halfDisplay);
                let endPage = Math.min(this.pageCount, dcurrentPage + halfDisplay);

                // 调整页码范围，确保显示 5 个页码
                while (endPage - startPage < 4) {
                    if (startPage > 1) {
                        startPage--;
                    } else if (endPage < this.pageCount) {
                        endPage++;
                    }
                }
                for (let i = startPage; i <= endPage; i++) {
                    pages.push(i);
                }
            }
            return pages;
        },
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
            // 售票
            ticketlist: '',
            firstticket: '',
            ticketshowmore: false,//显示更多（否则只显示成人票）

            // 评论
            showDialog: false, // 控制发布评论弹窗的显示和隐藏
            // 评论相关数据
            commentlist: [],
            // 相关日志数据
            journallist: [],
            totalHeight: 0,
            journalMaxHeight: '1800px',
            //日志分页相关数据
            currentPage: 1, // 当前页数
            pageSize: 5,  // 每页显示的条数
            pagestartIndex: '',//每页开始
            pageendIndex: '',//每页结束
            totalItems: '', // 总数据条数
            activeTab: '1'
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

            //获取票价
            axios
                .get('/Attraction/getticket?attraction_id=' + this.attraction_id + '&date=' + this.currSelectDate)
                .then((response) => {

                    this.ticketlist = response.data.ticketlist;
                    this.firstticket = this.ticketlist[0];
                    // console.log(this.firstticket)
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

            // 获取相关日志信息
            axios
                .get('/Attraction/getjournaldata?attraction_id=' + this.attraction_id)
                .then((response) => {
                    this.journallist = response.data.journallist;
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },
        handleResize(entries) {
            for (const entry of entries) {
                const targetElement = entry.target;
                // 在这里处理每个元素的大小变化
                // console.log(`Element ${targetElement.textContent} 的新高度是：${entry.contentRect.height}px`);
            }

            // 计算总体高度
            this.calculateTotalHeight();
        },
        calculateTotalHeight() {
            // 获取所有监听的元素的高度并累积
            this.totalHeight = 0;
            const elementsToObserve = [
                this.$refs.t1,
                this.$refs.t2,
                this.$refs.t3,
                this.$refs.t4,
                this.$refs.t5,
            ];
            for (const element of elementsToObserve) {
                if (element) {
                    this.totalHeight += element.clientHeight;
                }
            }
            // 输出总体高度
            console.log(`总体高度是：${this.totalHeight}px`);
            this.journalMaxHeight = this.totalHeight - 50 + 'px';//减掉推荐日志标题的高度
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
        ticshowmore() {
            this.ticketshowmore = !this.ticketshowmore;

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

        },

        // 评论分页部分
        handleTabClick(tab, event) {

            //这样才能获取每个el-tab-pane的name属性

            if (tab.props.name === 'prev') {
                this.prevPage();
            } else if (tab.props.name === 'next') {
                this.nextPage();
            } else {
                this.currentPage = parseInt(tab.props.name);
            }


        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.activeTab = this.currentPage.toString();

            }
        },
        nextPage() {
            if (this.currentPage < this.pageCount) {
                this.currentPage++;
                this.activeTab = this.currentPage.toString();

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
        ElMessage,
        JournalValue,
        Journal
    }
}

</script>
  
<style>
/* 其他部分 */
.bigtitle {
    display: flex;
    padding: 10px 0 5px 55px;
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
    margin: 10px 45px 20px 15px;

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
    padding: 0px 40px;
    display: flex;
    flex-direction: row;
}

.leftdetail {
    width: 70%;
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
    align-items: flex-end;
    /* 将文本垂直居底部 */
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

.el-icon--right {
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

/* 推荐日志部分 */
.rightdetail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 35%;
    margin: 5px 10px 5px 5px;
}

.rightjournal {
    background-color: #8097FD;
    font-size: 18px;
    color: #fff;
    font-weight: 300px;
    padding: 5px 40px;
    border-radius: 20px;
    letter-spacing: 4px;
    /* 设置字体间距 */
    width: 35%;
    margin: auto;


}

.journal {
    background-color: #F1F3FF;
    padding-bottom: 20px;
    margin: 20px 25px 0 15px;
    flex: 1;
    border-radius: 20px;
    display: flex;
    /* 使用 flex 布局 */
    flex-direction: column;
    /* 确保子元素垂直排列 */
    align-items: center;
    /* 子元素垂直居中 */
    /* 设置滚动条 */
    overflow-y: scroll;
    /* 设置最大高度，超过该高度将出现滚动条 PS：这里是我定死的，需要根据页面需要进行调整让其和右边栏等高显示 */
}


/* 设置滚动条样式 */
/* 滚动条的整体样式 */
.journal::-webkit-scrollbar {
    width: 3px;
    /* 设置滚动条的宽度 */
}

/* 滚动条轨道的样式 */
.journal::-webkit-scrollbar-track {
    background: transparent;
    /* 背景颜色 */
}

/* 滚动条滑块的样式 */
.journal::-webkit-scrollbar-thumb {
    background: #dadff3;
    /* 滑块颜色 */
    border-radius: 5px;
    /* 滑块圆角 */
}


/* 下方选项栏 */
.endword {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px 20px 0 20px;
    font-size: 14px;

}

.endleft {
    display: flex;
    flex-direction: row;
}


.eltabs {
    transform: translate(0, -20%);

}

.tolpage {
    margin-left: 10px;
}
</style>
  