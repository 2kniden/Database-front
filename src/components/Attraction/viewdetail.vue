<template>
    <div class="detaildec">
        <div class="dtitle">{{ title }}</div>
        <div class="dscore">{{ score }}分</div>
        <div class="dcom">
            ({{ commentnum }})条评论
            <img class="dcomimg" src="../../assets/attractions/highrank/right-double-arrow.svg" alt="">
        </div>
        <div class="dlocation">
            <img class="dloc" src="../../assets/location.svg" alt="">
            <div>{{ location }}</div>
        </div>
        <div class="dtp">
            <div class="dleft">开放时间:</div>
            <div>工作日：{{ weekday }}<br>周末：{{ weekend }}</div>

        </div>
        <div class="dtp">
            <div class="dleft dphone">官方电话:</div>
            <div>+{{ phone }}</div>

        </div>
        <div class="dprice">
            门票
            <img class="dploc" src="../../assets/attractions/highrank/rmb.svg" alt="">
            <span class="dp">{{ price }}</span>
            起
        </div>
        <div class="dweather" >
            <div class="dwpop" @mouseenter="changeValue(true)" @mouseleave="changeValue(false)">
                {{ date }}&nbsp;&nbsp;&nbsp;{{ weather }}

            </div>
            <div v-if="visible">
                <div class='pop' id='pop'>
                    <div id='triangle' class='triangle-bottom'></div>
                </div>
                <div class="dwword">
                    当前温度：{{ temNow }}°C<br>
                    今日最高温：{{ temHigh }}°C<br>
                    今日最低温：{{ temLow }}°C
                </div>

            </div>

            <!-- 这里还差展示气泡框 -->


        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        score: String,
        commentnum: Number,
        location: String,
        weekday: String,
        weekend: String,
        phone: String,
        price: Number,
        date: String,
        // 这里是天气相关的
        weather: String,
        temNow: Number,
        temHigh: Number,
        temLow: Number,
    },
    data() {
        return {
            visible: false,
        }
    },
    methods:{
        changeValue(onHover){
            this.visible=onHover;
        }
    }
}
</script>

<style>
/* 简介栏 */
.detaildec {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    width: 420px;
    height: 310px;
    padding: 20px 20px;
    position: relative;
}

.dlocation {
    display: flex;
    flex-direction: row;
    font-size: 14px;
    color: #888;
    padding: 20px 0;
}

.dloc {
    width: 30px;
    height: 30px;
    transform: translate(0, -20%);
}

.dploc {
    width: 30px;
    height: 30px;
    transform: translate(-12%, 25%);

}

.dtitle {

    font-weight: bold;
    font-size: 22px;
}

.dscore {
    color: #8097FD;
    font-size: 20px;
    margin-top: 15px;
}

.dcom {
    font-size: 14px;
    color: #444;
    margin-top: 15px;
}

.dcomimg {
    width: 15px;
    height: 15px;
    transform: translate(0, 15%);
}

.dtp {
    display: flex;
    margin-bottom: 15px;
    font-size: 14px;
}

.dleft {
    font-size: 14px;
    font-weight: bold;
    margin-right: 10px;
}

.dphone {
    transform: translate(0, -15%);
}

.dprice {
    position: absolute;
    bottom: 30px;
    right: 30px;
    font-size: 24px;
    color: #888;
}

.dp {
    color: #FFB84D;
}

.dwimg {
    width: 20px;
    height: 20px;
    transform: translate(0, 15%);
    margin-right: 2px;
}

.dweather {
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 14px;
    color: #888;

}

.other {
    margin-top: 5px;
    font-size: 10px;
    color: #888;
}

/* 气泡框 */
.dwpop {
    position: relative;
}
.dwword{
    position: absolute;
    width: 200px;
    top: 40px;
    transform: translate(-32%, 0%);

}
.pop {
    width: 180px;
    height: 75px;
    border: 2px solid #dadfff;
    border-radius: 4px;
    box-shadow: 2px 2px 2px #dadfff;
    position: absolute;
    top: 30px;
    transform: translate(-30%, 0%);
    background-color: white;
}

.triangle-bottom {
    width: 0;
    height: 0;
    border-bottom: 10px solid #dadfff;
    /* 使用border-bottom来创建倒三角 */
    border-left: 10px dashed transparent;
    border-right: 10px dashed transparent;
    position: absolute;
    top: -10px;
    /* 调整top值来放在.pop的顶部 */
    left: 80px;
    z-index: 2;
    /* 设置.triangle-top的z-index值高于.pop */
}
</style>