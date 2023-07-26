<!-- 这里一整个页面都要做成一个组件表示详情部分 -->
<template>
    <div class="tickitdetail">
        <div class="tickettitle">{{ title }}</div>
        <div class="ticketstan">{{ standard }}</div>
        <div class="tickettag">
            <!-- 这个后期也做成组件先写死 -->
            <div class="ttag">不可退票</div>
            <div class="ttag">无需取票</div>
        </div>
        <div class="tbottom">
            <span class="tpresent">所选日期{{ isbuy }}</span>
            <span class="tpresent tpresent2">购买须知>></span>
        </div>
        <div class="tprice">
            <div class="tmoney">
                <img class="tploc" src="../../assets/attractions/highrank/rmb.svg" alt="">
                <span class="tp">{{ price }}</span>
            </div>
            <div class="tsale">已售{{ buynum }}+</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        standard: String,
        isbuy: String,
        price: Number,
        buynum: Number,
    }
}
</script>

<style>
.tickitdetail {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    width: 600px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    margin-left: 10px;
}

.tickettitle {
    font-size: 16px;
    font-weight: bold;
}


.ticketstan {
    font-size: 12px;
    color: #888;
    margin-top: 10px;
}

.tickettag {
    display: flex;
    flex-direction: row;
}

.tbottom {
    display: flex;
    flex-direction: row;
}

.ttag {
    font-size: 12px;
    background-color: #FFB84D;
    border-radius: 20px;
    padding: 1px 10px;
    margin-right: 10px;
    margin-top: 10px;
}

.tpresent {
    margin: 10px 10px 0 0;
    font-size: 12px;
    color: #47AC45;
}

.tpresent2 {
    color: #888;
}

.tprice {
    position: absolute;
    bottom: 10px;
    right: 30px;
    font-size: 24px;
    color: #888;
}

.tploc {
    width: 30px;
    height: 30px;
    transform: translate(-12%, 25%);
}

.tp {
    color: #FFB84D;
}

.tsale {
    margin: 3px 0 0 5px;
    font-size: 12px;
    font-weight: 400px;
}
</style>