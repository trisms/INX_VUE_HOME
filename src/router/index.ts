import { createRouter, createWebHistory } from "vue-router";
import PortfolioList from "@/views/components/portfolio/PortfolioList.vue";
import PortfolioDetail from "@/views/components/portfolio/PortfolioDetail.vue";
import DefaultLayout from "@/views/layouts/DefaultLayout.vue";
import Home from "@/views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
/*  routes: [
    { path: '/', component: () => import('@/views/Home.vue') },
    { path: "/portfolio", name: "portfolio", component: PortfolioList },
  ],*/
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "home",
          component: Home,
        },
        {
          path: "portfolioList",
          name: "portfolioList",
          component: PortfolioList,
        },
        {
          path: "portfolio/:id",
          name: "portfolio-detail",
          component: () => import("@/views/components/portfolio/PortfolioDetail.vue"),
          props: true,
        },

        {
          path: "portfolioDetail",
          name: "portfolioDetail",
          component: PortfolioDetail,
        },
      ],
    },
  ],
  scrollBehavior(to) {
    // 페이지 이동 시 맨 위로
    return { top: 0 };
  },
});

export default router;
