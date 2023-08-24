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
        <div class="dweather">
            <!-- 这里要导入当天日期，并导入天气查看插件 -->
            <!-- 这里的图标也要随天气改变，暂时写死 -->
            <img class="dwimg" src="../../assets/attractions/weather/weather_1晴.svg" alt="">
            {{date}}
            <div class="other">(点击查看更多)</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        picsrc: String,
        score: String,
        commentnum: Number,
        location: String,
        weekday: String,
        weekend: String,
        phone: String,
        price: Number,
        date:String
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
</style>