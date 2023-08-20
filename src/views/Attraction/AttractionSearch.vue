<template>
    <div class="container">
        <div class="rightcontainer">
            <el-menu :default-active="activeMenu" @select="handleMenuSelect" :collapse="isMenuCollapse"
                :collapse-transition="false" text-color="#8097FD" active-text-color="#fff">
                <el-submenu index="home">
                    <template #title>
                        <i class="el-icon-s-home"></i>
                        <span>搜索排序</span>
                    </template>
                    <el-menu-item index="home-1">综合排序</el-menu-item>
                    <el-menu-item index="home-2">好评优先</el-menu-item>
                    <el-menu-item index="home-3">距离优先</el-menu-item>
                </el-submenu>

            </el-menu>
        </div>

        <div class="leftcontainer">
            <!-- 这里连接数据库 -->
            <div class="tolnum">共{{ totalItems }}条</div>
            <!-- 搜索景点缩览图 -->
            <div>
                <div class="noneresult" v-if="searchMatchList.length === 0">
                    ----没有搜索结果请重新搜索----
                </div>
                <div v-else>
                    <SearchView v-for="item in currentPageData" :key="item.id" :picsrc="item.pic" :title="item.title"
                        :location="item.location" :score="item.score" :commentnum="item.commentnum"
                        :username="item.username" :commentdetail="item.commentdetail"></SearchView>
                </div>


            </div>
            <div class="endword">
                <!-- 这里也要改 -->
                <div class="endright">{{ pagestartIndex }}-{{ pageendIndex }}/{{ totalItems }}条</div>
                <div class="endleft">
                    <div class="eltabs">
                        <!-- 分页展示数据 -->
                        <el-tabs v-model="activeTab" @tab-click="handleTabClick">
                            <el-tab-pane label="上一页" name="prev" 
                                :disabled="activeTab === '1'"></el-tab-pane>
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
</template>
  
<script>
import { useRoute } from 'vue-router'
import SearchView from '../../components/Attraction/searchview.vue'
export default {


    components: {
        SearchView,
        useRoute,
    },
    data() {
        return {
            // 接收传进来的选择，之类传输有问题不知道为什么
            receivedAttractions: '上海',
            // 导航栏
            activeMenu: 'home-1',
            isMenuCollapse: false,
            // 下方选项卡设置默认选中的选项卡为 "2"
            activeTab: "2",
            showTabContent: false, // 初始设置选项卡内容不显示
            //搜索内容匹配列表
            searchMatchList: [],
            //搜索内容总数据列表
            searchlist: [{
                id: 1,
                pic: require('../../assets/attractions/highrank/1.jpg'),
                title: '外滩1',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }, {
                id: 2,
                pic: require('../../assets/attractions/highrank/2.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }, {
                id: 3,
                pic: require('../../assets/attractions/highrank/3.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }, {
                id: 4,
                pic: require('../../assets/attractions/highrank/4.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }, {
                id: 5,
                pic: require('../../assets/attractions/highrank/6.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }, {
                id: 6,
                pic: require('../../assets/attractions/highrank/1.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }, {
                id: 7,
                pic: require('../../assets/attractions/highrank/1.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }, {
                id: 8,
                pic: require('../../assets/attractions/highrank/1.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }, {
                id: 9,
                pic: require('../../assets/attractions/highrank/1.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }, {
                id: 10,
                pic: require('../../assets/attractions/highrank/1.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }, {
                id: 11,
                pic: require('../../assets/attractions/highrank/1.jpg'),
                title: '外滩1',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }, {
                id: 12,
                pic: require('../../assets/attractions/highrank/2.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }, {
                id: 13,
                pic: require('../../assets/attractions/highrank/3.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }, {
                id: 14,
                pic: require('../../assets/attractions/highrank/4.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }, {
                id: 15,
                pic: require('../../assets/attractions/highrank/6.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }, {
                id: 16,
                pic: require('../../assets/attractions/highrank/1.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }, {
                id: 17,
                pic: require('../../assets/attractions/highrank/3.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }, {
                id: 18,
                pic: require('../../assets/attractions/highrank/4.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }, {
                id: 19,
                pic: require('../../assets/attractions/highrank/6.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }, {
                id: 20,
                pic: require('../../assets/attractions/highrank/1.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            }],
            // 评分系统
            rating: 4.5,
            // 展示页面部分
            currentPage: 1, // 当前页数
            pageSize: 10,  // 每页显示的条数
            pagestartIndex: '',//每页开始
            pageendIndex: '',//每页结束
            totalItems: 100, // 总数据条数
            activeTab: '1'
        };
    },
    mounted() {
        // 这里的传递参数有点问题，一直是undefined
        // this.receivedAttractions = this.$route.params.selectedAttractions;
        // console.log(this.receivedAttractions);
        this.filterSearchResults(this.receivedAttractions);
        //开始匹配
    },
    computed: {
        // 计算总页数
        pageCount() {
            //this.totalItems = this.searchMatchList.length;
            this.totalPage = Math.ceil(this.totalItems / this.pageSize);
            return this.totalPage;
        },
        // 计算当前页的数据
        currentPageData() {
            const allData = this.searchMatchList;
            // 根据当前页和每页的条数计算数据的起始和结束索引
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;

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
    methods: {
        handleMenuSelect(index) {
            this.activeMenu = index;
            // 在这里处理菜单项点击事件，可以进行页面跳转或其他操作
        },
        filterSearchResults(keywords) {
            // 使用keywords过滤searchlist，只保留包含关键词的项
            this.searchMatchList = this.searchlist.filter(item => {
                return (
                    item.title.includes(keywords) || // 标题包含关键词
                    item.location.includes(keywords) // 地点包含关键词
                );
            });
        },
        handleTabClick(tab) {
            if (tab.name === 'prev') {
                this.prevPage();
            } else if (tab.name === 'next') {
                this.nextPage();
            } else {
                this.currentPage = parseInt(tab.name);
            }
            
            
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                
            }
        },
        nextPage() {
            if (this.currentPage < this.pageCount) {
                this.currentPage++;
                
            }
        }

    },
};
</script>
  
<style>
.noneresult {
    font-size: 14px;
    margin: 20px 0;
    color: #999;

}

.container {
    display: flex;

}

.tolnum {
    display: flex;
    margin-left: 30px;
    font-size: 14px;
    font-weight: bold;
}

.rightcontainer {
    width: 15%;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    /* 选项卡高度差不多这么多 */
    height: 165px;
    margin-top: 10px;
    position: fixed;
    /* 将 .rightcontainer 固定在屏幕中 */
    left: 30px;
    /* 调整左侧间距，根据实际情况调整 */
}

.el-menu-item {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 这里背景颜色渲染不出来 */
.el-menu-item--selected {
    background-color: #8097FD;
}

.el-menu-item:hover {
    background-color: #e4e8fc;
}

.leftcontainer {
    flex: 1;
    margin-left: 18%
}

/* 下方选项栏 */
.endword {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px 20px;
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
  