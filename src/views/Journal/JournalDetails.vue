<template>
<div>    
    <header>
        <!-- 点赞与收藏固钉 -->
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
    </header>
    <!-- 日志展示 -->
    <main> 
        <!-- 背景图片 -->
        <!-- 更换背景图片为固定图片，不然不同分辨率的图像显示出来实在太丑了orz :fit="fill"-->
        <div class="details-wrapper">
            <div class="cover-img-wrapper">
                <el-image style="height: 350px;width:100%;" :src="cover_url">
                <template #error>
                    <div class="image-failed"> <el-icon><icon-picture /></el-icon> </div>
                </template>
                </el-image>
            </div>
            <!-- 文章标题 -->
            <div class="details-title-wrapper">
                {{title}}
            </div>

            <!-- 文章作者介绍及文章点赞评概况 -->
            <div class="poster-wrapper">
                <!-- 作者头像 -->
                <div class="poster-avatar">
                    <el-avatar :size="100" :src="p_avatar_url" />
                </div>
                <!-- 作者名称 -->
                <div class="poster-name">
                    <p>{{poster_name}}</p>
                    <p>
                        <!-- 关注按钮 -->
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

                <!-- 本文点赞评论数量 -->
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
                    <div class="edit-option"
                     v-if="reader.permissionOfEdit === true">
                     <el-button class="edit-journal" @click="handleDeleteOrEdit($event)">删除日志</el-button>
                     &nbsp;&nbsp;
                     <el-button class="edit-journal" @click="handleDeleteOrEdit($event)">编辑日志</el-button>
                    </div>
                </div>
            </div>

        <!-- 本文实际内容 -->
            <div class="details-tabs-wrapper">
                <!-- 标签 -->
                <el-tag
                v-for="tab in details_tabs"
                :key="tab"
                class="mx-1"
                effect="dark"
                color="#7990F9"
                style="border-color:#8097FD"
                round
                >
                {{tab}}
                </el-tag>
            </div>

        <!-- 实际内容展示 -->
            <div class="body-wrapper">
                <!--暂时在此选择文件查看-->
                <!--<input type="file" @change="handleFileChange">-->
                <div v-html="details_body"></div>
            </div>
        </div>

        <!-- 发布评论区 -->
        <el-divider />
        <div class="reviews-div">  
            <div class="post-review-wrapper">
                <div class="comment-icon">
                    <img src="../../assets/journal/details_comment.png" style="height:40px">
                </div>
                <div class="comment-input">
                    <el-input v-model="reader.post_comment"  size="large" placeholder="我也有话说……" />
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
        </div>

        <!-- 查看评论区 -->
        <el-divider />
        <div class="reviews-wrapper">
            <div  v-for="(comment, index1) in comments" :key="index1" class="one-comment">
                <!-- 一级评论发布者的头像 -->
                <div class="com-avatar">
                    <el-avatar :size="45" :src="comment.poster_avatar" />
                </div>
                <!-- 一级评论的展示及回复 -->
                <div class="comment-and-response">
                    <!-- 一级评论者的名称 -->
                    <p class="com-name">{{comment.poster_name}}</p>
                    <!-- 一级评论内容 -->
                    <p class="com-comment">{{comment.poster_review}}</p>
                    <!-- 一级评论点赞\评数据 -->
                    <p class="com-time-kudos-reply" >
                        {{comment.post_time}}&nbsp;&nbsp;
                        <a @click.stop="change_com_LikeStatus(index1)">
                            <img v-if="comment.is_like === false" src="../../assets/journal/details_com_like.png"  style="height:10px">
                            <img v-if="comment.is_like === true" src="../../assets/journal/details_com_givelike.png" style="height:10px">
                            {{comment.post_likes}}
                        </a>
                        &nbsp;&nbsp;
                        <a @click.stop="input_com_reply(index1, -1)">回复</a>
                        <a v-if="comment.permission_of_delete === true" class="delete_com_button" @click.stop="delete_com_reply(index1, -1)">删除</a>
                    </p>

                    <!-- 可能的回复框 -->
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
                    
                    <!-- 评论的评论展示 -->
                    <div v-for="(reply, index2) in comments_of_comments[index1].ReplyList" :key="index2" class="one-reply">
                        <div class="rep-avatar">
                            <el-avatar :size="25" :src="reply.poster_avatar" />
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
                                    <img v-if="reply.is_like === false" src="../../assets/journal/details_com_like.png"  style="height:10px">
                                    <img v-if="reply.is_like === true" src="../../assets/journal/details_com_givelike.png" style="height:10px">
                                    {{reply.post_likes}}
                                </a>
                                &nbsp;&nbsp;
                                <a @click="input_com_reply(index1, index2)">回复</a>
                                <a v-if="reply.permission_of_delete === true" class="delete_com_button" @click.stop="delete_com_reply(index1, index2)">删除</a>
                            </p>

                            <!-- 可能的回复框 -->
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
        <el-divider/>
    </main>
</div>
</template>

<script>
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { Plus } from '@element-plus/icons-vue'
import axios from 'axios'
import { useRoute,useRouter } from 'vue-router'
import { ElMessage,ElMessageBox } from 'element-plus'

function formatDateTime(d) {
    const date = new Date(d);      //发布日期
    const date_year = date.getFullYear();
    const date_month = date.getMonth() + 1;
    const date_day = date.getDate(); 

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

function backToLast() {
    const router = useRouter();
    router.go(-1);
    console.log("backtolast()");
};

function toEdit(journal_id) {
    const toPost = useRouter();
    const postJournal = () => {
        toPost.push({
            name:"PostJournal",
            param:{
                mode:'edit',
                journal:journal_id,
            }
        })
    }
}

export default {
    name: "JournalDetails",
    components:{
        IconPicture,
        Plus,
    },
    data() {
    return {
        reader:{
            reader_id: "",
            reader_avatar:"",
            reader_name: "",
            is_like: false,
            is_collect: false,
            is_followed: false,
            permissionOfEdit:false,

            post_comment: "",       //评论日志
            post_response: "",      //评论评论

            respose_index1: -1,
            respose_index2: -1,
        },        
        article_id: "",
        cover_url:"",
        title:"",
        p_avatar_url:"",
        poster_name:"",
        poster_id:"",
        read_num: 1,
        kudos_num: 0,
        collect_num: 0,
        post_date: '',
        is_followed_display: true,  //是否显示关注按钮（作者不显示）
        details_tabs: [''],
        details_body: "",

        comments: [                     //日志的评论
            {}
        ],
        comments_of_comments: [         //日志评论的评论（包括评论的评论的评论），与comments一一对应
            [],
        ],
    }},
    mounted() {
        // 挂载前先获取到用户想要查看的日志的详细信息
        this.initializeData();
    },
    methods:{
        initializeData(){
            const route = useRoute();
            const router = useRouter();
            const articleInfo = route.query;
            console.log("articleInfo=",articleInfo);
            let that = this;
            // 首先获得当前阅读者的信息
            that.reader.reader_id = '843526A2B7784E73B28E73C797A2C81C';

            // 获得当前阅读者想要阅读的文章的id
            that.article_id = articleInfo.journal_id;     

            // 获得正在阅读的人的用户名和头像
            // axios.get('/Journal/JournalDetails/getUserInformation?id='+ that.reader.reader_id)
            // .then(res =>{
            //     that.reader.reader_avatar = res.data.avatar_url;
            //     that.reader.reader_name = res.data.name;
            // });
            // 此处先强制规定一下
            that.reader.reader_avatar = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg';
            that.reader.reader_name = "小美";//测试数据里这么说的
            
            // 获取当前阅读者和本文的交互状态，以及本文的相关的内容
            axios.get('/api/Journals/'+ that.article_id + '/' + that.reader.reader_id)
            .then(res=>{
                // 首先增加浏览量
                axios.post('/api/Journals/like_favo_view',{
                    userId:that.reader.reader_id,
                    contentId:that.article_id,
                    clickType:'3',
                })
                .then(res=>{
                    if(res.data.status) {
                        that.read_num = res.data.read_num;
                    }
                    else {
                        ElMessage("浏览量status错误")

                    }
                })
                .catch(err=>{
                    ElMessage.error("浏览量更新失败🫢");
                })

                // 当前用户与本文的交互状态
                that.reader.is_like = res.data.Journal.is_like;
                that.reader.is_collect = res.data.Journal.is_collect;
                //是否关注了本文作者：这个需要调用user相关的接口
                // that.reader.is_followed = res.data.is_followed;
                that.reader.is_followed = false;

                // 本篇日志的作者信息
                // 暂时整个头像
                that.p_avatar_url = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg';
                // that.p_avatar_url = res.data.Author.poster_avatar;
                that.poster_name = res.data.Author.poster_name;
                that.poster_id = res.data.Author.poster_id;
                // 如果阅读者就是本文作者，那么就可以编辑本文
                if(that.poster_id === that.reader.reader_id) {
                    that.reader.permissionOfEdit = true;
                }

                // 本篇日志的信息
                that.title = res.data.Journal.title;
                that.cover_url = res.data.Journal.cover_url;
                that.read_num = res.data.Journal.read_num;
                that.kudos_num = res.data.Journal.kudos_num;
                that.collect_num = res.data.Journal.collect_num;
                that.post_date = formatDateTime(res.data.Journal.post_date);

                that.details_tabs = res.data.Journal.tabs;
                that.details_body = res.data.Journal.body; 

                // 关注图标的展示
                that.is_followed_display = (that.reader.reader_id !== that.poster_id);

                // 当前日志的评论信息
                that.comments = res.data.Comment.comments;
                that.comments.forEach((c)=>{
                    let tmp_c = c;
                    c.post_time = formatDateTime(tmp_c.post_time);
                })
                that.comments_of_comments = res.data.Comment.comments_of_comments;
                that.comments_of_comments.forEach((c_of_c)=>{
                    // c_of_c是ReplyList+ReplyNum的集合
                    // 其中ReplyList也是数组
                    c_of_c.ReplyList.forEach((c) => {
                        let tmp_c = c;
                        c.post_time = formatDateTime(tmp_c.post_time);
                    })
                })
                // that.commentNum = res.data.Comment.CommentNum; 
            });
        },

        // 更改获赞状态
        changeLikeStatus(){
            let that = this;
           
            // 点赞
            if( !that.reader.is_like) {
                axios.post('/api/Journals/like_favo_view',{
                    userId: that.reader.reader_id,
                    contentId: that.article_id,
                    // 1表示点赞
                    clickType:'1',
                })
                .then(res => {
                    if(res.data.status){
                        that.reader.is_like = !that.reader.is_like;
                        that.kudos_num = res.data.kudos_num;
                        ElMessage.success("点赞成功🥰");
                        console.log("res.data.kudos_num",res.data.kudos_num);
                    }
                })
                .catch(error => {
                    console.log(error);
                    ElMessage.error("点赞失败")
                });
            }
            else {// 取消点赞
                axios.delete('/api/Journals/like/' + that.article_id + '/' + that.reader.reader_id)
                .then(res=>{
                    if(res.data.status) {
                        ElMessage.warning("取消点赞成功");
                        that.reader.is_like = !that.reader.is_like;
                        that.kudos_num = res.data.kudos_num;
                        console.log("cancel|res.data.kudos_num",res.data.kudos_num);
                    }
                })
                .catch(err => {
                    ElMessage.error("取消点赞失败");
                })
            }
        },

        // 更改收藏数
        changeCollectStatus(){
            let that = this;
        
            // 更新收藏
            if(!that.reader.is_collect) {
                axios.post('/api/Journals/like_favo_view',{
                    userId: that.reader.reader_id,
                    contentId: that.article_id,
                    // 2表示收藏
                    clickType:'2',
                })
                .then(res => {
                    if(res.data.status){
                        ElMessage.success("收藏成功🥰");
                        that.reader.is_collect = !that.reader.is_collect;
                        that.collect_num = res.data.collect_num;
                        console.log("res.data.collect_num=",res.data.collect_num);
                    }
                })
                .catch(error => {
                    ElMessage.error("收藏失败")
                });
            }
            else {// 取消收藏
                axios.delete('/api/Journals/favorite/' + that.article_id + '/' + that.reader.reader_id)
                .then(res=>{
                    ElMessage.warning("取消收藏成功");
                    that.reader.is_collect = !that.reader.is_collect;
                    that.collect_num = res.data.collect_num;
                    console.log("cancel|res.data.collect_num=",res.data.collect_num);
                })
                .catch(err => {
                    ElMessage.error("取消收藏失败");
                })
            }
        },

        changeFollowStatus(){
            alert("接口还没写好");
            // var that = this;
            // that.reader.is_followed = !that.reader.is_followed;

            // axios.post('/Journal/JournalDetails/changeFollowStatus/',{
            //     is_followed: !that.reader.is_followed,
            //     followed_id: that.poster_id,
            //     follower_id: that.reader.reader_id,
            // })
            // .then(res => {
            //     if(res.data){
            //         that.reader.is_followed = !that.reader.is_followed;
            //     }
            // })
            // .catch(error => {
            //     alert('操作失败！');
            // });
        },

        handleFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                this.details_body = event.target.result;
            };
            reader.readAsText(file);
        },

        // 更改评论的状态
        // index代表的应该是自上而下一级评论的序号
        change_com_LikeStatus(index){
            var that = this;
            if(!this.comments[index].is_like){ //点赞
                axios.post('/api/Comments/like',{
                    userId: that.reader.reader_id,
                    contentId: that.comments[index].comment_id,
                })
                .then(res => {
                    if(res.data.status){
                        that.comments[index].is_like= !that.comments[index].is_like;
                        that.comments[index].post_likes = res.data.kudos_num;
                    }
                })
                .catch(error => {
                    alert('操作失败！');
                });
            }
            else{ //取消点赞
                axios.delete('api/Comments/'+that.comments[index].comment_id+'/'+that.reader.reader_id)
                .then(res=>{
                    if(res.data.status) {
                        that.comments[index].is_like= !that.comments[index].is_like;
                        that.comments[index].post_likes = res.data.kudos_num
                    }
                })
                .catch(err=>{

                })
            }
            
        },
        // 给评论的评论点赞或取消点赞
        change_rep_LikeStatus(index1, index2){
            var that = this;
            console.log(this.comments_of_comments[index1].ReplyList[index2].post_likes);
            if(!that.comments_of_comments[index1].ReplyList[index2].is_like){//点赞
                axios.post('/api/Comments/like/',{
                    userId: that.reader.reader_id,
                    contentId: that.comments_of_comments[index1].ReplyList[index2].comment_id,
                })
                .then(res => {
                    if(res.data.status){
                        that.comments_of_comments[index1].ReplyList[index2].is_like = !that.comments_of_comments[index1].ReplyList[index2].is_like;
                        that.comments_of_comments[index1].ReplyList[index2].post_likes = res.data.kudos_num;
                    }
                })
                .catch(error => {
                    ElMessage({
                        message:"操作失败",
                        type:"error"
                    })
                });
            }
            else {//取消点赞
                axios.delete('/api/Comments/'+that.comments_of_comments[index1].ReplyList[index2].comment_id+'/'+that.reader.reader_id)
                .then(res=>{
                    that.comments_of_comments[index1].ReplyList[index2].is_like = !that.comments_of_comments[index1].ReplyList[index2].is_like;
                    that.comments_of_comments[index1].ReplyList[index2].post_likes = res.data.kudos_num;
                })
            }
            console.log(this.comments_of_comments[index1].ReplyList[index2].post_likes);
        },
        // 实现给评论评论
        input_com_reply(index1, index2){        
            //console.log(index1);        //回复对象在c中位置  (index, -1)代表为c[index]
            //console.log(index2)         //回复对象在c_of_c中位置  (index1,index2)代表c_of_c[index1][index2]
            this.reader.respose_index1 = index1;
            this.reader.respose_index2 = index2;        //确保同时只显示一个回复框
        },

        // 发布评论
        post_comment_response(index1, index2){
            var that = this;

            //评论日志
            if(index1 == -1){           
                axios.post('/api/Comments',{
                    parentId:'',
                    rootParent:'',
                    userId: that.reader.reader_id,
                    journalId: that.article_id,
                    commentContent: that.reader.post_comment,
                })
                .then(res => {
                    if(res.data.status){
                        // 如果成功评论，直接修改评论相关的参数
                        // 向本日志中的comments数组中加入新的一项
                        that.comments.push({
                            comment_id: res.data.comment_id, 
                            poster_id: that.reader.reader_id,
                            poster_name: that.reader.reader_name,
                            poster_avatar: that.reader.reader_avatar,
                            poster_review: that.reader.post_comment,
                            post_likes: 0,
                            post_time: formatDateTime(res.data.comment_time),
                            is_like: false,
                            permission_of_delete: true,         //删除评论权限（日志作者/评论发布者）
                        });
                        that.comments_of_comments.push({
                            ReplyNum:0,
                            ReplyList:[],
                        });
                        that.reader.post_comment = "";      //发布后清空输入框
                    }
                })
                .catch(error => {
                    ElMessage.error("操作失败");
                });
            }
            else{           //评论评论
                // 评论评论时一定会有父评论
                let parent_id = this.comments[index1].poster_id;
                let parentcom_id = this.comments[index1].comment_id;
                let parent_name = this.comments[index1].poster_name;

                let root_id = this.comments[index1].poster_id
                let root_name = this.comments[index1].poster_name;
                let rootcom_id = this.comments[index1].comment_id;

                // 若该评论是二级评论
                if(index2 >= 0){
                    // 说明刚才的评论实际上是根评论
                    parent_id = this.comments_of_comments[index1].ReplyList[index2].poster_id;
                    parent_name = this.comments_of_comments[index1].ReplyList[index2].poster_name;
                    parentcom_id = this.comments_of_comments[index1].ReplyList[index2].comment_id;
                }
                
                axios.post('/api/Comments',{
                    parentId:parentcom_id,
                    rootParent:rootcom_id,
                    userId: that.reader.reader_id,
                    journalId: that.article_id,
                    commentContent: that.reader.post_response,
                })
                .then(res => {
                    if(res.data.status){
                        that.comments_of_comments[index1].ReplyList.push({
                            comment_id: res.data.comment_id,
                            poster_id: that.reader.reader_id,
                            poster_review: that.reader.post_response,
                            poster_name: that.reader.reader_name,
                            poster_avatar: that.reader.reader_avatar,
                            post_likes: 0,
                            post_time: formatDateTime(res.data.comment_time),
                            replied_id:parent_id,
                            replied_name:parent_name,
                            is_like: false,
                            permission_of_delete: true,
                        });
                        that.reader.post_response = "";     //发布后清空输入框
                        that.reader.respose_index1 = -1;    //收起评论发布框
                        that.reader.respose_index2 = -1; 
                    }
                })
                .catch(error => {
                    ElMessage.error("操作失败");
                });
            }
        },

        // 删除给评论的回复
        delete_com_reply(index1, index2){
            // 能够进入本函数的一定有该评论的删除权限
            var that = this;
            
            //c中
            if(index2 == -1){    
                axios.delete('/api/Comments/'+that.comments[index1].comment_id)
                .then(res => {
                    if(res.data.status){
                        that.comments.splice(index1, 1);
                        that.comments_of_comments.splice(index1, 1);
                    }
                })
                .catch(error => {
                    ElMessage.error("操作失败！");
                });
            }
             //c_of_c中
            else{                  
                axios.delete('/api/Comments/'+that.comments_of_comments[index1].ReplyList[index2].comment_id)
                .then(res => {
                    if(res.data){
                        that.comments_of_comments[index1].ReplyList.splice(index2, 1);
                    }
                })
                .catch(error => {
                     ElMessage.error("操作失败!");
                });
            }

        },

        handleDeleteOrEdit(event) {
            // 强制失去焦点
            let target = event.target;
            let isDeleted = false;
            if(target.nodeName === "SPAN") {
                target = target.parentNode;
            }
            target.blur();
            
            if(target.innerText === "删除日志") {
                ElMessageBox.confirm(
                    "您确定要删除这篇日志吗？",
                    "请确认操作",
                    {
                        confirmButtonText:"确定",
                        cancelButtonText:'取消',
                        type:"warning",
                    }
                )
                .then(()=>{
                    // 确认删除
                    let that = this;
                    axios.delete("/api/Journals/" + this.article_id)
                    .then(res=>{
                        console.log("hi");
                        if(res.data.status) {
                            ElMessage.success("删除成功!");
                            setTimeout(this.$router.go(-1),1000);
                        }
                        else {
                            console.log(res.data.delete);
                        }
                    })
                    .catch(err=>{
                        ElMessage.error("删除失败!");
                        console.log(err);
                        return;
                    })
                })
                .catch(()=>{
                    ElMessage({
                        type:"info",
                        message:"操作取消"
                    })
                })
            } else {
                let that=this;
                this.$router.push({
                    path:"/Journal/PostJournal",
                    query:{
                        mode:"edit",
                        journal:that.article_id,
                    }
                })
                
            } //handle delete and edit
        },
       
    }
}
</script>

<style scoped>
nav {
    height:80px;
    width:100%;
    color: black;
    background-color: #FFFFFF;
    z-index: 0;
}

main{
    width: 1000px;
    margin:auto;
    margin-bottom: 20px;
}
/* 固件————点赞收藏 */
.el-affix {
    z-index: 200;
    position: relative;
    display: inline;
}

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
.details-wrapper{
    background-color: rgba(255,255,255,0.7);
    width:1050px;
    border-radius: 20px;
    padding-bottom: 50px;
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
}
.poster-avatar{
    margin-top: 10px;
    margin-left:20px;
}
.poster-name{
    margin-left: 20px;
    margin-top: 30px;
    color: rgba(91, 85, 85, 0.90);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 35px;
    z-index: 100;
}
.interaction{
    margin-top: 30px;
    margin-left: auto;
    margin-right: 20px;
    color: rgba(91, 85, 85, 0.90);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    height: 20px;
    line-height: 20px;
}

button.el-button.edit-journal {
    border-radius: 20px;
}

button.el-button.edit-journal:hover,button.el-button.edit-journal:focus {
    border-style: none;
    background-color: #607aee;
    color: #FFFFFF;
}

.post-time{
    line-height: 3;
}
/* 标签 */
.details-tabs-wrapper{
    margin-left: 25px;
    margin-top: 5px;
    height: 30px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;  
}
.body-wrapper {
    padding: 30px;
    text-align: left;
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
    margin-left: 15px;
    color: #cf1717b3;
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

