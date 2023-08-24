<template>
    <el-autocomplete class="inline-input" v-model="state1" :fetch-suggestions="querySearch" placeholder="请输入内容"
        @select="handleSelect" @clear="clearInput" @focus="showTopResults"></el-autocomplete>
    <el-button type="primary" plain color="#8097FD" @click="search">
        搜索
    </el-button>
</template>
<script>
import axios from 'axios';
export default {
    mounted() {
        this.initializeData();
    },
    data() {
        return {
            //这里是所有数据
            allattr: [],
            // 这里下面呈现10条数据
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
        initializeData() {
            // 获取搜索景区的所有数据
            axios
                .get('/Attraction/getsearchdata/')
                .then((response) => {
                    this.allattr = response.data.loadalldata;
                    // console.log(this.allattr)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },
        showTopResults() {
            // 获取焦点时
            this.attractions = this.allattr.slice(0, 10);
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

        ToSearchList() {
            //传过去接收到的参数

            this.$router.push({ name: 'attractionsearchs', query: { selectedAttractions: this.selectedAttractions } });
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
    
}
</script>