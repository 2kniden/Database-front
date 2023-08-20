import Mock from 'mockjs'

// 是否使用mock.js模拟数据
let useMock = true
if (useMock) {
    Mock.mock('/Team/TeamSquare/', 'get', {
        team_info:[
            {
                // 小队标识符
                team_id: "1",
                // 小队招募信息标题
                title: "八月中旬青海自驾旅行，寻找2-3个女生",
                // 小队招募信息详情
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                // 小队状态：这里暂时用string类型表示状态，实际使用需要根据status标识显示相应文字并修改背景颜色
                // 状态只包括两种：“招募中”，“招募完成”
                status: "招募中",
                // 标签：提供有限标签供选择，不能自定义
                tags: ["自驾", "限女生", "休闲"],
                // 发布者：这里直接使用了用户名称，实际传递时可以通过用户id获取用户名称和头像信息（members和applicants同）
                publisher: "青鸟",
                // 成员：成员中不包含发布者
                members: ["葡萄真好吃", "故事大王"],
                // 申请者：指申请加入小队但发布者还未通过的用户
                // 发布者通过申请后，申请者从applicants中删除，加入members
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                // 人数上限
                total: 5
                // 现人数通过members数组长度加一计算
            },
            {
                team_id: "2",
                title: "八月中旬川西自驾旅行",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["限女生", "休闲"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王", "彼得潘"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 6
            },
            {
                team_id: "3",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5
            },
            {
                team_id: "4",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "haha"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5
            },
            {
                team_id: "5",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5
            },
            {
                team_id: "6",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5
            },
            {
                team_id: "7",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5
            }
        ]
    })

    Mock.mock('/Team/MyJoinedTeam/Joining', 'get', {
        team_info:[
            {
                // 小队标识符
                team_id: "1",
                // 小队招募信息标题
                title: "八月中旬青海自驾旅行，寻找2-3个女生",
                // 小队招募信息详情
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                // 小队状态：这里暂时用string类型表示状态，实际使用需要根据status标识显示相应文字并修改背景颜色
                // 状态只包括两种：“招募中”，“招募完成”
                status: "招募中",
                // 标签：提供有限标签供选择，不能自定义
                tags: ["自驾", "限女生", "休闲"],
                // 发布者：这里直接使用了用户名称，实际传递时可以通过用户id获取用户名称和头像信息（members和applicants同）
                publisher: "青鸟",
                // 成员：成员中不包含发布者
                members: ["葡萄真好吃", "故事大王"],
                // 申请者：指申请加入小队但发布者还未通过的用户
                // 发布者通过申请后，申请者从applicants中删除，加入members
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                // 人数上限
                total: 5
                // 现人数通过members数组长度加一计算
            },
            {
                team_id: "2",
                title: "八月中旬川西自驾旅行",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["限女生", "休闲"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王", "彼得潘"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 6
            },
            {
                team_id: "3",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5
            }
        ]
    })

    Mock.mock('/Team/MyJoinedTeam/Joined', 'get', {
        team_info:[
            {
                team_id: "4",
                title: "八月中旬青海自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5
            },
            {
                team_id: "5",
                title: "八月中旬川西自驾旅行",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["限女生", "休闲"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王", "彼得潘"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 6
            },
            {
                team_id: "6",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5
            }
        ]
    })

    Mock.mock('/Team/MyPublishedTeam/Recruiting', 'get', {
        team_info:[
            {
                // 小队标识符
                team_id: "1",
                // 小队招募信息标题
                title: "八月中旬青海自驾旅行，寻找2-3个女生",
                // 小队招募信息详情
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                // 小队状态：这里暂时用string类型表示状态，实际使用需要根据status标识显示相应文字并修改背景颜色
                // 状态只包括两种：“招募中”，“招募完成”
                status: "招募中",
                // 标签：提供有限标签供选择，不能自定义
                tags: ["自驾", "限女生", "休闲"],
                // 发布者：这里直接使用了用户名称，实际传递时可以通过用户id获取用户名称和头像信息（members和applicants同）
                publisher: "青鸟",
                // 成员：成员中不包含发布者
                members: ["葡萄真好吃", "故事大王"],
                // 申请者：指申请加入小队但发布者还未通过的用户
                // 发布者通过申请后，申请者从applicants中删除，加入members
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                // 人数上限
                total: 5
                // 现人数通过members数组长度加一计算
            },
            {
                team_id: "2",
                title: "八月中旬川西自驾旅行",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["限女生", "休闲"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王", "彼得潘"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 6
            },
            {
                team_id: "3",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5
            }
        ]
    })

    Mock.mock('/Team/MyPublishedTeam/Recruited', 'get', {
        team_info:[
            {
                team_id: "4",
                title: "八月中旬青海自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募完成",
                tags: ["自驾", "限女生", "休闲"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5
            },
            {
                team_id: "5",
                title: "八月中旬川西自驾旅行",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募完成",
                tags: ["限女生", "休闲"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王", "彼得潘"],
                total: 6
            },
            {
                team_id: "6",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募完成",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                total: 5
            }
        ]
    })


    /* 发布日志 */
    Mock.mock('/Journal/PostJournal/uploadCover/', 'post', (options) => {       
        const file = JSON.parse(options.body);

        console.log(file.id);
        console.log(file.cover);

        const imageUrl = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg';
        const imageId = '1234567890';
        
        return {
          cover_url: imageUrl,
          cover_id: imageId
        };
    })

    Mock.mock('/Journal/PostJournal/getTabs/', 'get', {
        tabs: ['休闲','打卡','美食','亲子'],
    })

    Mock.mock('/Journal/PostJournal/uploadArticle/', 'post',(options) =>{
        console.log(options);

        const articleId = "12345678";

        return {
            article_id: articleId
        };        
    })

    /* 日志详情 */
    Mock.mock(/Journal\/JournalDetails\/getUserInformation\?id=.*/, 'get',{
        avatar_url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        name: '一个读者',
    })

    Mock.mock(/Journal\/JournalDetails\/getUserInteraction\?id=.*&article_id=.*/, 'get',{
        is_like: false,
        is_collect: false,
        is_followed: false,
    })

    Mock.mock(/Journal\/JournalDetails\/getDetails\?article_id=.*/, 'get',{
        cover_url:  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        title: '【魔都暴走记】你是我脑海中鲜明的记忆，做一场与上海有关的白日梦。',
        poster_avatar: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        poster_name: '一个作者',
        poster_id: '001',
        read_num: 12,
        kudos_num: 3,
        collect_num: 2,
        post_date: '2023-01-01 12:00:00',
        tabs:  ['休闲','打卡','美食'],
        body: '<p>begin</p> <p>啦啦啦</p> <p>end</p>',
    })

    Mock.mock(/Journal\/JournalDetails\/getComments\?id=.*&article_id=.*/, 'get',{
        comments: [         //日志的评论
        {
            comment_id: "003",
            poster_id: "003",
            poster_avatar: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            poster_name: "user1",
            poster_review: "啦啦啦",
            post_time: "2023-1-1 12:00:00",
            post_likes: 0,
            is_like: false,
            permission_of_delete: false,
        },
        {
            comment_id: "004",
            poster_id: "004",
            poster_avatar: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            poster_name: "user2",
            poster_review: "lalala",
            post_time: "2023-1-1 12:40:00",
            post_likes: 0,
            is_like: false,
            permission_of_delete: false,
        },
        {
            comment_id: "005",
            poster_id: "005",
            poster_avatar: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
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
                comment_id: "006",
                poster_id: "006",
                poster_avatar: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
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
                comment_id: "007",
                poster_id: "007",
                poster_avatar: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
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
                comment_id: "008",
                poster_id: "008",
                poster_avatar: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
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
    })

    Mock.mock('/Journal/JournalDetails/changeLikeStatus/', 'post',(options) =>{
        console.log(options.body);
        const data = JSON.parse(options.body);
        const is_like = data.is_like;
      
        console.log(is_like); // 输出 is_like
        let num = 3;
        if(is_like)
            num++;
        
        return {
            kudos_num: num,
            status: true,
        };
    })

    Mock.mock('/Journal/JournalDetails/changeCollectStatus/', 'post',(options) =>{
        console.log(options.body);
        const data = JSON.parse(options.body);
        const is_collect = data.is_collect;
      
        console.log(is_collect); // 输出 is_collect
        let num = 2;
        if(is_collect)
            num++;
        
        return {
            collect_num: num,
            status: true,
        };
    })

    Mock.mock('/Journal/JournalDetails/changeFollowStatus/', 'post',(options) =>{
        console.log(options.body);
        return true;
    })

    Mock.mock('/Journal/JournalDetails/changeCommentsLikeStatus/', 'post',(options) =>{
        console.log(options.body);
        const data = JSON.parse(options.body);
        const is_like = data.is_like;
      
        console.log(is_like); // 输出 is_like
        let num = 0;
        if(is_like)
            num++;
        
        return {
            post_likes: num,
            status: true,
        };
    })

    Mock.mock('/Journal/JournalDetails/postComments/', 'post',(options) =>{
        console.log(options.body);
        return{
            comment_id: "12345678",
            status: true,
        };
    })

    Mock.mock('/Journal/JournalDetails/postResponse/', 'post',(options) =>{
        console.log(options.body);
        return{
            comment_id: "12345678",
            status: true,
        };
    })

    Mock.mock('/Journal/JournalDetails/deleteComments/', 'post',(options) =>{
        console.log(options.body);
        return true;
    })
}

export default Mock