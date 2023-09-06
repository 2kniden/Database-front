<template>
    <div class="container">
        <div class="rightcontainer">
            <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                text-color="#8097FD" active-text-color="#8097FD" @select="handleMenuSelect">
                <el-menu-item index="1">
                    <img class="searchicon" src="../../assets/attractions/icon/sort.svg" alt="">
                    <span slot="title">综合排序</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <img class="searchicon" src="../../assets/attractions/icon/Document.svg" alt="">
                    <span slot="title">好评优先</span>
                </el-menu-item>
            </el-menu>
            <img class="searchimg" src="../../assets/attractions/icon/searchimg.png" alt="">
            <div class="imgbottom"></div>
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
</template>
  
<script>
import { useRoute } from 'vue-router'
import SearchView from '../../components/Attraction/searchview.vue'
import axios from 'axios';
export default {


    components: {
        SearchView,
        useRoute,
    },
    data() {
        return {
            // 接收选择关键词
            receivedAttractions: '',
            // 导航栏
            activeMenu: '1',
            isMenuCollapse: false,
            //搜索内容匹配列表,这里如果后端写逻辑的话我这里得到的就是一个匹配列表
            searchMatchList: [],
            //搜索内容总数据列表,这里如果后端写逻辑就不要
            // searchlist: [],
            // 展示页面部分
            currentPage: 1, // 当前页数
            pageSize: 10,  // 每页显示的条数
            pagestartIndex: '',//每页开始
            pageendIndex: '',//每页结束
            totalItems: '', // 总数据条数
            activeTab: '1'
        };
    },
    mounted() {
        this.receivedAttractions = this.$route.query.selectedAttractions;
        // 获取与关键词匹配的列表
        this.initializeData();
        //开始匹配
        // this.filterSearchResults(this.receivedAttractions);

    },
    computed: {
        // 计算总页数
        pageCount() {
            this.totalItems = this.searchMatchList.length;
            this.totalPage = Math.ceil(this.totalItems / this.pageSize);
            return this.totalPage;
        },
        // 计算当前页的数据
        currentPageData() {
            const allData = this.searchMatchList;
            // 根据当前页和每页的条数计算数据的起始和结束索引
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = this.pageSize < this.searchMatchList.length - startIndex ? this.pageSize + startIndex : this.searchMatchList.length;

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
        initializeData() {
            axios
                .get('/Attraction/searchmatch?keyWord=' + this.receivedAttractions)
                .then((response) => {
                    this.searchMatchList = response.data.searchmatchlist;
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },
        handleMenuSelect(index) {
            this.activeMenu = index-1;//和后端对应
            console.log(this.activeMenu);
            // 在这里处理菜单项点击事件，可以进行页面跳转或其他操作
        },
        // 这里是匹配，如果后端写逻辑就不要
        // filterSearchResults(keywords) {
        //     this.searchMatchList = this.searchlist.filter(item => {
        //         return (
        //             item.title.includes(keywords) || 
        //             item.location.includes(keywords) 
        //         );
        //     });
        // },
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
};
</script>
  
<style>
.noneresult {
    font-size: 14px;
    margin: 20px 0;
    color: #999;

}

/* 选择排序 */
.searchicon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}
.searchimg{
    position: fixed;
    top:200px;
    left: 5px;
    width: 250px;
    height: 350px;
    z-index: 100;
}
.imgbottom{
    width: 210px;
    height: 7px;
    border-radius: 3px;
    background-color: #a7b3e9;
    position: fixed;
    top:425px;
    left: 10px;
    opacity: 0.5;
}
.el-menu-vertical-demo {
    font-weight: bold;
    letter-spacing: 1px;
}
.el-menu .el-menu-item:hover{
    outline: 0 !important;
    color: #8097FD !important;
    background: linear-gradient(270deg, #F2F7FC 0%, #FEFEFE 100%)!important;
}

.el-menu-item.is-active {
    background-color: #eef0fe !important;
    color: #fff;

    span {
        color: #fff !important;
    }
}

.container {
    display: flex;

}

.tolnum {
    display: flex;
    margin-left: 30px;
    margin-top:10px;
    font-size: 14px;
    font-weight: bold;
}

.rightcontainer {
    width: 15%;
    margin-top: 50px;
    position: fixed;
    /* 将 .rightcontainer 固定在屏幕中 */
    left: 20px;
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
}</style>
  