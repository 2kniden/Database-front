<template>
    <!-- “我的日志”背景 -->
    <div class="my-journal-BG">
        <div class="operation-display clearfix">
            <div class="post">
                <el-button class="postbtn"
                round native-type="submit" 
                @click="postJournal()">新建日志</el-button>
            </div>

            <div class="search">
                <el-input
                v-model="input"
                class="w-10 m-2"
                type="text" clearable
                placeholder="快来找找感兴趣的日志吧"
                @keyup.enter="submitSearchText"
                />

                <el-button class="searchbtn"
                round native-type="submit" 
                @click="submitSearchText">搜索</el-button>
            </div>
        </div>
        <div class="journal-display">
            <JournalCardsList :pageSize="mjpagesize" v-model:keyword="mjcurKeyword" :ifInation="mjtoInation" :urlHeader="mjurl"></JournalCardsList>
        </div>
    </div>

    <div class="map-display-BG">
        <div class="map-display">
            <p>这里尝试插入地图</p>
        </div>
        <div class="map-img-display">
            <img class="map-bgimg" src="@/assets/journal/myJournal_map.png">
        </div>
    </div>
</template>

<script setup>
import JournalCardsList from "@/components/JournalCardsList.vue"
import { ref } from "vue"
import { useRouter } from "vue-router"

//需要传递给卡片展示子组件的信息
const mjtoInation = ref(true);
const mjpagesize = ref(6);
let mjcurKeyword = ref("");
// 这里应该请求当前用户的ID，先暂时写死
const userID = ref("843526A2B7784E73B28E73C797A2C81C");
const mjurl = ref("/api/Journals/user/page/"+ userID.value);
const input = ref("");
// 这些数据都是以v-bind的形式单向绑定的；即父组件检测到这些组件变化后，会相应修改子组件中的对应参数

//search
// 当检测到用户查询时，需要重新渲染子组件中的卡片列表，即调用子组件函数
function submitSearchText() {
  if (input.value != ''){
    mjcurKeyword.value = input.value;
    console.log("curKeyword=",mjcurKeyword.value);
    // 清空input框
    input.value ='';
    // getCardLists();
  }
  else{
    console.log("请在搜索框中输入一个值！");
  }
}

//post
const toPost=useRouter()
const postJournal = () => {
    toPost.push({
        path:"/Journal/PostJournal"
    })
}
</script>

<style scoped>
* {
    padding:0;
    margin:0;
}

.clearfix::before,.clearfix::after{
    content:"";
    display: block;
}

.clearfix::after{
    clear:both;
}

/********* "我的日志"展示区背景 ********/
.my-journal-BG {
    float:left;
    border-radius: 20px;
    background-color: rgba(255,255,255,0.5);
    width:730px;
    height:540px;
}

    /* 搜索框、新建日志行样式*/
    .operation-display {
        position: relative;
        top: 20px;
    }

        /* 搜索框样式 */
        .search {
            position: relative;
            left:45px;
        }
        .el-input.w-10.m-2 {
            float:left;
            width:280px;
        }
        ::v-deep .el-input__wrapper {
            border-radius: 20px;
            box-shadow: 1px 3px 5px #8097FD;
        }
        button.el-button.is-round.searchbtn {
            float:left;
            position:relative;
            left:-85px;
            width:85px;
            height:32px;
            color: #FFFFFF;
            background-color: #6d88fe;
            box-shadow: 1px 3px 5px #8097FD;
        }

        button.el-button.is-round.searchbtn:hover {
            opacity: 0.8;
        }

        /* 发布日志样式 */
        button.el-button.is-round.postbtn{
            position: relative;
            left:20px;
            float:left;
            background-color: #6d88fe;
            box-shadow: 1px 3px 5px #8097FD;
            color: #FFFFFF;
            height:32px;
        }

        button.el-button.is-round.postbtn:hover {
            opacity: 0.8;
        }

    /* 卡片展示区样式 */
    .journal-display {
        position: relative;
        top: 40px;
        left: 46px;
    }
    ::v-deep .cards-list {
        height:400px;
    }

    ::v-deep .cards {
        margin-right: 45px;
        margin-bottom: 30px;
        /* margin-bottom: 20px; */
    }

    ::v-deep .pgination-area {
        width: 650px;
        align-items: center;
        display: flex;
        justify-content: center;
    }



/* 地图展示区背景 */
.map-display-BG {
    position: relative;
    background-color: #FFFFFF;
    /* margin:0 0 0 30px; */
    left:30px;
    float:left;
    width:270px;
    border-radius: 20px;
    height:540px;
}

.map-display {
    position:relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px;
    max-width:270px;
    max-height: 250px;
    background-color: black;
}

.map-img-display {
    position: relative;
    padding: 15px;
}

</style>