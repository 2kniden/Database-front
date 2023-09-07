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

            <el-select v-model="value" value-key="id" placeholder="列表展示方式"
            @change="changeDisplayType(value)"
            style="left: 400px;top: 35px;">
                <el-option
                    v-for="item in displayOptions"
                    :key="item.id"
                    :label="item.label"
                    :value="item"
                />
            </el-select>
        </div>
        <div class="journal-display">
            <JournalCardsList :pageSize="mjpagesize" v-model:keyword="mjcurKeyword" :ifInation="mjtoInation" :readerID="mjreaderId" :authorID="mjauthorId" :displayType="mjdisplayType"></JournalCardsList>
        </div>
    </div>

    <!-- <div class="map-display-BG">
        <div class="map-display">
            <p>这里尝试插入地图</p>
        </div>
        <div class="map-img-display">
            <img class="map-bgimg" src="@/assets/journal/myJournal_map.png">
        </div>
    </div> -->
</template>

<script setup>
import JournalCardsList from "@/components/JournalCardsList.vue"
import { ref } from "vue"
import { useRouter } from "vue-router"

//需要传递给卡片展示子组件的信息
const mjtoInation = ref(true);
const mjpagesize = ref(8);
let mjcurKeyword = ref("");
const mjdisplayType = ref("1");
// 这里应该请求当前用户的ID，先暂时写死
// reader和全部日志的author应该是同一个人
const mjreaderId = ref("843526A2B7784E73B28E73C797A2C81C");
const mjauthorId = ref("843526A2B7784E73B28E73C797A2C81C");
const input = ref("");
// 这些数据都是以v-bind的形式单向绑定的；即父组件检测到这些组件变化后，会相应修改子组件中的对应参数

const value = ref({
  id:"0",
  label:"全部日志"
})
const displayOptions = ref([
    {
        id:"0",
        label:"全部日志"
    },
    {
        id:"1",
        label:"正常显示",
    },
    {
        id:"2",
        label:"最近发布",
    },
    {
        id:"3",
        label:"最多点赞",
    },
    {
        id:"4",
        label:"最多收藏",
    },
    {
        id:"5",
        label:"最多浏览",
    },
    {
        id:"6",
        label:"只查看公开日志",
    },
    {
        id:"7",
        label:"只查看私密日志",
    }
]);

//search
// 当检测到用户查询时，需要重新渲染子组件中的卡片列表，即调用子组件函数
function submitSearchText() {
  if (input.value != ''){
    // 用户想通过关键词查询
    // 则改变关键词，默认按照正常显示展示
    mjcurKeyword.value = input.value;
    value.value = {
      id:"1",
      label:"正常显示"
    }
    mjdisplayType.value = "1";
  }
  else{
    console.log("请在搜索框中输入一个值！");
  }
}

// 改变查询类型
function changeDisplayType(value) {
    if(value.id === "0") {
        // 说明用户此时想查询全部日志,那么改变请求参数，并清空关键词
        mjdisplayType.value = "1";
        mjcurKeyword.value = "";
        // 清空输入框
        input.value ='';
    }
    else {
        mjdisplayType.value = value.id;
    }
}

//post
const toPost=useRouter()
const postJournal = () => {
    toPost.push({
        path:"/Journal/PostJournal",
        qeury:{
            mode:"post"
        }
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
  /* 如果直接使用opacity，那么文字颜色透明度也会随之改变 */
  background-color: rgba(255,255,255,0.5);
  width: 1300px;
  height: 720px;
  margin-left: 120px;
  margin-top: 50px;
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
        margin-top: 40px;
      margin-left: 60px;
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
        width: 870px;
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
