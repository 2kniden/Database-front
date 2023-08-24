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

}

export default Mock