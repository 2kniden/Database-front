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
            <div class="tolnum">共123455条</div>
            <!-- 搜索景点缩览图 -->
            <div>
                <SearchView v-for="item in searchlist" :key="item.id" 
                :picsrc="item.pic"
                :title="item.title"
                :location="item.location"
                :score="item.score"
                :commentnum="item.commentnum"
                :username="item.username"
                :commentdetail="item.commentdetail"></SearchView>
                
            </div>
            <div class="endword">
                <div class="endright">1-10/12355条</div>
                <div class="endleft">
                    <div class="eltabs">
                        <!-- 使用 el-tabs 组件这里不知道为什么有点问题 -->
                        <el-tabs v-model="activeTab" @tab-click="handleTabClick">
                            <el-tab-pane label="上一页" name="1"></el-tab-pane>
                            <el-tab-pane label="1" name="2"></el-tab-pane>
                            <el-tab-pane label="2" name="3"></el-tab-pane>
                            <el-tab-pane label="3" name="4"></el-tab-pane>
                            <el-tab-pane label="4" name="5"></el-tab-pane>
                            <el-tab-pane label="5" name="6"></el-tab-pane>
                            <el-tab-pane label="下一页" name="7"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="tolpage">1234页</div>
                </div>

            </div>

        </div>
    </div>
</template>
  
<script>
import SearchView from '../../components/Attraction/searchview.vue'
export default {
    components: {
        SearchView,
    },
    data() {
        return {
            // 导航栏
            activeMenu: 'home-1',
            isMenuCollapse: false,
            // 下方选项卡设置默认选中的选项卡为 "2"
            activeTab: "2", 
            showTabContent: false, // 初始设置选项卡内容不显示
            //搜索内容列表
            searchlist: [{
                id: 1,
                pic: require('../../assets/attractions/highrank/1.jpg'),
                title: '外滩',
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
            },{
                id: 8,
                pic: require('../../assets/attractions/highrank/1.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            },{
                id: 9,
                pic: require('../../assets/attractions/highrank/1.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            },{
                id: 10,
                pic: require('../../assets/attractions/highrank/1.jpg'),
                title: '外滩',
                location: '上海市浦东新区川沙新镇黄赵路310号',
                score: '4.6',
                commentnum: '1234',
                username: 'user1',
                commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
            },],
            // 评分系统
            rating: 4.5,
        };
    },
    methods: {
        handleMenuSelect(index) {
            this.activeMenu = index;
            // 在这里处理菜单项点击事件，可以进行页面跳转或其他操作
        },
        // 星星评分

    },
};
</script>
  
<style>
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
}</style>
  