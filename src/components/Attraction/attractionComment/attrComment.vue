<template>
    <div class="userattrcom">
        <div class="userattrcomline"></div>
        <div class="attrcomment">
            <div class="attrleftlogo">
                <img class="userlog" :src="userlog" alt="">
            </div>
            <div class="attrright">
                <div class="attrhead">
                    <div class="attrname">{{ username }}</div>
                    <div class="attrstar">{{ comstar }}分</div>
                </div>
                <div class="comdetail">
                    <div class="comword">
                        {{ comword }}
                    </div>
                    <div class="comdetailimg">

                        <div v-for="pic in picsrc" :key="pic">
                            <img class="compic" :src="pic" alt="">
                        </div>
                    </div>


                </div>
                <div class="attrcommeg">
                    <div class="commeg comtime">{{ formattedDate }}</div>
                    <!-- <div class="commeg comlikes">

                        <img class="licon" src="../../../assets/attractions/icon/like.svg" alt="" v-if="!is_liked"
                            @click="changelikestatus">
                        <img class="licon" src="../../../assets/attractions/icon/like-fill.svg" alt="" v-else
                            @click="changelikestatus">

                        {{ comlikes }}
                    </div>
                    <div class="commeg comunlikes">

                        <img class="licon" src="../../../assets/attractions/icon/unlike.svg" alt="" v-if="!is_unliked"
                            @click="changeunlikestatus">
                        <img class="licon" src="../../../assets/attractions/icon/unlike-fill.svg" alt="" v-else
                            @click="changeunlikestatus">

                        {{ comunlikes }}
                    </div> -->
                    <div class="commeg comdel">
                        <img class="licon" src="../../../assets/attractions/icon/delete.svg" alt=""
                            v-if="poster_id === cookie_id" @click="delcomment">
                    </div>
                </div>

            </div>
        </div>
        <div class="userattrcomline"></div>
    </div>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus';
export default {

    inject: ['reload'],
    props: {
        userlog: String,
        username: String,
        comstar: String,
        comword: String,
        comtime: String,
        comlikes: Number,
        comunlikes: Number,
        picsrc: Array,
        comment_id: String,
        poster_id: String
    },
    data() {
        return {
            // 获取到的点赞、拉踩状态码以及删除权限，这里接口还没搞好
            is_liked: false,
            is_unliked: false,
            is_del: false,
            // liketype: 0,
            //0-取消点赞或点踩，1-点赞或点踩
            // unliketype: 0,
            // 这个是要cookie获取的，暂且写死
            cookie_id: "843526A2B7784E73B28E73C797A2C81C"
        }

    },

    methods: {
        delcomment() {
            axios
                .get('/api/attrations/DeleteComment?commentID=' + this.comment_id)
                .then((response) => {
                    console.log(response)
                    ElMessage({
                        message: '删除成功!',
                        type: 'success',
                    })
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });

            this.reload()
        }
        // 现在有个问题就是mounted里面不会报错
        // changelikestatus() {
        //     this.is_liked = !this.is_liked;
        //     this.liketype = !this.liketype;
        //     this.likeChange()

        // },
        // changeunlikestatus() {
        //     this.is_unliked = !this.is_unliked;
        //     this.unliketype = !this.unliketype;
        //     this.unlikechange()
        // },
        // likeChange() {
        //     axios
        //         .get('/api/attrations/LikeComment?commentID=' + this.comment_id + "&type=" + this.liketype)
        //         .then((response) => {
        //             console.log("点赞数", response)
        //         })
        //         .catch((error) => {
        //             console.error('Error fetching data:', error);
        //         });
        // },
        // unlikechange(){
        //     axios
        //         .get('/api/attrations/UnlikeComment?commentID=' + this.comment_id + "&type=" + this.unliketype)
        //         .then((response) => {
        //             console.log("点踩数", response)
        //         })
        //         .catch((error) => {
        //             console.error('Error fetching data:', error);
        //         });

        // }

    },
    components: {
        axios
    },
    computed: {
        formattedDate() {
            const date = new Date(this.comtime);
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

.attrright {
    width: 100%;
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
}</style>