<!-- 这里一整个页面都要做成一个组件表示详情部分 -->
<template>
    <div class="tickitdetail">
        <div class="tickettitle">{{ title }}</div>
        <div class="ticketstan">购票标准：{{ standard }}</div>
        <div class="tickettag">
            <div class="ttag">{{isRefund}}</div>
            <div class="ttag">{{isCollected}}</div>
        </div>
        <div class="tbottom">
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
    data() {
        return {
            title: '',
            standard: '',
            isCollected: '',//是否需要取票（对应可取票、不可取票标签展示）
            isRefund: '',

        }
    },
    mounted() {
        this.initializeData();
    },
    methods:{
        initializeData(){
            if(this.titleint===0){
                this.title='成人票'
                this.standard='年龄18岁以上年龄18岁以上年龄18岁以上年龄18岁以上年龄18岁以上年龄18岁以上'
            }else if(this.titleint===1){
                this.title='学生票'
                this.standard='年龄12岁以上年龄12岁以上年龄12岁以上年龄12岁以上年龄12岁以上年龄12岁以上'
        
            }else if(this.titleint===2){
                this.title='老年票'
                this.standard='年龄55岁以上年龄55岁以上年龄55岁以上年龄55岁以上年龄55岁以上年龄55岁以上'
        
            }else{
                this.title='儿童票'
                this.standard='年龄12岁以上年龄55岁以上年龄55岁以上年龄55岁以上年龄55岁以上年龄55岁以上'
        
            }

            if(this.isCollectedint===0){
                this.isCollected='无需取票'
            }else{
                this.isCollected='需要取票'
            }

            if(this.isRefundint===0){
                this.isRefund='不可退票'
            }else{
                this.isRefund='可退票'
            }
        }
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