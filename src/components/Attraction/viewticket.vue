<!-- 这里一整个页面都要做成一个组件表示详情部分 -->
<template>
    <div class="tickitdetail">
        <div class="tickettitle">
            <div v-if="titleint===0">成人票</div>
            <div v-else-if="titleint===1">学生票</div>
            <div v-else-if="titleint===2">老年票</div>
            <div v-else>儿童票</div>
        </div>
        <div class="ticketstan">
            <div v-if="titleint===0">购票标准：18周岁以上，60周岁以下的成年人全票</div>
            <div v-else-if="titleint===1">购票标准：大、中、小学生(含港、澳、台学生,不含成人教育、研究生)，凭学生证或学校介绍信，可购学生票</div>
            <div v-else-if="titleint===2">购票标准：60岁以上(含60岁)老年人凭身份证原件可享老年优惠</div>
            <div v-else>购票标准：6周岁(含6周岁)以下或身高1.2米(含1.2米)以下儿童免票参观</div>
            
        </div>
        <div class="tickettag">
            <div class="ttag">
                <div v-if="isCollectedint">需要取票</div>
                <div v-else>无需取票</div>
            </div>
            <div class="ttag">
                <div v-if="isRefundint">可退票</div>
                <div v-else>不可退票</div>
            </div>
        </div>
        <div class="tbottom">
            <!-- 这里还没想好 -->
            <span class="tpresent">所选日期</span>
            
        </div>
        <div class="tprice">
            <div class="tmoney">
                <img class="tploc" src="../../assets/attractions/highrank/rmb.svg" alt="">
                <span class="tp">{{ price }}</span>
            </div>
           
        </div>
    </div>
</template>

<script>


export default {
    props: {
        titleint: Number,//这里根据数据0-成人、1-学生、2-老人//还有分别的购票标准standard
        isCollectedint: Number,//是否需要取票（对应可取票、不可取票标签展示）
        isRefundint: Number,//是否可退：0-不可退、1-可退（对应了可退票、不可退票标签展示）
        availabledays: Number,//可选票未来天数
        price: Number,
        buynum: Number,
    },
    
   
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
    margin-bottom: 10px;
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