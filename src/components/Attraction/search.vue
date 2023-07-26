<template>
    <!-- 搜索函数 -->
    <el-input placeholder="请输入内容" v-model="input" clearable @input="handleQuery" @focus="showDropdown" @blur="hideDropdown">
    </el-input>
    <!-- 展示搜索动态匹配结果 -->
    <!-- 这里逻辑还没写 -->
</template>

<script>
export default {
    data() {
        return {
            input: '',
            // 写死搜索数据方便实验
            showResults: false,
            searchResults: [
                { id: 1, name: "Result 1" },
                { id: 2, name: "Result 2" },
                { id: 3, name: "Result 3" },
                // Add more example data here
            ],

        }
    },
    methods: {
        handleQuery(res) {
            // console.log(res);

        },
        
    }
}
</script>

