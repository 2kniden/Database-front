<template>
    <div class="userattrcom">
        <div class="userattrcomline"></div>
        <div class="attrcomment">
            <div class="attrleftlogo">
                <img class="userlog" :src="userlog" alt="">
            </div>
            <div class="attrright">
                <div class="attrhead">
                    <div class="attrname">{{attrname}}</div>
                    <div class="attrstar">{{attrstar}}分</div>
                </div>
                <div class="comdetail">
                    <div class="comword">
                        {{comword}}
                    </div>
                    <div class="comdetailimg">

                        <div v-for="pic in picsrc" :key="pic">
                            <img class="compic" :src="pic" alt="">
                        </div>
                    </div>


                </div>
                <div class="attrcommeg">
                    <!-- 这里需要date组件 -->
                    <div class="commeg comtime">{{comtime}}</div>
                    <div class="commeg comlikes">
                        <img class="licon" src="../../../assets/iconfont/like.svg" alt="">
                        {{comlikes}}
                    </div>
                    <div class="commeg comunlikes">
                        <img class="licon" src="../../../assets/iconfont/unlike.svg" alt="">
                        {{comunlikes}}
                    </div>
                </div>

            </div>
        </div>
        <div class="userattrcomline"></div>
    </div>
</template>

<script>
export default{
    props:{
        userlog:String,
        attrname:String,
        attrstar:String,
        comword:String,
        comtime:String,
        comlikes:Number,
        comunlikes:Number,
        picsrc:Array,

    }
}

</script>

<style>
/* 有时间再设置图片样式 */

.userattrcom {
    display: flex;
    flex-direction: column;
    padding: 15px 0;
}

.userattrcomline {
    background-color: #E1E7FF;
    width: 100%;
    height: 1px;
}

.userlog {
    width: 65px;
    height: 65px;
    border-radius: 50px;
    margin-right: 10px;
}

.attrhead {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 10px 0 10px;
}

.attrname {
    color: #5B5555;
    font-size: 16px;
}

.attrstar {
    color: #8097FD;
    font-size: 22px;
}

.comdetail {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    /* 添加这一行，将容器内的文字左对齐 */
    padding: 0 10px 5px 10px;
    font-size: 12px;
    color: #888;
    line-height: 2;
}

.comdetailimg {
    display: flex;
    flex-direction: row;
}

.compic {
    width: 150px;
    height: 150px;
    margin: 0 2px;
}

.attrcommeg {
    display: flex;
    flex-direction: row;
    margin: 0 10px 5px 10px;
}

.attrcomment {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    font-size: 12px;
    color: #5B5555;
}

.commeg {
    margin-right: 20px;
}

.attrreply {
    transform: translate(0, -5%);
}

.licon {
    width: 12px;
    height: 12px;
    transform: translate(0, 15%);
}
</style>