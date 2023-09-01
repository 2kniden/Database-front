import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Attraction from "@/views/Attraction.vue";
import Journal from "@/views/Journal.vue";
import Team from "@/views/Team.vue";
import Personal from "@/views/Personal.vue";
import SearchOut from "@/views/Search/SearchOut";
import MyPublishedTeam from "@/views/Team/MyPublishedTeam.vue";
import MyJoinedTeam from "@/views/Team/MyJoinedTeam.vue";
import TeamDetails from "@/views/Team/TeamDetails.vue";
import MyTeamDetails from "@/views/Team/MyTeamDetails.vue";
import EditTeam from "@/views/Team/EditTeam.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/Attraction",
    name: "attractions",
    component: Attraction,
  },
  {
    path: "/Journal",
    name: "journals",
    component: Journal,
  },
  {
    path: "/Team",
    name: "teams",
    component: Team,
  },
  {
    //搜索结果的展示页面
    path: "/searchout",
    name: "SearchOut",
    component: SearchOut,
  },
  {
    path: "/Personal",
    name: "personal",
    component: Personal,
  },
  {
    path: "/Team/MyPublishedTeam",
    name: "myPublishedTeams",
    component: MyPublishedTeam,
  },
  {
    path: "/Team/MyJoinedTeam",
    name: "myJoinedTeams",
    component: MyJoinedTeam,
  },
  {
    path: "/Team/TeamDetails",
    name: "teamDetails",
    component: TeamDetails,
  },
  {
    path: "/Team/MyTeamDetails",
    name: "myTeamDetails",
    component: MyTeamDetails,
  },
  {
    path: "/Team/EditTeam",
    name: "editTeam",
    component: EditTeam,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
