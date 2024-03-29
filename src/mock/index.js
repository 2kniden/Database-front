import Mock from 'mockjs'

// 是否使用mock.js模拟数据
//let useMock = true
let useMock = false
if (useMock) {
    const teams = [
        {
            // 小队标识符
            teamId: "1",
            // 小队招募信息标题
            title: "八月中旬青海自驾旅行，寻找2-3个女生",
            // 小队招募信息详情
            detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
            // 小队状态：只包括两种：“招募中”，“招募完成”
            status: "招募中",
            // 标签：提供有限标签供选择，不能自定义
            tags: ["自驾", "限女生", "休闲"],
            // 发布者：这里直接使用了用户名称，实际传递时可以通过用户id获取用户名称和头像信息
            // members和applicants同理需要由id获取
            // 对此进行更改后，所有涉及小队中用户名称显示的内容都需要相应修改！！！
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
            teamId: "2",
            title: "八月中旬川西自驾旅行",
            detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
            status: "招募中",
            tags: ["限女生", "休闲"],
            publisher: "青鸟",
            members: ["葡萄真好吃", "故事大王", "彼得潘"],
            applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽","travel"],
            total: 6
        },
        {
            teamId: "3",
            title: "八月中旬新疆自驾旅行，寻找2-3个女生",
            detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
            status: "招募中",
            tags: ["自驾", "限女生", "休闲", "穷游"],
            publisher: "青鸟",
            members: ["葡萄真好吃", "故事大王","travel"],
            applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
            total: 5
        },
        {
            teamId: "4",
            title: "八月中旬新疆自驾旅行，寻找2-3个女生",
            detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
            status: "招募中",
            tags: ["自驾", "限女生", "休闲"],
            publisher: "青鸟",
            members: ["葡萄真好吃", "故事大王"],
            applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
            total: 5
        },
        {
            teamId: "5",
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
            teamId: "6",
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
            teamId: "7",
            title: "八月中旬新疆自驾旅行，寻找2-3个女生",
            detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
            status: "招募中",
            tags: ["自驾", "限女生", "休闲", "穷游"],
            publisher: "青鸟",
            members: ["葡萄真好吃", "故事大王"],
            applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
            total: 5
        }
      ];

    Mock.mock('http://8.130.25.70:5555/api/Teams', 'get', {
        team_info: [
            {
                // 小队标识符
                teamId: "1",
                // 旅行目的地
                destination: "青海",
                // 小队招募信息标题
                title: "八月中旬青海自驾旅行，寻找2-3个女生",
                // 小队招募信息详情
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                // 小队状态：只包括两种：“招募中”，“招募完成”
                status: "招募中",
                // 标签：提供有限标签供选择，不能自定义
                tags: ["自驾", "限女生", "休闲"],
                // 发布者：这里直接使用了用户名称，实际传递时可以通过用户id获取用户名称和头像信息（未实现）
                // members和applicants同理需要由id获取
                // 对此进行更改后，所有涉及小队中用户名称显示的内容都需要相应修改！！！
                publisher: "青鸟",
                // 成员：成员中不包含发布者
                members: ["葡萄真好吃", "故事大王"],
                // 申请者：指申请加入小队但发布者还未通过的用户
                // 发布者通过申请后，申请者从applicants中删除，加入members
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                // 人数上限
                total: 5,
                // 现人数通过members数组长度加一计算
                // 这里用一个数组表示旅行时间
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07 00:06:11",
            },
            {
                teamId: "2",
                destination: "青海",
                title: "八月中旬川西自驾旅行",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["限女生", "休闲"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王", "彼得潘"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 6,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "3",
                destination: "青海",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "4",
                destination: "青海",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "5",
                destination: "青海",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "6",
                destination: "青海",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "7",
                destination: "青海",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            }
        ]
    })

    Mock.mock('http://8.130.25.70:5555/api/Users/SelectTeam?id=843526A2B7784E73B28E73C797A2C81C&status=0', 'get', {
        team_info: [
            {
                // 小队标识符
                teamId: "1",
                destination: "青海",
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
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽", "haha"],
                // 人数上限
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "2",
                destination: "青海",
                title: "八月中旬川西自驾旅行",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["限女生", "休闲"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王", "彼得潘"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽", "haha"],
                total: 6,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "3",
                destination: "青海",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽", "haha"],
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            }
        ]
    })

    Mock.mock('http://8.130.25.70:5555/api/Users/SelectTeam?id=843526A2B7784E73B28E73C797A2C81C&status=1', 'get', {
        team_info: [
            {
                teamId: "4",
                destination: "青海",
                title: "八月中旬青海自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲"],
                publisher: "青鸟",
                members: ["1葡萄真好吃", "故事大王","haha"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "5",
                destination: "青海",
                title: "八月中旬川西自驾旅行",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["限女生", "休闲"],
                publisher: "青鸟",
                members: ["2葡萄真好吃", "故事大王", "彼得潘","haha"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 6,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "6",
                destination: "青海",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["3葡萄真好吃", "故事大王","haha"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            }
        ]
    })

    Mock.mock('http://8.130.25.70:5555/api/Users/SelectTeam?id=843526A2B7784E73B28E73C797A2C81C&status=2', 'get', {
        team_info: [
            {
                // 小队标识符
                teamId: "1",
                destination: "青海",
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
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "2",
                destination: "青海",
                title: "八月中旬川西自驾旅行",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["限女生", "休闲"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王", "彼得潘"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 6,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "3",
                destination: "青海",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募中",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            }
        ]
    })

    Mock.mock('http://8.130.25.70:5555/api/Users/SelectTeam?id=843526A2B7784E73B28E73C797A2C81C&status=3', 'get', {
        team_info: [
            {
                teamId: "4",
                destination: "青海",
                title: "八月中旬青海自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募完成",
                tags: ["自驾", "限女生", "休闲"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                applicants: ["谋杀咖啡", "飞翔的北极熊", "滑稽的大礼帽"],
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "5",
                destination: "青海",
                title: "八月中旬川西自驾旅行",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募完成",
                tags: ["限女生", "休闲"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王", "彼得潘"],
                total: 6,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
            },
            {
                teamId: "6",
                destination: "青海",
                title: "八月中旬新疆自驾旅行，寻找2-3个女生",
                detail: "我们现在有两个女生，想要在八月中旬自驾游玩青海。我们有一辆五座的车，想再找两三个女生一起玩。我们两个性格都很开朗，喜欢拍照。希望加入我们的朋友最好是比较年轻的人，会开车，我们可以交替开车。有意者欢迎联系我！",
                status: "招募完成",
                tags: ["自驾", "限女生", "休闲", "穷游"],
                publisher: "青鸟",
                members: ["葡萄真好吃", "故事大王"],
                total: 5,
                traveltime: ["2023-09-10", "2023-09-12"],
                posttime: "2023-08-07T00:06:11"
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

    // 尝试模拟分页功能
    // 定义数据模板
    const journaldata = Mock.mock({
        "cardsList|25":[
            {
                "journal_id|+1":1,
                "photoUrl":"https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
                "title":"【魔都暴走记】你是我脑海中鲜明的记忆，做一场与上海有关的白日梦。",
                "publishTime":"@date",
                "journalTag":"@county(true)",
                "authorization|1-3":1
            }
        ]
    })

    // 获取参数
    const getQuery = (url,name)=>{
        const index = url.indexOf('?');
        if(index>-1){
            const searchStr = url.substr(index+1);
            const searchArr = searchStr.split('&');
            for(var i=0;i<searchArr.length;i++){
                const itemArr = searchArr[i].split('=');
                // console.log(name,itemArr[0]);
                if(name === itemArr[0]){
                    return itemArr[1];
                }
            }
        }
    }
    // mockjs必须要对url进行不断地判断才能够取参数，所以这里暂时这样写get请求
    // /api\/Journals\/page\?pageNum=.*&pageSize=.*&keyword=.*/
    // 死活404的原因竟然是‘get’错写成了“GET”了…………啊啊啊啊啊我好恨；注意url字符串是不需要再用引号的
    Mock.mock(/Journal\/page\?pageNum=.*&pageSize=.*&keyword=.*/,'get',(option)=>{
        const pageNum = getQuery(option.url,'pageNum');
        const pageSize = getQuery(option.url,'pageSize');
        const keyWord = getQuery(option.url,'keyword');//但是这个地方的截取是有问题的
        console.log("pageNum",pageNum,"pageSize",pageSize,"keyWord",keyWord,"@");
        // 数据总条数
        const total = journaldata.cardsList.length;
        // 数据总页数
        const totalPage = Math.ceil(total/pageSize);
        console.log("totalpage=",totalPage);
        if(pageNum<=totalPage) {
            //数据截取
            // 截取的开始位置
            const start = (pageNum - 1)*pageSize;
            // 截取的结束位置
            const end = pageNum*pageSize;
            // 数据截取
            const list = journaldata.cardsList.slice(start,end);
            // alert("keyword=",keyWord);
            return {
                totalNum:total,
                journalList:list,
                keyword:keyWord
            }
        }
        else {
            return {
                totalNum:-1,
                journalList:[],
                keyword:keyWord
            }
        }
    })

    // Mock.mock(/Journal\/JournalTest\?pageNum=.*&pageSize=.*&keyword=.*/,'get',(options)=>{
    //     console.log(options);
    //    return ["1","2","3"];
    // })
   
    
    //返回当前已登录的用户的基本信息
    // Mock.mock('/api/Users', 'get', {
    //     UserID:"travel"
    // })
    
    //添加小队新的申请者
    Mock.mock('http://8.130.25.70:5555/api/Teams/Apply', 'post',(options) =>{
        console.log(options.body);
        const data = JSON.parse(options.body);

        // 在现有的 Mock 数据中找到对应的小队
        const team = teams.find(t => t.teamId === data.teamId);
        if (team) {
            // 检查是否已经在申请者列表或成员列表或队长中，如果不在，则添加
            if (!team.applicants.includes(data.UserID)&&!team.members.includes(data.UserID)&&(data.UserID!=team.publisher)) {
                team.applicants.push(data.UserID);
                return {
                    status: 200,
                    cur_team:team,
                };
            }
            else{
                return {
                    status: 404,
                    cur_team:team,
                };
            }
        } 
        else {
            return {
                status: 4,
                message: "Team not found",
            };
        }
    })
    
    //用户退出某个小队
    Mock.mock('/Team/DeleteJoinedTeam/', 'delete', (options) => {
        const requestBody = JSON.parse(options.body);
        console.log(requestBody);
        return true;
    });

    //用户发布新的小队
    Mock.mock('http://8.130.25.70:5555/api/Teams', 'post', (options) => {
        console.log(options.body);
        const data = JSON.parse(options.body);
        teams.push(data.new_team);
        return {
            cur_teams:teams,
        };
    });

    //用户编辑小队信息
    Mock.mock('/Team/EditTeamInfo/', 'put', (options) => {
        console.log(options.body);
        const data = JSON.parse(options.body);
        teams.push(data.new_team);
        return {
            cur_teams:teams,
        };
    });
}

export default Mock