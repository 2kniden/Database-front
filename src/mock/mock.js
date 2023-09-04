const Mock = require('mockjs')

// 是否使用mock.js模拟数据
let useMock = true;
// 这里有问题
if (useMock) {
    // 热门景点
    Mock.mock(/Attraction\/recommendAttr\?attr_position=.*/, 'get', {
        recommendList: [{
            id: 1,
            picsrc: require('../assets/attractions/recommendpic/disney.png'),
            title: '迪士尼',
        },
        {
            id: 2,
            picsrc: require('../assets/attractions/recommendpic/disney.png'),
            title: '迪士尼',
        }, {
            id: 3,
            picsrc: require('../assets/attractions/recommendpic/disney.png'),
            title: '迪士尼',
        },
        {
            id: 4,
            picsrc: require('../assets/attractions/recommendpic/disney.png'),
            title: '迪士尼',
        },]
    })
    // 高分推荐部分
    Mock.mock(/Attraction\/highrank\?attr_position=.*/, 'get', {
        highrankList: [{
            id: 1,
            title: '景点名称景点名称景点名称',
            picsrc: require('../assets/attractions/highrank/1.jpg'),
            score: '4.9',
            dec: '上海市浦东新区川沙新镇黄赵路310号',
        }, {
            id: 2,
            title: '景点名称景点名称景点名称',
            picsrc: require('../assets/attractions/highrank/2.jpg'),
            score: '4.9',
            dec: '上海市浦东新区川沙新镇黄赵路310号',
        }, {
            id: 3,
            title: '景点名称景点名称景点名称',
            picsrc: require('../assets/attractions/highrank/3.jpg'),
            score: '4.9',
            dec: '上海市浦东新区川沙新镇黄赵路310号',
        }, {
            id: 4,
            title: '景点名称景点名称景点名称',
            picsrc: require('../assets/attractions/highrank/4.jpg'),
            score: '4.9',
            dec: '上海市浦东新区川沙新镇黄赵路310号',
        }, {
            id: 5,
            title: '景点名称景点名称景点名称',
            picsrc: require('../assets/attractions/highrank/5.jpg'),
            score: '4.9',
            dec: '上海市浦东新区川沙新镇黄赵路310号',
        }, {
            id: 6,
            title: '景点名称景点名称景点名称',
            picsrc: require('../assets/attractions/highrank/6.jpg'),
            score: '4.9',
            dec: '上海市浦东新区川沙新镇黄赵路310号',
        },]
    })
    // 搜索列表获取默认展示数据
    Mock.mock('/Attraction/getsearchdata/', 'get', {
        loadalldata: [
            { "value": "三全鲜食（北新泾店）", "address": "上海" },
            { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海" },
            { "value": "新旺角茶餐厅", "address": "上海" },
            { "value": "泷千家(天山西路店)", "address": "上海" },
            { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海" },
            { "value": "贡茶", "address": "上海" },
            { "value": "豪大大香鸡排超级奶爸", "address": "上海" },
            { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海" },
            { "value": "十二泷町", "address": "上海" },
            { "value": "星移浓缩咖啡", "address": "上海" },
            { "value": "阿姨奶茶/豪大大", "address": "北京" },
            { "value": "新麦甜四季甜品炸鸡", "address": "北京" },
            { "value": "Monica摩托主题咖啡店", "address": "北京" },
            { "value": "浮生若茶（凌空soho店）", "address": "北京" },
            { "value": "NONO JUICE  鲜榨果汁", "address": "北京" },
            { "value": "CoCo都可(北新泾店）", "address": "北京" },
            { "value": "快乐柠檬（神州智慧店）", "address": "北京" },
            { "value": "Merci Paul cafe", "address": "北京" },
            { "value": "猫山王（西郊百联店）", "address": "北京" },
            { "value": "枪会山", "address": "广州" },
            { "value": "纵食", "address": "广州" },
            { "value": "钱记", "address": "广州" },
            { "value": "壹杯加", "address": "广州" },
            { "value": "唦哇嘀咖", "address": "广州" },
            { "value": "爱茜茜里(西郊百联)", "address": "广州" },
            { "value": "爱茜茜里(近铁广场)", "address": "广州" },
            { "value": "鲜果榨汁（金沙江路和美广店）", "address": "广州" },
            { "value": "开心丽果（缤谷店）", "address": "广州" },
            { "value": "超级鸡车（丰庄路店）", "address": "广州" },
            { "value": "妙生活果园（北新泾店）", "address": "广州" },
            { "value": "香宜度麻辣香锅", "address": "南京" },
            { "value": "凡仔汉堡（老真北路店）", "address": "南京" },
            { "value": "港式小铺", "address": "南京" },
            { "value": "蜀香源麻辣香锅（剑河路店）", "address": "南京" },
            { "value": "北京饺子馆", "address": "南京" },
            { "value": "饭典*新简餐（凌空SOHO店）", "address": "南京" },
            { "value": "焦耳·川式快餐（金钟路店）", "address": "南京" },
            { "value": "动力鸡车", "address": "南京" },
            { "value": "浏阳蒸菜", "address": "南京" },
            { "value": "四海游龙（天山西路店）", "address": "南京" },
            { "value": "樱花食堂（凌空店）", "address": "江西" },
            { "value": "壹分米客家传统调制米粉(天山店)", "address": "江西" },
            { "value": "福荣祥烧腊（平溪路店）", "address": "江西" },
            { "value": "速记黄焖鸡米饭", "address": "江西" },
            { "value": "红辣椒麻辣烫", "address": "江西" },
            { "value": "(小杨生煎)西郊百联餐厅", "address": "江西" },
            { "value": "阳阳麻辣烫", "address": "江西" },
            { "value": "南拳妈妈龙虾盖浇饭", "address": "江西" }]
    })
    // 匹配搜索内容列表
    Mock.mock(/Attraction\/searchmatch\?keyWord=.*/, 'get', {
        searchmatchlist: [{
            id: 1,
            pic: require('../assets/attractions/highrank/1.jpg'),
            title: '外滩1',
            location: '北京市浦东新区川沙新镇黄赵路310号',
            score: '4.6',
            commentnum: '1234',
            username: 'user1',
            commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
        }, {
            id: 2,
            pic: require('../assets/attractions/highrank/2.jpg'),
            title: '外滩2',
            location: '北京市浦东新区川沙新镇黄赵路310号',
            score: '4.6',
            commentnum: '1234',
            username: 'user1',
            commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
        }, {
            id: 3,
            pic: require('../assets/attractions/highrank/3.jpg'),
            title: '横沙岛',
            location: '上海市浦东新区川沙新镇黄赵路310号',
            score: '4.6',
            commentnum: '1234',
            username: 'user1',
            commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
        }, {
            id: 4,
            pic: require('../assets/attractions/highrank/4.jpg'),
            title: '外滩',
            location: '上海市浦东新区川沙新镇黄赵路310号',
            score: '4.6',
            commentnum: '1234',
            username: 'user1',
            commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
        }, {
            id: 5,
            pic: require('../assets/attractions/highrank/6.jpg'),
            title: '外滩',
            location: '上海市浦东新区川沙新镇黄赵路310号',
            score: '4.6',
            commentnum: '1234',
            username: 'user1',
            commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
        }, {
            id: 6,
            pic: require('../assets/attractions/highrank/1.jpg'),
            title: '外滩',
            location: '上海市浦东新区川沙新镇黄赵路310号',
            score: '4.6',
            commentnum: '1234',
            username: 'user1',
            commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
        }, {
            id: 7,
            pic: require('../assets/attractions/highrank/1.jpg'),
            title: '外滩',
            location: '上海市浦东新区川沙新镇黄赵路310号',
            score: '4.6',
            commentnum: '1234',
            username: 'user1',
            commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
        }, {
            id: 8,
            pic: require('../assets/attractions/highrank/1.jpg'),
            title: '外滩',
            location: '上海市浦东新区川沙新镇黄赵路310号',
            score: '4.6',
            commentnum: '1234',
            username: 'user1',
            commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
        }, {
            id: 9,
            pic: require('../assets/attractions/highrank/1.jpg'),
            title: '外滩',
            location: '上海市浦东新区川沙新镇黄赵路310号',
            score: '4.6',
            commentnum: '1234',
            username: 'user1',
            commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
        }, {
            id: 10,
            pic: require('../assets/attractions/highrank/1.jpg'),
            title: '外滩',
            location: '上海市浦东新区川沙新镇黄赵路310号',
            score: '4.6',
            commentnum: '1234',
            username: 'user1',
            commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
        }, {
            id: 11,
            pic: require('../assets/attractions/highrank/1.jpg'),
            title: '外滩1',
            location: '上海市浦东新区川沙新镇黄赵路310号',
            score: '4.6',
            commentnum: '1234',
            username: 'user1',
            commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
        }, {
            id: 12,
            pic: require('../assets/attractions/highrank/2.jpg'),
            title: '外滩',
            location: '上海市浦东新区川沙新镇黄赵路310号',
            score: '4.6',
            commentnum: '1234',
            username: 'user1',
            commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
        }, {
            id: 13,
            pic: require('../assets/attractions/highrank/3.jpg'),
            title: '外滩',
            location: '上海市浦东新区川沙新镇黄赵路310号',
            score: '4.6',
            commentnum: '1234',
            username: 'user1',
            commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
        }, {
            id: 14,
            pic: require('../assets/attractions/highrank/4.jpg'),
            title: '外滩',
            location: '上海市浦东新区川沙新镇黄赵路310号',
            score: '4.6',
            commentnum: '1234',
            username: 'user1',
            commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
        }, {
            id: 15,
            pic: require('../assets/attractions/highrank/6.jpg'),
            title: '外滩',
            location: '上海市浦东新区川沙新镇黄赵路310号',
            score: '4.6',
            commentnum: '1234',
            username: 'user1',
            commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
        }, {
            id: 16,
            pic: require('../assets/attractions/highrank/1.jpg'),
            title: '外滩',
            location: '上海市浦东新区川沙新镇黄赵路310号',
            score: '4.6',
            commentnum: '1234',
            username: 'user1',
            commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
        }, {
            id: 17,
            pic: require('../assets/attractions/highrank/3.jpg'),
            title: '外滩',
            location: '上海市浦东新区川沙新镇黄赵路310号',
            score: '4.6',
            commentnum: '1234',
            username: 'user1',
            commentdetail: '我是user1的点评我是user1的点评我是user1的点评我是user1的点评我是user1的点评',
        }],
    })
    // 景点处评论列表展示
    Mock.mock(/Attraction\/getcommentdata\?attraction_id=.*/, 'get', {
        // 这里删除评论的地方不确定
        commentlist: [{
            commentid: 1,
            userlog: require("../assets/attractions/highrank/1.jpg"),
            username: "吃掉米麻薯的头",
            avgscore: "4.9",
            detail: "我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论",
            commentDate: "2023-01-01 12:34",
            likes: 23,
            unlikes: 23,
            picList: [
                require("../assets/attractions/highrank/1.jpg"),
                require("../assets/attractions/highrank/2.jpg"),
                require("../assets/attractions/highrank/3.jpg")
            ]
        }, {
            commentid: 2,
            userlog: require("../assets/attractions/highrank/1.jpg"),
            username: "吃掉米麻薯的头",
            avgscore: "4.9",
            detail: "我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论",
            commentDate: "2023-01-01 12:34",
            likes: 23,
            unlikes: 23,

        }, {
            commentid: 3,
            userlog: require("../assets/attractions/highrank/1.jpg"),
            username: "吃掉米麻薯的头",
            avgscore: "4.9",
            detail: "我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论",
            commentDate: "2023-01-01 12:34",
            likes: 23,
            unlikes: 23,
            picList: [
                require("../assets/attractions/highrank/1.jpg"),
                require("../assets/attractions/highrank/2.jpg"),
                require("../assets/attractions/highrank/3.jpg")
            ]
        }, {
            commentid: 4,
            userlog: require("../assets/attractions/highrank/1.jpg"),
            username: "吃掉米麻薯的头",
            avgscore: "4.9",
            detail: "我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论",
            commentDate: "2023-01-01 12:34",
            likes: 23,
            unlikes: 23,
            picList: [
                require("../assets/attractions/highrank/1.jpg"),
                require("../assets/attractions/highrank/2.jpg"),
                require("../assets/attractions/highrank/3.jpg")
            ]
        }, {
            commentid: 5,
            userlog: require("../assets/attractions/highrank/1.jpg"),
            username: "吃掉米麻薯的头",
            avgscore: "4.9",
            detail: "我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论",
            commentDate: "2023-01-01 12:34",
            likes: 23,
            unlikes: 23,
            picList: [
                require("../assets/attractions/highrank/1.jpg"),
                require("../assets/attractions/highrank/2.jpg"),
                require("../assets/attractions/highrank/3.jpg")
            ]
        }, {
            commentid: 6,
            userlog: require("../assets/attractions/highrank/1.jpg"),
            username: "吃掉米麻薯的头",
            avgscore: "4.9",
            detail: "我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论",
            commentDate: "2023-01-01 12:34",
            likes: 23,
            unlikes: 23,
            picList: [
                require("../assets/attractions/highrank/1.jpg"),
                require("../assets/attractions/highrank/2.jpg"),
                require("../assets/attractions/highrank/3.jpg")
            ]
        }, {
            commentid: 7,
            userlog: require("../assets/attractions/highrank/1.jpg"),
            username: "吃掉米麻薯的头",
            avgscore: "4.9",
            detail: "我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论",
            commentDate: "2023-01-01 12:34",
            likes: 23,
            unlikes: 23,
            picList: [
                require("../assets/attractions/highrank/1.jpg"),
                require("../assets/attractions/highrank/2.jpg"),
                require("../assets/attractions/highrank/3.jpg")
            ]
        }, {
            commentid: 8,
            userlog: require("../assets/attractions/highrank/1.jpg"),
            username: "吃掉米麻薯的头",
            avgscore: "4.9",
            detail: "我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论",
            commentDate: "2023-01-01 12:34",
            likes: 23,
            unlikes: 23,
            picList: [
                require("../assets/attractions/highrank/1.jpg"),
                require("../assets/attractions/highrank/2.jpg"),
                require("../assets/attractions/highrank/3.jpg")
            ]
        },]

    })
    // 景点处评论列表展示
    Mock.mock(/Attraction\/getweatherdata\?attraction_id=.*/, 'get', {
        weatherlist: {
            weather: '晴',
            temNow: 18,
            temHigh: 23,
            temLow: 15,
        }

    })
    // 景点处评论列表展示
    Mock.mock(/Attraction\/getjournaldata\?attraction_id=.*/, 'get', {

        journallist: [{
            journalid: 1,
            userName: '吃掉米麻薯的头',
            userSrc: require('../assets/attractions/recommendpic/hengsha.png'),
            position: '上海',
            axisnum: 3,
            axispic: require('../assets/attractions/highrank/6.jpg'),
            tag: ['家庭', '亲子', '度假'],
            title: '上海周末家庭旅行的好去处？浦东这3个小众旅游地我逢人必推！',
            picSrc: require('../assets/attractions/highrank/5.jpg'),
            posterDate: '2022年12月04日',
            like: 1231,
            collect: 1234,
        }, {
            journalid: 2,
            userName: '吃掉米麻薯的头',
            userSrc: require('../assets/attractions/recommendpic/hengsha.png'),
            position: '上海',
            axisnum: 3,
            axispic: require('../assets/attractions/highrank/6.jpg'),
            tag: ['家庭', '亲子', '度假'],
            title: '上海周末家庭旅行的好去处？浦东这3个小众旅游地我逢人必推！',
            picSrc: require('../assets/attractions/highrank/5.jpg'),
            posterDate: '2022年12月04日',
            like: 1231,
            collect: 1234,
        }, {
            journalid: 3,
            userName: '吃掉米麻薯的头',
            userSrc: require('../assets/attractions/recommendpic/hengsha.png'),
            position: '上海',
            axisnum: 3,
            axispic: require('../assets/attractions/highrank/6.jpg'),
            tag: ['家庭', '亲子', '度假'],
            title: '上海周末家庭旅行的好去处？浦东这3个小众旅游地我逢人必推！',
            picSrc: require('../assets/attractions/highrank/5.jpg'),
            posterDate: '2022年12月04日',
            like: 1231,
            collect: 1234,
        }, {
            journalid: 4,
            userName: '吃掉米麻薯的头',
            userSrc: require('../assets/attractions/recommendpic/hengsha.png'),
            position: '上海',
            axisnum: 3,
            axispic: require('../assets/attractions/highrank/6.jpg'),
            tag: ['家庭', '亲子', '度假'],
            title: '上海周末家庭旅行的好去处？浦东这3个小众旅游地我逢人必推！',
            picSrc: require('../assets/attractions/highrank/5.jpg'),
            posterDate: '2022年12月04日',
            like: 1231,
            collect: 1234,
        }, {
            journalid: 5,
            userName: '吃掉米麻薯的头',
            userSrc: require('../assets/attractions/recommendpic/hengsha.png'),
            position: '上海',
            axisnum: 3,
            axispic: require('../assets/attractions/highrank/6.jpg'),
            tag: ['家庭', '亲子', '度假'],
            title: '上海周末家庭旅行的好去处？浦东这3个小众旅游地我逢人必推！',
            picSrc: require('../assets/attractions/highrank/5.jpg'),
            posterDate: '2022年12月04日',
            like: 1231,
            collect: 1234,
        }, {
            journalid: 6,
            userName: '吃掉米麻薯的头',
            userSrc: require('../assets/attractions/recommendpic/hengsha.png'),
            position: '上海',
            axisnum: 3,
            axispic: require('../assets/attractions/highrank/6.jpg'),
            tag: ['家庭', '亲子', '度假'],
            title: '上海周末家庭旅行的好去处？浦东这3个小众旅游地我逢人必推！',
            picSrc: require('../assets/attractions/highrank/5.jpg'),
            posterDate: '2022年12月04日',
            like: 1231,
            collect: 1234,
        }, {
            journalid: 7,
            userName: '吃掉米麻薯的头',
            userSrc: require('../assets/attractions/recommendpic/hengsha.png'),
            position: '上海',
            axisnum: 3,
            axispic: require('../assets/attractions/highrank/6.jpg'),
            tag: ['家庭', '亲子', '度假'],
            title: '上海周末家庭旅行的好去处？浦东这3个小众旅游地我逢人必推！',
            picSrc: require('../assets/attractions/highrank/5.jpg'),
            posterDate: '2022年12月04日',
            like: 1231,
            collect: 1234,
        }, {
            journalid: 8,
            userName: '吃掉米麻薯的头',
            userSrc: require('../assets/attractions/recommendpic/hengsha.png'),
            position: '上海',
            axisnum: 3,
            axispic: require('../assets/attractions/highrank/6.jpg'),
            tag: ['家庭', '亲子', '度假'],
            title: '上海周末家庭旅行的好去处？浦东这3个小众旅游地我逢人必推！',
            picSrc: require('../assets/attractions/highrank/5.jpg'),
            posterDate: '2022年12月04日',
            like: 1231,
            collect: 1234,
        }, {
            journalid: 9,
            userName: '吃掉米麻薯的头',
            userSrc: require('../assets/attractions/recommendpic/hengsha.png'),
            position: '上海',
            axisnum: 3,
            axispic: require('../assets/attractions/highrank/6.jpg'),
            tag: ['家庭', '亲子', '度假'],
            title: '上海周末家庭旅行的好去处？浦东这3个小众旅游地我逢人必推！',
            picSrc: require('../assets/attractions/highrank/5.jpg'),
            posterDate: '2022年12月04日',
            like: 1231,
            collect: 1234,
        }]

    })
    // 景点门票部分展示
    Mock.mock(/Attraction\/getticket\?attraction_id=.*&date=.*/, 'get', {
        // 这里删除评论的地方不确定
        ticketlist: [{
            ticketid: 1,
            titleint: 0,//这里根据数据0-成人、1-学生、2-老人//还有分别的购票标准standard
            isCollectedint: 1,//是否需要取票（对应可取票、不可取票标签展示）
            isRefundint: 0,//是否可退：0-不可退、1-可退（对应了可退票、不可退票标签展示）
            availabledays: 30,//可选票未来天数
            // 下面都是三种的:票价
            price: 689,
            // 购买数量
            buynum: 4000,
        }, {
            ticketid: 2,
            titleint: 1,//这里根据数据0-成人、1-学生、2-老人//还有分别的购票标准standard
            isCollectedint: 0,//是否需要取票（对应可取票、不可取票标签展示）
            isRefundint: 1,//是否可退：0-不可退、1-可退（对应了可退票、不可退票标签展示）
            availabledays: 30,//可选票未来天数
            // 下面都是三种的:票价
            price: 689,
            // 购买数量
            buynum: 4000,
        }, {
            ticketid: 3,
            titleint: 2,//这里根据数据0-成人、1-学生、2-老人//还有分别的购票标准standard
            isCollectedint: 1,//是否需要取票（对应可取票、不可取票标签展示）
            isRefundint: 1,//是否可退：0-不可退、1-可退（对应了可退票、不可退票标签展示）
            // 下面都是三种的:票价
            price: 689,
            // 购买数量
            buynum: 4000,
        }],

    })
    // 景点详情部分展示：图片信息、景点介绍、景点简介、景点票价但是逻辑还没有处理好所以先不动
    Mock.mock(/Attraction\/getattrdata\?attraction_id=.*/, 'get', {
        declist: {
            // 轮播图
            slides: [
                require("../assets/attractions/highrank/1.jpg"),
                require("../assets/attractions/highrank/2.jpg"),
                require("../assets/attractions/highrank/3.jpg"),
            ],
            // 景点介绍
            title: "上海迪士尼度假区",
            score: 4.9,
            commentnum: 1234,
            location: "上海市浦东新区川沙新镇黄赵路310号",
            weekday: "9:00-21:00",
            weekend: "8:00-22:00",
            phone: "13880235123",
            price: 689,
            // 景点详情
            attrdetail: '我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介',
            // 这里可以直接获取date
            date: "08-24",
            availabledays: 20,
        },

    })
    // 发布评论相关的所有测试接口
    // 用户表，这里先就返回名字和用户头像

    // 写评论
    Mock.mock('/Attraction/postComments/', 'post', (options) => {
        console.log(options.body);
        return {
            comment_id: "12345678",//这个先写死
            status: true,
        };
    })


}



export default Mock