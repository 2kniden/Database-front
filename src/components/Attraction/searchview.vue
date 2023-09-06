<template>
    <div class="smallpic">
        <img class="leftpic" :src="picsrc" alt="">
        <div class="rightword">
            <div class="frontdes">
                <div class="leftdes">
                    <div class="lefttitle">{{ title }}</div>
                    <div class="loc">
                        <img class="locpic" src="../../assets/attractions/highrank/location.svg" alt="">
                        <div class="leftloc">{{ location }}</div>
                    </div>

                </div>
                <div class="rightscore">
                    <div class="starscore">{{ score }}分</div>
                    <div>
                        <!-- 评分插件 -->
                        <el-rate v-model="value" disabled text-color="#ff9900" score-template="{value}">
                        </el-rate>
                    </div>
                    <div class="commentnum">({{ commentnum }})条评论</div>
                </div>
            </div>
            <div class="rightline"></div>
            <div class="bottomdes">{{ username }}:{{ commentdetail }}</div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        picsrc: String,
        title: String,
        location: String,
        score: Number,
        commentnum: Number,
        username: String,
        commentdetail: String

    },
    data(){
        return{
            // 评分
            value:this.score,
        }
    }
}



</script>

<style>
.smallpic {
    display: flex;
    flex-direction: row;
    margin: 20px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
}

.leftpic {
    width: 250px;
    height: 130px;
}

.rightword {
    flex: 1;
    display: flex;
    flex-direction: column;

}

.frontdes {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px;
}

.lefttitle {
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 10px 5px;
    display: flex;
}

.loc {
    display: flex;
    flex-direction: row;
    font-size: 16px;
    color: #888888;
}

.locpic {
    width: 23px;
    height: 23px;

}

.rightscore {
    display: inline-flex;
    flex-direction: column;
    margin-right: 30px;

}


.starscore {
    font-weight: bold;
    font-size: 18px;
    color: #8097FD;
    margin-bottom: 5px;
}

.commentnum {
    font-size: 14px;
    color: #444444;
    margin-top: 5px;
}

.rightline {
    width: 100%;
    height: 1px;
    background-color: #8097FD;
}

.bottomdes {
    display: flex;
    padding: 10px 20px;
    color: #444444;
    font-size: 14px;
}
</style>