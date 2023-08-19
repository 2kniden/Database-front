<template>
<div>    
    <nav class="navBar clearfix">
        <Header></Header>

        <div>
            
            <el-affix :offset="400">
                <div class="fixed-interaction">
                    <br>
                    <button class="interaction-button" size="small" @click="changeLikeStatus">
                        <p v-if="reader.is_like">
                            <img  src="../../assets/journal/details_like.png" style="height:27px">
                        </p>
                        <p v-else>
                            <img src="../../assets/journal/details_unlike.png" style="height:27px">
                        </p>
                    </button>
                   
                    <button class="interaction-button" @click="changeCollectStatus">
                        <p v-if="reader.is_collect">
                            <img src="../../assets/journal/details_collect.png" style="height:28px;">
                        </p>
                        <p v-else>
                            <img src="../../assets/journal/details_uncollect.png" style="height:28px">
                        </p> 
                    </button>
                
                </div>
            </el-affix>
            
        </div>
    </nav>
    <main>    
    <div class="details-cover-wrapper">
        <el-image style="height: 250px;" :src="cover_url" :fit="fill">
            <template #error>
                <div class="image-failed"> <el-icon><icon-picture /></el-icon> </div>
            </template>
        </el-image>
    </div>

    <div class="details-title-wrapper">
        {{title}}
    </div>

    <div class="poster-wrapper">
        <div class="poster-avatar">
            <el-avatar :size="110" :src="p_avater_url" />
        </div>
        <div class="poster-name">
            <p>{{poster_name}}</p>
            <p>
                <el-button v-if="is_followed_display" type="primary" :dark="isDark" @click="changeFollowStatus" round>
                    <p v-if="reader.is_followed">
                        取消关注
                    </p>
                    <p v-else> 
                        <el-icon size='13px'><Plus/></el-icon> &nbsp;关注&nbsp;
                    </p>
                </el-button>
            </p>
        </div>
        <div class="interaction">
            <p>
                <img src="../../assets/journal/details_read.png" style="height:20px">
                浏览 {{read_num}} &nbsp;
                <img src="../../assets/journal/details_like.png" style="height:20px">
                点赞  {{kudos_num}} &nbsp;
                <img src="../../assets/journal/details_collect.png" style="height:20px">
                收藏  {{collect_num}}
            </p>
            <p class="post-time">
                发布于：{{post_date}}
            </p>
        </div>
    </div>

    <div class="details-tabs-wrapper">
        <el-tag
        v-for="tab in details_tabs"
        :key="tab"
        class="mx-1"
        effect="dark"
        color="#7990F9"
        round
        >
        {{tab}}
        </el-tag>
    </div>

    <div class="body-wrapper">
        <!--暂时在此选择文件查看-->
        <input type="file" @change="handleFileChange">
        <div v-html="details_body"></div>
    </div>
    <el-divider />
    
    <div class="reviews-div">  
        <div class="post-review-wrapper">
            <div class="comment-icon">
                <img src="../../assets/journal/details_comment.png" style="height:40px">
            </div>
            <div class="comment-input">
                <el-input v-model="reader.post_comment" size="large" placeholder="我也有话说……" />
            </div>
            <div class="comment-post">
                <el-button 
                v-if="reader.post_comment" 
                color="#626aef" 
                :dark="isDark" 
                size="large"
                @click="post_comment_response(-1, -1)">
                发布
                </el-button>
            </div>
        </div>
        <el-divider />

        <div class="reviews-wrapper">
            <div  v-for="(comment, index1) in comments" :key="index1" class="one-comment">
                <div class="com-avatar">
                    <el-avatar :size="60" :src="comment.poster_avater" />
                </div>
                <div class="comment-and-response">
                    <p class="com-name">{{comment.poster_name}}</p>
                    <p class="com-comment">{{comment.poster_review}}</p>
                    <p class="com-time-kudos-reply">
                        {{comment.post_time}}&nbsp;&nbsp;
                        <a @click.stop="change_com_LikeStatus(index1)">
                            <img src="../../assets/journal/details_com_like.png"  style="height:10px">
                            {{comment.post_likes}}
                        </a>
                        &nbsp;&nbsp;
                        <a @click.stop="input_com_reply(index1, -1)">回复</a>
                        <a v-if="comment.permission_of_delete" class="delete_com_button" @click.stop="delete_com_reply(index1, -1)">删除</a>
                    </p>
                    <div v-if="reader.respose_index1==index1 && reader.respose_index2==-1" class="reply_input">
                          <el-input
                            v-model="reader.post_response"
                            :rows="4"
                            type="textarea"
                            maxlength="500"
                            show-word-limit
                            placeholder="说点什么吧"
                            />
                            <div class="reply_post_button">
                                <el-button 
                                v-if="reader.post_response" 
                                color="#626aef" 
                                :dark="isDark"
                                @click="post_comment_response(index1, -1)">
                                    发布
                                </el-button>
                                <el-button v-else color="#626aef" :dark="isDark" disabled>发布</el-button>
                            </div>
                    </div>
                    
                    <div v-for="(reply, index2) in comments_of_comments[index1]" :key="index2" class="one-reply">
                        <div class="rep-avatar">
                            <el-avatar :size="30" :src="reply.poster_avater" />
                        </div>
                        <div class="response-and-response">
                            <p class="rep-name">{{reply.poster_name}}</p>
                            <p class="rep-comment">
                                回复
                                <a class="replied_name_style"> &nbsp;{{reply.replied_name}}&nbsp; </a>
                                {{reply.poster_review}}
                            </p>
                            <p class="rep-time-kudos-reply">
                                {{reply.post_time}}&nbsp;&nbsp;
                                <a @click="change_rep_LikeStatus(index1, index2)">
                                <img src="../../assets/journal/details_com_like.png"  style="height:10px">
                                    {{reply.post_likes}}
                                </a>
                                &nbsp;&nbsp;
                                <a @click="input_com_reply(index1, index2)">回复</a>
                                <a v-if="reply.permission_of_delete" class="delete_com_button" @click.stop="delete_com_reply(index1, index2)">删除</a>
                            </p>

                            <div v-if="reader.respose_index1==index1 && reader.respose_index2==index2" class="reply_input">
                                <el-input
                                v-model="reader.post_response"
                                :rows="4"
                                type="textarea"
                                maxlength="500"
                                show-word-limit
                                placeholder="说点什么吧"
                                />
                                <div class="reply_post_button">
                                    <el-button 
                                    v-if="reader.post_response" 
                                    color="#626aef" 
                                    :dark="isDark"
                                    @click="post_comment_response(index1, index2)">
                                        发布
                                    </el-button>
                                    <el-button v-else color="#626aef" :dark="isDark" disabled>发布</el-button>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>

        <el-divider />
    </div>

    </main>
</div>
</template>

<script>
import Header from "@/components/Header";
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { Plus } from '@element-plus/icons-vue'

const date = new Date('2023/1/1');      //发布日期
const date_year = date.getFullYear();
const date_month = date.getMonth() + 1;
const date_day = date.getDate();

function formatDateTime(date) {  
            var y = date.getFullYear();  
            var m = date.getMonth() + 1;  
            m = m < 10 ? ('0' + m) : m;  
            var d = date.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            var h = date.getHours();  
            h = h < 10 ? ('0' + h) : h;  
            var minute = date.getMinutes();  
            minute = minute < 10 ? ('0' + minute) : minute;  
            var second=date.getSeconds();  
            second=second < 10 ? ('0' + second) : second;  
            return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
        };

export default {
    name: "JournalDetails",
    components:{
        Header,
        IconPicture,
        Plus,
    },
    data() {
    return {
        reader:{
            reader_id: "002",
            reader_avatar:"https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            reader_name: "我是读者",
            is_like: false,
            is_collect: false,
            is_followed: false,
            post_comment: "",       //评论日志
            post_response: "",      //评论评论

            respose_index1: -1,
            respose_index2: -1,
        },        

        cover_url:"https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        title:"【魔都暴走记】你是我脑海中鲜明的记忆，做一场与上海有关的白日梦。",
        p_avater_url:"https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        poster_name:"酒丫酒丫",
        poster_id:"001",
        read_num: 1,
        kudos_num: 0,
        collect_num: 0,
        post_date: date_year + '年' + date_month + '月' + date_day + '日',
        is_followed_display: true,  //是否显示关注按钮（作者不显示）
        details_tabs: ['休闲','打卡','美食'],
        details_body: "<p>begin</p> <p>啦啦啦</p> <p>end</p>",

        comments: [         //日志的评论
            {
                poster_id: "003",
                poster_avater: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
                poster_name: "user1",
                poster_review: "啦啦啦",
                post_time: "2023-1-1 12:00:00",
                post_likes: 0,
                is_like: false,
                permission_of_delete: false,
            },
            {
                poster_id: "004",
                poster_avater: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
                poster_name: "user2",
                poster_review: "lalala",
                post_time: "2023-1-1 12:40:00",
                post_likes: 0,
                is_like: false,
                permission_of_delete: false,
            },
            {
                poster_id: "005",
                poster_avater: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
                poster_name: "user3",
                poster_review: "lala1234567890",
                post_time: "2023-1-1 13:40:00",
                post_likes: 0,
                is_like: false,
                permission_of_delete: false,
            },
        ],
        comments_of_comments: [         //日志评论的评论（包括评论的评论的评论），与comments一一对应
            [],
            [
                {
                    poster_id: "006",
                    poster_avater: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
                    poster_name: "user4",
                    poster_review: "一条回复",
                    post_time: "2023-1-1 12:40:00",
                    post_likes: 0,
                    is_like: false,
                    replied_name: "user2",
                    replied_id: "",
                    permission_of_delete: false,
                },
                {
                    poster_id: "007",
                    poster_avater: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
                    poster_name: "user5",
                    poster_review: "一条回复的回复",
                    post_time: "2023-1-1 12:40:00",
                    post_likes: 0,
                    is_like: false,
                    replied_name: "user4",
                    replied_id: "",
                    permission_of_delete: false,
                },
            ],
            [
                {
                    poster_id: "008",
                    poster_avater: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
                    poster_name: "user6",
                    poster_review: "一条回复",
                    post_time: "2023-1-1 12:40:00",
                    post_likes: 0,
                    is_like: false,
                    replied_name: "user3",
                    replied_id: "",
                    permission_of_delete: false,
                }
            ],
        ],
    }},
    methods:{
        changeLikeStatus(){
            this.reader.is_like = !this.reader.is_like;
            if(this.reader.is_like)    //点赞
                this.kudos_num++;
            else                //取消点赞
                this.kudos_num--;
        },
        changeCollectStatus(){
            this.reader.is_collect = !this.reader.is_collect;
            if(this.reader.is_collect)
                this.collect_num++;
            else
                this.collect_num--;
        },
        changeFollowStatus(){
            this.reader.is_followed = !this.reader.is_followed;
        },

        handleFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                this.details_body = event.target.result;
            };
            reader.readAsText(file);
        },

        change_com_LikeStatus(index){
            this.comments[index].is_like = !this.comments[index].is_like;
            if(this.comments[index].is_like)
                this.comments[index].post_likes++;
            else
                this.comments[index].post_likes--;
        },
        change_rep_LikeStatus(index1, index2){
            this.comments_of_comments[index1][index2].is_like = !this.comments_of_comments[index1][index2].is_like;
            if(this.comments_of_comments[index1][index2].is_like)
                this.comments_of_comments[index1][index2].post_likes++;
            else
                this.comments_of_comments[index1][index2].post_likes--;
        },
        input_com_reply(index1, index2){        
            //console.log(index1);        //回复对象在c中位置  (index, -1)代表为c[index]
            //console.log(index2)         //回复对象在c_of_c中位置  (index1,index2)代表c_of_c[index1][index2]
            this.reader.respose_index1 = index1;
            this.reader.respose_index2 = index2;        //确保同时只显示一个回复框
        },
        post_comment_response(index1, index2){
            console.log(index1);
            console.log(index2);
            const now_time = new Date();
            //console.log(formatDateTime(test));        //发布时间
            
            if(index1 == -1){           //评论日志
            this.comments.push({
                poster_id: this.reader.reader_id,
                poster_avater: this.reader.reader_avatar,
                poster_name: this.reader.reader_name,
                poster_review: this.reader.post_comment,
                post_time: formatDateTime(now_time),
                post_likes: 0,
                is_like: false,
                permission_of_delete: true,         //删除评论权限（日志作者/评论发布者）
            });
            this.comments_of_comments.push([]);
            this.reader.post_comment = "";      //发布后清空输入框
            }
            else{           //评论评论
            let name = this.comments[index1].poster_name;
            let id = this.comments[index1].poster_id;
            if(index2 >= 0){
                name = this.comments_of_comments[index1][index2].poster_name;
                id = this.comments_of_comments[index1][index2].poster_id;
            }
            this.comments_of_comments[index1].push({
                poster_id: this.reader.reader_id,
                poster_avater: this.reader.reader_avatar,
                poster_name: this.reader.reader_name,
                poster_review: this.reader.post_response,
                post_time: formatDateTime(now_time),
                post_likes: 0,
                is_like: false,
                replied_name: name,
                replied_id: id,
                permission_of_delete: true,
            });
            this.reader.post_response = "";     //发布后清空输入框
            this.reader.respose_index1 = -1;
            this.reader.respose_index2 = -1;
            }
        },
        delete_com_reply(index1, index2){
            var that = this;
            console.log(Array.isArray(that.comments));
            console.log(Array.isArray(that.comments_of_comments));
            if(index2 == -1){       // c中
                that.comments.splice(index1, 1);
                that.comments_of_comments.splice(index1, 1);
            }
            else{                   //c_of_c中
                that.comments_of_comments[index1].splice(index2, 1);
            }
        },
    }
}
</script>

<style>
nav {
    height:80px;
    width:100%;
    background-color: #FFFFFF;
    z-index: 0;
}
main{
    width: 1200px;
    margin:auto;
    margin-bottom: 20px;
}
/* 固件————点赞收藏 */
.fixed-interaction{
    height: 100px;
    width: 50px;
    background-color: #F0F0F0;
    right: 20px;
    margin-left: auto;
    margin-right: 20px;
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.30));
    border-radius: 25px;
}
.fixed-interaction.interaction-button{
  background-color: transparent;
  border: none;
  padding: 0;
}
/* 封面 */
.details-cover-wrapper{
    background-color: rgb(172, 177, 194);
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.image-failed {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1200px;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
/* 标题 */
.details-title-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
    color: #000;
    font-family: MiSans;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
/* 作者 */
.poster-wrapper{
    margin-top: 10px;
    display: flex;
    align-items: flex-start;
    height: 130px;
    background-color: white;
}
.poster-avatar{
    margin-top: 10px;
}
.poster-name{
    margin-left: 20px;
    margin-top: 30px;
    color: rgba(91, 85, 85, 0.90);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 35px;
}
.interaction{
    margin-top: 30px;
    margin-left:auto;
    color: rgba(91, 85, 85, 0.90);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    height: 20px;
    line-height: 20px;
}
.post-time{
    line-height: 35px;
}
/* 标签 */
.details-tabs-wrapper{
    margin-left: 10px;
    margin-top: 5px;
    height: 30px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;  
}
/* 评论区 */
.reviews-div{
    width: 80%;
    margin:auto;   
}
.post-review-wrapper{
    display: flex;
    align-items: flex-start;
    margin-top: 10px;
    height: 35px;
}
.comment-icon{
    margin-top: 0px;
}
.comment-input{
    flex: 1;
    margin-left: 10px;
    z-index: 100;
}
.comment-post{
    margin-left: 3px;
    z-index: 100;
}

.one-comment{
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
}
.com-avatar{
    margin-top: 0px;
}
.comment-and-response{
    margin-top: 0px;
    margin-left: 5px;
    text-align: left;
    z-index: 100;       /* 避免当评论与固件位置相近时由于元素重叠导致点赞与评论失效 */
    width: 100%;
}
.com-name{
    font-family: MiSans;
    color: rgba(91, 85, 85, 0.90);
    font-size: 20px;
    font-weight: 400;
    line-height: 30px;
}
.com-comment{
    color: #000;
    font-family: MiSans;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}
.com-time-kudos-reply{
    color: rgba(91, 85, 85, 0.90);
    font-family: MiSans;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
.delete_com_button{
    margin-left: 650px;
    color: red;
}

.one-reply{
    display: flex;
    align-items: flex-start;
}
.rep-avatar{
     margin-top: 5px;
}
.response-and-response{
    margin-top: 2px;
    margin-left: 3px;
    text-align: left;
    width: 100%;
}
.rep-name{
    font-family: MiSans;
    color: rgba(91, 85, 85, 0.90);
    font-size: 15px;
    font-weight: 400;
    line-height: 15px;
}
.rep-comment{
    color: #000;
    font-family: MiSans;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
}
.replied_name_style{
    color: #5B5555E5;
}
.rep-time-kudos-reply{
    color: rgba(91, 85, 85, 0.90);
    font-family: MiSans;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.reply_input{
    margin-bottom: 10px;
    width: 100%;
}
.reply_post_button{
    width: 100%;
    margin-top: 5px;
    text-align:right;
}
</style>
