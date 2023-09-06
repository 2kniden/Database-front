import { createRouter, createWebHashHistory } from "vue-router";
import Home from '@/views/Home.vue';
import Attraction from "@/views/Attraction.vue";
import Journal from "@/views/Journal.vue";
import Team from "@/views/Team.vue";
import Personal from "@/views/Personal.vue";
import SearchOut from "@/views/Search/SearchOut";
import MyPublishedTeam from "@/views/Team/MyPublishedTeam.vue";
import MyJoinedTeam from "@/views/Team/MyJoinedTeam.vue";
import TeamDetails from "@/views/Team/TeamDetails.vue";
import JournalDetails from "@/views/Journal/JournalDetails.vue";
import MyJournal from "@/views/Journal/MyJournal.vue";
import JournalPlaza from "@/views/Journal/JournalPlaza.vue"
import PostJournal from "@/views/Journal/PostJournal.vue";
import JournalTest from "@/views/Journal/JournalTest.vue";
import Login from "@/views/Login/login";
import MissPass from "@/views/Login/missPass";
import AttractionSearch from '@/views/Attraction/AttractionSearch';
import AttractionDetail from '@/views/Attraction/AttractionDetail';
import CommentEdit from '@/views/Attraction/editcomment'

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/Login",
    name:"login",
    component: Login
  },
  {
    path:"/MissPass",
    name:"missPass",
    component: MissPass
  },
  {
    path: "/Attraction",
    name: "attractions",
    component: Attraction
  },
  {
    path: "/Journal",
    name: "Journal",
    component:Journal,
    children:[
      {
        path: "/Journal/MyJournal",
        name: "myJournal",
        component: MyJournal
      },
      {
        path: "/Journal/JournalPlaza",
        name: "journalPlaza",
        component: JournalPlaza
      },
      {
        path: "/Journal/PostJournal",
        name: "PostJournal",
        component: PostJournal
      },
      {
        path: "/Journal/JournalTest",
        name: "TestForJournalViews",
        component: JournalTest
      }
    ],
    redirect:"/Journal/JournalPlaza"
  },
  {//日志详情展示
    path: "/Journal/JournalDetails/:journalid",
    name: "journalDetails",
    component: JournalDetails
  },
  {
    path: "/Team",
    name: "teams",
    component: Team
  },
  {
    //搜索结果的展示页面
    path: "/searchout",
    name: "SearchOut",
    component: SearchOut
  },
  {
    path: "/Personal",
    name: "personal",
    component: Personal
  },
  {
    path: "/Team/MyPublishedTeam",
    name: "myPublishedTeams",
    component: MyPublishedTeam
  },
  {
    path: "/Team/MyJoinedTeam",
    name: "myJoinedTeams",
    component: MyJoinedTeam
  },
  {
    path: "/Team/TeamDetails",
    name: "teamDetails",
    component: TeamDetails
  },
  { path: "/attraction-search", name: "attractionsearchs", component: AttractionSearch },
  { path: "/attraction-detail", name: "attractiondetails", component: AttractionDetail },
  { path: "/comment-edit", name: "commentedit", component: CommentEdit }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
