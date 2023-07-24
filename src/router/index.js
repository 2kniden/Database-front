import { createRouter, createWebHashHistory } from "vue-router";
import Home from '@/views/Home.vue';
import Attraction from "@/views/Attraction.vue";
import Journal from "@/views/Journal.vue";
import Team from "@/views/Team.vue";
import Personal from "@/views/Personal.vue";
import SearchOut from "@/views/Search/SearchOut";

const routes = [
  {
    path: "/",
    name:"home",
    component:Home
  },
  {
    path: "/Attraction",
    name: "attractions",
    component: Attraction
  },
  {
    path: "/Journal",
    name: "journals",
    component: Journal
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
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
