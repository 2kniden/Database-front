<template>
    <!-- 展示用户日志缩略图且是scoller形式展示 -->
    <div class="jback">
        <div class="jhead">
            <img class="jheadimg" :src="picSrc" alt="">
        </div>
        <div class="jmiddle">
            <div class="jmleft">
                <div class="jm">

                    <div class="jtag">
                        <img class="tagicon" src="../../assets/attractions/icon/标签.svg" alt="">
                        <div class="tag" v-for="item in tag" :key="item">{{ item }}</div>
                    </div>
                </div>
            </div>

        </div>
        <div class="poster">
            <div class="ptitle">{{ title }}</div>
            <div class="usermsg">
                <img class="juserlog" :src="userSrc" alt="">
                {{ userName }}
            </div>
        </div>
        <div class="jbottom">
            <div class="jbtime">{{ formattedDate }}</div>
            <div class="likecol">
                <div class="jblikes">
                    <img class="jicon" src="../../assets/attractions/icon/点赞.svg" alt="">
                    {{ like }}
                </div>
                <div class="jbcollection">
                    <img class="jicon" src="../../assets/attractions/icon/收藏.svg" alt="">
                    {{ collect }}
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        userName: String,
        userSrc: String,
        position: String,
        axisnum: Number,
        axispic: String,
        tag: Array,
        title: String,
        picSrc: String,
        posterDate: String,
        like: Number,
        collect: Number,

    },
    
    
    computed: {
        formattedDate() {
            const date = new Date(this.posterDate);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            const seconds = String(date.getSeconds()).padStart(2, "0");

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
    },
    
}
</script>

<style>
/* 用户日志缩略图 */
.jback {
    background-color: #fff;
    box-shadow:1px 2px 2px 2px rgba(128, 151, 253, 0.4);
    border: 1px #fff solid;
    border-radius: 10px;
    /* 添加阴影效果 */
    width: 85%;
    border-radius: 5px;
    margin-top: 20px;
}
.jback:hover {
    box-shadow: 1px 1px 1px rgba(128, 151, 253, 0.4);
  
}
.jhead {
    width: 100%;
}

.jheadimg {
    width: 90%;
    height: 200px;
    margin: 10px 0 3px 0;
    border-radius: 5px;
    object-fit: cover;
}
.tagicon{
    width: 20px;
    height: 20px;
    transform: translate(-20%, 20%);
}
.jicon {
    width: 12px;
    height: 12px;
    transform: translate(0, 20%);

}

.jmiddle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 10px;
    padding: 5px;
    font-size: 8px;
    color: #777;
    background-color: #eaeaea;
    border-radius: 5px;
}

.jmleft {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* 内容左对齐 */
    margin: 2px 8px 0 5px;
    transform: scale(0.9);

}

.jmmap {
    width: 90px;
    height: 70px;
    border-radius: 5px;
    margin-right: 5px;

}

.jtag {
    display: flex;
    flex-direction: row;
}

.tag {
    margin-left: 5px;
}

.jmmi {
    margin: 10px 0px;

}

.ptitle {
    font-size: 12px;
    margin: 5px 14px 0 14px;
    line-height: 1.7;
    text-align: left;
    /* 文本左对齐 */

}

.usermsg {
    font-size: 12px;
    color: #777;
    transform: scale(0.9);
    text-align: right;
    /* 文本左对齐 */
}

.juserlog {
    width: 20px;
    height: 20px;
    border-radius: 50px;
    transform: translate(0, 23%);
}

.jbottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 5px 0px;
    padding-bottom: 5px;
    font-size: 8px;
    transform: scale(0.8);
    color: #777;
}

.likecol {
    display: flex;
    flex-direction: row;
    transform: translate(16%, 0);
}

.jblikes {
    padding-right: 20px;
}

.jbtime {
    transform: translate(-20%, 0);
}</style>