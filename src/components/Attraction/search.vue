<template>
    <el-autocomplete class="inline-input" v-model="state1" :fetch-suggestions="querySearch" placeholder="请输入内容"
        @select="handleSelect" @clear="clearInput" @focus="showTopResults"></el-autocomplete>
    <el-button type="primary" plain color="#8097FD" @click="search">
        搜索
    </el-button>
</template>
<script>
export default {
    data() {
        return {
            // 这里默认先呈现20个
            attractions: [],
            selectedAttractions: '',//这个保存关键词，如果选中了一个就直接传递进来景区名字就可以，关键词东西要传到searchlist里面的
            //显示哪个数据
            state1: '',
            state2: '',
        };
    },
    // 这里暂时不知道怎么渲染上去
    computed: {
        formattedStates() {
            // 限制 state1 最多显示6个字，多余的部分用省略号表示
            const truncatedState1 = this.state1.length > 6 ? this.state1.slice(0, 6) + '...' : this.state1;
            // 拼接 state1 和 state2，并使用空格分开
            return `${truncatedState1} ${this.state2}`;
        }
    },
    methods: {
        showTopResults() {
            // 获取焦点时展示前10条数据
            this.attractions = this.loadAll().slice(0, 10);
        },
        querySearch(queryString, cb) {
            var attractions = this.attractions;
            var results = queryString ? attractions.filter(this.createFilter(queryString)) : attractions;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (attraction) => {
                // 修改这里的逻辑，判断value或address中包含queryString即可匹配
                const lowerQueryString = queryString.toLowerCase();
                return (
                    attraction.value.toLowerCase().includes(lowerQueryString) ||
                    attraction.address.toLowerCase().includes(lowerQueryString)
                );
            };
        },
        loadAll() {
            return [
                //这里就放你选择的地点里面的从前往后排序的景点吧，这里给20个选项

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
                { "value": "南拳妈妈龙虾盖浇饭", "address": "江西" }
            ];
        },
        ToSearchList() {
            //传过去接收到的参数

            this.$router.push({ path: "/attraction-search", name: 'attractionsearchs', params: { selectedAttractions: this.selectedAttractions } });
        },
        clearInput() {
            this.selectedAttractions = [];
        },
        handleSelect(item) {
            if (item) {
                this.selectedAttractions = '';
                this.selectedAttractions = item.value;
                console.log(this.selectedAttractions);
                this.$nextTick(() => {
                    this.ToSearchList();
                });
            }
            //选择了某个选项，确保在DOM更新后进行跳转

        },
        search() {
            if (this.state1.trim() !== '') {
                // 清空selectedAttractions数组
                this.selectedAttractions = '';
                this.selectedAttractions = this.state1.trim();
                console.log(this.selectedAttractions);

                // 使用this.$nextTick确保在DOM更新后执行路由跳转
                this.$nextTick(() => {
                    this.ToSearchList();
                });
            } else {
                // 输入框为空时触发消息提示
                this.$message.error('输入不能为空');
            }
            //或者点击了搜索键且搜索值不为空，进行跳转

        },

    },
    mounted() {
        this.attractions = this.loadAll();
    }
}
</script>